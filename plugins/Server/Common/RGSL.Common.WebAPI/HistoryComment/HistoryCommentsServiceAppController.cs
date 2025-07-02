using Adacta.AdInsure.Framework.Core.Web.API.Controllers;
using Adacta.AdInsure.RGSL.Common.API.Shared.HistoryComment.DTOs;
using Adacta.AdInsure.RGSL.Common.API.Shared.Requests;
using Adacta.AdInsure.RGSL.Common.API.Shared.Responses;
using Adacta.AdInsure.RGSL.Common.API.Shared.Services;
using Microsoft.AspNetCore.Mvc;

namespace Adacta.AdInsure.RGSL.Common.WebAPI.HistoryComment
{
	[Route("api/rgsl/common/shared/comment")]
	public class HistoryCommentServiceAppController : AIApiController, IHistoryCommentServiceApp
	{

		private readonly IHistoryCommentServiceApp _service;

		public HistoryCommentServiceAppController(IHistoryCommentServiceApp service) : base() => _service = service;

		[Route("add")]
		[HttpPost]
		public HistoryCommentInsertUpdateResponse AddComment(HistoryCommentDto comment) => _service.AddComment(comment);

		[Route("delete")]
		[HttpPost]
		public void DeleteComment(HistoryCommentDeleteRequest request) => _service.DeleteComment(request);

		[Route("update")]
		[HttpPost]
		public HistoryCommentInsertUpdateResponse EditComment(HistoryCommentDto comment) => _service.EditComment(comment);
	}
}
