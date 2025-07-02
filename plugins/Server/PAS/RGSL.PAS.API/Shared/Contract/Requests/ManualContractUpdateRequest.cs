using Adacta.AdInsure.Framework.Core.Common;

namespace Adacta.AdInsure.RGSL.PAS.API.Shared.Contract.Requests
{
    public class ManualContractUpdateRequest
    {
        public string ContractNumber { get; set; }

        public JsonObject Body { get; set; }

        public JsonObject CommonBody { get; set; }

        public JsonObject SnapshotBody { get; set; }
    }
}
