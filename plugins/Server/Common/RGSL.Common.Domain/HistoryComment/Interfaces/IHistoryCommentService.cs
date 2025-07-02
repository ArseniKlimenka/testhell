using Adacta.AdInsure.RGSL.Common.API.Shared.HistoryComment.DTOs;
using Adacta.AdInsure.RGSL.Common.API.Shared.Requests;
using Adacta.AdInsure.RGSL.Common.API.Shared.Responses;

namespace Adacta.AdInsure.RGSL.Common.Domain.HistoryComment.Interfaces
{
	public interface IHistoryCommentService
	{
		HistoryCommentInsertUpdateResponse Add(HistoryCommentDto comment);
		void Delete(HistoryCommentDeleteRequest request);
		HistoryCommentInsertUpdateResponse Update(HistoryCommentDto comment);
	}
}
