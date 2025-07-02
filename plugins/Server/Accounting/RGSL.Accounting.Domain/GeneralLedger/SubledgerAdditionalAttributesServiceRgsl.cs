using Adacta.AdInsure.Accounting.Domain.GeneralLedger;
using Adacta.AdInsure.Accounting.Domain.GeneralLedger.Interfaces;
using Adacta.AdInsure.Accounting.Domain.GeneralLedger.Services;
using Adacta.AdInsure.Framework.Core.Exceptions;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Subledger.Requests;
using Adacta.AdInsure.RGSL.Accounting.Domain.Constants;
using Adacta.AdInsure.RGSL.Accounting.Domain.GeneralLedger.DTO;
using Adacta.AdInsure.RGSL.Accounting.Domain.GeneralLedger.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.GeneralLedger.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.Journal.Attributes;
using Adacta.AdInsure.RGSL.Accounting.Domain.Journal.Posting;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.GeneralLedger
{
    public class SubledgerAdditionalAttributesServiceRgsl : ISubledgerAdditionalAttributesServiceRgsl
    {
        private const string CONST_1 = "1";

        private readonly SubledgerAdditionalAttributesService _subledgerAddAttService;
        private readonly IDimensionsRepository _dimensionsRepository;
        private readonly ILedgerAccountService _ledgerAccountService;
        private readonly IGLDimensionsService _glDimensionsService;

        /// <summary>
        /// Constructor for SubledgerEntryMappingService.
        /// </summary>
        /// <param name="accountingSettings"></param>
        public SubledgerAdditionalAttributesServiceRgsl(
            SubledgerAdditionalAttributesService subledgerAddAttService,
            IDimensionsRepository dimensionsRepository,
            ILedgerAccountService ledgerAccountService,
            IGLDimensionsService glDimensionsService)
        {
            _subledgerAddAttService = subledgerAddAttService;
            _dimensionsRepository = dimensionsRepository;
            _ledgerAccountService = ledgerAccountService;
            _glDimensionsService = glDimensionsService;
        }

        public GLAdditionalAttrsRgsl FilterLedgerAdditionalAttributesRgsl(GLAdditionalAttrsRgsl ledgerAttrs, long? attributeSetId)
        {
            if (!attributeSetId.HasValue && ledgerAttrs.SapGlAccountId.HasValue)
            {
                //TODO: Validation: Get attribute set from database from SAP GL Account which should be set
                SapGlAccountDTO sapGlAccount = _dimensionsRepository.GetSapGlAccountById(ledgerAttrs.SapGlAccountId.Value);
                attributeSetId = sapGlAccount.AttributeSetId;
            }

            return (GLAdditionalAttrsRgsl) _subledgerAddAttService.FilterLedgerAdditionalAttributes(ledgerAttrs, attributeSetId);
        }

        /// <summary>
        /// Create Ledger additional attribute object and set all common values with JR additional attributes.
        /// </summary>
        /// <param name="jrAddAttr">JR add attr</param>
        /// <returns>GL add attr</returns>
        public GLAdditionalAttrsRgsl CreateGLAdditionalAttributes(JRAdditionalAttrsRgsl rgslAttrs, PostTransactionJournal journal, bool isDebit, SubledgerEntry entry)
        {
            if (rgslAttrs == null)
            {
                return new GLAdditionalAttrsRgsl();
            }

            GLAdditionalAttrsRgsl attr = MapJRAttributesToGLAttributes(rgslAttrs);

            ValidateInputAttributes(rgslAttrs);

            bool isPreviousPeriod = AccountingHelper.GetPreviousPeriod(journal, entry.PostDate);
            string glAccountNo = _ledgerAccountService.Get(entry.LedgerAccountId).AccountNo;

            var ofr = _dimensionsRepository.GetOfr(entry.LedgerAccountId, isPreviousPeriod, journal.DocumentTypeId, rgslAttrs.DocCurrencyCode);
            attr.OfrId = ofr?.OfrId;

            SapGlAccountDTO sapGlAccount = GetSapGlAccountId(entry.LedgerAccountId, attr.OfrId, isPreviousPeriod, rgslAttrs.PersonTypeId, rgslAttrs.AgentType);
            attr.SapGlAccountId = sapGlAccount?.SapGlAccountId;

            TransactionTypeDTO transactionType = GetTransactionTypeProperties(rgslAttrs.TransactionTypeId.Value);
            attr.LocalDimension3Id = transactionType.LocalDimension3Id;
            attr.TransactionDocumentTypeId = transactionType.TransactionDocumentTypeId;

            attr.BalanceUnit = BalanceUnitConst.RGSL;
            attr.TransactionCode2 = isDebit ? TransactionCode2Const.Debit : TransactionCode2Const.Credit;
            attr.TransactionCode1 = GetTransactionCode1(rgslAttrs);
            attr.XRef2 = GetXRef2(glAccountNo, ofr?.OfrCode);
            attr.PersonalAccountNumber = GetPersonalAccountNumber(attr, sapGlAccount, glAccountNo, entry.SourceCurrencyCode, ofr?.OfrCode);
            attr.CedentsCountry = CedentsCountryConst.RU;
            attr.LocalDimension2 = CONST_1;
            attr.ProposedPostDate = journal.ProposedPostingDate;

            ValidateGLAttributes(attr);

            return attr;
        }

        private static GLAdditionalAttrsRgsl MapJRAttributesToGLAttributes(JRAdditionalAttrsRgsl journalAttrs)
        {
            GLAdditionalAttrsRgsl attr = new GLAdditionalAttrsRgsl();
            attr.TransactionDefinitionNo = journalAttrs.TransactionDefinitionNo;
            attr.BalanceUnit = journalAttrs.BalanceUnit;
            attr.TransactionCode1 = journalAttrs.TransactionCode1;
            attr.TransactionCode2 = journalAttrs.TransactionCode2;
            attr.TransactionTypeId = journalAttrs.TransactionTypeId;
            attr.OfrId = journalAttrs.OfrId;
            attr.Register = journalAttrs.Register;
            attr.SapGlAccountId = journalAttrs.SapGlAccountId;
            attr.CostCenter = journalAttrs.CostCenter;
            attr.TradingPartner = journalAttrs.TradingPartner;
            attr.DocumentNo = journalAttrs.DocumentNo;
            attr.AAOrderNo = journalAttrs.AAOrderNo;
            attr.XRef2 = journalAttrs.XRef2;
            attr.PersonalAccountNumber = journalAttrs.PersonalAccountNumber;
            attr.BusinessLine = journalAttrs.BusinessLine;
            attr.CedentsCountry = journalAttrs.CedentsCountry;
            attr.LocalDimension1 = journalAttrs.LocalDimension1;
            attr.LocalDimension2 = journalAttrs.LocalDimension2;
            attr.LocalDimension3Id = journalAttrs.LocalDimension3Id;
            attr.PartyCode = journalAttrs.PartyCode;
            attr.TransactionDocumentTypeId = journalAttrs.TransactionDocumentTypeId;
            attr.DateToCheckPrevPeriod = journalAttrs.DateToCheckPrevPeriod;
            attr.CancelledDocumentNo = journalAttrs.CancelledDocumentNo;
            attr.CommissionRate = journalAttrs.CommissionRate;
            attr.BankStatementItemId = journalAttrs.BankStatementItemId;
            attr.CommissionActId = journalAttrs.CommissionActId;
            attr.ContractNumber = journalAttrs.ContractNumber;
            attr.PaymentOrderNumber = journalAttrs.PaymentOrderNumber;

            return attr;
        }

        private static int? GetTransactionCode1(JRAdditionalAttrsRgsl journalAttrs)
        {
            int? transCode1 = null;

            if (journalAttrs.IsRevaluation.HasValue)
            {
                transCode1 = journalAttrs.IsRevaluation.Value ? TransactionCode1Const.FBB1 : TransactionCode1Const.FB01;
            }

            return transCode1;
        }

        private SapGlAccountDTO GetSapGlAccountId(long glAccountId, int? ofrId, bool isPreviousPeriod, int? personTypeId, string agentType)
        {
            SapGlAccountDTO sapGlAccount = _dimensionsRepository.GetSapGlAccount(glAccountId, ofrId, isPreviousPeriod, personTypeId, agentType);

            _ = sapGlAccount ?? throw new BusinessException($"SAP GL Account was not found. (glAccountId: {glAccountId}, ofrId: {ofrId}, isPreviousPeriod: {isPreviousPeriod}, personTypeId: {personTypeId}, agentType: {agentType})");

            return sapGlAccount;
        }

        private TransactionTypeDTO GetTransactionTypeProperties(int transactionTypeId)
        {
            TransactionTypeDTO transactionType = _dimensionsRepository.GetTransactionTypeById(transactionTypeId);
            return transactionType;
        }

        private static string GetXRef2(string glAccountNo, string ofrCode)
        {
            string xRef2 = $"{glAccountNo}.{ofrCode ?? "00000"}";
            return xRef2;
        }

        private string GetPersonalAccountNumber(GLAdditionalAttrsRgsl glAttrs, SapGlAccountDTO sapGlAccount, string glAccountNo, string currencyCode, string ofrCode)
        {
            string PAN = _glDimensionsService.GetPersonalAccountNumber(glAttrs, sapGlAccount, glAccountNo, currencyCode, ofrCode);
            return PAN;
        }

        private static void ValidateInputAttributes(JRAdditionalAttrsRgsl journalAttrs)
        {
            if (!journalAttrs.IsRevaluation.HasValue)
            {
                throw new BusinessException($"Attribute IsRevaluation should be provided in journal.");
            }

            if (!journalAttrs.TransactionTypeId.HasValue)
            {
                throw new BusinessException($"Attribute TransactionTypeId should be provided in journal.");
            }
        }

        private static void ValidateGLAttributes(GLAdditionalAttrsRgsl glAttrs)
        {
            if (glAttrs.XRef2.Length != 11)
            {
                throw new BusinessException($"XRef2 {glAttrs.XRef2} length should be 11.");
            }

            if (!glAttrs.SapGlAccountId.HasValue)
            {
                throw new BusinessException($"SAP GL Account should not be empty.");
            }
        }

    }
}
