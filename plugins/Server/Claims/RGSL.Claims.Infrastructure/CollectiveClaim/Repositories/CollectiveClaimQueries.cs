namespace RGSL.Claims.Infrastructure.CollectiveClaim.Repositories
{
    public class CollectiveClaimQueries
    {
        public static string WriteRecipientQuery()
        {
            return @"
INSERT INTO CLM_IMPL.COLLECTIVE_CLM_RECIPIENT
      (CLAIM_NUMBER
      ,PARTY_CODE
      ,FULL_NAME
      ,BIRTH_DATE
      ,AMOUNT
      ,FRANCHISE
      ,TOTAL_AMOUNT
      ,SERVICE_DESCRIPTION
      ,SERV_PROVIDER_NAME)
VALUES
      (@ClaimNumber
      ,@PartyCode
      ,@FullName
      ,@BirthDate
      ,@Amount
      ,@Franchise
      ,@TotalAmount
      ,@ServiceDescription
      ,@ServiceProviderName
      )
";
        }
    }
}
