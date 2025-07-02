namespace Adacta.AdInsure.RGSL.PAS.Infrastructure.Contract.Queries
{
    public static class CollectiveContractQueries
    {
        public static string ClearInsuredListQuery()
        {
            return @"
delete PAS_IMPL.COLLECTIVE_POLICY_INSURED_LIST where CONTRACT_NUMBER = @ContractNumber
            ";
        }

        public static string WriteInsuredQuery()
        {
            return @"
insert into PAS_IMPL.COLLECTIVE_POLICY_INSURED_LIST
(
  CONTRACT_NUMBER,
  SURNAME,
  FIRST_NAME,
  MIDDLE_NAME,
  BIRTHDAY,
  GENDER,
  MOBILE,
  AMOUNT,
  PREMIUM,
  REINSURER_CODE,
  REINSURER_NAME,
  REINSURER_SHARE,
  DIRECT_RATE1,
  DIRECT_RATE2,
  DIRECT_RATE3,
  DIRECT_RATE4,
  DIRECT_RATE5,
  DIRECT_RATE6,
  DIRECT_RATE7,
  DIRECT_RATE8,
  DIRECT_RATE9,
  DIRECT_RATE10,
  DIRECT_RATE11,
  DIRECT_RATE12,
  DIRECT_RATE13,
  DIRECT_RATE14,
  DIRECT_RATE15,
  DIRECT_RATE16,
  DIRECT_RATE17,
  DIRECT_RATE18,
  DIRECT_RATE19,
  DIRECT_RATE20,
  DIRECT_RATE21,
  DIRECT_RATE22,
  DIRECT_RATE23,
  REINSURANCE_RATE1,
  REINSURANCE_RATE2,
  REINSURANCE_RATE3,
  REINSURANCE_RATE4,
  REINSURANCE_RATE5,
  REINSURANCE_RATE6,
  REINSURANCE_RATE7,
  REINSURANCE_RATE8,
  REINSURANCE_RATE9,
  REINSURANCE_RATE10,
  REINSURANCE_RATE11,
  REINSURANCE_RATE12,
  REINSURANCE_RATE13,
  REINSURANCE_RATE14,
  REINSURANCE_RATE15,
  REINSURANCE_RATE16,
  REINSURANCE_RATE17,
  REINSURANCE_RATE18,
  REINSURANCE_RATE19,
  REINSURANCE_RATE20,
  REINSURANCE_RATE21,
  REINSURANCE_RATE22,
  REINSURANCE_RATE23
)
values
(
  @ContractNumber,
  @SurName,
  @FirstName,
  @MiddleName,
  @BirthDay,
  @Gender,
  @Mobile,
  @Amount,
  @Premium,
  @ReinsurerCode,
  @ReinsurerName,
  @ReinsurerShare,
  @DirectRate1,
  @DirectRate2,
  @DirectRate3,
  @DirectRate4,
  @DirectRate5,
  @DirectRate6,
  @DirectRate7,
  @DirectRate8,
  @DirectRate9,
  @DirectRate10,
  @DirectRate11,
  @DirectRate12,
  @DirectRate13,
  @DirectRate14,
  @DirectRate15,
  @DirectRate16,
  @DirectRate17,
  @DirectRate18,
  @DirectRate19,
  @DirectRate20,
  @DirectRate21,
  @DirectRate22,
  @DirectRate23,
  @ReinsuranceRate1,
  @ReinsuranceRate2,
  @ReinsuranceRate3,
  @ReinsuranceRate4,
  @ReinsuranceRate5,
  @ReinsuranceRate6,
  @ReinsuranceRate7,
  @ReinsuranceRate8,
  @ReinsuranceRate9,
  @ReinsuranceRate10,
  @ReinsuranceRate11,
  @ReinsuranceRate12,
  @ReinsuranceRate13,
  @ReinsuranceRate14,
  @ReinsuranceRate15,
  @ReinsuranceRate16,
  @ReinsuranceRate17,
  @ReinsuranceRate18,
  @ReinsuranceRate19,
  @ReinsuranceRate20,
  @ReinsuranceRate21,
  @ReinsuranceRate22,
  @ReinsuranceRate23
)";
        }

        public static string ClearRiskQuery()
        {
            return @"
delete PAS_IMPL.COLLECTIVE_POLICY_RISK_DATA where CONTRACT_NUMBER = @ContractNumber
            ";
        }

        public static string WriteRiskQuery()
        {
            return @"
insert into PAS_IMPL.COLLECTIVE_POLICY_RISK_DATA
(
  INSURED_ID,
  CONTRACT_NUMBER,
  START_DATE,
  END_DATE,
  RISK_CODE,
  AMOUNT,
  PREMIUM
)
values
(
  @InsuredId,
  @ContractNumber,
  @StartDate,
  @EndDate,
  @RiskCode,
  @Amount,
  @Premium
)
            ";
        }

        public static string SetInsuredCalculatedDataQuery()
        {
            return @"
update
  PAS_IMPL.COLLECTIVE_POLICY_INSURED_LIST
set
  AMOUNT = @Amount,
  PREMIUM = @Premium
where ID = @Id
            ";
        }

        public static string ClearSummaryRiskDataQuery()
        {
            return @"
update
  PAS_IMPL.COLLECTIVE_POLICY_INSURED_LIST
set
  AMOUNT = 0,
  PREMIUM = 0
where CONTRACT_NUMBER = @ContractNumber
            ";
        }

        public static string SetInsuredPartyCodeQuery()
        {
            return @"
update
  PAS_IMPL.COLLECTIVE_POLICY_INSURED_LIST
set
  PARTY_CODE = @PartyCode
where ID = @Id
            ";
        }

        public static string ClearRiskExpQuery()
        {
            return @"
delete PAS_IMPL.COLLECTIVE_POLICY_RISK_DATA_EXP where CONTRACT_NUMBER = @ContractNumber
            ";
        }

        public static string WriteRiskExpQuery()
        {
            return @"
insert into PAS_IMPL.COLLECTIVE_POLICY_RISK_DATA_EXP
(
  INSURED_ID,
  CONTRACT_NUMBER,
  RISK_CODE,
  REINS_RATE,
  REINS_PREMIUM
)
values
(
  @InsuredId,
  @ContractNumber,
  @RiskCode,
  @ReinsRate,
  @ReinsPremium
)
            ";
        }

        public static string WriteTestLogQuery()
        {
            return @"
insert into ADIRGSLSUPP394 values(getdate(), @comment)
            ";
        }
    }
}
