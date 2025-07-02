using Adacta.AdInsure.RGSL.Common.Domain.AnalyticalSubsystem.Repositories;
using System;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Common.Infrastructure.AnalyticalSubsystem.Repositories
{
    class AssDataEditorRepository : IAssDataEditorRepository
    {
        private readonly Framework.Core.Data.Orm.DatabaseFactory _databaseFactory;

        public AssDataEditorRepository(Framework.Core.Data.Orm.DatabaseFactory databaseFactory)
        {
            _databaseFactory = databaseFactory;
        }

        public int UpdateAssTable(string tableName, DateTime loadDate, string setCondition, string hashKeyColumn, IList<string> attributeColumns, IList<string> hashKeys)
        {
            string hashSetCondition = "HASH_DIFF=CONVERT(VARCHAR(32), HashBytes('MD5', concat(" + string.Join(",':',", attributeColumns) + ")), 2)";
            string updateQuery2 = $"update {tableName} set LOAD_DATE=@0,{hashSetCondition},{setCondition} where {hashKeyColumn} in (@1)";

            string updateQuery = $@"update t
set LOAD_DATE=@0,{hashSetCondition},{setCondition}
from {tableName} t
where 1=1
    and t.LOAD_DATE = (SELECT MAX(f.LOAD_DATE) FROM {tableName} f WHERE f.{hashKeyColumn} = t.{hashKeyColumn})
    and {hashKeyColumn} in (@1)
";

            using var db = _databaseFactory.CreateDatabase();
            return db.Execute(updateQuery, loadDate, hashKeys);
        }
    }
}
