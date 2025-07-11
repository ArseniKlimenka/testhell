BEGIN TRY
BEGIN TRAN

UPDATE ud SET BODY = 
JSON_MODIFY(
	JSON_MODIFY(
		JSON_MODIFY(ud.BODY, '$.policyInCorrectStatus', null), 
		'$.policyAmendmentsInCorrectStatus', 
		null
	), 
	'$.applicant.partyData.partyType', 
	'NaturalPerson'
)
FROM BFX.UNIVERSAL_DOCUMENT ud
LEFT JOIN CFX.PUBLISHED_ARTIFACT pa ON pa.PUBLISHED_ARTIFACT_ID = ud.PUBLISHED_ARTIFACT_ID
WHERE pa.CODE_NAME = 'LifeInsuranceRequest';

COMMIT TRAN
END TRY

BEGIN CATCH

    ROLLBACK TRAN
    DECLARE @ErrorMessage NVARCHAR(4000); DECLARE @ErrorSeverity INT; DECLARE @ErrorState INT;
    SELECT @ErrorMessage = ERROR_MESSAGE(), @ErrorSeverity = ERROR_SEVERITY(), @ErrorState = 1;
    RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);

END CATCH