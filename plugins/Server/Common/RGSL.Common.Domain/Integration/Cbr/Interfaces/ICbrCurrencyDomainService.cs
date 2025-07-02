using System;

namespace Adacta.AdInsure.RGSL.Common.Domain.Integration.Cbr.Interfaces
{
    public interface ICbrCurrencyDomainService
    {
        /// <summary>
        /// Loads latest available currency rates from CBR to the system.
        /// Any missing currencies are being saved as well.
        /// </summary>
        /// <returns>Date on which rates were loaded. (May vary from requested when requested for holiday for example).</returns>
        DateTime LoadCurrentCurrencyRates();
        /// <summary>
        /// Loads currency rates on requested date from CBR to the system.
        /// Any missing currencies are being saved as well.
        /// </summary>
        /// <param name="onDate">Requested exchange rates date.</param>
        /// <returns>Date on which rates were loaded. (May vary from requested when requested for holiday for example).</returns>
        DateTime LoadCurrencyRates(DateTime onDate);
    }
}
