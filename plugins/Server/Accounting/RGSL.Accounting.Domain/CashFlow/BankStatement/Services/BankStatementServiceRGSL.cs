using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;
using Adacta.AdInsure.Framework.Core.Events;
using Adacta.AdInsure.Framework.Core.Exceptions;
using Adacta.AdInsure.Framework.Core.Transactions;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Requests;
using Adacta.AdInsure.RGSL.Accounting.Domain.Journal.Interfaces;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Services
{
    public class BankStatementServiceRGSL : IBankStatementServiceRGSL
    {
        private readonly IBankStatementRepositoryRGSL _bankStatementRepositoryRGSL;
        private readonly IAllocationRepositoryRGSL _allocationRepositoryRGSL;
        private readonly IGeneralJournalServiceRgsl _generalJournalServiceRgsl;
        private readonly IPaymentReferencesService _paymentReferencesService;
        private readonly IDomainEventDispatcher _domainEventDispatcher;

        public BankStatementServiceRGSL(
            IBankStatementRepositoryRGSL bankStatementRepositoryRGSL,
            IAllocationRepositoryRGSL allocationRepositoryRGSL,
            IGeneralJournalServiceRgsl generalJournalServiceRgsl,
            IPaymentReferencesService paymentReferencesService,
            IDomainEventDispatcher domainEventDispatcher)
        {
            _bankStatementRepositoryRGSL = bankStatementRepositoryRGSL;
            _allocationRepositoryRGSL = allocationRepositoryRGSL;
            _generalJournalServiceRgsl = generalJournalServiceRgsl;
            _paymentReferencesService = paymentReferencesService;
            _domainEventDispatcher = domainEventDispatcher;
        }

        [Transaction]
        public CreateResponse Create(CreateRequest request)
        {
            CreateResponse response = new CreateResponse();
            var businessEventId = Guid.NewGuid();

            foreach (var item in request.Items)
            {
                if (item.PaymentSourceId == BankStatementItemPaymentSourceIdRGSL.None) throw new BusinessException("PaymentSourceId is invalid");
                if (item.Amount <= 0m) throw new BusinessException("The amount must be positive");
                if (!item.Fake && item.IncomeSourceId == 0) throw new InvalidOperationException("IncomeSourceId is empty");

                var bsi = new BankStatementItemRGSL();
                bsi.ImportDocumentId = item.ImportDocumentId;
                bsi.RegistryReferenceNo = item.RegistryReferenceNo;
                bsi.AggregatedPaymentRegisterId = item.AggregatedPaymentRegisterId;
                bsi.BankStatementItemNo = item.BankStatementItemNo;
                bsi.IncomeSourceId = item.IncomeSourceId;
                bsi.Direction = item.Direction;
                bsi.PaymentDescription = item.PaymentDescription;
                bsi.OriginalPaymentDescription = item.OriginalPaymentDescription ?? item.PaymentDescription;
                bsi.CurrencyCode = item.CurrencyCode;
                bsi.StatusId = BankStatementItemStatusRGSL.NotAllocated;
                bsi.Amount = item.Amount;
                bsi.OpenAmount = item.Amount;
                bsi.PaymentDate = item.PaymentDate;
                bsi.CreateDate = DateTime.UtcNow;
                bsi.TransactionDate = item.TransactionDate;
                bsi.IsRegistry = item.IsRegistry;
                bsi.IsAcquiring = item.IsAcquiring;
                bsi.NonAcceptance = item.NonAcceptance;
                bsi.ToleranceType = item.ToleranceType;
                bsi.DebtorName = item.DebtorName;
                bsi.DebtorType = item.DebtorType;
                bsi.DebtorBankAccountNo = item.DebtorBankAccountNo;
                bsi.CreditorName = item.CreditorName;
                bsi.CreditorType = item.CreditorType;
                bsi.CreditorBankAccountNo = item.CreditorBankAccountNo;
                bsi.Segment = item.Segment;
                bsi.PaymentSourceId = item.PaymentSourceId;
                bsi.Fake = item.Fake;
                bsi.IsMigrated = item.IsMigrated;
                bsi.RgslGuid = item.RgslGuid;
                bsi.RgslDocumentTypeId = item.RgslDocumentTypeId;
                bsi.RgslDocumentDate = item.RgslDocumentDate;

                var prevBsi = bsi.RgslGuid.HasValue ? _bankStatementRepositoryRGSL.GetBankStatementItems(new GetBankStatementItemRequest { RgslGuid = bsi.RgslGuid.Value }).FirstOrDefault() : null;
                if (prevBsi != null && prevBsi.StatusId == BankStatementItemStatusRGSL.NotAllocated)
                {
                    bsi.BankStatementItemId = prevBsi.BankStatementItemId.Value;
                    _bankStatementRepositoryRGSL.UpdateBankStatementItem(bsi);
                    _bankStatementRepositoryRGSL.InsertBankStatementItemHistory(new BankStatementItemHistory
                    {
                        BankStatementItemId = bsi.BankStatementItemId.Value,
                        StatusIdFrom = prevBsi.StatusId,
                        StatusIdTo = bsi.StatusId,
                        PaymentDescriptionFrom = prevBsi.PaymentDescription,
                        PaymentDescriptionTo = item.PaymentDescription,
                    });
                    CreatePostBSITransaction(prevBsi, businessEventId, true, true);
                    CreatePostBSITransaction(bsi, businessEventId, false, true);
                }
                else
                {
                    _bankStatementRepositoryRGSL.CreateBankStatementItem(bsi);
                    _bankStatementRepositoryRGSL.InsertBankStatementItemHistory(new BankStatementItemHistory
                    {
                        BankStatementItemId = bsi.BankStatementItemId.Value,
                        StatusIdFrom = bsi.StatusId,
                        StatusIdTo = bsi.StatusId,
                        PaymentDescriptionFrom = item.PaymentDescription,
                        PaymentDescriptionTo = item.PaymentDescription,
                    });
                    CreatePostBSITransaction(bsi, businessEventId, false, false);
                }

                _paymentReferencesService.ParseAndInsertPaymentReferences(bsi);

                response.CreatedBankStatementItems.Add(bsi.BankStatementItemId.Value);
            }

            _domainEventDispatcher.Raise(new IndexPaymentEvent(response.CreatedBankStatementItems));

            return response;
        }

        [Transaction]
        public RefreshResponse RefreshStatusAndOpenAmount(long bankStatementItemId)
        {
            var bsi = _bankStatementRepositoryRGSL.GetBankStatementItems(new GetBankStatementItemRequest { BankStatementItemId = bankStatementItemId }).Single();
            var payAmount = _allocationRepositoryRGSL.GetAllocationPayAmount(bankStatementItemId);

            var openAmount = bsi.Amount - payAmount;

            if (openAmount < 0 || openAmount > bsi.Amount)
            {
                throw new InvalidOperationException(string.Format(CultureInfo.InvariantCulture, "Invalid open amount: {0}", openAmount));
            }

            var oldStatusId = bsi.StatusId;
            var newStatusId = payAmount == 0m ? BankStatementItemStatusRGSL.NotAllocated : (openAmount == 0m ? BankStatementItemStatusRGSL.Allocated : BankStatementItemStatusRGSL.PartiallyAllocated);
            _bankStatementRepositoryRGSL.SetStatusAndOpenAmount(new SetStatusRequest()
            {
                BankStatementItemId = bsi.BankStatementItemId.Value,
                OpenAmount = openAmount,
                NewStatus = newStatusId,
            });
            _bankStatementRepositoryRGSL.InsertBankStatementItemHistory(new BankStatementItemHistory
            {
                BankStatementItemId = bsi.BankStatementItemId.Value,
                StatusIdFrom = oldStatusId,
                StatusIdTo = newStatusId,
                PaymentDescriptionFrom = bsi.PaymentDescription,
                PaymentDescriptionTo = bsi.PaymentDescription,
            });

            _domainEventDispatcher.Raise(new IndexPaymentEvent(bankStatementItemId));

            return new RefreshResponse();
        }

        [Transaction]
        public void RefreshIsRegistry(long bankStatementItemId)
        {
            var bsi = _bankStatementRepositoryRGSL.GetBankStatementItems(new GetBankStatementItemRequest { BankStatementItemId = bankStatementItemId }).Single();
            var masks = _bankStatementRepositoryRGSL.GetAllRegistryMasks();

            bool isRegistry = GetIsRegistry(bsi, masks);
            if (isRegistry != bsi.IsRegistry)
            {
                _bankStatementRepositoryRGSL.SetIsRegistry(bankStatementItemId, isRegistry);
            }

            _domainEventDispatcher.Raise(new IndexPaymentEvent(bankStatementItemId));
        }

        [Transaction]
        public void SetStatus(long bankStatementItemId, BankStatementItemStatusRGSL newStatusId, Guid businessEventId)
        {
            var allowedStatuses = new List<BankStatementItemStatusRGSL>
            {
                BankStatementItemStatusRGSL.Cancelled,
                BankStatementItemStatusRGSL.NotAllocated,
                BankStatementItemStatusRGSL.AllocatedToRegistry,
            };

            var bsi = _bankStatementRepositoryRGSL.GetBankStatementItems(new GetBankStatementItemRequest { BankStatementItemId = bankStatementItemId }).Single();
            var oldStatusId = bsi.StatusId;

            if (!allowedStatuses.Contains(newStatusId) || oldStatusId == newStatusId)
            {
                throw new InvalidOperationException("Not allowed status: " + newStatusId.ToString());
            }

            if (oldStatusId == BankStatementItemStatusRGSL.Allocated || oldStatusId == BankStatementItemStatusRGSL.PartiallyAllocated)
            {
                throw new InvalidOperationException("Payment must be deallocated");
            }

            _bankStatementRepositoryRGSL.SetStatus(new SetStatusRequest()
            {
                BankStatementItemId = bsi.BankStatementItemId.Value,
                NewStatus = newStatusId,
            });
            _bankStatementRepositoryRGSL.InsertBankStatementItemHistory(new BankStatementItemHistory
            {
                BankStatementItemId = bsi.BankStatementItemId.Value,
                StatusIdFrom = oldStatusId,
                StatusIdTo = newStatusId,
                PaymentDescriptionFrom = bsi.PaymentDescription,
                PaymentDescriptionTo = bsi.PaymentDescription,
            });

            if (oldStatusId == BankStatementItemStatusRGSL.NotAllocated && newStatusId == BankStatementItemStatusRGSL.Cancelled)
            {
                CreatePostBSITransaction(bsi, businessEventId, true, false);
            }

            if (oldStatusId == BankStatementItemStatusRGSL.Cancelled && newStatusId == BankStatementItemStatusRGSL.NotAllocated)
            {
                CreatePostBSITransaction(bsi, businessEventId, false, false);
            }

            _domainEventDispatcher.Raise(new IndexPaymentEvent(bankStatementItemId));
        }

        [Transaction]
        public void UpdatePaymentDescription(IList<long> bankStatementItemIds, string newPaymentDescription)
        {
            var bankStatementItems = _bankStatementRepositoryRGSL.GetBankStatementItems(new GetBankStatementItemRequest { BankStatementItemIds = bankStatementItemIds });
            var allowedStatuses = new[] { BankStatementItemStatusRGSL.NotAllocated, BankStatementItemStatusRGSL.PartiallyAllocated };
            if (bankStatementItems.Any(_ => !allowedStatuses.Contains(_.StatusId)))
            {
                throw new InvalidOperationException("Can not change description of payment without open amount");
            }
            foreach (var bsi in bankStatementItems)
            {
                var oldPaymentDescription = bsi.PaymentDescription;

                _bankStatementRepositoryRGSL.UpdatePaymentDescription(bsi, newPaymentDescription);
                _bankStatementRepositoryRGSL.InsertBankStatementItemHistory(new BankStatementItemHistory
                {
                    BankStatementItemId = bsi.BankStatementItemId.Value,
                    StatusIdFrom = bsi.StatusId,
                    StatusIdTo = bsi.StatusId,
                    PaymentDescriptionFrom = oldPaymentDescription,
                    PaymentDescriptionTo = newPaymentDescription,
                });

                _paymentReferencesService.ParseAndInsertPaymentReferences(bsi);
            }

            _domainEventDispatcher.Raise(new IndexPaymentEvent(bankStatementItemIds));
        }

        [Transaction]
        public void MarkPaymentToReload(Guid rgslGuid)
        {
            _bankStatementRepositoryRGSL.MarkPaymentToReload(rgslGuid);
        }

        private void CreatePostBSITransaction(BankStatementItemRGSL bsi, Guid businessEventId, bool isNegativeAmount, bool forcePost)
        {
            if (bsi.Direction == BankStatementItemDirectionRGSL.Outgoing)
            {
                return;
            }

            if (!forcePost && bsi.PaymentSourceId == BankStatementItemPaymentSourceIdRGSL.PaymentOrder && !isNegativeAmount)
            {
                //Transactions for small payments was already generated in scope of a big payment.
                return;
            }

            if (!forcePost && !string.IsNullOrEmpty(bsi.RegistryReferenceNo))
            {
                // do not post transactions for small payments
                return;
            }

            decimal amount = isNegativeAmount ? -bsi.Amount : bsi.Amount;
            _generalJournalServiceRgsl.CreatePostBSITransaction(bsi.BankStatementItemId.Value, bsi.BankStatementItemNo, bsi.TransactionDate, null, amount, bsi.CurrencyCode, businessEventId);
        }

        [Transaction]
        public void SetRegistryMaskSettings(SetRegistryMaskSettingsRequest request)
        {
            _bankStatementRepositoryRGSL.SetRegistryMaskSettings(request);
        }


        private static bool GetIsRegistry(BankStatementItemRGSL bsi, List<RegistryMaskSettingsItem> masks)
        {
            bool isRegistry = false;

            foreach (var mask in masks)
            {
                bool match = true;

                if (!string.IsNullOrWhiteSpace(mask.AccountNumber))
                {
                    if (!Regex.IsMatch(bsi.DebtorBankAccountNo, mask.AccountNumber, RegexOptions.IgnoreCase))
                    {
                        match = false;
                    }
                }

                if (!string.IsNullOrWhiteSpace(mask.PaymentDescription))
                {
                    if (!Regex.IsMatch(bsi.PaymentDescription, mask.PaymentDescription, RegexOptions.IgnoreCase))
                    {
                        match = false;
                    }
                }

                if (match)
                {
                    isRegistry = true;
                    break;
                }
            }

            return isRegistry;
        }
    }
}
