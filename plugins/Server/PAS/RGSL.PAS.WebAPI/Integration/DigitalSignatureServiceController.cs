using System.Threading.Tasks;
using Adacta.AdInsure.Framework.Core.Web.API.Controllers;
using Adacta.AdInsure.RGSL.PAS.API.Shared.DigitalSignature.Requests;
using Adacta.AdInsure.RGSL.PAS.API.Shared.DigitalSignature.Responses;
using Adacta.AdInsure.RGSL.PAS.API.Shared.DigitalSignature.Services;
using Microsoft.AspNetCore.Mvc;

namespace Adacta.AdInsure.RGSL.PAS.WebAPI.Integration
{
    [Route("api/rgsl/common/shared/digitalSignature")]
    public class DigitalSignatureServiceController : AIApiController
    {
        private readonly IDigitalSignatureService _service;

        public DigitalSignatureServiceController(IDigitalSignatureService service)
        {
            _service = service;
        }

        [HttpPost, Route("sign-contracts-attachments")]
        public async Task<SignPdfAttachmentsResponse> SignPdfAttachmentsForContracts(SignPdfAttachmentsRequest request)
        {
            var response = await _service.SignPdfAttachmentsForContracts(request);
            return response;
        }
    }
}