using Adacta.AdInsure.RGSL.Party.API.Services;
using Adacta.AdInsure.RGSL.Party.ApplicationServices.Services;
using NUnit.Framework;

namespace Adacta.AdInsure.RGSL.Tests.Party
{
    [TestFixture]
    public class TestServiceTests
    {
        private static ITestService BuildService()
        {
            return new TestService();
        }

        [Test]
        public void TestServiceTest()
        {
            var service = BuildService();
            var actualResponse = service.Test();

            Assert.AreEqual("Successful", actualResponse.Response);
        }
    }
}
