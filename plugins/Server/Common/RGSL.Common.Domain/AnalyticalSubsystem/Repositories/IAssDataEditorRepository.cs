using System;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Common.Domain.AnalyticalSubsystem.Repositories
{
    public interface IAssDataEditorRepository
    {
        int UpdateAssTable(string tableName, DateTime loadDate, string setCondition, string hashKeyColumn, IList<string> attributeColumns, IList<string> hashKeys);
    }
}
