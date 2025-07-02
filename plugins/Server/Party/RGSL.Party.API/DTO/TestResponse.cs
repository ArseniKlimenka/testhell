namespace Adacta.AdInsure.RGSL.Party.API.DTO
{
    public class TestResponse
    {
        private readonly string _response;

        public TestResponse(string response)
        {
            _response = response;
        }

        public string Response => _response;
    }
}
