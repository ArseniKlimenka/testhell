using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Requests;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission.Responses;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Constants;
using Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Act;
using Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Act.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Act.Requests;
using Adacta.AdInsure.RGSL.Accounting.Infrastructure.Commission.Act.Queries;
using Adacta.AdInsure.RGSL.Common.Domain;
using NPoco;

namespace Adacta.AdInsure.RGSL.Accounting.Infrastructure.Commission.Act.Repositories
{
    public class CommissionActRepository : ICommissionActRepository
    {
        private readonly Framework.Core.Data.Orm.DatabaseFactory _databaseFactory;

        public CommissionActRepository(Framework.Core.Data.Orm.DatabaseFactory databaseFactory)
        {
            _databaseFactory = databaseFactory;
        }

        public decimal GetVatRate(string agentAgreementNumber, DateTime issueDate)
        {
            using var db = _databaseFactory.CreateDatabase();

            string sql = CommissionActQueries.SelectVatRate();
            decimal vatRate = db.SingleOrDefault<decimal>(sql, agentAgreementNumber, issueDate);
            return vatRate;
        }

        public void InsertAct(CommissionAct act)
        {
            using var db = _databaseFactory.CreateDatabase();

            string sql = CommissionActQueries.InsertAct();
            object resp = db.Insert(sql, "act_id", (object) act);
            act.ActId = Convert.ToInt64(resp, CultureInfo.InvariantCulture);

            var products = GetProductFilterItems(act);
            if (products.Any())
            {
                UpdateProducts(db, products, act.ActId.Value);
            }
        }

        public void InsertActItem(List<CommissionActItem> actItems)
        {
            using var db = _databaseFactory.CreateDatabase();

            string sql = CommissionActQueries.InsertActItem();
            RepositoryHelper.BulkInsert(db, sql, actItems);
        }

        public void InsertActItemPc(List<CommissionActItemPc> actItemPcs)
        {
            using var db = _databaseFactory.CreateDatabase();

            string sql = CommissionActQueries.InsertActItemPc();
            RepositoryHelper.BulkInsert(db, sql, actItemPcs);
        }

        public void UpdateAct(CommissionAct act)
        {
            using var db = _databaseFactory.CreateDatabase();

            string sql = CommissionActQueries.UpdateAct();
            int resp = db.Execute(sql, act);
            RepositoryHelper.CheckRowUpdatedResult(resp);

            var products = GetProductFilterItems(act);
            UpdateProducts(db, products, act.ActId.Value);
        }

        public void UpdateItemStatus(long actId, CommissionActItemStatusId newStatus, IList<long> itemIds)
        {
            using var db = _databaseFactory.CreateDatabase();

            var builder = new SqlBuilder();
            var template = builder.AddTemplate("update acc_impl.CA_ACT_ITEM set status_id = @0 where /**where**/", newStatus);

            builder.Where("act_id = @0", actId);
            builder.Where("status_id != @0", CommissionActItemStatusId.Annulled);

            if (itemIds != null)
            {
                builder.Where("act_item_id in (@0)", (object) itemIds);
            }

            int resp = db.Execute(template);
        }

        public void MigrateActHistory(string actNo)
        {
            using var db = _databaseFactory.CreateDatabase();

            string sql = CommissionActQueries.MigrateActHistory();
            db.Execute(sql, actNo);
        }

        public void UpdateActHeader(long actId)
        {
            using var db = _databaseFactory.CreateDatabase();

            string sql = CommissionActQueries.UpdateActHeader();
            int resp = db.Execute(sql, actId);
            RepositoryHelper.CheckRowUpdatedResult(resp);
        }

        public void DeleteItems(long actId, IList<long> itemIds)
        {
            using var db = _databaseFactory.CreateDatabase();

            var builder = new SqlBuilder();
            var template = builder.AddTemplate(CommissionActQueries.DeleteItemsAndItemPcs());

            builder.Where("act_id = @0", actId);

            if (itemIds != null)
            {
                builder.Where("act_item_id in (@0)", (object) itemIds);
            }

            db.Execute(template);
        }

        public void UnleashPcFromAct(long actId)
        {
            using var db = _databaseFactory.CreateDatabase();

            string sql = CommissionActQueries.Delete_UnleashPcFromAct();
            db.Execute(sql, actId);
        }

        public void CancelActItems(long actId, IList<long> itemIds)
        {
            var builder = new SqlBuilder();
            var template = builder.AddTemplate(CommissionActQueries.Update_CancelActItems());

            builder.Where("act_id = @0", actId);

            if (itemIds != null)
            {
                builder.Where("act_item_id in (@0)", (object) itemIds);
            }

            using var db = _databaseFactory.CreateDatabase();
            int resp = db.Execute(template);
        }

        public void ChangeItemCommRate(CommissionActItem item)
        {
            using var db = _databaseFactory.CreateDatabase();

            var builder = new SqlBuilder();
            var template = builder.AddTemplate(CommissionActQueries.UpdateItemCommRate(), item);

            int resp = db.Execute(template);
            RepositoryHelper.CheckRowUpdatedResult(resp);
        }

        public long GetActId(long actItemId)
        {
            using var db = _databaseFactory.CreateDatabase();
            return db.Single<long>("select ACT_ID from acc_impl.CA_ACT_ITEM where ACT_ITEM_ID = @0", actItemId);
        }

        public DateTime LockAct(long actId)
        {
            using var db = _databaseFactory.CreateDatabase();
            return db.Single<DateTime>("select last_updated from acc_impl.ca_act with (updlock) where act_id = @0", actId);
        }

        public IList<CommissionAct> GetActs(GetActsRequest request)
        {
            string sql = CommissionActQueries.SelectAct();
            var builder = new SqlBuilder();
            var template = builder.AddTemplate(sql);
            bool criteriaDefined = false;

            if (request.ActId.HasValue)
            {
                builder.Where("act.act_id = @0", request.ActId.Value);
                criteriaDefined = true;
            }

            if (request.ActNo != null)
            {
                builder.Where("act.ACT_NO = @0", request.ActNo);
                criteriaDefined = true;
            }

            RepositoryHelper.ValidateCriteria(criteriaDefined);
            using var db = _databaseFactory.CreateDatabase();
            var acts = db.Fetch<CommissionAct>(template);

            var actIds = acts.Select(_ => _.ActId.Value).ToList();
            var products = GetProductFilters(db, actIds);
            foreach (var act in acts)
            {
                var actProductFilters = products
                    .Where(_ => _.ActId == act.ActId.Value)
                    .ToList();
                SetProductFilterItems(act, actProductFilters);
            }

            return acts;
        }

        public IList<CommissionActItem> GetActItems(long actId, IList<long> itemIds, IList<string> documentNumbers, bool skipAnnulled)
        {
            string sql = CommissionActQueries.SelectActItems();
            var builder = new SqlBuilder();
            var template = builder.AddTemplate(sql, new { actId });

            if (itemIds != null)
            {
                builder.Where("act_item_id in (@0)", itemIds);
            }

            if (documentNumbers != null)
            {
                builder.Where("reference_no in (@0)", documentNumbers);
            }

            if (skipAnnulled)
            {
                builder.Where("status_id != 2");
            }

            using var db = _databaseFactory.CreateDatabase();
            return db.Fetch<CommissionActItem>(template);
        }

        public IList<ActAutoPopulationPc> GetAutoPopulationPc(CommissionAct act, IList<string> referenceNumbers)
        {
            string sql = CommissionActQueries.SelectAutoPopulation(act.IsDocCorrect);
            var builder = new SqlBuilder();
            var template = builder.AddTemplate(sql, act.ActId.Value);

            builder.WhereNamed("pc", "agentServPrv.service_provider_code = @0", act.AgentServiceProviderCode);
            builder.WhereNamed("aa", "aa.agent_agreement_number = @0", act.AgentAgreementNumber);

            if (referenceNumbers != null)
            {
                builder.WhereNamed("pc", "alc.document_no in (@0)", referenceNumbers);
            }

            if (act.ProductGroupInclude != null)
            {
                builder.WhereNamed("pc", "prod.product_group = @0", act.ProductGroupInclude);
            }

            if (act.ProductsInclude != null)
            {
                builder.WhereNamed("pc", "polsl.product_code in (@0)", act.ProductsInclude);
            }

            if (act.ProductGroupExclude != null)
            {
                builder.WhereNamed("pc", "prod.product_group <> @0", act.ProductGroupExclude);
            }

            if (act.ProductsExclude != null)
            {
                builder.WhereNamed("pc", "polsl.product_code not in (@0)", act.ProductsExclude);
            }

            builder.WhereNamed("pc", "alcp.due_date <= @0", act.ReportingPeriodTo);

            if (act.PeriodFrom.HasValue)
            {
                builder.WhereNamed("pc", "bsi.transaction_date >= @0", act.PeriodFrom.Value);
            }

            builder.WhereNamed("pc", "bsi.transaction_date <= @0", act.PeriodTo);

            using var db = _databaseFactory.CreateDatabase();
            db.OneTimeCommandTimeout = 60 * 30;
            return db.Fetch<ActAutoPopulationPc>(template);
        }

        public InstallmentAmountsResponse GetInstallmentAmounts(IList<InstallmentAmountsRequest> installmentAmountsRequest)
        {
            using var db = _databaseFactory.CreateDatabase();
            string table = "#INSTALLMENT_AMOUNT_FILTER";
            db.Execute($"create table {table} (REFERENCE_NO nvarchar(64) not null, DUE_DATE date not null)");
            RepositoryHelper.BulkInsert(db, $"insert into {table} (REFERENCE_NO, DUE_DATE) values (@ReferenceNo, @DueDate)", installmentAmountsRequest);

            string sql = CommissionActQueries.SelectInstallmentAmounts(table);
            var items = db.Fetch<InstallmentAmountsResponseItem>(sql);

            db.Execute($"drop table {table}");

            return new InstallmentAmountsResponse
            {
                Items = items,
            };
        }

        public void UpdateActItemJson(long itemId, string jsonData)
        {
            string sql = CommissionActQueries.UpdateActItemJson();
            var builder = new SqlBuilder();
            var template = builder.AddTemplate(sql, itemId, jsonData);

            using var db = _databaseFactory.CreateDatabase();
            db.Execute(template);
        }

        private static IList<ProductFilter> GetProductFilters(IDatabase db, IList<long> actIds)
        {
            string sql = CommissionActQueries.SelectProductFilters();

            var products = db.Fetch<ProductFilter>(sql, (object) actIds);
            return products;
        }

        private static void UpdateProducts(IDatabase db, IList<ProductFilter> products, long actId)
        {
            string table = "#PRODUCT_FILTER";

            db.Execute($"create table {table} (ACT_ID bigint, CODE nvarchar(255), EXCLUSIVE bit)");

            if (products.Any())
            {
                string bulkSql = CommissionActQueries.InsertProductFilters(table);
                RepositoryHelper.BulkInsert(db, bulkSql, products);
            }

            string updateSql = CommissionActQueries.ExecuteUpdateProductFilters(table);
            db.Execute(updateSql, actId);

            db.Execute($"drop table {table}");
        }

        private static IList<ProductFilter> GetProductFilterItems(CommissionAct act)
        {
            var productsExc = (act.ProductsExclude ?? Array.Empty<string>())
                .Distinct()
                .Select(_ => new ProductFilter { ActId = act.ActId.Value, Code = _, Exclusive = true })
                .ToList();
            var productsInc = (act.ProductsInclude ?? Array.Empty<string>())
                .Distinct()
                .Where(_ => !act.ProductsExclude.Contains(_))
                .Select(_ => new ProductFilter { ActId = act.ActId.Value, Code = _, Exclusive = false })
                .ToList();

            return productsInc
                .Concat(productsExc)
                .ToList();
        }

        private static void SetProductFilterItems(CommissionAct act, List<ProductFilter> actProductFilters)
        {
            if (actProductFilters.Count == 0)
            {
                return;
            }
            var include = actProductFilters.Where(_ => !_.Exclusive).Select(_ => _.Code).ToList();
            var exclude = actProductFilters.Where(_ => _.Exclusive).Select(_ => _.Code).ToList();
            if (include.Count != 0)
            {
                act.ProductsInclude = include;
            }
            if (exclude.Count != 0)
            {
                act.ProductsExclude = exclude;
            }
        }

        class ProductFilter
        {
            public long ActId { get; set; }
            public string Code { get; set; }
            public bool Exclusive { get; set; }
        }
    }
}
