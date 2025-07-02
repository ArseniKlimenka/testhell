using System;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Requests
{
    public class PopulateWithFileRequest
    {
        public long? ActId { get; set; }
        public string ActNo { get; set; }
        public string FileId { get; set; }
        public bool SkipFailed { get; set; }
        public DateTime? LastUpdated { get; set; }
    }
}
