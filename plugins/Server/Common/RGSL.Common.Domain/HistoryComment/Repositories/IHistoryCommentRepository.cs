using Adacta.AdInsure.RGSL.Common.API.Shared.HistoryComment.DTOs;

namespace Adacta.AdInsure.RGSL.Common.Domain.HistoryComment.Repositories
{
	public interface IHistoryCommentRepository
	{
		void InsertComment(HistoryCommentDto comment);
		void DeleteComment(string origCommentId);
	}
}
