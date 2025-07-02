using Adacta.AdInsure.RGSL.Common.API.Shared.HistoryComment.DTOs;
using Adacta.AdInsure.RGSL.Common.Domain.HistoryComment.Repositories;
using Adacta.AdInsure.RGSL.Common.Infrastructure.HistoryComment.Queries;
using System;

namespace Adacta.AdInsure.RGSL.Common.Infrastructure.HistoryComment.Repositories
{
	public class HistoryCommentRepository : IHistoryCommentRepository
	{

		private readonly Framework.Core.Data.Orm.DatabaseFactory _databaseFactory;

		public HistoryCommentRepository(Framework.Core.Data.Orm.DatabaseFactory databaseFactory)
		{
			_databaseFactory = databaseFactory;
		}

		public void DeleteComment(string origCommentId)
		{
			using var db = _databaseFactory.CreateDatabase();

			string sqlQuery = HistoryCommentQueries.DeleteComment();

			db.Execute(sqlQuery, origCommentId);
		}

		public void InsertComment(HistoryCommentDto comment)
		{
			using var db = _databaseFactory.CreateDatabase();

			string sqlQuery = HistoryCommentQueries.InsertComment();

			db.Insert(sqlQuery, "comment_id", (object) comment);
		}
	}
}
