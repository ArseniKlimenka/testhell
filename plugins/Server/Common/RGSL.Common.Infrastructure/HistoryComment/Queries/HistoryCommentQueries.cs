namespace Adacta.AdInsure.RGSL.Common.Infrastructure.HistoryComment.Queries
{
	static class HistoryCommentQueries
	{
		public static string InsertComment()
		{
			return @"INSERT INTO BFX_IMPL.HISTORY_COMMENT(
						COMMENT_ID,
						AUTHOR,
						ORIGINAL_DOCUMENT_NUMBER,
						AUTHOR_APPLICATION_USER_GROUP,
						COMMENT,
						CREATED_ON,
						MODIFIED_ON,
						DELETED,
						SEQ_NUMBER,
						ORIGINAL_COMMENT_ID)
					VALUES(
						@CommentId,
						@Author,
						@OrigDocumentNo,
						@AuthorApplicationUserGroup,
						@Comment,
						@CreatedOn,
						@ModifiedOn,
						@Deleted,
						@SequenceNumber,
						@OriginalCommentId
					)";
		}

		public static string DeleteComment()
		{
			return @"UPDATE BFX_IMPL.HISTORY_COMMENT
					SET
						DELETED = 1
					WHERE
						COMMENT_ID = @0 OR ORIGINAL_COMMENT_ID = @0";
		}
	}
}
