using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.PaymentOrder
{
    public class NettingResponse
    {
        public List<NettedItemData> NettedItems { get; set; }
    }
}
