using Adacta.AdInsure.Framework.Core.Common;

namespace Adacta.AdInsure.RGSL.PAS.API.Shared.Contract.Responses
{
    public class ManualContractUpdateResponse
    {
        public JsonObject InitialData { get; set; }

        public JsonObject UpdatedData { get; set; }
    }
}
