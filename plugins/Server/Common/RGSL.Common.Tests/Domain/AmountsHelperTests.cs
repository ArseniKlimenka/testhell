using Adacta.AdInsure.RGSL.Common.Domain;
using NUnit.Framework;

namespace Adacta.AdInsure.RGSL.Common.Tests.Domain
{
    [TestFixture]
    public class AmountsHelperTests
    {
        [Test]
        [TestCaseSource(nameof(_amountDistributionCases))]
        public void GetDistribution(decimal[] proportion, decimal amount, decimal[] expectedResult)
        {
            // act
            var result = AmountsHelper.GetDistribution(proportion, amount);

            // assert
            CollectionAssert.AreEqual(expectedResult, result);
        }

        static object[] _amountDistributionCases =
        {
            new object[] { new decimal[] { 1m, 1m }, 0m, new decimal[] { 0m, 0m } },
            new object[] { new decimal[] { 1m, 1m }, 1m, new decimal[] { 0.5m, 0.5m } },
            new object[] { new decimal[] { 1m, 10000m }, 10001m, new decimal[] { 1m, 10000m } },
            new object[] { new decimal[] { 0m, 0m }, 2m, new decimal[] { 1m, 1m } },
            new object[] { new decimal[] { -2m }, -100m, new decimal[] { -100m } },
            new object[] { new decimal[] { -2m, 4m }, 300m, new decimal[] { -300m, 600m } },
        };
    }
}
