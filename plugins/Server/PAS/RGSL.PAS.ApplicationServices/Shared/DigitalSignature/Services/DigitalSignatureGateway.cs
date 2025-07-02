using Adacta.AdInsure.RGSL.Common.Domain.Integration.Settings;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.PAS.ApplicationServices.Shared.DigitalSignature.Services
{
    public class DigitalSignatureGateway
    {
        private readonly ICommonIntegrationSettings _settings;

        public DigitalSignatureGateway(ICommonIntegrationSettings settings)
        {
            _settings = settings;
        }

        public async Task<HttpResponseMessage> SendRequest(byte[] request)
        {
            using var client = new HttpClient();

            var integrationRequest = new MultipartFormDataContent();
            integrationRequest.Add(new ByteArrayContent(request), "file", "fileName.pdf");
            var response = await client.PostAsync(GetUri(), integrationRequest);

            return response;
        }

        private Uri GetUri()
        {
            return _settings.DigitalSignatureServiceUri;
            //return new Uri("http://esbcam-qua-01:18080/restSignPDF/upload-file");
        }
    }
}
