using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Common.Domain.Integration.Cbr.Queries
{
    public interface ICbrKeyRateQueries
    {
        string SelectRateByDate();
    }
}
