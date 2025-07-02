using Newtonsoft.Json;
using System;

namespace Adacta.AdInsure.RGSL.Common.API.Shared.Responses
{
	public class HistoryCommentInsertUpdateResponse
	{
		[JsonProperty("commentId")]
		public string CommentId { get; set; }

		[JsonProperty("modifiedOn")]
		public DateTime? ModifiedOn { get; set; }

		[JsonProperty("sequenceNumber")]
		public int SequenceNumber { get; set; }
	}
}
