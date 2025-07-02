using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Services;
using NUnit.Framework;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.Tests.Domain.CashFlow.Allocation.Services.MatchingServiceRgslTests
{
    [TestFixture]
    public class GetMatchingDocAmoutSplitTests
    {
        [Test]
        public void NoTolerancePartial()
        {
            // arrange
            var detailsCollection = new List<AllocationDocumentInstallmentDetails>
            {
                new AllocationDocumentInstallmentDetails { Amount = 100m, OpenAmount = 100m },
                new AllocationDocumentInstallmentDetails { Amount = 100m, OpenAmount = 100m },
            };

            // act
            var result = MatchingServiceRGSL.GetMatchingDocAmountSplit(150m, 0m, detailsCollection);

            // assert
            var expectedResult = new MatchingAmounts[]
            {
                new MatchingAmounts { DocAmount = 100m, ToleranceDocAmount = 0m },
                new MatchingAmounts { DocAmount = 50m, ToleranceDocAmount = 0m },
            };
            CollectionAssert.AreEqual(expectedResult, result);
        }

        [Test]
        public void NoToleranceFull()
        {
            // arrange
            var detailsCollection = new List<AllocationDocumentInstallmentDetails>
            {
                new AllocationDocumentInstallmentDetails { Amount = 100m, OpenAmount = 100m },
                new AllocationDocumentInstallmentDetails { Amount = 100m, OpenAmount = 100m },
            };

            // act
            var result = MatchingServiceRGSL.GetMatchingDocAmountSplit(200m, 0m, detailsCollection);

            // assert
            var expectedResult = new MatchingAmounts[]
            {
                new MatchingAmounts { DocAmount = 100m, ToleranceDocAmount = 0m },
                new MatchingAmounts { DocAmount = 100m, ToleranceDocAmount = 0m },
            };
            CollectionAssert.AreEqual(expectedResult, result);
        }

        [Test]
        public void NormalUnderpayment()
        {
            // arrange
            var detailsCollection = new List<AllocationDocumentInstallmentDetails>
            {
                new AllocationDocumentInstallmentDetails { Amount = 100m, OpenAmount = 100m },
                new AllocationDocumentInstallmentDetails { Amount = 100m, OpenAmount = 100m },
            };

            // act
            var result = MatchingServiceRGSL.GetMatchingDocAmountSplit(190m, 10m, detailsCollection);

            // assert
            var expectedResult = new MatchingAmounts[]
            {
                new MatchingAmounts { DocAmount = 100m, ToleranceDocAmount = 0m },
                new MatchingAmounts { DocAmount = 90m, ToleranceDocAmount = 10m },
            };
            CollectionAssert.AreEqual(expectedResult, result);
        }

        [Test]
        public void NormalOverpayment()
        {
            // arrange
            var detailsCollection = new List<AllocationDocumentInstallmentDetails>
            {
                new AllocationDocumentInstallmentDetails { Amount = 100m, OpenAmount = 100m },
                new AllocationDocumentInstallmentDetails { Amount = 100m, OpenAmount = 100m },
            };

            // act
            var result = MatchingServiceRGSL.GetMatchingDocAmountSplit(210m, -10m, detailsCollection);

            // assert
            var expectedResult = new MatchingAmounts[]
            {
                new MatchingAmounts { DocAmount = 100m, ToleranceDocAmount = 0m },
                new MatchingAmounts { DocAmount = 110m, ToleranceDocAmount = -10m },
            };
            CollectionAssert.AreEqual(expectedResult, result);
        }

        [Test]
        public void SmallLastInstallmentUnderpayment()
        {
            // arrange
            var detailsCollection = new List<AllocationDocumentInstallmentDetails>
            {
                new AllocationDocumentInstallmentDetails { Amount = 100m, OpenAmount = 100m },
                new AllocationDocumentInstallmentDetails { Amount = 1m, OpenAmount = 1m },
            };

            // act
            var result = MatchingServiceRGSL.GetMatchingDocAmountSplit(90m, 11m, detailsCollection);

            // assert
            var expectedResult = new MatchingAmounts[]
            {
                new MatchingAmounts { DocAmount = 90m, ToleranceDocAmount = 10m },
                new MatchingAmounts { DocAmount = 0m, ToleranceDocAmount = 1m },
            };
            CollectionAssert.AreEqual(expectedResult, result);
        }

        [Test]
        public void SmallLastInstallmentOverpayment()
        {
            // arrange
            var detailsCollection = new List<AllocationDocumentInstallmentDetails>
            {
                new AllocationDocumentInstallmentDetails { Amount = 100m, OpenAmount = 100m },
                new AllocationDocumentInstallmentDetails { Amount = 1m, OpenAmount = 1m },
            };

            // act
            var result = MatchingServiceRGSL.GetMatchingDocAmountSplit(110m, -9m, detailsCollection);

            // assert
            var expectedResult = new MatchingAmounts[]
            {
                new MatchingAmounts { DocAmount = 100m, ToleranceDocAmount = 0m },
                new MatchingAmounts { DocAmount = 10m, ToleranceDocAmount = -9m },
            };
            CollectionAssert.AreEqual(expectedResult, result);
        }
    }
}
