using Adacta.AdInsure.Framework.Core.Exceptions;
using Adacta.AdInsure.RGSL.Common.API.Shared.Services;
using Adacta.AdInsure.RGSL.PAS.Domain.InvestmentProfit;
using Adacta.AdInsure.RGSL.PAS.Domain.InvestmentProfit.DTO;
using Adacta.AdInsure.RGSL.PAS.Domain.InvestmentProfit.Repositories;
using Adacta.AdInsure.RGSL.PAS.Infrastructure.InvestmentProfit.Queries;
using NPoco;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Adacta.AdInsure.RGSL.PAS.Infrastructure.InvestmentProfit.Repositories
{
    public class InvestmentProfitRepository : IInvestmentProfitRepository
    {
        private readonly Framework.Core.Data.Orm.DatabaseFactory _databaseFactory;
        private readonly ITranslationServiceRGSL _translationServiceRGSL;

        public InvestmentProfitRepository(Framework.Core.Data.Orm.DatabaseFactory databaseFactory, ITranslationServiceRGSL translationServiceRGSL)
        {
            _databaseFactory = databaseFactory;
            _translationServiceRGSL = translationServiceRGSL;
        }

        public void UpsertInvestmentProfitRecord(InvestmentProfitRecordDomainDTO record)
        {
            var operationStartTime = DateTime.Now;
            using var db = _databaseFactory.CreateDatabase();
            var builder = new SqlBuilder();
            var template = builder.AddTemplate(InvestmentProfitQueries.SelectInvestProfitRecords());
            builder.Where("p.CONTRACT_NUMBER = @0 AND p.INV_PROFIT_CALC_DATE = @1 AND p.INV_PROFIT_PAY_TYPE_CODE = @2", record.ContractNumber, record.CalculationDate, record.PaymentTypeCode);

            var existingItem = db.Fetch<InvestmentProfitRecordDomainDTO>(template).SingleOrDefault();
            record.LoadDate = operationStartTime;

            if (existingItem == null)
            {
                record.RecordId = Guid.NewGuid();
                db.Insert(record);
            }
            else
            {

                builder = new SqlBuilder();
                template = builder.AddTemplate(InvestmentProfitQueries.SelectInvestProfitAllocations());
                builder.Where("a.INV_PROFIT_ROW_ID = @0", existingItem.RecordId);
                var existingAllocations = db.Fetch<InvestmentProfitAllocationDomainDTO>(template);

                if (existingAllocations.Any(a => !a.IsCancelled))
                {
                    throw new BusinessException(_translationServiceRGSL.Translate("PAS_INV_PROFIT_UPDATE_ALLOCATION_EXISTS", record.RecordId));
                }

                record.RecordId = existingItem.RecordId;
                db.Update(record);
            }
        }

        public void CancellAllDocumentAllocations(CancelAllocationRequestDomain request)
        {
            var operationStartTime = DateTime.Now;
            using var db = _databaseFactory.CreateDatabase();
            var builder = new SqlBuilder();
            var template = builder.AddTemplate(InvestmentProfitQueries.SelectInvestProfitAllocations());
            builder.Where("a.REFERENCE_NUMBER = @0 AND a.REFERENCE_CONF = @1", request.ReferenceNumber, request.ReferenceConfName);
            var existingAllocations = db.Fetch<InvestmentProfitAllocationDomainDTO>(template);

            if (existingAllocations.Any())
            {
                if (existingAllocations.Any(a => a.IsPaid))
                {
                    throw new BusinessException(_translationServiceRGSL.Translate("PAS_INV_PROFIT_ALLOCATION_CANCEL_PAID_EXISTS"));
                }

                builder = new SqlBuilder();
                template = builder.AddTemplate("UPDATE PAS_IMPL.INVEST_PROFIT_ALLOCATION SET IS_CANCELLED = 1, LOAD_DATE = @0 WHERE /**where**/", operationStartTime);
                builder.Where("ALLOCATION_ID IN (@0)", existingAllocations.Select(a => a.AllocationId));
                db.Execute(template);
            } 
        }

        public void SetAllDocumentAllocationsToPaid(SetAllocationToPaidRequestDomain request)
        {
            var operationStartTime = DateTime.Now;
            using var db = _databaseFactory.CreateDatabase();
            var builder = new SqlBuilder();
            var template = builder.AddTemplate(InvestmentProfitQueries.SelectInvestProfitAllocations());
            builder.Where("a.REFERENCE_NUMBER = @0 AND a.REFERENCE_CONF = @1 AND a.IS_CANCELLED = 0", request.ReferenceNumber, request.ReferenceConfName);
            var existingAllocations = db.Fetch<InvestmentProfitAllocationDomainDTO>(template);

            if (existingAllocations.Any())
            {
                builder = new SqlBuilder();
                template = builder.AddTemplate("UPDATE PAS_IMPL.INVEST_PROFIT_ALLOCATION SET IS_PAID = 1, LOAD_DATE = @0 WHERE /**where**/", operationStartTime);
                builder.Where("ALLOCATION_ID IN (@0)", existingAllocations.Select(a => a.AllocationId));
                db.Execute(template);
            }
        }

        public List<InvestmentProfitRecordDomainDTO> GetInvestProfitRecordsForAllocation(string contractNumber, DateTime eventDate, IEnumerable<int> paymentTypes)
        {
            using var db = _databaseFactory.CreateDatabase();
            var builder = new SqlBuilder();
            var template = builder.AddTemplate(InvestmentProfitQueries.SelectInvestProfitRecords());
            builder.Where("p.CONTRACT_NUMBER = @0 AND p.INV_PROFIT_CALC_DATE = @1 AND p.INV_PROFIT_PAY_TYPE_CODE IN (@2)", contractNumber, eventDate, paymentTypes);
            var investProfitRecords = db.Fetch<InvestmentProfitRecordDomainDTO>(template);
            return investProfitRecords;
        }

        public List<InvestmentProfitRecordDomainDTO> GetInvestProfitRecordsForClaimAllocation(string contractNumber, IEnumerable<int> paymentTypes)
        {
            using var db = _databaseFactory.CreateDatabase();
            var builder = new SqlBuilder();
            var template = builder.AddTemplate(InvestmentProfitQueries.SelectInvestProfitRecords());
            builder.Where("p.CONTRACT_NUMBER = @0 AND p.INV_PROFIT_PAY_TYPE_CODE IN (@1)", contractNumber, paymentTypes);
            var investProfitRecords = db.Fetch<InvestmentProfitRecordDomainDTO>(template);
            return investProfitRecords;
        }

        public List<InvestmentProfitAllocationDomainDTO> GetRelatedAllocations(string referenceNumber, string configurationName)
        {
            using var db = _databaseFactory.CreateDatabase();
            var builder = new SqlBuilder();
            var template = builder.AddTemplate(InvestmentProfitQueries.SelectInvestProfitAllocations());
            builder.Where("a.REFERENCE_NUMBER = @0 AND a.REFERENCE_CONF = @1", referenceNumber, configurationName);
            var existingAllocations = db.Fetch<InvestmentProfitAllocationDomainDTO>(template);
            return existingAllocations;
        }

        public List<InvestmentProfitAllocationDomainDTO> GetRelatedAllocations(string referenceNumber, string configurationName, IEnumerable<Guid> additionalRecordids)
        {
            using var db = _databaseFactory.CreateDatabase();
            var builder = new SqlBuilder();
            var template = builder.AddTemplate(InvestmentProfitQueries.SelectInvestProfitAllocations());
            builder.Where("(a.REFERENCE_NUMBER = @0 AND a.REFERENCE_CONF = @1) OR a.INV_PROFIT_ROW_ID IN (@2)", referenceNumber, configurationName, additionalRecordids);
            var existingAllocations = db.Fetch<InvestmentProfitAllocationDomainDTO>(template);
            return existingAllocations;
        }

        public void DeactivateAllocations(IEnumerable<Guid> allcoationsIds, DateTime processingStartTime)
        {
            using var db = _databaseFactory.CreateDatabase();
            var builder = new SqlBuilder();
            var template = builder.AddTemplate("UPDATE PAS_IMPL.INVEST_PROFIT_ALLOCATION SET IS_CANCELLED = 1, LOAD_DATE = @0 WHERE /**where**/", processingStartTime);
            builder.Where("ALLOCATION_ID IN (@0)", allcoationsIds);
            db.Execute(template);
        }

        public void ReactivateAllocations(IEnumerable<Guid> allcoationsIds, DateTime processingStartTime)
        {
            using var db = _databaseFactory.CreateDatabase();
            var builder = new SqlBuilder();
            var template = builder.AddTemplate("UPDATE PAS_IMPL.INVEST_PROFIT_ALLOCATION SET IS_CANCELLED = 0, LOAD_DATE = @0 WHERE /**where**/", processingStartTime);
            builder.Where("ALLOCATION_ID IN (@0)", allcoationsIds);
            db.Execute(template);
        }

        public void CreateAllocations(IEnumerable<InvestmentProfitAllocationDomainDTO> allocations)
        {
            using var db = _databaseFactory.CreateDatabase();
            db.InsertBulk(allocations);
        }
    }
}