BEGIN

DECLARE @CurrentInquiries TABLE
(
   DOC_NUMBER NVARCHAR(255),
   ART_ID UNIQUEIDENTIFIER,
   BODY NVARCHAR(MAX),
   TEXT_OF_ANSWER NVARCHAR(MAX),
   TEXT_OF_COMMENT NVARCHAR(MAX)
);

INSERT INTO @CurrentInquiries

SELECT doc.UNIVERSAL_DOCUMENT_NUMBER, 
       art.PUBLISHED_ARTIFACT_ID,
       doc.BODY,
	   JSON_VALUE(doc.BODY, '$.textOfanswer') AS TEXT_OF_ANSWER,
	   JSON_VALUE(doc.BODY, '$."textOfСomment"') AS TEXT_OF_COMMENT
FROM BFX.UNIVERSAL_DOCUMENT doc
JOIN cfx.PUBLISHED_ARTIFACT art on art.PUBLISHED_ARTIFACT_ID = doc.PUBLISHED_ARTIFACT_ID
WHERE art.CODE_NAME in ('EndowmentInquiry', 'LifeInsuranceInquiry', 'CancellationInquiry', 'LifeInsurancePolicyInquiry')



DECLARE @DocNumber NVARCHAR(255),
		@ArtId UNIQUEIDENTIFIER,
		@Body NVARCHAR(max), 
		@TextOfAnswer NVARCHAR(max), 
		@TextOfComment NVARCHAR(max)

DECLARE INQ_CURSOR CURSOR LOCAL READ_ONLY FORWARD_ONLY
FOR 

SELECT DOC_NUMBER,
       ART_ID,
	   BODY,
	   TEXT_OF_ANSWER,
	   TEXT_OF_COMMENT
FROM @CurrentInquiries

OPEN INQ_CURSOR
FETCH NEXT FROM INQ_CURSOR INTO @DocNumber, @ArtId, @Body, @TextOfAnswer, @TextOfComment
WHILE @@FETCH_STATUS = 0

BEGIN 

	BEGIN TRY
	BEGIN TRAN

		IF @TextOfAnswer IS NOT NULL
		BEGIN
		SET @Body = JSON_MODIFY(@Body, '$.textOfanswer', NULL)
		SET @Body = JSON_MODIFY(@Body, '$.textOfAnswer', @TextOfAnswer)
		END

		IF @TextOfComment IS NOT NULL
		BEGIN
		SET @Body = JSON_MODIFY(@Body, '$."textOfСomment"', NULL)
		SET @Body = JSON_MODIFY(@Body, '$.textOfComment', @TextOfComment)
		END

		UPDATE BFX.UNIVERSAL_DOCUMENT SET BODY = @Body WHERE UNIVERSAL_DOCUMENT_NUMBER = @DocNumber AND PUBLISHED_ARTIFACT_ID = @ArtId

		--ROLLBACK TRAN
		COMMIT TRAN

	END TRY

	BEGIN CATCH

    ROLLBACK TRAN
    DECLARE @ErrorMessage NVARCHAR(4000); DECLARE @ErrorSeverity INT; DECLARE @ErrorState INT;
    SELECT @ErrorMessage = ERROR_MESSAGE() + CHAR(13) + ' Inquiry not updated: ' + @DocNumber, @ErrorSeverity = ERROR_SEVERITY(), @ErrorState = 1;
    RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);

	END CATCH
	
	--reset variables
	SET @DocNumber = NULL
	SET @ArtId = NULL
	SET @Body = NULL
	SET @TextOfAnswer = NULL
	SET @TextOfComment = NULL

	--move next
	FETCH NEXT FROM INQ_CURSOR INTO @DocNumber, @ArtId, @Body, @TextOfAnswer, @TextOfComment

END

CLOSE INQ_CURSOR
DEALLOCATE INQ_CURSOR

END