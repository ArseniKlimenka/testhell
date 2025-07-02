using Adacta.AdInsure.Framework.Core.Common;
using Adacta.AdInsure.RGSL.Common.API.Shared.Requests;

namespace Adacta.AdInsure.RGSL.Common.API.Shared.Services
{
    public interface IActivityServiceRGSL
    {
        void CreateActivity(CreateActivityRequest request);
    }
}
