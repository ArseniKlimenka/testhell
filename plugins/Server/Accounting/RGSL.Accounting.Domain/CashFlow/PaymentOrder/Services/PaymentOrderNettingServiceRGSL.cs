using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.Allocation.Requests;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.PaymentOrder;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.PaymentOrder.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.PaymentOrder.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.PaymentOrder.Requests;
using Adacta.AdInsure.RGSL.Common.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.PaymentOrder.Services
{
    public class PaymentOrderNettingServiceRGSL : IPaymentOrderNettingServiceRGSL
    {
        private readonly IBankStatementServiceRGSL _bankStatementService;
        private readonly IAllocationServiceRGSL _allocationService;
        private readonly IPaymentOrderRepositoryRGSL _paymentOrderRepository;

        public PaymentOrderNettingServiceRGSL(IBankStatementServiceRGSL bankStatementService,
                                              IAllocationServiceRGSL allocationService,
                                              IPaymentOrderRepositoryRGSL paymentOrderRepository)
        {
            _bankStatementService = bankStatementService;
            _allocationService = allocationService;
            _paymentOrderRepository = paymentOrderRepository;
        }

        public async Task<NettingResponse> ExecutePaymentOrderNetting(NettingRequest request)
        {
            var docsForNetting = _paymentOrderRepository.GetDocumentsForNetting(new DocumentsForNettingRequest { PaymentOrderNo = request.PaymentOrderNo });

            var response = new NettingResponse
            {
                NettedItems = new List<NettedItemData>()
            };

            foreach (var doc in docsForNetting)
            {
                var nettedItem = new NettedItemData();
                nettedItem.DocumentNo = doc.DocumentNo;

                var statementRequest = GetBankStatementRequest(doc);
                nettedItem.BankStatementNo = statementRequest.Items.Single().BankStatementItemNo;

                var statementResponse = _bankStatementService.Create(statementRequest);
                nettedItem.BankStatementId = statementResponse.CreatedBankStatementItems.Single();

                if (!doc.IsFutureContract)
                {
                    var allocationRequest = new AllocateRequest
                    {
                        BankStatementItemId = nettedItem.BankStatementId,
                        ReferenceNo = doc.DocumentNo,
                        PayAmount = AmountsHelper.RoundCurrency(doc.NettedAmountInDocCurrency)
                    };

                    var allocationResponse = await _allocationService.Allocate(allocationRequest);
                    nettedItem.AllocatedAmount = allocationResponse.AllocatedAmount;
                }

                response.NettedItems.Add(nettedItem);
            }

            return response;
        }

        private CreateRequest GetBankStatementRequest(DocumentForNetting doc)
        {
            var statementRequest = new CreateRequest
            {
                Items = new List<BankStatementItemAppRGSL>()
            };

            var statementItem = new BankStatementItemAppRGSL
            {
                BankStatementItemNo = $"{doc.PaymentOrderNo}_{doc.DocumentNo}",
                IncomeSourceId = 0,
                Direction = BankStatementItemDirectionRGSL.Incoming,
                PaymentDescription = $"Взаимозачет РНВ: {doc.PaymentOrderNo} Документ: {doc.DocumentNo}",
                PaymentDate = doc.PaymentOrderDate,
                TransactionDate = doc.PaymentOrderDate,
                IsRegistry = false,
                IsAcquiring = false,
                NonAcceptance = false,
                ToleranceType = BankStatementItemToleranceType.Standard,
                DebtorName = doc.RecipientFullName,
                DebtorBankAccountNo = doc.PayerBankAccountNo,
                PaymentSourceId = BankStatementItemPaymentSourceIdRGSL.PaymentOrder,
                Fake = true,
            };

            if (doc.IsFutureContract)
            {
                statementItem.CurrencyCode = doc.PaymentCurrency;
                statementItem.Amount = doc.NettedAmount;
            }
            else
            {
                statementItem.CurrencyCode = doc.DocumentCurrency;
                statementItem.Amount = doc.NettedAmountInDocCurrency;
            }

            statementRequest.Items.Add(statementItem);
            return statementRequest;
        }
    }
}
