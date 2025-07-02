using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Adacta.AdInsure.Framework.Core.ApplicationContext;
using Adacta.AdInsure.Framework.Core.Common;
using Adacta.AdInsure.Framework.Core.DataSource.Services;
using Adacta.AdInsure.Framework.Core.Logging;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement;
using Adacta.AdInsure.RGSL.Common.API.Constants;
using Adacta.AdInsure.RGSL.Common.API.Shared.Services;
using Adacta.AdInsure.RGSL.Common.Domain.Integration.Settings;
using Adacta.AdInsure.RGSL.PAS.API.Integration.Contracts.DTO;
using Adacta.AdInsure.RGSL.PAS.API.Integration.Contracts.Services;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Adacta.AdInsure.RGSL.PAS.ApplicationServices.Integration.Contracts.Services
{
    public class GetContractDataCustomService : IGetContractDataCustomService
    {
        private readonly ICommonIntegrationSettings _settings;
        private readonly IDataSourceService _dataSourceService;
        private readonly ITranslationServiceRGSL _translationServiceRGSL;
        private readonly Lazy<ILogger> _logger = new Lazy<ILogger>(() => LogManagerAccessor.GetLogger(LogConstants.CustomService));

        public GetContractDataCustomService(
            IDataSourceService dataSourceService,
            ITranslationServiceRGSL translationServiceRGSL,
            ICommonIntegrationSettings settings)
        {
            _dataSourceService = dataSourceService;
            _translationServiceRGSL = translationServiceRGSL;
            _settings = settings;
        }

        public async Task<object> GetContractData(ContractDataCustomRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.PolicyHolderPartyCode))
            {
                var error = new ContractDataCustomErrorResponse("E: Пожалуйста, ограничьте выбор. Необходимо указать номер клиента.");

                return JsonConvert.SerializeObject(error, Formatting.Indented);
            }

            var items = new List<ContractDataCustomResponse>();

            var criteria = new List<KeyValuePair<string, JToken>>();
            var excludedProducts = await GetExcludedProducts();
            var partnerCodes = await GetPartnerCodes();

            criteria.Add(new KeyValuePair<string, JToken>("contractType", "Policy"));
            criteria.Add(new KeyValuePair<string, JToken>(request.GetOnlyInsuredPerson ? "insuredPerson" : "holder", request.PolicyHolderPartyCode));
            if (excludedProducts.Count > 0)
            {
                criteria.Add(new KeyValuePair<string, JToken>("excludedProducts", JArray.FromObject(excludedProducts)));
            }

            if (partnerCodes.Count > 0)
            {
                criteria.Add(new KeyValuePair<string, JToken>("partnerBusinessCodes", JArray.FromObject(partnerCodes)));
            }

            Log("GetContractData criteria {0}", JsonConvert.SerializeObject(criteria));

            var contracts = await ExecuteDataSource("GeneralContractSearchDataSource", criteria);
            Log("GetContractData contracts count {0}", contracts.Count);
            foreach (var contract in contracts)
            {
                var number = contract.SelectToken("resultData").SelectToken("number").ToString();
                //if (number != "97000-99000017") continue;

                Log("Start by ContractNumber {0}", number);

                Log("Start ParseAmendmentData");
                var item = await ParseAmendmentData(number);
                Log("End ParseAmendmentData");

                Log("Start ParsePaymentData");
                item = await ParsePaymentData(item);
                Log("End ParsePaymentData");

                Log("Start ParseInstallmentData");
                item = await ParseInstallmentData(item, request.ReportDate);
                Log("End ParseInstallmentData");

                Log("Start ParseVerificationData");
                item = await ParseVerificationData(item);
                Log("End ParseVerificationData");

                Log("Start cardType");
                try
                {
                    item.CardType = contract?.SelectToken("resultData")?.SelectToken("cardType")?.ToString();
                }
                catch
                {
                    _logger.Value.LogError("error cardType");
                }
                Log("End cardType");

                if (!(request.GetOnlyInsuredPerson && item.PolicyHolderCode == item.InsuredPersonCode))
                {
                    items.Add(item);
                }

                Log("End by ContractNumber {0}", number);
            }

            if (items.Count == 0)
            {
                return "E: Не найдено ни одного договора по указанному клиенту.";
            }

            return items;
        }

        private async Task<IList<JObject>> ExecuteDataSource(string dataSourceName, List<KeyValuePair<string, JToken>> parameters)
        {
            var searchCriteria = new JObject();
            parameters.ForEach(x => searchCriteria.Add(x.Key, x.Value));

            var criteria = new JObject();
            criteria.Add("criteria", searchCriteria);

            var request = new JObject();
            request.Add("data", criteria);

            /*
            -- removed as user should have SMGO role
            var pagingParameters = new List<KeyValuePair<string, JToken>>();
            pagingParameters.Add(new KeyValuePair<string, JToken>("page", 0));
            pagingParameters.Add(new KeyValuePair<string, JToken>("pageSize", 5));
            var pagingObject = new JObject();
            pagingParameters.ForEach(x => pagingObject.Add(x.Key, x.Value));
            request.Add("paging", pagingObject);
            */

            var response = await _dataSourceService.ExecuteAsync(dataSourceName, new JsonObject(request), false);
            return response.ParsedJson["data"].Children<JObject>().ToList();
        }

        private async Task<ContractDataCustomAgentAgreementNumbers> GetAgentAgreementNumbers()
        {
            var result = new List<ContractDataCustomAgentAgreementNumbers>();

            var username = ApplicationContext.OriginatingUser.UserProfile.Username;

            var criteria = new List<KeyValuePair<string, JToken>>();
            criteria.Add(new KeyValuePair<string, JToken>("username", username));

            var numbers = await ExecuteDataSource("PHCustomServiceUsersDataSource", criteria);
            if (numbers.Count == 0)
            {
                throw new AccessViolationException("Доступ запрещён!!!");
            }
            foreach (var number in numbers)
            {
                result.Add(JsonConvert.DeserializeObject<ContractDataCustomAgentAgreementNumbers>(number.SelectToken("resultData").ToString()));
            }

            return result.SingleOrDefault();
        }

        private async Task<List<string>> GetPartnerCodes()
        {
            var result = new List<string>();

            var agentAgreement = await GetAgentAgreementNumbers();
            if (agentAgreement.Numbers.Count == 0)
            {
                return result;
            }

            var criteria = new List<KeyValuePair<string, JToken>>();
            criteria.Add(new KeyValuePair<string, JToken>("agentAgreementNumbers", JArray.FromObject(agentAgreement.Numbers)));
            var partnerCodes = await ExecuteDataSource("PartnerByAgentAgreementNumbersDataSource", criteria);
            foreach (var partnerCode in partnerCodes)
            {
                result.Add(partnerCode.SelectToken("resultData").SelectToken("partnerCode").ToString());
            }

            return result;
        }

        private async Task<List<string>> GetExcludedProducts()
        {
            var result = new List<string>();

            var username = ApplicationContext.OriginatingUser.UserProfile.Username;
            if (username != "API_EFR")
            {
                return result;
            }

            var criteria = new List<KeyValuePair<string, JToken>>();
            var excludedProducts = await ExecuteDataSource("ContractSearchExcludeProductDataSource", criteria);
            foreach (var excludedProduct in excludedProducts)
            {
                result.Add(excludedProduct.SelectToken("resultData.productCode").ToString());
            }

            return result;
        }

        private async Task<ContractDataCustomResponse> ParseAmendmentData(string number)
        {
            var criteria = new List<KeyValuePair<string, JToken>>();
            criteria.Add(new KeyValuePair<string, JToken>("contractNumber", number));

            var amendmentObjects = new List<ContractDataCustomAmendment>();
            var amendments = await ExecuteDataSource("ContractVersionsDataSource", criteria);

            foreach (var amendment in amendments)
            {
                var amendmentObject = JsonConvert.DeserializeObject<ContractDataCustomAmendment>(amendment.SelectToken("resultData").ToString());
                if (amendmentObject.SeqNumber == 0 || (amendmentObject.SeqNumber > 0 && amendmentObject.DocumentStateCode != "Draft"))
                {
                    amendmentObjects.Add(amendmentObject);
                }
            }

            var firstAmendment = amendmentObjects.OrderBy(x => x.SeqNumber).First();
            var lastAmendment = amendmentObjects.Where(x => x.DocumentType != "Расторжение" && x.DocumentType != "ДС на восстановление").OrderBy(x => x.SeqNumber).Last();
            string currencyCode = amendmentObjects.OrderBy(_ => _.SeqNumber).Select(_ => _.Body?.BasicConditions?.Currency?.CurrencyCode).Where(_ => _ != null).Last();
            var result = new ContractDataCustomResponse()
            {
                Id = amendmentObjects.OrderBy(x => x.SeqNumber).Last().ContractId,
                Number = lastAmendment.OriginalContractNumber,
                StartDate = lastAmendment.Body?.PolicyTerms?.StartDate,
                EndDate = lastAmendment.Body?.PolicyTerms?.EndDate,
                InsuranceTerms = getInsuranceTerms(lastAmendment),
                ProductCode = lastAmendment.Body?.MainInsuranceConditions?.InsuranceProduct?.ProductCode,
                ProductDescription = lastAmendment.Body?.MainInsuranceConditions?.InsuranceProduct?.ProductDescription,
                ProductGroupDescription = TranslateProductGroup(lastAmendment.Body?.MainInsuranceConditions?.InsuranceProduct?.ProductGroup),
                ProductStrategyCode = lastAmendment.Body?.BasicInvestmentParameters?.InvestmentStrategy?.InvestmentStrategyCode,
                ProductStrategyDescription = lastAmendment.Body?.BasicInvestmentParameters?.InvestmentStrategy?.InvestmentStrategyDescription,
                CurrencyCode = currencyCode,
                PaymentFrequency = lastAmendment.Body?.BasicConditions?.PaymentFrequency?.PaymentFrequencyDescription,
                StateCode = firstAmendment.DocumentStateCode,
                PolicyHolderCode = lastAmendment.Body?.PolicyHolder?.PartyData?.PartyCode,
                InsuredPersonCode = lastAmendment.Body?.InsuredPerson?.PartyData?.PartyCode,
                PaymentMandatoryAmount = lastAmendment.CommonBody?.Payment?.RequiredInstallment?.Amount,
                InstallmentAmount = lastAmendment.CommonBody?.Payment?.RequiredInstallment?.Amount,
                PaymentExpirationDate = lastAmendment.CommonBody?.PaymentPlan?.Manual?.Min(x => x.DueDate),
            };

            return result;
        }

        private string TranslateProductGroup(string productGroup)
        {
            return _translationServiceRGSL.GetTranslation("DataSourceConfiguration", "GeneralContractSearchDataSource", null, String.Format(CultureInfo.InvariantCulture, "ProductGroup@productGroup@{0}", productGroup));
        }

        private async Task<ContractDataCustomResponse> ParsePaymentData(ContractDataCustomResponse item)
        {
            var paymentSourceIds = new List<int>()
            {
                (int)BankStatementItemPaymentSourceIdRGSL.BankStatement,
                (int)BankStatementItemPaymentSourceIdRGSL.Registry,
                (int)BankStatementItemPaymentSourceIdRGSL.PaymentOrder
            };

            var criteria = new List<KeyValuePair<string, JToken>>();
            criteria.Add(new KeyValuePair<string, JToken>("refDocumentNo", item.Number));
            criteria.Add(new KeyValuePair<string, JToken>("bankStatementItemSourceIds", JArray.FromObject(paymentSourceIds)));

            var paymentsObject = new List<ContractDataCustomPayment>();
            var payments = await ExecuteDataSource("AllocationDataSource", criteria);
            foreach (var payment in payments)
            {
                paymentsObject.Add(JsonConvert.DeserializeObject<ContractDataCustomPayment>(payment.SelectToken("resultData").ToString()));
            }

            item.PaidAmount = paymentsObject.Sum(x => x.DocAmount);
            Log("paidAmount: {0}", item.PaidAmount);

            return item;
        }

        private async Task<ContractDataCustomResponse> ParseInstallmentData(ContractDataCustomResponse item, DateTime? reportDate)
        {
            if (item.StateCode == "Draft")
            {
                return item;
            }

            reportDate ??= DateTime.Now;

            var criteria = new List<KeyValuePair<string, JToken>>();
            criteria.Add(new KeyValuePair<string, JToken>("contractNo", item.Number));

            var installmentsObject = new List<ContractDataCustomInstallment>();
            var installments = await ExecuteDataSource("PaymentPlanCustomDataSource", criteria);
            if (installments.Count == 0)
            {
                return item;
            }

            foreach (var installment in installments)
            {
                var installmentObject = JsonConvert.DeserializeObject<ContractDataCustomInstallment>(installment.SelectToken("resultData").ToString());
                installmentsObject.Add(installmentObject);
            }

            var firstNotPostedDueDate = installmentsObject.Where(_ => !_.IsPosted).MinBy(_ => _.DueDate)?.DueDate;
            var firstNotPostedInstallment = installmentsObject.Where(_ => firstNotPostedDueDate != null && _.DueDate == firstNotPostedDueDate).ToList();
            var firstNotPostedInstallmentAmount = firstNotPostedInstallment.Sum(_ => _.Amount);
            var firstNotPostedInstallmentAmountCorrection = installmentsObject.Sum(_ => _.IsPosted ? _.OpenAmount : -(_.Amount - _.OpenAmount));
            item.InstallmentAmount = firstNotPostedInstallmentAmount + firstNotPostedInstallmentAmountCorrection;

            var firstInstallments = installmentsObject.Where(_ => _.IsFirstInstallment).ToList();
            item.PaymentMandatoryAmount = firstInstallments.Sum(_ => _.Amount);

            item.IsLatePayment = firstNotPostedInstallmentAmountCorrection > 0;

            if (installmentsObject.Count == 0)
            {
                return item;
            }

            // Оплата в рассрочку
            if (item.PaymentFrequency != "Единовременно")
            {
                var paidAmount = installmentsObject.Sum(_ => _.Amount - _.OpenAmount);

                // Есть переплата
                if (firstNotPostedInstallmentAmountCorrection > 0 || paidAmount > 0)
                {
                    Log("Есть переплата");
                    var overPaymentInstallment = installmentsObject
                        .Where(x => x.DueDate > reportDate && !x.IsPosted && x.OpenAmount != x.Amount)
                        .OrderBy(x => x.DueDate)
                        .LastOrDefault();
                    if (overPaymentInstallment is not null)
                    {
                        Log("Найден overPaymentInstallment");
                        item.PaymentExpirationDate = overPaymentInstallment.DueDate;
                    }

                    return item;
                }

                var currentInstallment = installmentsObject
                        .Where(x => x.DueDate <= reportDate)
                        .OrderBy(x => x.DueDate)
                        .LastOrDefault();

                // Оплачено без долгов и переплат
                if (currentInstallment is not null && firstNotPostedInstallmentAmountCorrection == 0)
                {
                    Log("Оплачено без долгов и переплат");
                    var nextInstallment = installmentsObject
                        .Where(x => x.DueDate > currentInstallment.DueDate)
                        .OrderBy(x => x.DueDate)
                        .FirstOrDefault();
                    if (nextInstallment is not null)
                    {
                        Log("Найден nextInstallment");
                        item.PaymentExpirationDate = nextInstallment.DueDate;
                    }

                    return item;
                }

                // Есть просрочка
                var expirationInstallment = installmentsObject
                    .Where(x => x.DueDate <= reportDate && firstNotPostedInstallmentAmountCorrection > 0)
                    .OrderBy(x => x.DueDate)
                    .FirstOrDefault();
                if (expirationInstallment is not null)
                {
                    item.PaymentExpirationDate = expirationInstallment.DueDate;
                }

                return item;
            }

            // Единовременный платёж
            var onceInstallment = installmentsObject.FirstOrDefault();

            // Есть просрочка
            if (firstNotPostedInstallmentAmountCorrection > 0 && onceInstallment.DueDate < reportDate)
            {
                item.PaymentExpirationDate = onceInstallment.DueDate;
            }
            else if (firstNotPostedInstallmentAmountCorrection == 0)
            {
                item.PaymentExpirationDate = null;
            }

            return item;
        }

        private async Task<ContractDataCustomResponse> ParseVerificationData(ContractDataCustomResponse item)
        {
            var verificationsCriteria = new List<KeyValuePair<string, JToken>>();
            verificationsCriteria.Add(new KeyValuePair<string, JToken>("contractNumber", item.Number));

            var verifications = await ExecuteDataSource("AttachmentsVerificationsDataSource", verificationsCriteria);
            var verification = verifications.FirstOrDefault();
            if (verification != null)
            {
                var verificationObject = JsonConvert.DeserializeObject<ContractDataCustomAttachmentVerification>(verification.SelectToken("resultData").ToString());
                item.VerificationState = verificationObject.VerificationState;

                var commentsCriteria = new List<KeyValuePair<string, JToken>>();
                commentsCriteria.Add(new KeyValuePair<string, JToken>("universalDocumentNumber", verificationObject.VerificationDocumentNumber));

                var comments = await ExecuteDataSource("UniversalDocumentDataSource", commentsCriteria);
                var comment = comments.FirstOrDefault();
                if (comment != null)
                {
                    item.AttachmentErrorComment = comment?.SelectToken("resultData")?.SelectToken("body")?.SelectToken("attachmentErrorComment")?.Value<string>();
                }
            }

            return item;
        }

        private static int getInsuranceTerms(ContractDataCustomAmendment amendment)
        {
            var insuranceTerms = amendment.Body?.BasicConditions?.InsuranceTerms ?? 0;
            if (insuranceTerms > 0)
            {
                return insuranceTerms;
            }

            var startDateStr = amendment.Body?.PolicyTerms?.StartDate;
            var endDateStr = amendment.Body?.PolicyTerms?.EndDate;
            if (startDateStr != null && endDateStr != null)
            {
                try
                {
                    var startDate = DateTime.ParseExact(startDateStr, "dd.MM.yyyy", CultureInfo.InvariantCulture);
                    var endDate = DateTime.ParseExact(endDateStr, "dd.MM.yyyy", CultureInfo.InvariantCulture);
                    while (startDate.AddYears(insuranceTerms) < endDate)
                    {
                        insuranceTerms++;
                    }
                }
                catch
                {

                }
            }

            return insuranceTerms;
        }

        private void Log(string logMessage, object logValue = null)
        {
            if (_settings.GetContractDataCustomServiceEnableLogging)
            {
                _logger.Value.LogError(logMessage, logValue);
            }
        }
    }
}
