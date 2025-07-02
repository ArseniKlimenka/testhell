using Adacta.AdInsure.RGSL.Common.Domain.Integration.Cbr.Queries;

namespace Adacta.AdInsure.RGSL.Common.Infrastructure.Integration.Cbr.Queries
{
    public class CbrKeyRateQueries : ICbrKeyRateQueries
    {
        public string SelectRateByDate()
        {
            return @"select TOP 1 * from BFX_IMPL.BANK_KEY_RATE
                where RATE_DATE<=DATEADD(month, DATEDIFF(month, 0, @date), 0)
                ORDER BY RATE_DATE DESC 
                ";
        }
    }
}
