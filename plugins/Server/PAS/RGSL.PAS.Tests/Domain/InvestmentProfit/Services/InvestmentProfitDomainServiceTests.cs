using Adacta.AdInsure.RGSL.Common.API.Shared.Services;
using Adacta.AdInsure.RGSL.PAS.Domain.InvestmentProfit;
using Adacta.AdInsure.RGSL.PAS.Domain.InvestmentProfit.DTO;
using Adacta.AdInsure.RGSL.PAS.Domain.InvestmentProfit.Repositories;
using Adacta.AdInsure.RGSL.PAS.Domain.InvestmentProfit.Services;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RGSL.PAS.Tests.Domain.InvestmentProfit.Services
{
    [TestFixture]
    public class InvestmentProfitDomainServiceTests
    {
        [Test]
        public void EveryAllocationProcessesShouldBeIgnoredWhenNoDataIsPresent()
        {
            var importDocumentId = Guid.NewGuid();

            var allocationRequest = new AllocationRequestDomain()
            {
                ReferenceNumber = "Reference_1",
                ReferenceConfName = "ReferenceConf_1",
                ContractNumber = "Contract_1",
                EventDate = DateTime.Parse("01.01.2025"),
                PaymentTypes = new int[] { 1, 2 }
            };

            var investProfitRecords = new List<InvestmentProfitRecordDomainDTO>()
            {
            };

            var repositoryMock = new Mock<IInvestmentProfitRepository>();
            var translationServiceMock = new Mock<ITranslationServiceRGSL>();

            repositoryMock.Setup(m => m.GetInvestProfitRecordsForAllocation(It.IsAny<string>(), It.IsAny<DateTime>(), It.IsAny<IEnumerable<int>>()))
                .Returns(investProfitRecords);

            repositoryMock.Setup(m => m.GetRelatedAllocations(It.IsAny<string>(), It.IsAny<string>()))
                .Returns(new List<InvestmentProfitAllocationDomainDTO>());

            repositoryMock.Setup(m => m.DeactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()));
            repositoryMock.Setup(m => m.ReactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()));
            repositoryMock.Setup(m => m.CreateAllocations(It.IsAny<IEnumerable<InvestmentProfitAllocationDomainDTO>>()));

            translationServiceMock.Setup(m => m.Translate(It.IsAny<string>())).Returns(string.Empty);

            var repositoryObject = repositoryMock.Object;
            var translationServiceObject = translationServiceMock.Object;
            var service = new InvestmentProfitDomanService(repositoryObject, translationServiceObject);
            var result = service.AllocateInvestmentProfit(allocationRequest);

            repositoryMock.Verify(r => r.DeactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()), Times.Never);
            repositoryMock.Verify(r => r.ReactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()), Times.Never);
            repositoryMock.Verify(r => r.CreateAllocations(It.IsAny<IEnumerable<InvestmentProfitAllocationDomainDTO>>()), Times.Never);

            Assert.That(result.Count(), Is.EqualTo(0));
        }

        [Test]
        public void TwoAllocationsShouldBeCreatedForTwoUnallocatedInvestProfitRecords()
        {
            var importDocumentId = Guid.NewGuid();

            var allocationRequest = new AllocationRequestDomain()
            {
                ReferenceNumber = "Reference_1",
                ReferenceConfName = "ReferenceConf_1",
                ContractNumber = "Contract_1",
                EventDate = DateTime.Parse("01.01.2025"),
                PaymentTypes = new int[] { 1, 2 }
            };

            var investProfitRecords = new List<InvestmentProfitRecordDomainDTO>()
            {
                new InvestmentProfitRecordDomainDTO()
                {
                    RecordId = new Guid("00000000-0000-0000-0000-000000000001"),
                },
                new InvestmentProfitRecordDomainDTO()
                {
                    RecordId = new Guid("00000000-0000-0000-0000-000000000002"),
                }
            };

            var repositoryMock = new Mock<IInvestmentProfitRepository>();
            var translationServiceMock = new Mock<ITranslationServiceRGSL>();

            repositoryMock.Setup(m => m.GetInvestProfitRecordsForAllocation(It.IsAny<string>(), It.IsAny<DateTime>(), It.IsAny<IEnumerable<int>>()))
                .Returns(investProfitRecords);

            repositoryMock.Setup(m => m.GetRelatedAllocations(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<IEnumerable<Guid>>()))
                .Returns(new List<InvestmentProfitAllocationDomainDTO>());

            repositoryMock.Setup(m => m.DeactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()));
            repositoryMock.Setup(m => m.ReactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()));

            var recordsIdsCreated = new List<Guid>();
            repositoryMock.Setup(m => m.CreateAllocations(It.IsAny<IEnumerable<InvestmentProfitAllocationDomainDTO>>()))
                .Callback<IEnumerable<InvestmentProfitAllocationDomainDTO>>(p => recordsIdsCreated = p.Select(a => a.RecordId).ToList());

            translationServiceMock.Setup(m => m.Translate(It.IsAny<string>())).Returns(string.Empty);

            var repositoryObject = repositoryMock.Object;
            var translationServiceObject = translationServiceMock.Object;
            var service = new InvestmentProfitDomanService(repositoryObject, translationServiceObject);
            var result = service.AllocateInvestmentProfit(allocationRequest);

            repositoryMock.Verify(r => r.DeactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()), Times.Never);
            repositoryMock.Verify(r => r.ReactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()), Times.Never);
            repositoryMock.Verify(r => r.CreateAllocations(It.IsAny<IEnumerable<InvestmentProfitAllocationDomainDTO>>()), Times.Once);

            var expectedRecordsIds = new List<Guid>()
            {
                investProfitRecords[0].RecordId,
                investProfitRecords[1].RecordId,
            };

            CollectionAssert.AreEquivalent(recordsIdsCreated, expectedRecordsIds);
            Assert.That(result.Count(), Is.EqualTo(2));
        }

        [Test]
        public void AllAllocationShouldBeReactivatedAIfBothArePresentForCurrentInvestmentProfitResult()
        {
            var importDocumentId = Guid.NewGuid();

            var allocationRequest = new AllocationRequestDomain()
            {
                ReferenceNumber = "Reference_1",
                ReferenceConfName = "ReferenceConf_1",
                ContractNumber = "Contract_1",
                EventDate = DateTime.Parse("01.01.2025"),
                PaymentTypes = new int[] { 1, 2 }
            };

            var investProfitRecords = new List<InvestmentProfitRecordDomainDTO>()
            {
                new InvestmentProfitRecordDomainDTO()
                {
                    RecordId = new Guid("00000000-0000-0000-0000-000000000001"),
                },
                new InvestmentProfitRecordDomainDTO()
                {
                    RecordId = new Guid("00000000-0000-0000-0000-000000000002"),
                }
            };

            var investProfitAllocations = new List<InvestmentProfitAllocationDomainDTO>()
            {
                new InvestmentProfitAllocationDomainDTO()
                {
                    AllocationId = new Guid("00000000-0000-0000-0000-000000000003"),
                    RecordId = investProfitRecords[0].RecordId,
                    ReferenceNumber = "Reference_1",
                    ReferenceConfiguration = "ReferenceConf_1",
                    IsCancelled = true,
                },
                new InvestmentProfitAllocationDomainDTO()
                {
                    AllocationId = new Guid("00000000-0000-0000-0000-000000000004"),
                    RecordId = investProfitRecords[1].RecordId,
                    ReferenceNumber = "Reference_1",
                    ReferenceConfiguration = "ReferenceConf_1",
                    IsCancelled = true,
                }
            };

            var repositoryMock = new Mock<IInvestmentProfitRepository>();
            var translationServiceMock = new Mock<ITranslationServiceRGSL>();

            repositoryMock.Setup(m => m.GetInvestProfitRecordsForAllocation(It.IsAny<string>(), It.IsAny<DateTime>(), It.IsAny<IEnumerable<int>>()))
                .Returns(investProfitRecords);

            repositoryMock.Setup(m => m.GetRelatedAllocations(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<IEnumerable<Guid>>()))
                .Returns(investProfitAllocations);

            repositoryMock.Setup(m => m.DeactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()));

            var allocationsIdsReactivated = new List<Guid>();
            repositoryMock.Setup(m => m.ReactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()))
                .Callback<IEnumerable<Guid>, DateTime>((a, d) => allocationsIdsReactivated = a.ToList());

            repositoryMock.Setup(m => m.CreateAllocations(It.IsAny<IEnumerable<InvestmentProfitAllocationDomainDTO>>()));

            translationServiceMock.Setup(m => m.Translate(It.IsAny<string>())).Returns(string.Empty);

            var repositoryObject = repositoryMock.Object;
            var translationServiceObject = translationServiceMock.Object;
            var service = new InvestmentProfitDomanService(repositoryObject, translationServiceObject);
            var result = service.AllocateInvestmentProfit(allocationRequest);

            repositoryMock.Verify(r => r.DeactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()), Times.Never);
            repositoryMock.Verify(r => r.ReactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()), Times.Once);
            repositoryMock.Verify(r => r.CreateAllocations(It.IsAny<IEnumerable<InvestmentProfitAllocationDomainDTO>>()), Times.Never);


            var expectedReactivatedAllocationsIds = new List<Guid>()
            {
                investProfitAllocations[0].AllocationId,
                investProfitAllocations[1].AllocationId
            };

            CollectionAssert.AreEquivalent(allocationsIdsReactivated, expectedReactivatedAllocationsIds);
            Assert.That(result.Count(), Is.EqualTo(2));
        }

        [Test]
        public void AllAllocationShouldBeDeactivatedAIfBothAreNotPresentForCurrentInvestmentProfitResult()
        {
            var importDocumentId = Guid.NewGuid();

            var allocationRequest = new AllocationRequestDomain()
            {
                ReferenceNumber = "Reference_1",
                ReferenceConfName = "ReferenceConf_1",
                ContractNumber = "Contract_1",
                EventDate = DateTime.Parse("01.01.2025"),
                PaymentTypes = new int[] { 1, 2 }
            };

            var investProfitRecords = new List<InvestmentProfitRecordDomainDTO>();

            var investProfitAllocations = new List<InvestmentProfitAllocationDomainDTO>()
            {
                new InvestmentProfitAllocationDomainDTO()
                {
                    AllocationId = new Guid("00000000-0000-0000-0000-000000000003"),
                    RecordId = new Guid("00000000-0000-0000-0000-000000000001"),
                    ReferenceNumber = "Reference_1",
                    ReferenceConfiguration = "ReferenceConf_1",
                    IsCancelled = false,
                },
                new InvestmentProfitAllocationDomainDTO()
                {
                    AllocationId = new Guid("00000000-0000-0000-0000-000000000004"),
                    RecordId = new Guid("00000000-0000-0000-0000-000000000002"),
                    ReferenceNumber = "Reference_1",
                    ReferenceConfiguration = "ReferenceConf_1",
                    IsCancelled = false,
                }
            };

            var repositoryMock = new Mock<IInvestmentProfitRepository>();
            var translationServiceMock = new Mock<ITranslationServiceRGSL>();

            repositoryMock.Setup(m => m.GetInvestProfitRecordsForAllocation(It.IsAny<string>(), It.IsAny<DateTime>(), It.IsAny<IEnumerable<int>>()))
                .Returns(investProfitRecords);

            repositoryMock.Setup(m => m.GetRelatedAllocations(It.IsAny<string>(), It.IsAny<string>()))
                .Returns(investProfitAllocations);

            var allocationsIdsDeactivated = new List<Guid>();
            repositoryMock.Setup(m => m.DeactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()))
                .Callback<IEnumerable<Guid>, DateTime>((a, d) => allocationsIdsDeactivated = a.ToList());

            repositoryMock.Setup(m => m.ReactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()));

            repositoryMock.Setup(m => m.CreateAllocations(It.IsAny<IEnumerable<InvestmentProfitAllocationDomainDTO>>()));

            translationServiceMock.Setup(m => m.Translate(It.IsAny<string>())).Returns(string.Empty);

            var repositoryObject = repositoryMock.Object;
            var translationServiceObject = translationServiceMock.Object;
            var service = new InvestmentProfitDomanService(repositoryObject, translationServiceObject);
            var result = service.AllocateInvestmentProfit(allocationRequest);

            repositoryMock.Verify(r => r.DeactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()), Times.Once);
            repositoryMock.Verify(r => r.ReactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()), Times.Never);
            repositoryMock.Verify(r => r.CreateAllocations(It.IsAny<IEnumerable<InvestmentProfitAllocationDomainDTO>>()), Times.Never);


            var expectedDeactivatedAllocationsIds = new List<Guid>()
            {
                investProfitAllocations[0].AllocationId,
                investProfitAllocations[1].AllocationId
            };

            CollectionAssert.AreEquivalent(allocationsIdsDeactivated, expectedDeactivatedAllocationsIds);
            Assert.That(result.Count(), Is.EqualTo(0));
        }

        [Test]
        public void AllAllocationShouldBeIgnoredAIfBothArePresentForCurrentInvestmentProfitResult()
        {
            var importDocumentId = Guid.NewGuid();

            var allocationRequest = new AllocationRequestDomain()
            {
                ReferenceNumber = "Reference_1",
                ReferenceConfName = "ReferenceConf_1",
                ContractNumber = "Contract_1",
                EventDate = DateTime.Parse("01.01.2025"),
                PaymentTypes = new int[] { 1, 2 }
            };

            var investProfitRecords = new List<InvestmentProfitRecordDomainDTO>()
            {
                new InvestmentProfitRecordDomainDTO()
                {
                    RecordId = new Guid("00000000-0000-0000-0000-000000000001"),
                },
                new InvestmentProfitRecordDomainDTO()
                {
                    RecordId = new Guid("00000000-0000-0000-0000-000000000002"),
                }
            };

            var investProfitAllocations = new List<InvestmentProfitAllocationDomainDTO>()
            {
                new InvestmentProfitAllocationDomainDTO()
                {
                    AllocationId = new Guid("00000000-0000-0000-0000-000000000003"),
                    RecordId = investProfitRecords[0].RecordId,
                    ReferenceNumber = "Reference_1",
                    ReferenceConfiguration = "ReferenceConf_1",
                    IsCancelled = false,
                },
                new InvestmentProfitAllocationDomainDTO()
                {
                    AllocationId = new Guid("00000000-0000-0000-0000-000000000004"),
                    RecordId = investProfitRecords[1].RecordId,
                    ReferenceNumber = "Reference_1",
                    ReferenceConfiguration = "ReferenceConf_1",
                    IsCancelled = false,
                }
            };

            var repositoryMock = new Mock<IInvestmentProfitRepository>();
            var translationServiceMock = new Mock<ITranslationServiceRGSL>();

            repositoryMock.Setup(m => m.GetInvestProfitRecordsForAllocation(It.IsAny<string>(), It.IsAny<DateTime>(), It.IsAny<IEnumerable<int>>()))
                .Returns(investProfitRecords);

            repositoryMock.Setup(m => m.GetRelatedAllocations(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<IEnumerable<Guid>>()))
                .Returns(investProfitAllocations);

            repositoryMock.Setup(m => m.DeactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()));

            repositoryMock.Setup(m => m.ReactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()));

            repositoryMock.Setup(m => m.CreateAllocations(It.IsAny<IEnumerable<InvestmentProfitAllocationDomainDTO>>()));

            translationServiceMock.Setup(m => m.Translate(It.IsAny<string>())).Returns(string.Empty);

            var repositoryObject = repositoryMock.Object;
            var translationServiceObject = translationServiceMock.Object;
            var service = new InvestmentProfitDomanService(repositoryObject, translationServiceObject);
            var result = service.AllocateInvestmentProfit(allocationRequest);

            repositoryMock.Verify(r => r.DeactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()), Times.Never);
            repositoryMock.Verify(r => r.ReactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()), Times.Never);
            repositoryMock.Verify(r => r.CreateAllocations(It.IsAny<IEnumerable<InvestmentProfitAllocationDomainDTO>>()), Times.Never);

            Assert.That(result.Count(), Is.EqualTo(2));
        }

        [Test]
        public void OneAllocationShouldBeReactivatedAndOneShoudBeCreatedForTwoInvestProfitRecordsWithCancelledAllocationsOnDifferentDocuments()
        {
            var importDocumentId = Guid.NewGuid();

            var allocationRequest = new AllocationRequestDomain()
            {
                ReferenceNumber = "Reference_1",
                ReferenceConfName = "ReferenceConf_1",
                ContractNumber = "Contract_1",
                EventDate = DateTime.Parse("01.01.2025"),
                PaymentTypes = new int[] { 1, 2 }
            };

            var investProfitRecords = new List<InvestmentProfitRecordDomainDTO>()
            {
                new InvestmentProfitRecordDomainDTO()
                {
                    RecordId = new Guid("00000000-0000-0000-0000-000000000001"),
                },
                new InvestmentProfitRecordDomainDTO()
                {
                    RecordId = new Guid("00000000-0000-0000-0000-000000000002"),
                }
            };

            var investProfitAllocations = new List<InvestmentProfitAllocationDomainDTO>()
            {
                new InvestmentProfitAllocationDomainDTO()
                {
                    AllocationId = new Guid("00000000-0000-0000-0000-000000000003"),
                    RecordId = investProfitRecords[0].RecordId,
                    ReferenceNumber = "Reference_1",
                    ReferenceConfiguration = "ReferenceConf_1",
                    IsCancelled = true,
                },
                new InvestmentProfitAllocationDomainDTO()
                {
                    AllocationId = new Guid("00000000-0000-0000-0000-000000000004"),
                    RecordId = investProfitRecords[1].RecordId,
                    ReferenceNumber = "Reference_2",
                    ReferenceConfiguration = "ReferenceConf_2",
                    IsCancelled = true,
                }
            };

            var repositoryMock = new Mock<IInvestmentProfitRepository>();
            var translationServiceMock = new Mock<ITranslationServiceRGSL>();

            repositoryMock.Setup(m => m.GetInvestProfitRecordsForAllocation(It.IsAny<string>(), It.IsAny<DateTime>(), It.IsAny<IEnumerable<int>>()))
                .Returns(investProfitRecords);

            repositoryMock.Setup(m => m.GetRelatedAllocations(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<IEnumerable<Guid>>()))
                .Returns(investProfitAllocations);

            repositoryMock.Setup(m => m.DeactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()));

            var allocationsIdsReactivated = new List<Guid>();
            repositoryMock.Setup(m => m.ReactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()))
                .Callback<IEnumerable<Guid>, DateTime>((a, d) => allocationsIdsReactivated = a.ToList());

            var recordsIdsCreated = new List<Guid>();
            repositoryMock.Setup(m => m.CreateAllocations(It.IsAny<IEnumerable<InvestmentProfitAllocationDomainDTO>>()))
                .Callback<IEnumerable<InvestmentProfitAllocationDomainDTO>>(p => recordsIdsCreated = p.Select(a => a.RecordId).ToList());

            translationServiceMock.Setup(m => m.Translate(It.IsAny<string>())).Returns(string.Empty);

            var repositoryObject = repositoryMock.Object;
            var translationServiceObject = translationServiceMock.Object;
            var service = new InvestmentProfitDomanService(repositoryObject, translationServiceObject);
            var result = service.AllocateInvestmentProfit(allocationRequest);

            repositoryMock.Verify(r => r.DeactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()), Times.Never);
            repositoryMock.Verify(r => r.ReactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()), Times.Once);
            repositoryMock.Verify(r => r.CreateAllocations(It.IsAny<IEnumerable<InvestmentProfitAllocationDomainDTO>>()), Times.Once);

            var expectedCreatedRecordsIds = new List<Guid>()
            {
                investProfitRecords[1].RecordId
            };

            var expectedReactivatedAllocationsIds = new List<Guid>()
            {
                investProfitAllocations[0].AllocationId
            };

            CollectionAssert.AreEquivalent(recordsIdsCreated, expectedCreatedRecordsIds);
            CollectionAssert.AreEquivalent(allocationsIdsReactivated, expectedReactivatedAllocationsIds);
            Assert.That(result.Count(), Is.EqualTo(2));
        }

        [Test]
        public void AllocationsShouldNotBeCreatedIfSameActiveAllocationIsPresent()
        {
            var importDocumentId = Guid.NewGuid();

            var allocationRequest = new AllocationRequestDomain()
            {
                ReferenceNumber = "Reference_1",
                ReferenceConfName = "ReferenceConf_1",
                ContractNumber = "Contract_1",
                EventDate = DateTime.Parse("01.01.2025"),
                PaymentTypes = new int[] { 1, 2 }
            };

            var investProfitRecords = new List<InvestmentProfitRecordDomainDTO>()
            {
                new InvestmentProfitRecordDomainDTO()
                {
                    RecordId = new Guid("00000000-0000-0000-0000-000000000001"),
                },
                new InvestmentProfitRecordDomainDTO()
                {
                    RecordId = new Guid("00000000-0000-0000-0000-000000000002"),
                }
            };

            var investProfitAllocations = new List<InvestmentProfitAllocationDomainDTO>()
            {
                new InvestmentProfitAllocationDomainDTO()
                {
                    AllocationId = new Guid("00000000-0000-0000-0000-000000000003"),
                    RecordId = investProfitRecords[0].RecordId,
                    ReferenceNumber = "Reference_1",
                    ReferenceConfiguration = "ReferenceConf_1",
                    IsCancelled = false,
                },
                new InvestmentProfitAllocationDomainDTO()
                {
                    AllocationId = new Guid("00000000-0000-0000-0000-000000000004"),
                    RecordId = investProfitRecords[1].RecordId,
                    ReferenceNumber = "Reference_2",
                    ReferenceConfiguration = "ReferenceConf_2",
                    IsCancelled = false,
                }
            };

            var repositoryMock = new Mock<IInvestmentProfitRepository>();
            var translationServiceMock = new Mock<ITranslationServiceRGSL>();

            repositoryMock.Setup(m => m.GetInvestProfitRecordsForAllocation(It.IsAny<string>(), It.IsAny<DateTime>(), It.IsAny<IEnumerable<int>>()))
                .Returns(investProfitRecords);

            repositoryMock.Setup(m => m.GetRelatedAllocations(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<IEnumerable<Guid>>()))
                .Returns(investProfitAllocations);

            repositoryMock.Setup(m => m.DeactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()));
            repositoryMock.Setup(m => m.ReactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()));
            repositoryMock.Setup(m => m.CreateAllocations(It.IsAny<IEnumerable<InvestmentProfitAllocationDomainDTO>>()));

            translationServiceMock.Setup(m => m.Translate(It.IsAny<string>())).Returns(string.Empty);

            var repositoryObject = repositoryMock.Object;
            var translationServiceObject = translationServiceMock.Object;
            var service = new InvestmentProfitDomanService(repositoryObject, translationServiceObject);
            var result = service.AllocateInvestmentProfit(allocationRequest);

            repositoryMock.Verify(r => r.DeactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()), Times.Never);
            repositoryMock.Verify(r => r.ReactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()), Times.Never);
            repositoryMock.Verify(r => r.CreateAllocations(It.IsAny<IEnumerable<InvestmentProfitAllocationDomainDTO>>()), Times.Never);

            Assert.That(result.Count(), Is.EqualTo(1));
        }

        [Test]
        public void OneCurrentDocumentAllocationShouldBeDeactivatedIfItsNotPresentInInvestProfitsCollectionExistingAllocationForAotherDocumentIsIgnored()
        {
            var importDocumentId = Guid.NewGuid();

            var allocationRequest = new AllocationRequestDomain()
            {
                ReferenceNumber = "Reference_1",
                ReferenceConfName = "ReferenceConf_1",
                ContractNumber = "Contract_1",
                EventDate = DateTime.Parse("01.01.2025"),
                PaymentTypes = new int[] { 1, 2 }
            };

            var investProfitRecords = new List<InvestmentProfitRecordDomainDTO>()
            {
                new InvestmentProfitRecordDomainDTO()
                {
                    RecordId = new Guid("00000000-0000-0000-0000-000000000002"),
                }
            };

            var investProfitAllocations = new List<InvestmentProfitAllocationDomainDTO>()
            {
                new InvestmentProfitAllocationDomainDTO()
                {
                    AllocationId = new Guid("00000000-0000-0000-0000-000000000003"),
                    RecordId = new Guid("00000000-0000-0000-0000-000000000001"),
                    ReferenceNumber = "Reference_1",
                    ReferenceConfiguration = "ReferenceConf_1",
                    IsCancelled = false,
                },
                new InvestmentProfitAllocationDomainDTO()
                {
                    AllocationId = new Guid("00000000-0000-0000-0000-000000000004"),
                    RecordId = investProfitRecords[0].RecordId,
                    ReferenceNumber = "Reference_2",
                    ReferenceConfiguration = "ReferenceConf_2",
                    IsCancelled = false,
                }
            };

            var repositoryMock = new Mock<IInvestmentProfitRepository>();
            var translationServiceMock = new Mock<ITranslationServiceRGSL>();

            repositoryMock.Setup(m => m.GetInvestProfitRecordsForAllocation(It.IsAny<string>(), It.IsAny<DateTime>(), It.IsAny<IEnumerable<int>>()))
                .Returns(investProfitRecords);

            repositoryMock.Setup(m => m.GetRelatedAllocations(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<IEnumerable<Guid>>()))
                .Returns(investProfitAllocations);

            var allocationsIdsDeactivated = new List<Guid>();
            repositoryMock.Setup(m => m.DeactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()))
                .Callback<IEnumerable<Guid>, DateTime>((a, d) => allocationsIdsDeactivated = a.ToList());

            repositoryMock.Setup(m => m.ReactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()));
            repositoryMock.Setup(m => m.CreateAllocations(It.IsAny<IEnumerable<InvestmentProfitAllocationDomainDTO>>()));

            translationServiceMock.Setup(m => m.Translate(It.IsAny<string>())).Returns(string.Empty);

            var repositoryObject = repositoryMock.Object;
            var translationServiceObject = translationServiceMock.Object;
            var service = new InvestmentProfitDomanService(repositoryObject, translationServiceObject);
            var result = service.AllocateInvestmentProfit(allocationRequest);

            repositoryMock.Verify(r => r.DeactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()), Times.Once);
            repositoryMock.Verify(r => r.ReactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()), Times.Never);
            repositoryMock.Verify(r => r.CreateAllocations(It.IsAny<IEnumerable<InvestmentProfitAllocationDomainDTO>>()), Times.Never);

            var expectedDeactivatedAllocationsIds = new List<Guid>()
            {
                investProfitAllocations[0].AllocationId
            };

            CollectionAssert.AreEquivalent(allocationsIdsDeactivated, expectedDeactivatedAllocationsIds);
            Assert.That(result.Count(), Is.EqualTo(0));
        }

        [Test]
        public void EveryClaimAllocationProcessesShouldBeIgnoredWhenNoDataIsPresent()
        {
            var importDocumentId = Guid.NewGuid();

            var allocationRequest = new AllocationRequestDomain()
            {
                ReferenceNumber = "Reference_1",
                ReferenceConfName = "ReferenceConf_1",
                ContractNumber = "Contract_1",
                EventDate = DateTime.Parse("01.12.2025"),
                PaymentTypes = new int[] { 5 }
            };

            var investProfitRecords = new List<InvestmentProfitRecordDomainDTO>()
            {
            };

            var investProfitAllocations = new List<InvestmentProfitAllocationDomainDTO>()
            {
            };

            var repositoryMock = new Mock<IInvestmentProfitRepository>();
            var translationServiceMock = new Mock<ITranslationServiceRGSL>();

            translationServiceMock.Setup(m => m.Translate(It.IsAny<string>())).Returns(string.Empty);

            repositoryMock.Setup(m => m.GetInvestProfitRecordsForClaimAllocation(It.IsAny<string>(), It.IsAny<IEnumerable<int>>()))
                .Returns(investProfitRecords);

            repositoryMock.Setup(m => m.GetRelatedAllocations(It.IsAny<string>(), It.IsAny<string>()))
                .Returns(investProfitAllocations);

            repositoryMock.Setup(m => m.DeactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()));
            repositoryMock.Setup(m => m.ReactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()));
            repositoryMock.Setup(m => m.CreateAllocations(It.IsAny<IEnumerable<InvestmentProfitAllocationDomainDTO>>()));

            var repositoryObject = repositoryMock.Object;
            var translationServiceObject = translationServiceMock.Object;
            var service = new InvestmentProfitDomanService(repositoryObject, translationServiceObject);
            var result = service.AllocateClaimInvestmentProfit(allocationRequest);

            repositoryMock.Verify(r => r.DeactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()), Times.Never);
            repositoryMock.Verify(r => r.ReactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()), Times.Never);
            repositoryMock.Verify(r => r.CreateAllocations(It.IsAny<IEnumerable<InvestmentProfitAllocationDomainDTO>>()), Times.Never);

            Assert.That(result.Count(), Is.EqualTo(0));
        }

        [Test]
        public void ClaimAllocationShouldBeCreatedForLatestRecordWhenNoOtherAllocationsExist()
        {
            var importDocumentId = Guid.NewGuid();

            var allocationRequest = new AllocationRequestDomain()
            {
                ReferenceNumber = "Reference_1",
                ReferenceConfName = "ReferenceConf_1",
                ContractNumber = "Contract_1",
                EventDate = DateTime.Parse("01.12.2025"),
                PaymentTypes = new int[] { 5 }
            };

            var investProfitRecords = new List<InvestmentProfitRecordDomainDTO>()
            {
                new InvestmentProfitRecordDomainDTO()
                {
                    RecordId = new Guid("00000000-0000-0000-0000-000000000001"),
                    CalculationDate = DateTime.Parse("01.01.2025"),
                },
                new InvestmentProfitRecordDomainDTO()
                {
                    RecordId = new Guid("00000000-0000-0000-0000-000000000002"),
                    CalculationDate = DateTime.Parse("03.01.2025"),
                },
                new InvestmentProfitRecordDomainDTO()
                {
                    RecordId = new Guid("00000000-0000-0000-0000-000000000003"),
                    CalculationDate = DateTime.Parse("02.01.2025"),
                }
            };

            var investProfitAllocations = new List<InvestmentProfitAllocationDomainDTO>()
            {
            };

            var repositoryMock = new Mock<IInvestmentProfitRepository>();
            var translationServiceMock = new Mock<ITranslationServiceRGSL>();

            translationServiceMock.Setup(m => m.Translate(It.IsAny<string>())).Returns(string.Empty);

            repositoryMock.Setup(m => m.GetInvestProfitRecordsForClaimAllocation(It.IsAny<string>(), It.IsAny<IEnumerable<int>>()))
                .Returns(investProfitRecords);

            repositoryMock.Setup(m => m.GetRelatedAllocations(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<IEnumerable<Guid>>()))
                .Returns(investProfitAllocations);

            repositoryMock.Setup(m => m.DeactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()));
            repositoryMock.Setup(m => m.ReactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()));

            var recordsIdsCreated = new List<Guid>();
            repositoryMock.Setup(m => m.CreateAllocations(It.IsAny<IEnumerable<InvestmentProfitAllocationDomainDTO>>()))
                .Callback<IEnumerable<InvestmentProfitAllocationDomainDTO>>(p => recordsIdsCreated = p.Select(a => a.RecordId).ToList());

            var repositoryObject = repositoryMock.Object;
            var translationServiceObject = translationServiceMock.Object;
            var service = new InvestmentProfitDomanService(repositoryObject, translationServiceObject);
            var result = service.AllocateClaimInvestmentProfit(allocationRequest);

            repositoryMock.Verify(r => r.DeactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()), Times.Never);
            repositoryMock.Verify(r => r.ReactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()), Times.Never);
            repositoryMock.Verify(r => r.CreateAllocations(It.IsAny<IEnumerable<InvestmentProfitAllocationDomainDTO>>()), Times.Once);

            var expectedCreatedRecordsIds = new List<Guid>()
            {
                investProfitRecords[1].RecordId
            };

            CollectionAssert.AreEquivalent(recordsIdsCreated, expectedCreatedRecordsIds);
            Assert.That(result.Count(), Is.EqualTo(1));
        }

        [Test]
        public void ClaimAllocationShouldBeIgnoredWhenActiveAllocationExistsForLatestRecord()
        {
            var importDocumentId = Guid.NewGuid();

            var allocationRequest = new AllocationRequestDomain()
            {
                ReferenceNumber = "Reference_1",
                ReferenceConfName = "ReferenceConf_1",
                ContractNumber = "Contract_1",
                EventDate = DateTime.Parse("01.12.2025"),
                PaymentTypes = new int[] { 5 }
            };

            var investProfitRecords = new List<InvestmentProfitRecordDomainDTO>()
            {
                new InvestmentProfitRecordDomainDTO()
                {
                    RecordId = new Guid("00000000-0000-0000-0000-000000000001"),
                    CalculationDate = DateTime.Parse("01.01.2025"),
                },
                new InvestmentProfitRecordDomainDTO()
                {
                    RecordId = new Guid("00000000-0000-0000-0000-000000000002"),
                    CalculationDate = DateTime.Parse("03.01.2025"),
                },
                new InvestmentProfitRecordDomainDTO()
                {
                    RecordId = new Guid("00000000-0000-0000-0000-000000000003"),
                    CalculationDate = DateTime.Parse("02.01.2025"),
                }
            };

            var investProfitAllocations = new List<InvestmentProfitAllocationDomainDTO>()
            {
                new InvestmentProfitAllocationDomainDTO()
                {
                    AllocationId = new Guid("00000000-0000-0000-0000-000000000001"),
                    RecordId = new Guid("00000000-0000-0000-0000-000000000002"),
                    ReferenceNumber = "Reference_1",
                    ReferenceConfiguration = "ReferenceConf_1",
                    IsCancelled = false,
                }
            };

            var repositoryMock = new Mock<IInvestmentProfitRepository>();
            var translationServiceMock = new Mock<ITranslationServiceRGSL>();

            translationServiceMock.Setup(m => m.Translate(It.IsAny<string>())).Returns(string.Empty);

            repositoryMock.Setup(m => m.GetInvestProfitRecordsForClaimAllocation(It.IsAny<string>(), It.IsAny<IEnumerable<int>>()))
                .Returns(investProfitRecords);

            repositoryMock.Setup(m => m.GetRelatedAllocations(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<IEnumerable<Guid>>()))
                .Returns(investProfitAllocations);

            repositoryMock.Setup(m => m.DeactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()));
            repositoryMock.Setup(m => m.ReactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()));
            repositoryMock.Setup(m => m.CreateAllocations(It.IsAny<IEnumerable<InvestmentProfitAllocationDomainDTO>>()));

            var repositoryObject = repositoryMock.Object;
            var translationServiceObject = translationServiceMock.Object;
            var service = new InvestmentProfitDomanService(repositoryObject, translationServiceObject);
            var result = service.AllocateClaimInvestmentProfit(allocationRequest);

            repositoryMock.Verify(r => r.DeactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()), Times.Never);
            repositoryMock.Verify(r => r.ReactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()), Times.Never);
            repositoryMock.Verify(r => r.CreateAllocations(It.IsAny<IEnumerable<InvestmentProfitAllocationDomainDTO>>()), Times.Never);

            Assert.That(result.Count(), Is.EqualTo(1));
        }

        [Test]
        public void ClaimAllocationShouldBeReactivatedWhenCancelledAllocationExistsForLatestRecord()
        {
            var importDocumentId = Guid.NewGuid();

            var allocationRequest = new AllocationRequestDomain()
            {
                ReferenceNumber = "Reference_1",
                ReferenceConfName = "ReferenceConf_1",
                ContractNumber = "Contract_1",
                EventDate = DateTime.Parse("01.12.2025"),
                PaymentTypes = new int[] { 5 }
            };

            var investProfitRecords = new List<InvestmentProfitRecordDomainDTO>()
            {
                new InvestmentProfitRecordDomainDTO()
                {
                    RecordId = new Guid("00000000-0000-0000-0000-000000000001"),
                    CalculationDate = DateTime.Parse("01.01.2025"),
                },
                new InvestmentProfitRecordDomainDTO()
                {
                    RecordId = new Guid("00000000-0000-0000-0000-000000000002"),
                    CalculationDate = DateTime.Parse("03.01.2025"),
                },
                new InvestmentProfitRecordDomainDTO()
                {
                    RecordId = new Guid("00000000-0000-0000-0000-000000000003"),
                    CalculationDate = DateTime.Parse("02.01.2025"),
                }
            };

            var investProfitAllocations = new List<InvestmentProfitAllocationDomainDTO>()
            {
                new InvestmentProfitAllocationDomainDTO()
                {
                    AllocationId = new Guid("00000000-0000-0000-0000-000000000001"),
                    RecordId = new Guid("00000000-0000-0000-0000-000000000002"),
                    ReferenceNumber = "Reference_1",
                    ReferenceConfiguration = "ReferenceConf_1",
                    IsCancelled = true,
                }
            };

            var repositoryMock = new Mock<IInvestmentProfitRepository>();
            var translationServiceMock = new Mock<ITranslationServiceRGSL>();

            translationServiceMock.Setup(m => m.Translate(It.IsAny<string>())).Returns(string.Empty);

            repositoryMock.Setup(m => m.GetInvestProfitRecordsForClaimAllocation(It.IsAny<string>(), It.IsAny<IEnumerable<int>>()))
                .Returns(investProfitRecords);

            repositoryMock.Setup(m => m.GetRelatedAllocations(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<IEnumerable<Guid>>()))
                .Returns(investProfitAllocations);

            repositoryMock.Setup(m => m.DeactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()));

            var allocationsIdsReactivated = new List<Guid>();
            repositoryMock.Setup(m => m.ReactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()))
                .Callback<IEnumerable<Guid>, DateTime>((a, d) => allocationsIdsReactivated = a.ToList());

            repositoryMock.Setup(m => m.CreateAllocations(It.IsAny<IEnumerable<InvestmentProfitAllocationDomainDTO>>()));

            var repositoryObject = repositoryMock.Object;
            var translationServiceObject = translationServiceMock.Object;
            var service = new InvestmentProfitDomanService(repositoryObject, translationServiceObject);
            var result = service.AllocateClaimInvestmentProfit(allocationRequest);

            repositoryMock.Verify(r => r.DeactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()), Times.Never);
            repositoryMock.Verify(r => r.ReactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()), Times.Once);
            repositoryMock.Verify(r => r.CreateAllocations(It.IsAny<IEnumerable<InvestmentProfitAllocationDomainDTO>>()), Times.Never);

            var expectedReactivetedAllocationsIds = new List<Guid>()
            {
                investProfitRecords[0].RecordId
            };

            CollectionAssert.AreEquivalent(allocationsIdsReactivated, expectedReactivetedAllocationsIds);
            Assert.That(result.Count(), Is.EqualTo(1));
        }

        [Test]
        public void ClaimAllocationShouldBeDeactivatedWhenActiveAllocationExistsAndNoRecordsFound()
        {
            var importDocumentId = Guid.NewGuid();

            var allocationRequest = new AllocationRequestDomain()
            {
                ReferenceNumber = "Reference_1",
                ReferenceConfName = "ReferenceConf_1",
                ContractNumber = "Contract_1",
                EventDate = DateTime.Parse("01.12.2025"),
                PaymentTypes = new int[] { 5 }
            };

            var investProfitRecords = new List<InvestmentProfitRecordDomainDTO>()
            {
            };

            var investProfitAllocations = new List<InvestmentProfitAllocationDomainDTO>()
            {
                new InvestmentProfitAllocationDomainDTO()
                {
                    AllocationId = new Guid("00000000-0000-0000-0000-000000000001"),
                    RecordId = new Guid("00000000-0000-0000-0000-000000000002"),
                    ReferenceNumber = "Reference_1",
                    ReferenceConfiguration = "ReferenceConf_1",
                    IsCancelled = false,
                }
            };

            var repositoryMock = new Mock<IInvestmentProfitRepository>();
            var translationServiceMock = new Mock<ITranslationServiceRGSL>();

            translationServiceMock.Setup(m => m.Translate(It.IsAny<string>())).Returns(string.Empty);

            repositoryMock.Setup(m => m.GetInvestProfitRecordsForClaimAllocation(It.IsAny<string>(), It.IsAny<IEnumerable<int>>()))
                .Returns(investProfitRecords);

            repositoryMock.Setup(m => m.GetRelatedAllocations(It.IsAny<string>(), It.IsAny<string>()))
                .Returns(investProfitAllocations);

            var allocationsIdsDeactivated = new List<Guid>();
            repositoryMock.Setup(m => m.DeactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()))
                .Callback<IEnumerable<Guid>, DateTime>((a, d) => allocationsIdsDeactivated = a.ToList());

            repositoryMock.Setup(m => m.ReactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()));
            repositoryMock.Setup(m => m.CreateAllocations(It.IsAny<IEnumerable<InvestmentProfitAllocationDomainDTO>>()));

            var repositoryObject = repositoryMock.Object;
            var translationServiceObject = translationServiceMock.Object;
            var service = new InvestmentProfitDomanService(repositoryObject, translationServiceObject);
            var result = service.AllocateClaimInvestmentProfit(allocationRequest);

            repositoryMock.Verify(r => r.DeactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()), Times.Once);
            repositoryMock.Verify(r => r.ReactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()), Times.Never);
            repositoryMock.Verify(r => r.CreateAllocations(It.IsAny<IEnumerable<InvestmentProfitAllocationDomainDTO>>()), Times.Never);

            var expectedReactivetedAllocationsIds = new List<Guid>()
            {
                investProfitAllocations[0].AllocationId
            };

            CollectionAssert.AreEquivalent(allocationsIdsDeactivated, expectedReactivetedAllocationsIds);
            Assert.That(result.Count(), Is.EqualTo(0));
        }

        [Test]
        public void ClaimAllocationShouldBeCreatedForLatestRecordWithoutActiveAllocation()
        {
            var importDocumentId = Guid.NewGuid();

            var allocationRequest = new AllocationRequestDomain()
            {
                ReferenceNumber = "Reference_1",
                ReferenceConfName = "ReferenceConf_1",
                ContractNumber = "Contract_1",
                EventDate = DateTime.Parse("01.12.2025"),
                PaymentTypes = new int[] { 5 }
            };

            var investProfitRecords = new List<InvestmentProfitRecordDomainDTO>()
            {
                new InvestmentProfitRecordDomainDTO()
                {
                    RecordId = new Guid("00000000-0000-0000-0000-000000000001"),
                    CalculationDate = DateTime.Parse("01.01.2025"),
                },
                new InvestmentProfitRecordDomainDTO()
                {
                    RecordId = new Guid("00000000-0000-0000-0000-000000000002"),
                    CalculationDate = DateTime.Parse("03.01.2025"),
                },
                new InvestmentProfitRecordDomainDTO()
                {
                    RecordId = new Guid("00000000-0000-0000-0000-000000000003"),
                    CalculationDate = DateTime.Parse("02.01.2025"),
                }
            };

            var investProfitAllocations = new List<InvestmentProfitAllocationDomainDTO>()
            {
                new InvestmentProfitAllocationDomainDTO()
                {
                    AllocationId = new Guid("00000000-0000-0000-0000-000000000001"),
                    RecordId = new Guid("00000000-0000-0000-0000-000000000002"),
                    ReferenceNumber = "Reference_2",
                    ReferenceConfiguration = "ReferenceConf_2",
                    IsCancelled = false,
                }
            };

            var repositoryMock = new Mock<IInvestmentProfitRepository>();
            var translationServiceMock = new Mock<ITranslationServiceRGSL>();

            translationServiceMock.Setup(m => m.Translate(It.IsAny<string>())).Returns(string.Empty);

            repositoryMock.Setup(m => m.GetInvestProfitRecordsForClaimAllocation(It.IsAny<string>(), It.IsAny<IEnumerable<int>>()))
                .Returns(investProfitRecords);

            repositoryMock.Setup(m => m.GetRelatedAllocations(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<IEnumerable<Guid>>()))
                .Returns(investProfitAllocations);

            repositoryMock.Setup(m => m.DeactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()));
            repositoryMock.Setup(m => m.ReactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()));

            var recordsIdsCreated = new List<Guid>();
            repositoryMock.Setup(m => m.CreateAllocations(It.IsAny<IEnumerable<InvestmentProfitAllocationDomainDTO>>()))
                .Callback<IEnumerable<InvestmentProfitAllocationDomainDTO>>(p => recordsIdsCreated = p.Select(a => a.RecordId).ToList());

            var repositoryObject = repositoryMock.Object;
            var translationServiceObject = translationServiceMock.Object;
            var service = new InvestmentProfitDomanService(repositoryObject, translationServiceObject);
            var result = service.AllocateClaimInvestmentProfit(allocationRequest);

            repositoryMock.Verify(r => r.DeactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()), Times.Never);
            repositoryMock.Verify(r => r.ReactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()), Times.Never);
            repositoryMock.Verify(r => r.CreateAllocations(It.IsAny<IEnumerable<InvestmentProfitAllocationDomainDTO>>()), Times.Once);

            var expectedCreatedRecordsIds = new List<Guid>()
            {
                investProfitRecords[2].RecordId
            };

            CollectionAssert.AreEquivalent(recordsIdsCreated, expectedCreatedRecordsIds);
            Assert.That(result.Count(), Is.EqualTo(1));
        }

        [Test]
        public void ClaimAllocationShouldBeCreatedForLatestRecordIncludingCancelledAllocations()
        {
            var importDocumentId = Guid.NewGuid();

            var allocationRequest = new AllocationRequestDomain()
            {
                ReferenceNumber = "Reference_1",
                ReferenceConfName = "ReferenceConf_1",
                ContractNumber = "Contract_1",
                EventDate = DateTime.Parse("01.12.2025"),
                PaymentTypes = new int[] { 5 }
            };

            var investProfitRecords = new List<InvestmentProfitRecordDomainDTO>()
            {
                new InvestmentProfitRecordDomainDTO()
                {
                    RecordId = new Guid("00000000-0000-0000-0000-000000000001"),
                    CalculationDate = DateTime.Parse("01.01.2025"),
                },
                new InvestmentProfitRecordDomainDTO()
                {
                    RecordId = new Guid("00000000-0000-0000-0000-000000000002"),
                    CalculationDate = DateTime.Parse("03.01.2025"),
                },
                new InvestmentProfitRecordDomainDTO()
                {
                    RecordId = new Guid("00000000-0000-0000-0000-000000000003"),
                    CalculationDate = DateTime.Parse("02.01.2025"),
                }
            };

            var investProfitAllocations = new List<InvestmentProfitAllocationDomainDTO>()
            {
                new InvestmentProfitAllocationDomainDTO()
                {
                    AllocationId = new Guid("00000000-0000-0000-0000-000000000001"),
                    RecordId = new Guid("00000000-0000-0000-0000-000000000002"),
                    ReferenceNumber = "Reference_2",
                    ReferenceConfiguration = "ReferenceConf_2",
                    IsCancelled = true,
                }
            };

            var repositoryMock = new Mock<IInvestmentProfitRepository>();
            var translationServiceMock = new Mock<ITranslationServiceRGSL>();

            translationServiceMock.Setup(m => m.Translate(It.IsAny<string>())).Returns(string.Empty);

            repositoryMock.Setup(m => m.GetInvestProfitRecordsForClaimAllocation(It.IsAny<string>(), It.IsAny<IEnumerable<int>>()))
                .Returns(investProfitRecords);

            repositoryMock.Setup(m => m.GetRelatedAllocations(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<IEnumerable<Guid>>()))
                .Returns(investProfitAllocations);

            repositoryMock.Setup(m => m.DeactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()));
            repositoryMock.Setup(m => m.ReactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()));

            var recordsIdsCreated = new List<Guid>();
            repositoryMock.Setup(m => m.CreateAllocations(It.IsAny<IEnumerable<InvestmentProfitAllocationDomainDTO>>()))
                .Callback<IEnumerable<InvestmentProfitAllocationDomainDTO>>(p => recordsIdsCreated = p.Select(a => a.RecordId).ToList());

            var repositoryObject = repositoryMock.Object;
            var translationServiceObject = translationServiceMock.Object;
            var service = new InvestmentProfitDomanService(repositoryObject, translationServiceObject);
            var result = service.AllocateClaimInvestmentProfit(allocationRequest);

            repositoryMock.Verify(r => r.DeactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()), Times.Never);
            repositoryMock.Verify(r => r.ReactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()), Times.Never);
            repositoryMock.Verify(r => r.CreateAllocations(It.IsAny<IEnumerable<InvestmentProfitAllocationDomainDTO>>()), Times.Once);

            var expectedCreatedRecordsIds = new List<Guid>()
            {
                investProfitRecords[1].RecordId
            };

            CollectionAssert.AreEquivalent(recordsIdsCreated, expectedCreatedRecordsIds);
            Assert.That(result.Count(), Is.EqualTo(1));
        }

        [Test]
        public void ClaimAllocationShouldBeCreatedAndExistingAllocationShouldBeCancelledWhenUnallocatedRecordWithGearterDateIsPresent()
        {
            var importDocumentId = Guid.NewGuid();

            var allocationRequest = new AllocationRequestDomain()
            {
                ReferenceNumber = "Reference_1",
                ReferenceConfName = "ReferenceConf_1",
                ContractNumber = "Contract_1",
                EventDate = DateTime.Parse("01.12.2025"),
                PaymentTypes = new int[] { 5 }
            };

            var investProfitRecords = new List<InvestmentProfitRecordDomainDTO>()
            {
                new InvestmentProfitRecordDomainDTO()
                {
                    RecordId = new Guid("00000000-0000-0000-0000-000000000001"),
                    CalculationDate = DateTime.Parse("01.01.2025"),
                },
                new InvestmentProfitRecordDomainDTO()
                {
                    RecordId = new Guid("00000000-0000-0000-0000-000000000002"),
                    CalculationDate = DateTime.Parse("03.01.2025"),
                },
                new InvestmentProfitRecordDomainDTO()
                {
                    RecordId = new Guid("00000000-0000-0000-0000-000000000003"),
                    CalculationDate = DateTime.Parse("02.01.2025"),
                }
            };

            var investProfitAllocations = new List<InvestmentProfitAllocationDomainDTO>()
            {
                new InvestmentProfitAllocationDomainDTO()
                {
                    AllocationId = new Guid("00000000-0000-0000-0000-000000000001"),
                    RecordId = new Guid("00000000-0000-0000-0000-000000000003"),
                    ReferenceNumber = "Reference_1",
                    ReferenceConfiguration = "ReferenceConf_1",
                    IsCancelled = false,
                }
            };

            var repositoryMock = new Mock<IInvestmentProfitRepository>();
            var translationServiceMock = new Mock<ITranslationServiceRGSL>();

            translationServiceMock.Setup(m => m.Translate(It.IsAny<string>())).Returns(string.Empty);

            repositoryMock.Setup(m => m.GetInvestProfitRecordsForClaimAllocation(It.IsAny<string>(), It.IsAny<IEnumerable<int>>()))
                .Returns(investProfitRecords);

            repositoryMock.Setup(m => m.GetRelatedAllocations(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<IEnumerable<Guid>>()))
                .Returns(investProfitAllocations);

            var allocationsIdsDeactivated = new List<Guid>();
            repositoryMock.Setup(m => m.DeactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()))
                .Callback<IEnumerable<Guid>, DateTime>((a, d) => allocationsIdsDeactivated = a.ToList());

            repositoryMock.Setup(m => m.ReactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()));

            var recordsIdsCreated = new List<Guid>();
            repositoryMock.Setup(m => m.CreateAllocations(It.IsAny<IEnumerable<InvestmentProfitAllocationDomainDTO>>()))
                .Callback<IEnumerable<InvestmentProfitAllocationDomainDTO>>(p => recordsIdsCreated = p.Select(a => a.RecordId).ToList());

            var repositoryObject = repositoryMock.Object;
            var translationServiceObject = translationServiceMock.Object;
            var service = new InvestmentProfitDomanService(repositoryObject, translationServiceObject);
            var result = service.AllocateClaimInvestmentProfit(allocationRequest);

            repositoryMock.Verify(r => r.DeactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()), Times.Once);
            repositoryMock.Verify(r => r.ReactivateAllocations(It.IsAny<IEnumerable<Guid>>(), It.IsAny<DateTime>()), Times.Never);
            repositoryMock.Verify(r => r.CreateAllocations(It.IsAny<IEnumerable<InvestmentProfitAllocationDomainDTO>>()), Times.Once);

            var expectedCreatedRecordsIds = new List<Guid>()
            {
                investProfitRecords[1].RecordId
            };

            var expectedCancelledAllocationsIds = new List<Guid>()
            {
                investProfitAllocations[0].AllocationId
            };

            CollectionAssert.AreEquivalent(recordsIdsCreated, expectedCreatedRecordsIds);
            CollectionAssert.AreEquivalent(allocationsIdsDeactivated, expectedCancelledAllocationsIds);
            Assert.That(result.Count(), Is.EqualTo(1));
        }
    }
}