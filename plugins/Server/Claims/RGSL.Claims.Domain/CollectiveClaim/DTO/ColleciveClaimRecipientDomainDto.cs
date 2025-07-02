namespace RGSL.Claims.Domain.CollectiveClaim.DTO
{
    public class ColleciveClaimRecipientDomainDto
    {
        public string ClaimNumber { get; set; }
        public string PartyCode { get; set; }
        public string FullName { get; set; }
        public string BirthDate { get; set; }
        public string Amount { get; set; }
        public string Franchise { get; set; }
        public string TotalAmount { get; set; }
        public string ServiceDescription { get; set; }
        public string ServiceProviderName { get; set; }
    }
}