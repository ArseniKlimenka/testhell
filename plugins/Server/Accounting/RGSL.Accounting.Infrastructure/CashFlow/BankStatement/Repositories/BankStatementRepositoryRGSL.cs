using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Adacta.AdInsure.Framework.Core.ApplicationContext;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Repositories;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Requests;
using Adacta.AdInsure.RGSL.Accounting.Infrastructure.CashFlow.BankStatement.Queries;
using Adacta.AdInsure.RGSL.Common.Domain;
using NPoco;

namespace Adacta.AdInsure.RGSL.Accounting.Infrastructure.CashFlow.BankStatement.Repositories
{
    public class BankStatementRepositoryRGSL : IBankStatementRepositoryRGSL
    {
        private readonly Framework.Core.Data.Orm.DatabaseFactory _databaseFactory;

        public BankStatementRepositoryRGSL(Framework.Core.Data.Orm.DatabaseFactory databaseFactory)
        {
            _databaseFactory = databaseFactory;
        }

        public void CreateBankStatementItem(BankStatementItemRGSL bankStatementItem)
        {
            string sql = BankStatementQueriesRGSL.InsertBankStatementItem();

            using var db = _databaseFactory.CreateDatabase();

            // Insert an bank statement item id and get its generated id
            var id = db.Insert(sql, "bank_statement_item_id", (object) bankStatementItem);
            bankStatementItem.BankStatementItemId = Convert.ToInt64(id, CultureInfo.InvariantCulture);
        }

        public void UpdateBankStatementItem(BankStatementItemRGSL bankStatementItem)
        {
            if (!bankStatementItem.BankStatementItemId.HasValue)
            {
                throw new NullReferenceException("BSI.ID is empty!");
            }

            string sql = BankStatementQueriesRGSL.UpdateBankStatementItem();

            using var db = _databaseFactory.CreateDatabase();

            db.Execute(sql, bankStatementItem);
        }

        public IList<BankStatementItemRGSL> GetBankStatementItems(GetBankStatementItemRequest request)
        {
            string sql = BankStatementQueriesRGSL.SelectBankStatementItem();
            var builder = new SqlBuilder();
            var template = builder.AddTemplate(sql);
            bool criteriaDefined = false;

            if (request.BankStatementItemId.HasValue)
            {
                builder.Where("bsi.bank_statement_item_id = @0", request.BankStatementItemId.Value);
                criteriaDefined = true;
            }

            if (request.BankStatementItemIds != null)
            {
                builder.Where("bsi.bank_statement_item_id in (@0)", request.BankStatementItemIds);
                criteriaDefined = true;
            }

            if (request.RgslGuid.HasValue)
            {
                builder.Where("bsi.RGSL_GUID = @0", request.RgslGuid.Value);
                criteriaDefined = true;
            }

            if (request.MinId.HasValue)
            {
                builder.Where("bsi.bank_statement_item_id >= @0", request.MinId.Value);
            }

            if (request.MaxId.HasValue)
            {
                builder.Where("bsi.bank_statement_item_id <= @0", request.MaxId.Value);
            }

            if (request.MinId.HasValue & request.MaxId.HasValue)
            {
                criteriaDefined = true;
            }

            RepositoryHelper.ValidateCriteria(criteriaDefined);
            using var db = _databaseFactory.CreateDatabase();
            return db.Fetch<BankStatementItemRGSL>(template);
        }

        public void SetStatus(SetStatusRequest request)
        {
            var obj = new
            {
                BankStatementItemId = request.BankStatementItemId,
                StatusId = (int) request.NewStatus,
            };

            using var db = _databaseFactory.CreateDatabase();

            int resp = db.Execute(BankStatementQueriesRGSL.UpdateStatus(), obj);
            RepositoryHelper.CheckRowUpdatedResult(resp);
        }

        public void SetStatusAndOpenAmount(SetStatusRequest request)
        {
            var obj = new
            {
                BankStatementItemId = request.BankStatementItemId,
                OpenAmount = request.OpenAmount,
                StatusId = (int) request.NewStatus,
            };

            using var db = _databaseFactory.CreateDatabase();

            int resp = db.Execute(BankStatementQueriesRGSL.UpdateStatusAndOpenAmount(), obj);
            RepositoryHelper.CheckRowUpdatedResult(resp);
        }

        public void UpdatePaymentDescription(BankStatementItemRGSL bankStatementItem, string newPaymentDescription)
        {
            var obj = new
            {
                bankStatementItemId = bankStatementItem.BankStatementItemId.Value,
                newPaymentDescription,
            };

            using var db = _databaseFactory.CreateDatabase();

            int resp = db.Execute(BankStatementQueriesRGSL.UpdatePaymentDescription(), obj);
            RepositoryHelper.CheckRowUpdatedResult(resp);
            bankStatementItem.PaymentDescription = newPaymentDescription;
        }

        public void InsertBankStatementItemHistory(BankStatementItemHistory history)
        {
            using var db = _databaseFactory.CreateDatabase();

            string sql = BankStatementQueriesRGSL.InsertBankStatementItemHistory();
            db.Insert(sql, history);
        }

        public void MarkPaymentToReload(Guid rgslGuid)
        {
            var obj = new
            {
                rgslGuid,
                statusIds = new[] { BankStatementItemStatusRGSL.NotAllocated },
            };

            using var db = _databaseFactory.CreateDatabase();

            db.Execute(BankStatementQueriesRGSL.MarkPaymentToReload(), obj);
        }

        public List<RegistryMaskSettingsItem> GetAllRegistryMasks()
        {
            string sql = "select ACCOUNT_NUMBER, PAYMENT_DESCRIPTION from acc_impl.BSI_IS_REGISTRY_MASK";

            using var db = _databaseFactory.CreateDatabase();

            return db.Fetch<RegistryMaskSettingsItem>(sql);
        }

        public void SetRegistryMaskSettings(SetRegistryMaskSettingsRequest request)
        {
            var loadDate = DateTime.Now;
            string user = ApplicationContext.UserProfile.Username;
            string clientId = ApplicationContext.ClientDefinition.ClientId;

            var items = request.Rules.Select(_ => new RegistryMask()
            {
                LoadDate = loadDate,
                Username = user,
                ClientId = clientId,
                AccountNumber = _.AccountNumber,
                PaymentDescription = _.PaymentDescription,
            });

            string sqlInsert = "insert into acc_impl.BSI_IS_REGISTRY_MASK (ACCOUNT_NUMBER, PAYMENT_DESCRIPTION) values (@AccountNumber, @PaymentDescription)";
            string sqlInsertHist = "insert into acc_impl.BSI_IS_REGISTRY_MASK_HISTORY (LOAD_DATE, USERNAME, CLIENT_ID, ACCOUNT_NUMBER, PAYMENT_DESCRIPTION) values (@LoadDate, @Username, @ClientId, @AccountNumber, @PaymentDescription)";

            using var db = _databaseFactory.CreateDatabase();

            db.Execute("delete from acc_impl.BSI_IS_REGISTRY_MASK");
            RepositoryHelper.BulkInsert(db, sqlInsert, items);
            RepositoryHelper.BulkInsert(db, sqlInsertHist, items);
        }

        public void SetIsRegistry(long bankStatementItemId, bool isRegistry)
        {
            string sql = "update acc_impl.BANK_STATEMENT_ITEM set IS_REGISTRY = @1 where BANK_STATEMENT_ITEM_ID = @0";
            using var db = _databaseFactory.CreateDatabase();
            db.Execute(sql, bankStatementItemId, isRegistry);
        }

        public void InsertXMLMessageItemHistory(BankStatementXMLMessageItemHistory history)
        {
            var items = history.Allocations.Select(_ => new Allocation()
            {
                BankStatementItemId = history.BankStatementItemId,
                BankStatementItemNo = history.BankStatementItemNo,
                AuthorizedPersonTabNumber = history.AuthorizedPersonTabNumber,
                AllocationId = _.AllocationId,
                DocumentNo = _.DocumentNo,
                CreateDate = history.CreateDate,
                UserId = history.UserId
            });

            using var db = _databaseFactory.CreateDatabase();

            string sql = BankStatementQueriesRGSL.InsertXMLMessageItemHistory();
            RepositoryHelper.BulkInsert(db, sql, items);
        }

        record RegistryMask
        {
            public DateTime LoadDate { get; set; }
            public string Username { get; set; }
            public string ClientId { get; set; }
            public string AccountNumber { get; set; }
            public string PaymentDescription { get; set; }
        }

        record Allocation
        {
            public long? XMLMessageItemId { get; set; }
            public long BankStatementItemId { get; set; }
            public string BankStatementItemNo { get; set; }
            public string AuthorizedPersonTabNumber { get; set; }
            public long? AllocationId { get; set; }
            public string DocumentNo { get; set; }
            public DateTime CreateDate { get; set; }
            public Guid UserId { get; set; }
        }
    }
}
