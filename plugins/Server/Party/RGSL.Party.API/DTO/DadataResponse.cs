namespace Adacta.AdInsure.RGSL.Party.API.DTO
{
    public class DadataResponse
    {
        private readonly string _response;

        public DadataResponse(string response)
        {
            _response = response;
        }

        public string Response => _response;
    }
}
