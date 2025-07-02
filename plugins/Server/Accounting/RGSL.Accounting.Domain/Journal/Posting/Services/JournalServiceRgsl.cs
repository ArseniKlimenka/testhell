using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Adacta.AdInsure.Accounting.Domain.Attributes.Interfaces;
using Adacta.AdInsure.Accounting.Domain.Constants;
using Adacta.AdInsure.Accounting.Domain.GeneralLedger;
using Adacta.AdInsure.Accounting.Domain.GeneralLedger.Repositories;
using Adacta.AdInsure.Accounting.Domain.Periods.Interfaces;
using Adacta.AdInsure.Core.API.Shared.Services;
using Adacta.AdInsure.Framework.Core.Sequence;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Constants;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Periods;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Subledger.Requests;
using Adacta.AdInsure.RGSL.Accounting.Domain.Attributes;
using Adacta.AdInsure.RGSL.Accounting.Domain.GeneralLedger.DTO;
using Adacta.AdInsure.RGSL.Accounting.Domain.GeneralLedger.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.GeneralLedger.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.Journal.Attributes;
using Adacta.AdInsure.RGSL.Accounting.Domain.Journal.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.Periods;
using Adacta.AdInsure.RGSL.Accounting.Domain.Periods.Interfaces;
using Adacta.AdInsure.RGSL.Common.Domain;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.Journal.Posting.Services
{
    public class JournalServiceRgsl : IJournalServiceRgsl
    {
        /// <summary>
        /// Sequence code for numbering posting pairs in subledger
        /// </summary>
        public const string PairNoSequenceCode = "ACC.GL_SUBLEDGER_ENTRY.PAIR_NO";
        private readonly IAccountingPeriodServiceRgsl _accountingPeriodServiceRgsl;
        private readonly IAccountingEventRepository _accountingEventRepository;
        private readonly IDimensionsRepository _dimensionsRepository;
        private readonly ISubledgerEntryRepository _subledgerRepository;
        private readonly IAttributeSetService _attributeSetService;
        private readonly IEntryPeriodService _entryPeriodService;
        private readonly ISequenceGenerator _sequenceGenerator;
        private readonly ILedgerAdditionalAttrsRepository _ledgerAdditionalAttrsRepo;
        private readonly ISubledgerAdditionalAttributesServiceRgsl _attributesMappingServiceRgsl;
        private readonly ICurrencyConverterService _currencyConverter;

        public JournalServiceRgsl(
            IAccountingPeriodServiceRgsl accountingPeriodServiceRgsl,
            IAccountingEventRepository accountingEventRepository,
            IDimensionsRepository dimensionsRepository,
            ISubledgerEntryRepository subledgerRepository,
            IAttributeSetService attributeSetService,
            IEntryPeriodService entryPeriodService,
            ISequenceGenerator sequenceGenerator,
            ILedgerAdditionalAttrsRepository ledgerAdditionalAttrsRepo,
            ISubledgerAdditionalAttributesServiceRgsl attributesMappingServiceRgsl,
            ICurrencyConverterService currencyConverter)
        {
            _accountingPeriodServiceRgsl = accountingPeriodServiceRgsl;
            _accountingEventRepository = accountingEventRepository;
            _dimensionsRepository = dimensionsRepository;
            _subledgerRepository = subledgerRepository;
            _attributeSetService = attributeSetService;
            _entryPeriodService = entryPeriodService;
            _sequenceGenerator = sequenceGenerator;
            _ledgerAdditionalAttrsRepo = ledgerAdditionalAttrsRepo;
            _attributesMappingServiceRgsl = attributesMappingServiceRgsl;
            _currencyConverter = currencyConverter;
        }

        public void PostTransaction(PostTransactionRequest request)
        {
            Guid businessEventId = request.BusinessEventId ?? Guid.NewGuid();
            var contractNumbers = request.Journals.SelectMany(j => j.Lines.Where(l => !string.IsNullOrEmpty(l.MainContractNumber)).Select(l => l.MainContractNumber)).Distinct().ToList();
            var sourceLineIds = request.Journals.SelectMany(j => j.Lines.Where(l => !string.IsNullOrEmpty(l.SourceLineId)).Select(l => l.SourceLineId)).Distinct().ToList();
            var spCodes = request.Journals.SelectMany(j => j.Lines.Where(l => !string.IsNullOrEmpty(l.Attributes.ServiceProviderCode)).Select(l => l.Attributes.ServiceProviderCode)).Distinct().ToList();
            var partyCodes = request.Journals.SelectMany(j => j.Lines.Where(l => !string.IsNullOrEmpty(l.Attributes.PartyCode)).Select(l => l.Attributes.PartyCode)).Distinct().ToList();
            var bsiIds = request.Journals.SelectMany(j => j.Lines.Where(l => l.Attributes.BankStatementItemId.HasValue).Select(l => l.Attributes.BankStatementItemId.Value)).Distinct().ToList();

            var riskData = _dimensionsRepository.GetRiskDetailsByRiskCode(sourceLineIds);
            var aaData = _dimensionsRepository.GetAADataByContract(contractNumbers);
            var phData = _dimensionsRepository.GetPolicyHolderDimensions(contractNumbers);
            var bsiData = _dimensionsRepository.GetPaymentDimensions(bsiIds);
            var allSpCodes = spCodes
                .Union(aaData.Select(_ => _.AgentServiceProviderCode))
                .Union(phData.Select(_ => _.PartnerCode))
                .Union(phData.Select(_ => _.InitiatorEmployeeCode))
                .Distinct()
                .ToList();

            var spData = _dimensionsRepository.GetServiceProviderDimensions(allSpCodes);

            var allPartyCodes = partyCodes
                .Union(spData.Select(_ => _.PartyCode))
                .Union(phData.Select(_ => _.PartyCode))
                .Distinct()
                .ToList();

            var partyData = _dimensionsRepository.GetPartyDimensionsList(allPartyCodes);

            ThrowIfNotFound("Some Risk data was not found", sourceLineIds.Except(riskData.Select(_ => _.Code)).ToList());
            ThrowIfNotFound("Some AA data was not found", contractNumbers.Except(aaData.Select(_ => _.ContractNumber)).ToList());
            ThrowIfNotFound("Some PH data was not found", contractNumbers.Except(phData.Select(_ => _.ContractNumber)).ToList());
            ThrowIfNotFound("Some SP data was not found", allSpCodes.Except(spData.Select(_ => _.ServiceProviderCode)).ToList());
            ThrowIfNotFound("Some Party data was not found", allPartyCodes.Except(partyData.Select(_ => _.PartyCode)).ToList());
            ThrowIfNotFound("Some Payment data was not found", bsiIds.Except(bsiData.Select(_ => _.BankStatementItemId)).Select(_ => _.ToString(CultureInfo.InvariantCulture)).ToList());

            foreach (var journal in request.Journals)
            {
                var generalLines = new List<GeneralJournalLineRgsl>();

                foreach (var line in journal.Lines)
                {
                    var risk = !string.IsNullOrEmpty(line.SourceLineId) ? riskData.SingleWithMessage(_ => _.Code == line.SourceLineId, "Exactly 1 risk data should be found!", line.SourceLineId) : null;
                    var aa = !string.IsNullOrEmpty(line.MainContractNumber) ? aaData.SingleWithMessage(_ => _.ContractNumber == line.MainContractNumber, "Exactly 1 agent agreement data should be found!", line.MainContractNumber) : null;
                    var ph = !string.IsNullOrEmpty(line.MainContractNumber) ? phData.SingleWithMessage(_ => _.ContractNumber == line.MainContractNumber, "Exactly 1 policy holder data should be found!", line.MainContractNumber) : null;
                    var aaSp = aa != null ? spData.SingleWithMessage(_ => _.ServiceProviderCode == aa.AgentServiceProviderCode, "aaSp not found", aa.AgentServiceProviderCode) : null;
                    var phSp = ph != null ? spData.SingleWithMessage(_ => _.ServiceProviderCode == ph.PartnerCode, "phSp not found", ph.PartnerCode) : null;
                    var aaParty = aa != null ? partyData.SingleWithMessage(_ => _.PartyCode == aaSp.PartyCode, "aaParty not found", aaSp.PartyCode) : null;
                    var phParty = ph != null ? partyData.SingleWithMessage(_ => _.PartyCode == ph.PartyCode, "phParty not found", ph.PartyCode) : null;

                    long? bsiId = line.Attributes.BankStatementItemId;
                    var bsi = bsiId.HasValue ? bsiData.SingleWithMessage(_ => _.BankStatementItemId == bsiId.Value, "Exactly 1 policy holder data should be found!", bsiId.Value.ToString(CultureInfo.InvariantCulture)) : null;

                    string aaOrderNumber = aa?.OrderNumber;
                    string mvzNumber = aa?.MvzNumber;
                    if (phSp?.PartnerManualCode == "247457")
                    {
                        var initiatorSp = spData.SingleWithMessage(_ => _.ServiceProviderCode == ph.InitiatorEmployeeCode, "initiatorSp not found", ph.InitiatorEmployeeCode);
                        if (!string.IsNullOrEmpty(initiatorSp.InitiatorOrderNumber))
                        {
                            aaOrderNumber = initiatorSp.InitiatorOrderNumber;
                        }
                        if (!string.IsNullOrEmpty(initiatorSp.InitiatorKsp))
                        {
                            mvzNumber = initiatorSp.InitiatorKsp;
                        }
                    }

                    var sp = line.Attributes.ServiceProviderCode != null ? spData.SingleWithMessage(_ => _.ServiceProviderCode == line.Attributes.ServiceProviderCode, "sp not found", line.Attributes.ServiceProviderCode) : line.Attributes.UseAgentCodes ? aaSp : phSp;
                    var party = line.Attributes.PartyCode != null ? partyData.SingleWithMessage(_ => _.PartyCode == line.Attributes.PartyCode, "party not found", line.Attributes.PartyCode) : line.Attributes.UseAgentCodes ? aaParty : phParty;

                    decimal? exchangeRate = null;
                    switch (line.Attributes.TransactionTypeId)
                    {
                        case TransactionTypeEnum.PremiumIncrease:
                            exchangeRate = ph?.ExchangeRate;
                            break;
                        case TransactionTypeEnum.InvoicedCommission:
                            exchangeRate = ph?.ExchangeRate;
                            break;
                        case TransactionTypeEnum.PaymentAllocation:
                            if (bsi.PaymentDate.HasValue && journal.CurrencyCode != _currencyConverter.LocalCurrencyCode)
                            {
                                exchangeRate = _currencyConverter.Convert(1, journal.CurrencyCode, _currencyConverter.LocalCurrencyCode, bsi.PaymentDate).Money.Amount;
                            }
                            break;
                    }

                    var jrAttributes = new JRAdditionalAttrsRgsl()
                    {
                        BankStatementItemId = line.Attributes.BankStatementItemId,
                        CommissionActId = line.Attributes.CommissionActId,
                        ContractNumber = line.Attributes.ContractNumber,
                        PaymentOrderNumber = line.Attributes.PaymentOrderNumber,
                        DocCurrencyCode = line.Attributes.DocCurrencyCode,
                        IsRevaluation = line.Attributes.IsRevaluation,
                        TransactionTypeId = (int) line.Attributes.TransactionTypeId,

                        PersonTypeId = PersonTypeConst.GetPersonTypeId(party?.PartyType),
                        AgentType = sp?.PartnerType,
                        BusinessLine = risk?.BusinessLine,
                        CostCenter = mvzNumber,
                        PartyCode = party?.PartyCode,
                        TradingPartner = party?.TradingPartnerCode?.ToString(CultureInfo.InvariantCulture),
                        AAOrderNo = aaOrderNumber,
                        DocumentNo = line.Attributes.DocumentNo,
                        CommissionRate = line.Attributes.CommissionRate,
                        CancelledDocumentNo = line.Attributes.CancelledDocumentNo,
                        DateToCheckPrevPeriod = line.Attributes.DateToCheckPrevPeriod,
                        ExchangeRate = exchangeRate,
                    };

                    AttributeValueSetRgsl avs = null;
                    if (risk != null)
                    {
                        avs = new AttributeValueSetRgsl()
                        {
                            IsLife = risk.IsLife,
                            PurposeId = AvsPurposeConsts.JournalPosting,
                        };
                    }

                    var generalLine = new GeneralJournalLineRgsl()
                    {
                        ContractId = line.ContractNumber,
                        ContractNumber = line.ContractNumber,
                        SourceLineId = line.SourceLineId,
                        MainContractId = line.MainContractNumber,
                        MainContractNo = line.MainContractNumber,
                        AmountBeforeTax = line.Amount,
                        TaxAmount = 0,
                        GrossAmount = line.Amount,
                        CurrencyCode = journal.CurrencyCode,
                        Attributes = jrAttributes,
                        AttributeValueSet = avs,
                    };

                    generalLines.Add(generalLine);
                }

                if (generalLines.Any())
                {
                    var postingResult = PostRgsl(journal, generalLines, businessEventId, journal.DocumentNo);
                }
            }
        }

        private IList<SubledgerEntry> PostRgsl(PostTransactionJournal journal, List<GeneralJournalLineRgsl> generalLines, Guid? businessEventId, string sourceDocumentNo)
        {
            var entryDate = DateTime.Now;
            // Check AccountingPeriod for potential posting blocks
            var periodTypeIds = generalLines.Select(_ => PeriodTypeHelpers.GetPeriodTypeId(_.Attributes));
            PeriodTypeIds periodTypeId = periodTypeIds.Distinct().SingleWithMessage("periodTypeIds must not be differ");
            decimal? manualExchangeRate = generalLines.Select(_ => _.Attributes.ExchangeRate).Distinct().SingleWithMessage("manualExchangeRate must not be differ");
            var determinedPeriodResult = _accountingPeriodServiceRgsl.DeterminePostingDate(null, journal.ProposedPostingDate, periodTypeId);

            // Create new event to link everything together
            var accountingEvent = new Event
            {
                EventTypeId = EventTypeConsts.JournalPosting,
                EventDate = DateTime.Now,
                SourceDocumentNo = sourceDocumentNo,
                PeriodId = determinedPeriodResult.Period.PeriodId,
                PostDate = determinedPeriodResult.PostingDate,
                Note = journal.PostingDescription,
                BusinessEventId = businessEventId,
            };

            long eventId = _accountingEventRepository.Create(accountingEvent);

            CalculateLocalCurrency(journal, generalLines, manualExchangeRate);

            // Map properties and create new sub-ledger entries
            var subledgerEntries = new List<SubledgerEntry>();
            foreach (var line in generalLines)
            {
                subledgerEntries.AddRange(ProcessJournalRgsl(journal, line, eventId, entryDate, determinedPeriodResult.PostingDate));
            }

            return subledgerEntries;
        }

        /// <summary>
        /// Calculate LC amounts on GeneralJournal.
        /// </summary>
        private void CalculateLocalCurrency(PostTransactionJournal journal, List<GeneralJournalLineRgsl> generalLines, decimal? manualExchangeRate)
        {
            if (journal.CurrencyCode == _currencyConverter.LocalCurrencyCode)
            {
                foreach (var line in generalLines)
                {
                    line.GrossAmountLc = line.GrossAmount;
                    line.AmountBeforeTaxLc = line.AmountBeforeTax;
                    line.TaxAmountLc = line.TaxAmount;
                }
            }
            else
            {
                decimal grossAmount = generalLines.Sum(_ => _.GrossAmount);
                decimal grossAmountLc = 0;
                if (manualExchangeRate.HasValue)
                {
                    grossAmountLc = AmountsHelper.RoundCurrency(grossAmount * manualExchangeRate.Value);
                }
                else
                {
                    grossAmountLc = _currencyConverter.Convert(grossAmount, journal.CurrencyCode, _currencyConverter.LocalCurrencyCode, journal.ProposedPostingDate).Money.Amount;
                }

                var proportions = generalLines.Select(_ => _.GrossAmount).ToArray();
                var amounts = AmountsHelper.GetDistribution(proportions, grossAmountLc);
                for (int i = 0; i < generalLines.Count; ++i)
                {
                    var line = generalLines[i];
                    decimal amount = amounts[i];
                    line.GrossAmountLc = amount;
                    line.AmountBeforeTaxLc = amount;
                    line.TaxAmountLc = 0;
                }
            }
        }

        /// <summary>
        /// Processes one base journal unit and creates subledger entries for all steps of the scheme
        /// </summary>
        /// <param name="generalJournal">Instance of journal</param>
        /// <param name="journalLine">Instance of journal line</param>
        /// <returns>List of generated subledger entries</returns>
        private IList<SubledgerEntry> ProcessJournalRgsl(PostTransactionJournal journal, GeneralJournalLineRgsl journalLine, long eventId, DateTime entryDate, DateTime postingDate)
        {
            // get period and post date
            var periodTypeId = PeriodTypeHelpers.GetPeriodTypeId(journalLine.Attributes);
            var determinedPeriodResult = _accountingPeriodServiceRgsl.DeterminePostingDate(postingDate, journal.ProposedPostingDate, periodTypeId);

            var attrs = journalLine.Attributes;
            var baseValueSet = journalLine.AttributeValueSet;
            int transactionTypeId = attrs.TransactionTypeId.Value;
            bool? isLife = baseValueSet?.IsLife;
            bool isPreviousPeriod = AccountingHelper.GetPreviousPeriod(journal, postingDate);

            decimal grossAmountForSign = journalLine.GrossAmount != 0 ? journalLine.GrossAmount : journalLine.GrossAmountLc;

            // Use positive value sign for zero values
            var valueSign = Math.Sign(grossAmountForSign);
            if (valueSign == 0)
            {
                valueSign = 1;
            }

            var transactionDefinition = _dimensionsRepository.GetTransactionDefinition(transactionTypeId, journal.DocumentTypeId, valueSign, isPreviousPeriod, isLife, attrs.AgentType);
            var subledgerEntries = new List<SubledgerEntry>();

            if (transactionDefinition == null)
            {
                return subledgerEntries;
            }

            var transactionDefinitionSteps = _dimensionsRepository.GetTransactionDefinitionSteps(transactionDefinition.TransactionDefinitionNo);

            attrs.TransactionDefinitionNo = transactionDefinition.TransactionDefinitionNo;

            var pairNoLookup = new Dictionary<int, long>();

            foreach (var transactionDefinitionStep in transactionDefinitionSteps)
            {
                _attributeSetService.ValidateSet(transactionDefinitionStep.AttributeSetId, baseValueSet);

                // Map journal and lines (if any) to subledger entry and save
                var entry = new SubledgerEntry
                {
                    SourceDocumentNo = journal.DocumentNo,
                    //BalanceAccountId = journal.BalanceAccountId,

                    MainContractId = journalLine.MainContractId,
                    MainContractNo = journalLine.MainContractNo,
                    ContractId = journalLine.ContractId,
                    ContractNo = journalLine.ContractNumber,
                    SourceLineId = journalLine.SourceLineId,

                    AccountingCurrencyCode = _currencyConverter.LocalCurrencyCode,
                    SourceCurrencyCode = journalLine.CurrencyCode,

                    SourceAmount = transactionDefinitionStep.Sign * journalLine.AmountBeforeTax,
                    AccountingGrossAmount = transactionDefinitionStep.Sign * journalLine.AmountBeforeTaxLc,
                    AccountingAmountBeforeTax = transactionDefinitionStep.Sign * journalLine.AmountBeforeTaxLc,
                };

                // Skip entries with all amounts set to zero
                if (entry.SourceAmount == 0M && entry.AccountingAmountBeforeTax == 0M && entry.AccountingGrossAmount == 0M)
                {
                    continue;
                }

                entry.EventId = eventId;
                entry.PostDate = determinedPeriodResult.PostingDate;
                entry.PeriodId = determinedPeriodResult.Period.PeriodId;

                entry.IsDebit = transactionDefinitionStep.IsDebit;
                entry.LedgerAccountId = transactionDefinitionStep.GlAccountId;
                entry.DocumentTypeId = journal.DocumentTypeId;

                // Renumber pairs so we can identify which two records in subledger form our debit/credit pair
                if (!pairNoLookup.ContainsKey(transactionDefinitionStep.PairNo))
                {
                    pairNoLookup[transactionDefinitionStep.PairNo] = _sequenceGenerator.GetNextValues(PairNoSequenceCode);
                }

                entry.PairNo = (int) pairNoLookup[transactionDefinitionStep.PairNo];
                entry.PairSeqNo = transactionDefinitionStep.PairSeqNo;

                var entryPeriod = _entryPeriodService.GetNextOpen(entryDate);
                if (entryPeriod != null)
                {
                    entry.EntryPeriodId = entryPeriod.EntryPeriodId;
                }

                ProcessAdditionalAttributesRgsl(journal, journalLine, transactionDefinitionStep, entry);

                // Also don't forget to validate our input attribute set against what the subledger wants to have
                _attributeSetService.ValidateSet(transactionDefinitionStep.AttributeSetId, baseValueSet);
                var avs = _attributeSetService.ReconstructIfRequired(transactionDefinitionStep.AttributeSetId, baseValueSet, AvsPurposeConsts.DimensionsForSubledger);
                entry.AttributeValueSetId = avs?.Id;

                _subledgerRepository.Create(entry);

                subledgerEntries.Add(entry);
            }

            return subledgerEntries;
        }

        private void ProcessAdditionalAttributesRgsl(PostTransactionJournal journal, GeneralJournalLineRgsl journalLine, TransactionDefinitionStep scheme, SubledgerEntry entry)
        {
            var journalAttrs = journalLine.Attributes;
            if (journalAttrs == null)
            {
                return;
            }

            long? attributeSetId = null;

            // Check for explicit posting so we can filter additional attributes
            if (journalLine != null && journalLine.AdditionalAttrSetId != null)
            {
                attributeSetId = journalLine.AdditionalAttrSetId;
            }

            var ledgerAttrs = _attributesMappingServiceRgsl.CreateGLAdditionalAttributes(journalAttrs, journal, scheme.IsDebit, entry);
            ledgerAttrs = _attributesMappingServiceRgsl.FilterLedgerAdditionalAttributesRgsl(ledgerAttrs, attributeSetId);
            if (ledgerAttrs != null)
            {
                entry.AttributesId = _ledgerAdditionalAttrsRepo.Create(ledgerAttrs);
            }
        }

        private static void ThrowIfNotFound(string errorText, List<string> list)
        {
            if (list.Count != 0)
            {
                throw new KeyNotFoundException(errorText + ". Values (" + string.Join(", ", list) + ")");
            }

        }
    }
}
