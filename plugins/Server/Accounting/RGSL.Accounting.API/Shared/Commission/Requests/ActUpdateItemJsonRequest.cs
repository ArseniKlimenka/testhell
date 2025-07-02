using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Requests
{
    public class ActUpdateItemJsonRequest
    {
        public IList<ActItemJsonData> Items { get; set; }
    }

    public class ActItemJsonData
    {
        public long ItemId { get; set; }
        public string JsonData { get; set; }
    }
}
