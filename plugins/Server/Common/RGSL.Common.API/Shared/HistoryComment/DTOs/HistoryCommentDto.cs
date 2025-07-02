using System;

namespace Adacta.AdInsure.RGSL.Common.API.Shared.HistoryComment.DTOs
{
	public class HistoryCommentDto
	{
		public string CommentId { get; set; }
		public string Author { get; set; }
		public string OrigDocumentNo { get; set; }
		public string AuthorApplicationUserGroup { get; set; }
		public string Comment { get; set; }
		public DateTime CreatedOn { get; set; }
		public DateTime? ModifiedOn { get; set; }
		public bool Deleted { get; set; }
		public string DisplayName { get; set; }
		public bool CanViewAuthor { get; set; }
		public int SequenceNumber { get; set; }
		public string OriginalCommentId { get; set; }
	}
}
