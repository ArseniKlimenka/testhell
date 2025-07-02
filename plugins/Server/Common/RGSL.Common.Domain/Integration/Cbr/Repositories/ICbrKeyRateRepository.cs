using System;

namespace Adacta.AdInsure.RGSL.Common.Domain.Integration.Cbr.Repositories
{
    public interface ICbrKeyRateRepository
    {
        /// <summary>
        /// Returns latest refin rate
        /// </summary>
        /// <returns></returns>
        CbrKeyRate GetLastKeyRate();
        /// <summary>
        /// Returns latest refin rate by date actual on 1 day of date's month. 
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        CbrKeyRate GetKeyRateByDate(DateTime date);
        /// <summary>
        /// Adds new refin rate in db
        /// </summary>
        /// <param name="rate"></param>
        /// <param name="date"></param>
        void AddKeyRate(float rate, DateTime date);
    }
}
