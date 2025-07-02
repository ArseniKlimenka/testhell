using Adacta.AdInsure.RGSL.Common.API.Shared.Integration.DTOs;

namespace Adacta.AdInsure.RGSL.Common.API.Shared.Integration.Services
{
    public interface ICbrCurrencyDynamicService
    {
        /// <summary>
        /// Loads currency dynamic from CBR to the system.
        /// </summary>
        /// <param name="request"></param>
        /// <returns>Date on which dynamic were loaded. (May vary from requested when requested for holiday for example).</returns>
        LoadCurrencyDynamicResponse LoadCurrencyDynamic(LoadCurrencyDynamicRequest request);
    }
}