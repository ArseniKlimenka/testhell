using Adacta.AdInsure.RGSL.Accounting.API.Public.CashFlow.BankStatement;
using Adacta.AdInsure.RGSL.Accounting.API.Public.CashFlow.BankStatement.Services;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Interfaces;
using System.Linq;

namespace Adacta.AdInsure.RGSL.Accounting.ApplicationServices.Public.CashFlow.BankStatement.Services
{
    class BankStatementServicePub : IBankStatementServicePub
    {
        private readonly IBankStatementServiceRGSL _bankStatementServiceRGSL;

        public BankStatementServicePub(
            IBankStatementServiceRGSL bankStatementServiceRGSL)
        {
            _bankStatementServiceRGSL = bankStatementServiceRGSL;
        }

        public CreateResponse Create(CreateBsiPubRequest request)
        {
            var items = request
                .Items
                .Select(_ =>
                {
                    return new BankStatementItemAppRGSL
                    {
                        BankStatementItemNo = _.BankStatementItemNo,
                        IncomeSourceId = _.IncomeSourceId,
                        Direction = _.Direction,
                        PaymentDescription = GetValueOrNull(_.PaymentDescription),
                        OriginalPaymentDescription = GetValueOrNull(_.OriginalPaymentDescription),
                        CurrencyCode = _.CurrencyCode,
                        Amount = _.Amount,
                        PaymentDate = _.PaymentDate,
                        TransactionDate = _.TransactionDate,
                        IsRegistry = _.IsRegistry,
                        IsAcquiring = _.IsAcquiring,
                        NonAcceptance = _.NonAcceptance,
                        ToleranceType = _.ToleranceType,
                        DebtorName = GetValueOrNull(_.DebtorName),
                        DebtorType = GetValueOrNull(_.DebtorType),
                        DebtorBankAccountNo = GetValueOrNull(_.DebtorBankAccountNo),
                        CreditorName = GetValueOrNull(_.CreditorName),
                        CreditorType = GetValueOrNull(_.CreditorType),
                        CreditorBankAccountNo = GetValueOrNull(_.CreditorBankAccountNo),
                        Segment = GetValueOrNull(_.Segment),
                        PaymentSourceId = _.PaymentSourceId,
                        Fake = _.PaymentSourceId == BankStatementItemPaymentSourceIdRGSL.PaymentOrder,
                        IsMigrated = _.IsMigrated,
                        RgslGuid = _.RgslGuid,
                        RgslDocumentTypeId = _.RgslDocumentTypeId,
                        RgslDocumentDate = _.RgslDocumentDate,
                    };
                })
                .ToList();


            return _bankStatementServiceRGSL.Create(new CreateRequest { Items = items });
        }

        private static string GetValueOrNull(string value) => string.IsNullOrWhiteSpace(value) ? null : value;
    }
}
