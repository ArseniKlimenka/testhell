using System;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Requests
{
    public class UpdateActPayDateRequest
    {
        public long ActId { get; set; }
        public DateTime PayDate { get; set; }
    }
}
