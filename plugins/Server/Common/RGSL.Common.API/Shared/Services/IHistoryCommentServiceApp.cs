using Adacta.AdInsure.RGSL.Common.API.Shared.HistoryComment.DTOs;
using Adacta.AdInsure.RGSL.Common.API.Shared.Requests;
using Adacta.AdInsure.RGSL.Common.API.Shared.Responses;

namespace Adacta.AdInsure.RGSL.Common.API.Shared.Services
{
	public interface IHistoryCommentServiceApp
	{
		HistoryCommentInsertUpdateResponse AddComment(HistoryCommentDto comment);
		HistoryCommentInsertUpdateResponse EditComment(HistoryCommentDto comment);
		void DeleteComment(HistoryCommentDeleteRequest request);
	}
}
