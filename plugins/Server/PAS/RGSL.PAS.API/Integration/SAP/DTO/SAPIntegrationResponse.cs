using System;

namespace Adacta.AdInsure.RGSL.PAS.API.Integration.SAP.DTO
{
    public class SAPIntegrationResponse
    {
        public DateTime LoadedOnDate { get; set; }

        // SAP system method name, e.g. 'Zerluapi000000000100'
        public string MethodName { get; set; }

        // 'Success' or 'Error'
        public string Status { get; set; }

        // All erroe messages from normal response or the whole response body in case of Server Error
        public string ErrorMesages { get; set; }

        // SAP system id of created contract or party
        public string ResultEntityId { get; set; }

    }
}
