using System;

namespace Adacta.AdInsure.RGSL.PAS.API.Shared.Contract
{
    public class ContractInfoRGSL
    {
        public Guid ContractId { get; set; }
        public string ContractNumber { get; set; }
        public string CodeName { get; set; }
        public Guid ArtifactId { get; set; }
        public int ConceptTypeId { get; set; }
        public string PublishedVersion { get; set; }
        public Guid EntityRefId { get; set; }
        public string ProductCode { get; set; }
        public string State { get; set; }
        public DateTime IssueDate { get; set; }
        public string HolderCode { get; set; }
    }
}
