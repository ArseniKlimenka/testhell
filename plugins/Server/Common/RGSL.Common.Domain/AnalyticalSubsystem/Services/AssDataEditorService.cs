using Adacta.AdInsure.Framework.Core.Business;
using Adacta.AdInsure.Framework.Core.Transactions;
using Adacta.AdInsure.RGSL.Common.API.Shared.Requests;
using Adacta.AdInsure.RGSL.Common.Domain.AnalyticalSubsystem.Interfaces;
using Adacta.AdInsure.RGSL.Common.Domain.AnalyticalSubsystem.Repositories;
using System.Collections.Generic;
using System.Linq;

namespace Adacta.AdInsure.RGSL.Common.Domain.AnalyticalSubsystem.Services
{
    class AssDataEditorService : IAssDataEditorService
    {
        private readonly IAssDataEditorRepository _assDataEditorRepository;

        Dictionary<string, AssTableItem[]> _tables = new Dictionary<string, AssTableItem[]>
        {
            { "ACC_IMPL.RSD_ITEM_SAT", new AssTableItem[]
                {
                    new AssTableItem { Name = "RSD_ITEM_HKEY", IsHashKey = true },
                    new AssTableItem { Name = "IS_DELETED" },
                    new AssTableItem { Name = "POSTING_DATE" },
                    new AssTableItem { Name = "DEADLINE_DATE" },
                    new AssTableItem { Name = "OVERDUE_DAYS" },
                    new AssTableItem { Name = "AMOUNT" },
                    new AssTableItem { Name = "OPEN_AMOUNT" },
                    new AssTableItem { Name = "OPEN_AMOUNT_NO_RSD" },
                    new AssTableItem { Name = "RSD_RATE" },
                    new AssTableItem { Name = "RSD_AMOUNT" },
                }
            },
            { "ACC_IMPL.PORTFOLIO_TRANSFER_ITEM_SAT", new AssTableItem[]
                {
                    new AssTableItem { Name = "PORTFOLIO_TRANSFER_ITEM_HKEY", IsHashKey = true },
                    new AssTableItem { Name = "IS_DELETED" },
                    new AssTableItem { Name = "START_DATE" },
                    new AssTableItem { Name = "HOLDER_NAME" },
                    new AssTableItem { Name = "PRODUCT_DESC" },
                    new AssTableItem { Name = "CODE_NAME" },
                    new AssTableItem { Name = "USERNAME" },
                    new AssTableItem { Name = "TRANSFER_STATE" },
                }
            }
        };

        public AssDataEditorService(IAssDataEditorRepository assDataEditorRepository)
        {
            _assDataEditorRepository = assDataEditorRepository;
        }

        [Transaction]
        public int DatabaseUpdate(AssDataEditorUpdateRequest request)
        {
            var loadDate = BusinessContext.Current.GetClock().BusinessTimeUtc;

            int count = 0;

            foreach (var tableUpdate in request.TableUpdates)
            {
                if (!_tables.TryGetValue(tableUpdate.TableName, out var table))
                {
                    throw new KeyNotFoundException("Database table with the name " + tableUpdate.TableName + " was not found!");
                }

                string hashKeyColumn = table.Where(_ => _.IsHashKey).Single().Name;
                var attributeColumns = table.Where(cd => !cd.IsHashKey).Select(cd => cd.Name).ToList();
                count += _assDataEditorRepository.UpdateAssTable(tableUpdate.TableName, loadDate, tableUpdate.SetCondition, hashKeyColumn, attributeColumns, tableUpdate.Hkeys);
            }

            return count;
        }

        class AssTableItem
        {
            public string Name { get; set; }
            public bool IsHashKey { get; set; }
        }
    }
}
