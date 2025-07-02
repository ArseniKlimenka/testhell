using System;
using Adacta.AdInsure.RGSL.PAS.Domain.Integration.SAP.DTO;

namespace Adacta.AdInsure.RGSL.PAS.Domain.Integration.SAP.Interfaces
{
    public interface ISAPProxyDomainService
    {
        /// <summary>
        /// General proxy service for all types of SAP requests.
        /// It takes prepared SOAP-formatted request body and service requisites.
        /// </summary>
        /// <returns>JSON-formatted service response.</returns>
        SAPProxyResponse CallSAPService(
            string request,
            string webMethodId,
            Uri url,
            string sapLogin,
            string sapPassword
        );
    }
}
