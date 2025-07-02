using NPoco;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace Adacta.AdInsure.RGSL.Common.Domain
{
    public static class RepositoryHelper
    {
        public static void CheckRowUpdatedResult(int numberOfRowsAffected, int expected = 1)
        {
            if (numberOfRowsAffected != expected)
            {
                throw new InvalidOperationException($"{numberOfRowsAffected} rows was updated, but expected: {expected}");
            }
        }

        public static void ValidateCriteria(bool criteriaDefined)
        {
            if (!criteriaDefined)
            {
                throw new ArgumentException("No criteria defined!");
            }
        }

        public static void BulkInsert<T>(IDatabase db, string sql, IEnumerable<T> pocos)
        {
            var items = pocos.ToList();
            sql = PrepareBulkQuery(sql);
            if (items.Count > 100)
            {
                db.InsertBulk(sql, items);
            }
            else
            {
                foreach (var item in items)
                {
                    db.Execute(sql, item);
                }
            }
        }

        private static string PrepareBulkQuery(string sql)
        {
            var match = Regex.Match(sql, @"insert\s+into\s+(?<table>[a-zA-Z0-9_.#@]+)\s*\((?<fields1>[a-zA-Z0-9_,\s]+)\)\s*values\s*\((?<fields2>[a-zA-Z0-9@_,\s]+)\)", RegexOptions.IgnoreCase);

            if (!match.Success)
            {
                throw new ArgumentException("Incorrect SQL format");
            }

            string table = match.Groups["table"].Value;
            string[] fields1 = match.Groups["fields1"].Value.Split(',');
            string[] fields2 = match.Groups["fields2"].Value.Split(',');

            for (int i = 0; i < fields1.Length; i++)
            {
                fields1[i] = fields1[i].Trim().ToUpperInvariant();
            }
            for (int i = 0; i < fields2.Length; i++)
            {
                fields2[i] = fields2[i].Trim();
            }

            sql = $"insert into {table} ({string.Join(',', fields1)}) values ({string.Join(',', fields2)})";

            return sql;
        }

    }
}
