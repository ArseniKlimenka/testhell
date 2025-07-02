using Adacta.AdInsure.Framework.Core.Exceptions;
using Adacta.AdInsure.RGSL.Common.API.Shared.Services;
using Adacta.AdInsure.RGSL.PAS.Domain.InvestmentProfit.DTO;
using Adacta.AdInsure.RGSL.PAS.Domain.InvestmentProfit.Interfaces;
using Adacta.AdInsure.RGSL.PAS.Domain.InvestmentProfit.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Adacta.AdInsure.RGSL.PAS.Domain.InvestmentProfit.Services
{
    public class InvestmentProfitDomanService : IInvestmentProfitDomanService
    {
        private readonly IInvestmentProfitRepository _repository;
        private readonly ITranslationServiceRGSL _translationServiceRGSL;

        public InvestmentProfitDomanService(IInvestmentProfitRepository repository, ITranslationServiceRGSL translationServiceRGSL)
        {
            _repository = repository;
            _translationServiceRGSL = translationServiceRGSL;
        }

        public void UpsertInvestmentProfitRecord(InvestmentProfitRecordDomainDTO record)
        {
            _repository.UpsertInvestmentProfitRecord(record);
        }

        public IEnumerable<AllocatedRecordDomainDTO> AllocateInvestmentProfit(AllocationRequestDomain request)
        {
            var operationStartTime = DateTime.Now;
            var investProfitRecords = _repository.GetInvestProfitRecordsForAllocation(request.ContractNumber, request.EventDate, request.PaymentTypes);

            List<InvestmentProfitAllocationDomainDTO> existingAllocations;

            if (investProfitRecords.Count > 0)
            {
                existingAllocations = _repository.GetRelatedAllocations(request.ReferenceNumber, request.ReferenceConfName, investProfitRecords.Select(a => a.RecordId));
            }
            else
            {
                existingAllocations = _repository.GetRelatedAllocations(request.ReferenceNumber, request.ReferenceConfName);
            }

            var currentDocumentAllocations = existingAllocations.Where(a => a.ReferenceNumber == request.ReferenceNumber && a.ReferenceConfiguration == request.ReferenceConfName);
            var otherDocumentAllocations = existingAllocations.Where(a => a.ReferenceNumber != request.ReferenceNumber || a.ReferenceConfiguration != request.ReferenceConfName);

            var allocationsToAdd = investProfitRecords.Where(r => !currentDocumentAllocations.Any(a => a.RecordId == r.RecordId) && !otherDocumentAllocations.Any(a => a.RecordId == r.RecordId && !a.IsCancelled))
                .Select(r => new InvestmentProfitAllocationDomainDTO()
                {
                    AllocationId = Guid.NewGuid(),
                    RecordId = r.RecordId,
                    ReferenceNumber = request.ReferenceNumber,
                    ReferenceConfiguration = request.ReferenceConfName,
                    IsCancelled = false,
                    IsPaid = false,
                    LoadDate = operationStartTime
                }).ToList();

            var allocationsToActivate = new List<InvestmentProfitAllocationDomainDTO>();
            var allocationsToDeactivate = new List<InvestmentProfitAllocationDomainDTO>();
            var currentActiveAllocations = new List<InvestmentProfitAllocationDomainDTO>();

            foreach (var item in currentDocumentAllocations)
            {
                var hasRecord = investProfitRecords.Any(r => r.RecordId == item.RecordId);

                if (item.IsCancelled && hasRecord)
                {
                    allocationsToActivate.Add(item);
                }
                else if (!item.IsCancelled && !hasRecord)
                {
                    allocationsToDeactivate.Add(item);
                }
                else if (!item.IsCancelled && hasRecord)
                {
                    currentActiveAllocations.Add(item);
                }
            }

            if (allocationsToDeactivate.Any())
            {
                if (allocationsToDeactivate.Any(a => a.IsPaid))
                {
                    throw new BusinessException(_translationServiceRGSL.Translate("PAS_INV_PROFIT_ALLOCATION_CANCEL_PAID_EXISTS"));
                }

                _repository.DeactivateAllocations(allocationsToDeactivate.Select(a => a.AllocationId), operationStartTime);
            }

            if (allocationsToActivate.Any())
            {
                _repository.ReactivateAllocations(allocationsToActivate.Select(a => a.AllocationId), operationStartTime);
            }

            if (allocationsToAdd.Any())
            {
                _repository.CreateAllocations(allocationsToAdd);
            }

            var allocatedInvestProfits = investProfitRecords
                .Where(r => allocationsToAdd.Any(ad => ad.RecordId == r.RecordId) ||
            allocationsToActivate.Any(ac => ac.RecordId == r.RecordId) ||
            currentActiveAllocations.Any(nc => nc.RecordId == r.RecordId));

            return allocatedInvestProfits.Select(p => new AllocatedRecordDomainDTO() { Rate = p.Rate, PaymentType = p.PaymentTypeCode });
        }

        public void CancellAllDocumentAllocations(CancelAllocationRequestDomain request)
        {
            _repository.CancellAllDocumentAllocations(request);
        }

        public void SetAllDocumentAllocationsToPaid(SetAllocationToPaidRequestDomain request)
        {
            _repository.SetAllDocumentAllocationsToPaid(request);
        }

        public IEnumerable<AllocatedRecordDomainDTO> AllocateClaimInvestmentProfit(AllocationRequestDomain request)
        {
            var operationStartTime = DateTime.Now;
            var investProfitRecords = _repository.GetInvestProfitRecordsForClaimAllocation(request.ContractNumber, request.PaymentTypes);

            List<InvestmentProfitAllocationDomainDTO> existingAllocations;

            if (investProfitRecords.Count > 0)
            {
                existingAllocations = _repository.GetRelatedAllocations(request.ReferenceNumber, request.ReferenceConfName, investProfitRecords.Select(a => a.RecordId));
            }
            else
            {
                existingAllocations = _repository.GetRelatedAllocations(request.ReferenceNumber, request.ReferenceConfName);
            }

            var currentDocumentAllocations = existingAllocations.Where(a => a.ReferenceNumber == request.ReferenceNumber && a.ReferenceConfiguration == request.ReferenceConfName);
            var otherDocumentAllocations = existingAllocations.Where(a => a.ReferenceNumber != request.ReferenceNumber || a.ReferenceConfiguration != request.ReferenceConfName);

            var recordsReadyForAllocation = investProfitRecords.Where(r => !otherDocumentAllocations.Any(a => a.RecordId == r.RecordId && !a.IsCancelled));
            var latestRecord = recordsReadyForAllocation.OrderByDescending(r => r.CalculationDate).FirstOrDefault();
            var currentDocActiveAllocation = currentDocumentAllocations.SingleOrDefault(a => !a.IsCancelled);
            var allocationResult = new List<AllocatedRecordDomainDTO>();

            if (latestRecord == null)
            {
                if (currentDocActiveAllocation != null)
                {
                    _repository.DeactivateAllocations(new List<Guid>() { currentDocActiveAllocation.AllocationId }, operationStartTime);                   
                }

                return allocationResult;
            }

            if (currentDocActiveAllocation != null)
            {
                if (currentDocActiveAllocation.RecordId == latestRecord.RecordId)
                {
                    allocationResult.Add(new AllocatedRecordDomainDTO() { Rate = latestRecord.Rate, PaymentType = latestRecord.PaymentTypeCode });
                    return allocationResult;
                }

                _repository.DeactivateAllocations(new List<Guid>() { currentDocActiveAllocation.AllocationId }, operationStartTime);
            }

            var latestRecordAllocation = currentDocumentAllocations.SingleOrDefault(a => a.RecordId == latestRecord.RecordId);

            if (latestRecordAllocation != null)
            {
                _repository.ReactivateAllocations(new List<Guid>() { latestRecordAllocation.AllocationId }, operationStartTime);
            }
            else
            {
                var allocationToAdd = new InvestmentProfitAllocationDomainDTO()
                {
                    AllocationId = Guid.NewGuid(),
                    RecordId = latestRecord.RecordId,
                    ReferenceNumber = request.ReferenceNumber,
                    ReferenceConfiguration = request.ReferenceConfName,
                    IsCancelled = false,
                    IsPaid = false,
                    LoadDate = operationStartTime
                };

                _repository.CreateAllocations(new List<InvestmentProfitAllocationDomainDTO>() { allocationToAdd });
            }

            allocationResult.Add(new AllocatedRecordDomainDTO() { Rate = latestRecord.Rate, PaymentType = latestRecord.PaymentTypeCode });
            return allocationResult;
        }
    }
}
