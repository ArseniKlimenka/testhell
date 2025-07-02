using Adacta.AdInsure.RGSL.Common.API.Shared.HistoryComment.DTOs;
using Adacta.AdInsure.RGSL.Common.API.Shared.Requests;
using Adacta.AdInsure.RGSL.Common.API.Shared.Responses;
using Adacta.AdInsure.RGSL.Common.API.Shared.Services;
using Adacta.AdInsure.RGSL.Common.Domain.HistoryComment.Interfaces;

namespace Adacta.AdInsure.RGSL.Common.ApplicationServices.Shared.Services
{
	public class HistoryCommentServiceApp : IHistoryCommentServiceApp
	{
		private readonly IHistoryCommentService _historyCommentService;

		public HistoryCommentServiceApp(IHistoryCommentService historyCommentService)
		{
			_historyCommentService = historyCommentService;
		}

		public HistoryCommentInsertUpdateResponse AddComment(HistoryCommentDto comment)
		{
			return _historyCommentService.Add(comment);
		}

		public void DeleteComment(HistoryCommentDeleteRequest request)
		{
			_historyCommentService.Delete(request);
		}

		public HistoryCommentInsertUpdateResponse EditComment(HistoryCommentDto comment)
		{
			return _historyCommentService.Update(comment);
		}
	}
}
