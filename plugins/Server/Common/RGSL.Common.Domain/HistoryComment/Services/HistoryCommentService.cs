using Adacta.AdInsure.RGSL.Common.API.Shared.HistoryComment.DTOs;
using Adacta.AdInsure.RGSL.Common.API.Shared.Requests;
using Adacta.AdInsure.RGSL.Common.API.Shared.Responses;
using Adacta.AdInsure.RGSL.Common.Domain.HistoryComment.Interfaces;
using Adacta.AdInsure.RGSL.Common.Domain.HistoryComment.Repositories;

namespace Adacta.AdInsure.RGSL.Common.Domain.HistoryComment.Services
{
	public class HistoryCommentService : IHistoryCommentService
	{
		private readonly IHistoryCommentRepository _historyCommentRepository;

		public HistoryCommentService(IHistoryCommentRepository historyCommentRepository)
		{
			_historyCommentRepository = historyCommentRepository;
		}

		public HistoryCommentInsertUpdateResponse Add(HistoryCommentDto comment)
		{
			comment.SequenceNumber = 0;

			_historyCommentRepository.InsertComment(comment);

			return new HistoryCommentInsertUpdateResponse()
			{
				CommentId = comment.CommentId,
				ModifiedOn = comment.ModifiedOn,
				SequenceNumber = comment.SequenceNumber
			};
		}

		public void Delete(HistoryCommentDeleteRequest request)
		{
			_historyCommentRepository.DeleteComment(request.OriginalCommentId);
		}

		public HistoryCommentInsertUpdateResponse Update(HistoryCommentDto comment)
		{
			comment.SequenceNumber++;
			_historyCommentRepository.InsertComment(comment);

			return new HistoryCommentInsertUpdateResponse()
			{
				CommentId = comment.CommentId,
				ModifiedOn = comment.ModifiedOn,
				SequenceNumber = comment.SequenceNumber
			};
		}
	}
}
