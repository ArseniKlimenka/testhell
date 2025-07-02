using System;

namespace Adacta.AdInsure.RGSL.PAS.API.Shared.Contract
{
    public class ContractSysDataRGSL
    {
        public Guid ContractId { get; set; }
        public string ContractNumber { get; set; }
        public string OriginalContractNumber { get; set; }
        public int Sequence { get; set; }
        public string CodeName { get; set; }
        public Guid PublishedArtifactId { get; set; }
        public int ConceptTypeId { get; set; }
        public string PublishedVersion { get; set; }
        public Guid EntityRefId { get; set; }
    }
}