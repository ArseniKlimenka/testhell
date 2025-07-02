using Adacta.AdInsure.RGSL.Party.API.DTO;
using Adacta.AdInsure.RGSL.Party.API.Services;

namespace Adacta.AdInsure.RGSL.Party.ApplicationServices.Services
{
    public class TestService : ITestService
    {
        public TestResponse Test()
        {
            return new TestResponse("Successful");
        }
    }
}
