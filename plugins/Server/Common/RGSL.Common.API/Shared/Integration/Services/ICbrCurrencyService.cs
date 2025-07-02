using Adacta.AdInsure.RGSL.Common.API.Shared.Integration.DTOs;

namespace Adacta.AdInsure.RGSL.Common.API.Shared.Integration.Services
{
    public interface ICbrCurrencyService
    {
        /// <summary>
        /// Loads currency rates on current date (or provided date) from CBR to the system.
        /// </summary>
        /// <param name="request"></param>
        /// <returns>Date on which rates were loaded. (May vary from requested when requested for holiday for example).</returns>
        LoadCurrencyRatesResponse LoadCurrencyRates(LoadCurrencyRatesRequest request);
    }
}