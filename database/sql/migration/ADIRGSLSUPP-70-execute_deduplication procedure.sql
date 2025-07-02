IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[execute_deduplication]') AND type IN (N'P', N'RF', N'PC'))
BEGIN
DROP PROCEDURE [dbo].[execute_deduplication];
END
GO

create procedure execute_deduplication(@masterPartyCode nvarchar(max), @duplicatePartyCode nvarchar(max))
as
begin
DECLARE @rowId nvarchar(64);
DECLARE @partyCode nvarchar(64);
DECLARE @partyId nvarchar(64);
DECLARE @deduplCode nvarchar(64);
DECLARE @deduplId nvarchar(64);
DECLARE @partyCodeHKEY nvarchar(64);
DECLARE @deduplCodeHKEY nvarchar(64);

DECLARE @contractNumbersHolder nvarchar(max);
DECLARE @contractNumbersInsured nvarchar(max);
DECLARE @contractNumbersInitiator nvarchar(max);
DECLARE @cancellationNumbers nvarchar(max);
DECLARE @endowmentNumbers nvarchar(max);
DECLARE @requestNumbers nvarchar(max);
DECLARE @verificationNumbersHolder nvarchar(max);
DECLARE @verificationNumbersInsured nvarchar(max);
DECLARE @claimNumbers nvarchar(max);
DECLARE @serviceProviderNumbers nvarchar(max);
DECLARE @paymentOrderNumbers nvarchar(max);
DECLARE @naturalPersonNumbers nvarchar(max);

DECLARE @updatedPolicyRowsHolder int;
DECLARE @updatedPolicyRowsInsured int;
DECLARE @updatedPolicyRowsInitiator int;
DECLARE @updatedCancellationRows int;
DECLARE @updatedEndowmentRows int;
DECLARE @updatedRequestRows int;
DECLARE @updatedVerificationRowsHolder int;
DECLARE @updatedVerificationRowsInsured int;
DECLARE @updatedClaimRows int;
DECLARE @updatedServiceProviderRows int;

DECLARE @rowsToUpdate int;

BEGIN


--prepare data
INSERT INTO PTY_IMPL.PARTY_DEDUP_INFO
(PARTY_CODE, DEDUPL_NUMBER, UPDATE_ORDER, IS_PROCESSED, ERROR, DATE)
SELECT 
	@duplicatePartyCode, 
	@masterPartyCode, 
	0 UPDATE_ORDER,
	0 IS_PROCESSED, 
	NULL ERROR, 
	GETDATE() DATE

set @rowId = SCOPE_IDENTITY()

SELECT @partyCode = pdi.PARTY_CODE,
       @partyId = p.PARTY_ID,
       @deduplCode = pdi.DEDUPL_NUMBER,
       @deduplId = LOWER(d.PARTY_ID)
FROM PTY_IMPL.PARTY_DEDUP_INFO pdi
LEFT JOIN PTY.PARTY p ON p.PARTY_CODE = pdi.PARTY_CODE
LEFT JOIN PTY.PARTY d ON d.PARTY_CODE = pdi.DEDUPL_NUMBER
WHERE pdi.IS_PROCESSED = 0
AND pdi.ID = @rowId

 
	-- ########## POLICY HOLDER START ########## --
	-- PRINT '';
	-- PRINT N'Котировка и договор';
	-- PRINT N'Страхователь ↓';
	-- SET STATISTICS TIME ON;

	SELECT c1.CONTRACT_NUMBER NUMBER, c1.CONTRACT_ID ID, pa.CODE_NAME, pa.PUBLISHED_VERSION, 'Contract' ENTITY
	INTO #contractsToUpdateHolder
	FROM PAS.CONTRACT c1
	INNER JOIN PAS.CONTRACT c2 ON c1.ORIGINAL_DOCUMENT_ID = c2.ORIGINAL_DOCUMENT_ID
	LEFT JOIN PAS_IMPL.POLICY_HUB policyHub ON policyHub.CONTRACT_NUMBER = c2.CONTRACT_NUMBER
	LEFT JOIN PAS_IMPL.POLICY_SAT_LATEST policySatL ON policySatL.POLICY_HKEY = policyHub.POLICY_HKEY
	LEFT JOIN PAS_IMPL.QUOTE_HUB qouteHub ON qouteHub.CONTRACT_NUMBER = c2.CONTRACT_NUMBER
	LEFT JOIN PAS_IMPL.QUOTE_SAT_LATEST qouteSatL ON qouteSatL.QUOTE_HKEY = qouteHub.QUOTE_HKEY
	LEFT JOIN CFX.PUBLISHED_ARTIFACT pa ON pa.PUBLISHED_ARTIFACT_ID = c1.PUBLISHED_ARTIFACT_ID 
	WHERE qouteSatL.HOLDER_CODE = @partyCode OR policySatL.HOLDER_CODE = @partyCode

	SET @updatedPolicyRowsHolder = (SELECT COUNT(*) FROM #contractsToUpdateHolder)

	SET @contractNumbersHolder = '{}';
	IF (@updatedPolicyRowsHolder > 0) 

        BEGIN 

        -- ########## SAVE UPDATED CONTRACTS ########## --
        SET @contractNumbersHolder = (
            SELECT NUMBER, ID, CODE_NAME, PUBLISHED_VERSION, ENTITY
            FROM #contractsToUpdateHolder
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        );
        -- ########## SAVE UPDATED CONTRACTS ########## --

		UPDATE policy
		SET BODY = JSON_MODIFY(
				JSON_MODIFY(
					JSON_MODIFY(
						JSON_MODIFY(
							JSON_MODIFY(
								policy.BODY,
								'$.amendmentData',
								JSON_QUERY(
									REPLACE(
										JSON_QUERY(policy.BODY, '$.amendmentData'),
										'"partyCode": "' + @partyCode + '"',
										'"partyCode": "' + @deduplCode + '"'
									)
								)
							),
							'$.paymentPlan',
							JSON_QUERY(
								REPLACE(
									JSON_QUERY(policy.BODY, '$.paymentPlan'),
									'"partyCode": "' + @partyCode + '"',
									'"partyCode": "' + @deduplCode + '"'
								)
							)
						),
						'$.policyHolder.partyData.partyCode',
						@deduplCode
					),
					'$.policyHolder.partyData.partyId',
					@deduplId
				),
				'$.triggersConditions.policyHolderPartyCode',
				@deduplCode
			),
			COMMON_BODY = JSON_MODIFY(
				JSON_MODIFY(
					JSON_MODIFY(
						JSON_MODIFY(
							JSON_MODIFY(
								JSON_MODIFY(
									JSON_MODIFY(
										JSON_MODIFY(
											policy.COMMON_BODY,
											'$.evaluation.itemEvaluation',
											JSON_QUERY(
												REPLACE(
													JSON_QUERY(policy.COMMON_BODY, '$.evaluation.itemEvaluation'),
													'"objectRef": "' + @partyId + '"',
													'"objectRef": "' + @deduplId + '"'
												)
											)
										),
										'$.summary',
										JSON_QUERY(
											REPLACE(
												JSON_QUERY(policy.COMMON_BODY, '$.summary'),
												'"partyCode": "' + @partyCode + '"',
												'"partyCode": "' + @deduplCode + '"'
											)
										)
									),
									'$.paymentPlan',
									JSON_QUERY(
										REPLACE(
											JSON_QUERY(policy.COMMON_BODY, '$.paymentPlan'),
											'"payerCode": "' + @partyCode + '"',
											'"payerCode": "' + @deduplCode + '"'
										)
									)
								),
								'$.items',
								JSON_QUERY(
									REPLACE(
										REPLACE(
											REPLACE(
												JSON_QUERY(policy.COMMON_BODY, '$.items'),
												'"objectRef": "' + @partyId + '"',
												'"objectRef": "' + @deduplId + '"'
											),
											'"partyCode": "' + @partyCode + '"',
											'"partyCode": "' + @deduplCode + '"'
										),
										'"policyHolderId": "' + @partyId + '"',
										'"policyHolderId": "' + @deduplId + '"'
									)
								)
							),
							'$.parties.holder.personCode',
							@deduplCode
						),
						'$.parties.holder.personId',
						@deduplId
					),
					'$.parties.otherParties[0].personCode',
					@deduplCode
				),
				'$.parties.otherParties[0].personId',
				@deduplId
			),
			SNAPSHOT_BODY = JSON_MODIFY(
				JSON_MODIFY(
					JSON_MODIFY(
						JSON_MODIFY(
							JSON_MODIFY(
								policy.SNAPSHOT_BODY,
								'$.amendmentData',
								JSON_QUERY(
									REPLACE(
										JSON_QUERY(policy.SNAPSHOT_BODY, '$.amendmentData'),
										'"partyCode": "' + @partyCode + '"',
										'"partyCode": "' + @deduplCode + '"'
									)
								)
							),
							'$.paymentPlan',
							JSON_QUERY(
								REPLACE(
									JSON_QUERY(policy.SNAPSHOT_BODY, '$.paymentPlan'),
									'"partyCode": "' + @partyCode + '"',
									'"partyCode": "' + @deduplCode + '"'
								)
							)
						),
						'$.policyHolder.partyData.partyCode',
						@deduplCode
					),
					'$.policyHolder.partyData.partyId',
					@deduplId
				),
				'$.triggersConditions.policyHolderPartyCode',
				@deduplCode
			),
			SYS_UPDATED_ON = GETDATE()
		FROM PAS.CONTRACT policy
		JOIN #contractsToUpdateHolder ctu ON ctu.NUMBER = policy.CONTRACT_NUMBER
		
        END
	ELSE 
		SET @updatedPolicyRowsHolder = @updatedPolicyRowsHolder

	drop table #contractsToUpdateHolder

	-- SET STATISTICS TIME OFF;
	-- ########## POLICY HOLDER END ########## --

	-- ########## INSURED START ########## --
	-- PRINT '';
	-- PRINT N'Застрахованный ↓';
	-- SET STATISTICS TIME ON;

	SELECT c1.CONTRACT_NUMBER NUMBER, c1.CONTRACT_ID ID, pa.CODE_NAME, pa.PUBLISHED_VERSION, 'Contract' ENTITY
	INTO #contractsToUpdateInsured
	FROM PAS.CONTRACT c1
	INNER JOIN PAS.CONTRACT c2 ON c1.ORIGINAL_DOCUMENT_ID = c2.ORIGINAL_DOCUMENT_ID
	LEFT JOIN PAS_IMPL.POLICY_HUB policyHub ON policyHub.CONTRACT_NUMBER = c2.CONTRACT_NUMBER
	LEFT JOIN PAS_IMPL.POLICY_SAT_LATEST policySatL ON policySatL.POLICY_HKEY = policyHub.POLICY_HKEY
	LEFT JOIN PAS_IMPL.QUOTE_HUB qouteHub ON qouteHub.CONTRACT_NUMBER = c2.CONTRACT_NUMBER
	LEFT JOIN PAS_IMPL.QUOTE_SAT_LATEST qouteSatL ON qouteSatL.QUOTE_HKEY = qouteHub.QUOTE_HKEY
	LEFT JOIN CFX.PUBLISHED_ARTIFACT pa ON pa.PUBLISHED_ARTIFACT_ID = c1.PUBLISHED_ARTIFACT_ID 
	WHERE qouteSatL.INSURED_CODE = @partyCode OR policySatL.INSURED_CODE = @partyCode

	SET @updatedPolicyRowsInsured = (SELECT COUNT(*) FROM #contractsToUpdateInsured)

	SET @contractNumbersInsured = '{}';
	IF (@updatedPolicyRowsInsured > 0) 

        BEGIN

         -- ########## SAVE UPDATED CONTRACTS ########## --
        SET @contractNumbersInsured = (
            SELECT NUMBER, ID, CODE_NAME, PUBLISHED_VERSION, ENTITY
            FROM #contractsToUpdateInsured
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        );
        -- ########## SAVE UPDATED CONTRACTS ########## --

		UPDATE policy
		SET BODY = JSON_MODIFY(
				JSON_MODIFY(
					JSON_MODIFY(
						JSON_MODIFY(
								policy.BODY,
								'$.commission.policyCommissionItems',
								JSON_QUERY(
									REPLACE(
										JSON_QUERY(policy.BODY, '$.commission.policyCommissionItems'),
										'"insuredObjectCode": "' + @partyCode + '"',
										'"insuredObjectCode": "' + @deduplCode + '"'
									)
								)
						 ),
						'$.insuredPerson.partyData.partyCode',
						@deduplCode
					),
					'$.insuredPerson.partyData.partyId',
					@deduplId
				),
				'$.triggersConditions.insuredPersonPartyCode',
				@deduplCode
			),
			COMMON_BODY = JSON_MODIFY(
				JSON_MODIFY(
					JSON_MODIFY(
						JSON_MODIFY(
							policy.COMMON_BODY,
							'$.items',
							JSON_QUERY(
								REPLACE(
									JSON_QUERY(policy.COMMON_BODY, '$.items'),
									'"insuredPersonId": "' + @partyId + '"',
									'"insuredPersonId": "' + @deduplId + '"'
								)
							)
						),
						'$.objects',
						JSON_QUERY(
							REPLACE(
								REPLACE(
									REPLACE(
										JSON_QUERY(
											policy.COMMON_BODY,
											'$.objects'
										),
										'"insuredPerson": "' + @partyCode + '"',
										'"insuredPerson": "' + @deduplCode + '"'
									),
									'"code": "' + @partyCode + '"',
									'"code": "' + @deduplCode + '"'
								),
								'"id": "' + @partyId + '"',
								'"id": "' + @deduplId + '"'
							)
						)
					),
					'$.parties.insuredPersons[0].personCode',
					@deduplCode
				),
				'$.parties.insuredPersons[0].personId',
				@deduplId
			),
			SNAPSHOT_BODY = JSON_MODIFY(
				JSON_MODIFY(
					JSON_MODIFY(
						JSON_MODIFY(
								policy.SNAPSHOT_BODY,
								'$.commission.policyCommissionItems',
								JSON_QUERY(
									REPLACE(
										JSON_QUERY(policy.SNAPSHOT_BODY, '$.commission.policyCommissionItems'),
										'"insuredObjectCode": "' + @partyCode + '"',
										'"insuredObjectCode": "' + @deduplCode + '"'
									)
								)
						 ),
						'$.insuredPerson.partyData.partyCode',
						@deduplCode
					),
					'$.insuredPerson.partyData.partyId',
					@deduplId
				),
				'$.triggersConditions.insuredPersonPartyCode',
				@deduplCode
			),
			SYS_UPDATED_ON = GETDATE()
		FROM PAS.CONTRACT policy
		JOIN #contractsToUpdateInsured ctu ON ctu.NUMBER = policy.CONTRACT_NUMBER
	
        END
    ELSE 
		SET @updatedPolicyRowsInsured = @updatedPolicyRowsInsured

	drop table #contractsToUpdateInsured		

	-- SET STATISTICS TIME OFF;
	-- ########## INSURED END ########## --

	-- ########## INITIATOR START ########## --
	-- PRINT '';
	-- PRINT N'Инициатор ↓';
	-- SET STATISTICS TIME ON;

	SELECT policy.CONTRACT_NUMBER NUMBER, policy.CONTRACT_ID ID, pa.CODE_NAME, pa.PUBLISHED_VERSION, 'Contract' ENTITY
	INTO #contractsToUpdateInitiator
	FROM PAS.CONTRACT policy
	INNER JOIN PAS.CONTRACT policy2 ON policy.ORIGINAL_DOCUMENT_ID = policy2.ORIGINAL_DOCUMENT_ID
	LEFT JOIN PAS_IMPL.POLICY_HUB policyHub ON policyHub.CONTRACT_NUMBER = policy2.CONTRACT_NUMBER
	LEFT JOIN PAS_IMPL.POLICY_SAT_LATEST policySatL ON policySatL.POLICY_HKEY = policyHub.POLICY_HKEY
	LEFT JOIN PAS_IMPL.QUOTE_HUB qouteHub ON qouteHub.CONTRACT_NUMBER = policy2.CONTRACT_NUMBER
	LEFT JOIN PAS_IMPL.QUOTE_SAT_LATEST qouteSatL ON qouteSatL.QUOTE_HKEY = qouteHub.QUOTE_HKEY
	LEFT JOIN ORG_IMPL.SERVICE_PROVIDER_HUB sphQ ON sphQ.SERVICE_PROVIDER_CODE = qouteSatL.INITIATOR_EMPLOYEE_CODE
	LEFT JOIN ORG_IMPL.SERVICE_PROVIDER_HUB sphP ON sphP.SERVICE_PROVIDER_CODE = policySatL.INITIATOR_EMPLOYEE_CODE
	LEFT JOIN ORG_IMPL.SERVICE_PROVIDER_INFO_SAT_LATEST spisQ on spisQ.SERVICE_PROVIDER_INFO_HKEY = sphQ.SERVICE_PROVIDER_HKEY
	LEFT JOIN ORG_IMPL.SERVICE_PROVIDER_INFO_SAT_LATEST spisP on spisP.SERVICE_PROVIDER_INFO_HKEY = sphP.SERVICE_PROVIDER_HKEY
	LEFT JOIN CFX.PUBLISHED_ARTIFACT pa ON pa.PUBLISHED_ARTIFACT_ID = policy.PUBLISHED_ARTIFACT_ID 
	WHERE spisP.PARTY_CODE = @partyCode OR spisQ.PARTY_CODE = @partyCode

	SET @updatedPolicyRowsInitiator = (SELECT COUNT(*) FROM #contractsToUpdateInitiator)

    SET @contractNumbersInitiator = '{}';
	IF (@updatedPolicyRowsInitiator > 0) 

        BEGIN 

         -- ########## SAVE UPDATED CONTRACTS ########## --
        SET @contractNumbersInitiator = (
            SELECT NUMBER, ID, CODE_NAME, PUBLISHED_VERSION, ENTITY
            FROM #contractsToUpdateInitiator
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        );
        -- ########## SAVE UPDATED CONTRACTS ########## --

		UPDATE policy
		SET BODY = JSON_MODIFY(policy.BODY, '$.initiator.partyCode', @deduplCode),
			SNAPSHOT_BODY = JSON_MODIFY(policy.SNAPSHOT_BODY, '$.initiator.partyCode', @deduplCode),
			SYS_UPDATED_ON = GETDATE()
		FROM PAS.CONTRACT policy
		JOIN #contractsToUpdateInitiator ctu ON ctu.NUMBER = policy.CONTRACT_NUMBER

        END
	ELSE 
		SET @updatedPolicyRowsInitiator = @updatedPolicyRowsInitiator

	drop table #contractsToUpdateInitiator
	-- SET STATISTICS TIME OFF;
	-- ########## INITIATOR END ########## --


	-- ########## CANCELLATION AMENDMENT START ########## --
	-- PRINT '';
	-- PRINT N'Расторжение (Заявитель и Получатель) ↓';
	-- SET STATISTICS TIME ON;

	SELECT policy.CONTRACT_NUMBER NUMBER, policy.CONTRACT_ID ID, pa.CODE_NAME, pa.PUBLISHED_VERSION, 'Contract' ENTITY, ah.AMENDMENT_NUMBER
	INTO #contractsToUpdateCancellation
	FROM PAS.CONTRACT policy
	LEFT JOIN PAS_IMPL.POLICY_HUB ph ON ph.CONTRACT_NUMBER = policy.CONTRACT_NUMBER
	LEFT JOIN PAS_IMPL.POLICY_AMENDMENT_LINK pal ON pal.POLICY_HKEY = ph.POLICY_HKEY
	LEFT JOIN PAS_IMPL.AMENDMENT_HUB ah ON ah.AMENDMENT_HKEY = pal.AMENDMENT_HKEY
	LEFT JOIN PAS_IMPL.CNL_APPLICANT_LINK cAppl ON cAppl.AMENDMENT_HKEY = pal.AMENDMENT_HKEY
	LEFT JOIN PAS_IMPL.CNL_RECIPIENT_LINK cRecl ON cRecl.AMENDMENT_HKEY = pal.AMENDMENT_HKEY
	LEFT JOIN PTY_IMPL.PARTY_HUB phApp ON phApp.PARTY_HKEY = cAppl.PARTY_HKEY
	LEFT JOIN PTY_IMPL.PARTY_HUB phRec ON phRec.PARTY_HKEY = cRecl.PARTY_HKEY
	LEFT JOIN CFX.PUBLISHED_ARTIFACT pa ON pa.PUBLISHED_ARTIFACT_ID = policy.PUBLISHED_ARTIFACT_ID 
	WHERE phApp.PARTY_CODE = @partyCode OR phRec.PARTY_CODE = @partyCode

	SET @updatedCancellationRows = (SELECT COUNT(*) FROM #contractsToUpdateCancellation)

	SET @cancellationNumbers = '{}';
	IF (@updatedCancellationRows > 0) 

		BEGIN

		SET @cancellationNumbers = (
            SELECT NUMBER, ID, CODE_NAME, PUBLISHED_VERSION, ENTITY, AMENDMENT_NUMBER
            FROM #contractsToUpdateCancellation
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		);

		UPDATE
			am
		SET
			BODY = REPLACE(
				REPLACE(
					REPLACE(
						REPLACE(
							REPLACE(
								REPLACE(
									REPLACE(
										REPLACE(
											REPLACE(
												REPLACE(
													REPLACE(
														REPLACE(
															REPLACE(
																REPLACE(
																	JSON_MODIFY(
																		JSON_MODIFY(
																			am.BODY,
																			'$.contractVersions',
																			JSON_QUERY(
																				REPLACE(
																					JSON_QUERY(
																						REPLACE(
																							JSON_QUERY(
																								REPLACE(
																									JSON_QUERY(am.BODY, '$.contractVersions'),
																									'"insuredPerson": "' + @partyCode + '"',
																									'"insuredPerson": "' + @deduplCode + '"'
																								)
																							),
																							'"code": "' + @partyCode + '"',
																							'"code": "' + @deduplCode + '"'
																						)
																					),
																					'"id": "' + @partyId + '"',
																					'"id": "' + @deduplId + '"'
																				)
																			)
																		),
																		'$.technicalData.partiesInfo',
																		JSON_QUERY(
																			REPLACE(
																				JSON_QUERY(am.BODY, '$.technicalData.partiesInfo'),
																				'"code": "' + @partyCode + '"',
																				'"code": "' + @deduplCode + '"'
																			)
																		)
																	),
																	'":["',
																	'": ["'
																),
																'":{"',
																'": {"'
															),
															'":"',
															'": "'
														),
														'"insuredPersonPartyCode": "' + @partyCode + '"',
														'"insuredPersonPartyCode": "' + @deduplCode + '"'
													),
													'"payerCode": "' + @partyCode + '"',
													'"payerCode": "' + @deduplCode + '"'
												),
												'"insuredObjectCode": "' + @partyCode + '"',
												'"insuredObjectCode": "' + @deduplCode + '"'
											),
											'"policyHolderPartyCode": "' + @partyCode + '"',
											'"policyHolderPartyCode": "' + @deduplCode + '"'
										),
										'"partyCode": "' + @partyCode + '"',
										'"partyCode": "' + @deduplCode + '"'
									),
									'"personCode": "' + @partyCode + '"',
									'"personCode": "' + @deduplCode + '"'
								),
								'"personId": "' + @partyId + '"',
								'"personId": "' + @deduplId + '"'
							),
							'"partyId": "' + @partyId + '"',
							'"partyId": "' + @deduplId + '"'
						),
						'"objectRef": "' + @partyId + '"',
						'"objectRef": "' + @deduplId + '"'
					),
					'"insuredPersonId": "' + @partyId + '"',
					'"insuredPersonId": "' + @deduplId + '"'
				),
				'"policyHolderId": "' + @partyId + '"',
				'"policyHolderId": "' + @deduplId + '"'
			),
			SNAPSHOT_BODY = REPLACE(
								REPLACE(
									REPLACE(
										REPLACE(
											REPLACE(
												REPLACE(
													REPLACE(
														REPLACE(
															REPLACE(
																REPLACE(
																	REPLACE(
																		REPLACE(
																			REPLACE(
																				REPLACE(
																					JSON_MODIFY(
																						JSON_MODIFY(
																							am.SNAPSHOT_BODY,
																							'$.contractVersions',
																							JSON_QUERY(
																								REPLACE(
																									JSON_QUERY(
																										REPLACE(
																											JSON_QUERY(
																												REPLACE(
																													JSON_QUERY(am.SNAPSHOT_BODY, '$.contractVersions'),
																													'"insuredPerson": "' + @partyCode + '"',
																													'"insuredPerson": "' + @deduplCode + '"'
																												)
																											),
																											'"code": "' + @partyCode + '"',
																											'"code": "' + @deduplCode + '"'
																										)
																									),
																									'"id": "' + @partyId + '"',
																									'"id": "' + @deduplId + '"'
																								)
																							)
																						),
																						'$.amendmentData.technicalData.partiesInfo',
																						JSON_QUERY(
																							REPLACE(
																								JSON_QUERY(
																									am.SNAPSHOT_BODY,
																									'$.amendmentData.technicalData.partiesInfo'
																								),
																								'"code": "' + @partyCode + '"',
																								'"code": "' + @deduplCode + '"'
																							)
																						)
																					),
																					'":["',
																					'": ["'
																				),
																				'":{"',
																				'": {"'
																			),
																			'":"',
																			'": "'
																		),
																		'"insuredPersonPartyCode": "' + @partyCode + '"',
																		'"insuredPersonPartyCode": "' + @deduplCode + '"'
																	),
																	'"payerCode": "' + @partyCode + '"',
																	'"payerCode": "' + @deduplCode + '"'
																),
																'"insuredObjectCode": "' + @partyCode + '"',
																'"insuredObjectCode": "' + @deduplCode + '"'
															),
															'"policyHolderPartyCode": "' + @partyCode + '"',
															'"policyHolderPartyCode": "' + @deduplCode + '"'
														),
														'"partyCode": "' + @partyCode + '"',
														'"partyCode": "' + @deduplCode + '"'
													),
													'"personCode": "' + @partyCode + '"',
													'"personCode": "' + @deduplCode + '"'
												),
												'"personId": "' + @partyId + '"',
												'"personId": "' + @deduplId + '"'
											),
											'"partyId": "' + @partyId + '"',
											'"partyId": "' + @deduplId + '"'
										),
										'"objectRef": "' + @partyId + '"',
										'"objectRef": "' + @deduplId + '"'
									),
									'"insuredPersonId": "' + @partyId + '"',
									'"insuredPersonId": "' + @deduplId + '"'
								),
								'"policyHolderId": "' + @partyId + '"',
								'"policyHolderId": "' + @deduplId + '"'
							),
			COMMON_BODY = REPLACE(
							REPLACE(
								REPLACE(
									REPLACE(
										REPLACE(
											REPLACE(
												REPLACE(
													REPLACE(
														REPLACE(
															REPLACE(
																REPLACE(
																	REPLACE(
																		REPLACE(
																			REPLACE(
																				JSON_MODIFY(
																					JSON_MODIFY(
																						am.COMMON_BODY,
																						'$.objects',
																						JSON_QUERY(
																							REPLACE(
																								JSON_QUERY(
																									REPLACE(
																										JSON_QUERY(
																											REPLACE(
																												JSON_QUERY(am.COMMON_BODY, '$.objects'),
																												'"insuredPerson": "' + @partyCode + '"',
																												'"insuredPerson": "' + @deduplCode + '"'
																											)
																										),
																										'"code": "' + @partyCode + '"',
																										'"code": "' + @deduplCode + '"'
																									)
																								),
																								'"id": "' + @partyId + '"',
																								'"id": "' + @deduplId + '"'
																							)
																						)
																					),
																					'$.amendmentData.technicalData.partiesInfo',
																					JSON_QUERY(
																						REPLACE(
																							JSON_QUERY(
																								am.COMMON_BODY,
																								'$.amendmentData.technicalData.partiesInfo'
																							),
																							'"code": "' + @partyCode + '"',
																							'"code": "' + @deduplCode + '"'
																						)
																					)
																				),
																				'":["',
																				'": ["'
																			),
																			'":{"',
																			'": {"'
																		),
																		'":"',
																		'": "'
																	),
																	'"insuredPersonPartyCode": "' + @partyCode + '"',
																	'"insuredPersonPartyCode": "' + @deduplCode + '"'
																),
																'"payerCode": "' + @partyCode + '"',
																'"payerCode": "' + @deduplCode + '"'
															),
															'"insuredObjectCode": "' + @partyCode + '"',
															'"insuredObjectCode": "' + @deduplCode + '"'
														),
														'"policyHolderPartyCode": "' + @partyCode + '"',
														'"policyHolderPartyCode": "' + @deduplCode + '"'
													),
													'"partyCode": "' + @partyCode + '"',
													'"partyCode": "' + @deduplCode + '"'
												),
												'"personCode": "' + @partyCode + '"',
												'"personCode": "' + @deduplCode + '"'
											),
											'"personId": "' + @partyId + '"',
											'"personId": "' + @deduplId + '"'
										),
										'"partyId": "' + @partyId + '"',
										'"partyId": "' + @deduplId + '"'
									),
									'"objectRef": "' + @partyId + '"',
									'"objectRef": "' + @deduplId + '"'
								),
								'"insuredPersonId": "' + @partyId + '"',
								'"insuredPersonId": "' + @deduplId + '"'
							),
							'"policyHolderId": "' + @partyId + '"',
							'"policyHolderId": "' + @deduplId + '"'
						),
						SYS_UPDATED_ON = GETDATE()
				FROM
					PAS.CONTRACT am
				WHERE
					CONTRACT_NUMBER in (
						select
							DISTINCT AMENDMENT_NUMBER
						from
							pas.contract c
							JOIN #contractsToUpdateCancellation ctu ON ctu.NUMBER = c.CONTRACT_NUMBER
					)
		END
		
	ELSE 
		SET @updatedCancellationRows = @updatedCancellationRows

	drop table #contractsToUpdateCancellation

	-- SET STATISTICS TIME OFF;
	-- ########## CANCELLATION AMENDMENT END ########## --

	-- ########## ENDOWMENTS START ########## --
	-- PRINT '';
	-- PRINT N'Дожитие и ДИД ↓';
	-- SET STATISTICS TIME ON;

	SELECT ud.UNIVERSAL_DOCUMENT_NUMBER NUMBER, ud.UNIVERSAL_DOCUMENT_ID ID, pa.CODE_NAME, pa.PUBLISHED_VERSION, 'UniversalDocument' ENTITY
	INTO #endowmentsToUpdate
	FROM BFX.UNIVERSAL_DOCUMENT ud
	LEFT JOIN CFX.PUBLISHED_ARTIFACT pa ON pa.PUBLISHED_ARTIFACT_ID = ud.PUBLISHED_ARTIFACT_ID
	WHERE pa.CODE_NAME = 'Endowment' AND 
	(CHARINDEX('"partyCode": "' + @partyCode + '"', BODY) != 0 OR 
	 CHARINDEX('"code": "' + @partyCode + '"', BODY) != 0)

	SET @updatedEndowmentRows = (SELECT COUNT(*) FROM #endowmentsToUpdate)

	SET @endowmentNumbers = '{}';
	IF (@updatedEndowmentRows > 0) 
		
		BEGIN

		SET @endowmentNumbers = (
			SELECT NUMBER, ID, CODE_NAME, PUBLISHED_VERSION, ENTITY
            FROM #endowmentsToUpdate
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		)

		UPDATE BFX.UNIVERSAL_DOCUMENT
		SET BODY = JSON_MODIFY(
				REPLACE(ud.BODY,
						'"partyCode": "' + @partyCode + '"',
						'"partyCode": "' + @deduplCode + '"'
				),
				'$.technicalData',
				JSON_QUERY(
					REPLACE(
						JSON_QUERY(ud.BODY, '$.technicalData'),
						'"code": "' + @partyCode + '"',
						'"code": "' + @deduplCode + '"'
					)
				)
			),
			COMMON_BODY = REPLACE(ud.COMMON_BODY,
					'"partyCode": "' + @partyCode + '"',
					'"partyCode": "' + @deduplCode + '"'
				),
			SYS_UPDATED_ON = GETDATE()
		FROM BFX.UNIVERSAL_DOCUMENT ud
		JOIN #endowmentsToUpdate ctu ON ctu.NUMBER = ud.UNIVERSAL_DOCUMENT_NUMBER

		END
	ELSE 
		SET @updatedEndowmentRows = @updatedEndowmentRows

	drop table #endowmentsToUpdate

	-- SET STATISTICS TIME OFF;
	-- ########## ENDOWMENTS END ########## --

	-- ########## REQUESTS START ########## --
	-- PRINT '';
	-- PRINT N'Постпродажное сопровождение ↓';
	-- SET STATISTICS TIME ON;

	SELECT ud.UNIVERSAL_DOCUMENT_NUMBER NUMBER, ud.UNIVERSAL_DOCUMENT_ID ID, pa.CODE_NAME, pa.PUBLISHED_VERSION, 'UniversalDocument' ENTITY
	INTO #requestsToUpdate
	FROM BFX.UNIVERSAL_DOCUMENT ud
	LEFT JOIN UNI_IMPL.RQT_HUB rqtH ON rqtH.request_number = ud.universal_document_number
	LEFT JOIN UNI_IMPL.RQT_HOLDER_LINK rqtHL ON rqtHL.RQT_HKEY = rqtH.RQT_HKEY
	LEFT JOIN PTY_IMPL.PARTY_HUB ptyH ON ptyH.PARTY_HKEY = rqtHL.PARTY_HKEY
	LEFT JOIN CFX.PUBLISHED_ARTIFACT pa ON pa.PUBLISHED_ARTIFACT_ID = ud.PUBLISHED_ARTIFACT_ID
	WHERE pa.CODE_NAME = 'LifeInsuranceRequest' and ptyH.PARTY_CODE = @partyCode

	SET @updatedRequestRows = (SELECT COUNT(*) FROM #requestsToUpdate)

	SET @requestNumbers = '{}';
	IF (@updatedRequestRows > 0) 
		
		BEGIN

		SET @requestNumbers = (
            SELECT NUMBER, ID, CODE_NAME, PUBLISHED_VERSION, ENTITY
            FROM #requestsToUpdate
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		)

		-- PRINT '';
		UPDATE BFX.UNIVERSAL_DOCUMENT
		SET BODY = REPLACE(
				REPLACE(ud.BODY,
						'"partyId": "' + @partyId + '"',
						'"partyId": "' + @deduplId + '"'
				),
				'"partyCode": "' + @partyCode + '"',
				'"partyCode": "' + @deduplCode + '"'
			),
			COMMON_BODY = REPLACE(
				REPLACE(ud.COMMON_BODY,
						'"partyId": "' + @partyId + '"',
						'"partyId": "' + @deduplId + '"'
				),
				'"partyCode": "' + @partyCode + '"',
				'"partyCode": "' + @deduplCode + '"'
			),
			SYS_UPDATED_ON = GETDATE()
		FROM BFX.UNIVERSAL_DOCUMENT ud
		JOIN #requestsToUpdate ctu ON ctu.NUMBER = ud.UNIVERSAL_DOCUMENT_NUMBER

		END
	ELSE 
		SET @updatedRequestRows = @updatedRequestRows

	drop table #requestsToUpdate

	-- SET STATISTICS TIME OFF;
	-- ########## REQUESTS END ########## --

	-- ########## VERIFICATIONS START ########## --
	-- PRINT '';
	-- PRINT N'Верификатор вложений ↓';
	-- SET STATISTICS TIME ON;

	-- PRINT N'Страхователь ↓';	

	SELECT ud.UNIVERSAL_DOCUMENT_NUMBER NUMBER, ud.UNIVERSAL_DOCUMENT_ID ID, pa.CODE_NAME, pa.PUBLISHED_VERSION, 'UniversalDocument' ENTITY
	INTO #verificationsToUpdateHolder
	FROM bfx.universal_document ud
	LEFT JOIN pas_impl.verification_hub vh on vh.verification_number = ud.universal_document_number
	LEFT JOIN pas_impl.policy_verification_link pvl on pvl.verification_hkey = vh.verification_hkey
	LEFT JOIN pas_impl.policy_hub ph on ph.policy_hkey = pvl.policy_hkey
	LEFT JOIN pas_impl.policy_sat_latest psl on psl.policy_hkey = ph.policy_hkey
	LEFT JOIN CFX.PUBLISHED_ARTIFACT pa ON pa.PUBLISHED_ARTIFACT_ID = ud.PUBLISHED_ARTIFACT_ID
	WHERE psl.holder_code = @partyCode

	SET @updatedVerificationRowsHolder = (SELECT COUNT(*) FROM #verificationsToUpdateHolder)

	SET @verificationNumbersHolder = '{}';
	IF (@updatedVerificationRowsHolder > 0) 
		
		BEGIN

		SET @verificationNumbersHolder = (
            SELECT NUMBER, ID, CODE_NAME, PUBLISHED_VERSION, ENTITY
            FROM #verificationsToUpdateHolder
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		)

		-- PRINT '';
		UPDATE BFX.UNIVERSAL_DOCUMENT
		SET BODY = REPLACE (ud.BODY,
							'"policyHolderCode": "' + @partyCode + '"',
							'"policyHolderCode": "' + @deduplCode + '"'
							),
			SYS_UPDATED_ON = GETDATE()
		from bfx.universal_document ud
		JOIN #verificationsToUpdateHolder ctu ON ctu.NUMBER = ud.UNIVERSAL_DOCUMENT_NUMBER

		 END
	ELSE 
		SET @updatedVerificationRowsHolder = @updatedVerificationRowsHolder

	drop table #verificationsToUpdateHolder		

	-- PRINT N'Застрахованный ↓';

	SELECT ud.UNIVERSAL_DOCUMENT_NUMBER NUMBER, ud.UNIVERSAL_DOCUMENT_ID ID, pa.CODE_NAME, pa.PUBLISHED_VERSION, 'UniversalDocument' ENTITY
	INTO #verificationsToUpdateInsured
	FROM bfx.universal_document ud
	LEFT JOIN pas_impl.verification_hub vh on vh.verification_number = ud.universal_document_number
	LEFT JOIN pas_impl.policy_verification_link pvl on pvl.verification_hkey = vh.verification_hkey
	LEFT JOIN pas_impl.policy_hub ph on ph.policy_hkey = pvl.policy_hkey
	LEFT JOIN pas_impl.policy_sat_latest psl on psl.policy_hkey = ph.policy_hkey
	LEFT JOIN CFX.PUBLISHED_ARTIFACT pa ON pa.PUBLISHED_ARTIFACT_ID = ud.PUBLISHED_ARTIFACT_ID
	WHERE psl.insured_code = @partyCode

	SET @updatedVerificationRowsInsured = (SELECT COUNT(*) FROM #verificationsToUpdateInsured)

	SET @verificationNumbersInsured = '{}';
	IF (@updatedVerificationRowsInsured > 0) 
		
		BEGIN

		SET @verificationNumbersInsured = (
            SELECT NUMBER, ID, CODE_NAME, PUBLISHED_VERSION, ENTITY
            FROM #verificationsToUpdateInsured
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		)

		-- PRINT '';
		UPDATE BFX.UNIVERSAL_DOCUMENT
		SET BODY = REPLACE (ud.BODY,
							'"insuredPersonCode": "' + @partyCode + '"',
							'"insuredPersonCode": "' + @deduplCode + '"'
							),
			SYS_UPDATED_ON = GETDATE()
		from bfx.universal_document ud
		JOIN #verificationsToUpdateInsured ctu ON ctu.NUMBER = ud.UNIVERSAL_DOCUMENT_NUMBER

		 END
	ELSE 
		SET @updatedVerificationRowsInsured = @updatedVerificationRowsInsured
		
	drop table #verificationsToUpdateInsured

	-- SET STATISTICS TIME OFF;
	-- ########## VERIFICATIONS END ########## --
	-- ########## UNIVERSAL DOCUMENTS END ########## --

	-- ########## CLAIMS START ########## --
	-- PRINT '';
	-- PRINT N'Убытки ↓';
	-- SET STATISTICS TIME ON;

	SELECT cl.CLAIM_NUMBER NUMBER, cl.CLAIM_ID ID, pa.CODE_NAME, pa.PUBLISHED_VERSION, 'Claim' ENTITY
	INTO #claimsToUpdate
	FROM clm.claim cl
	LEFT JOIN CLM_IMPL.CLM_HUB clH ON clH.CLAIM_NUMBER = cl.CLAIM_NUMBER
	LEFT JOIN CLM_IMPL.CLM_APPLICANT_LINK capl ON capl.CLM_HKEY = clH.CLM_HKEY
	LEFT JOIN CLM_IMPL.CLM_IE_LINK clIeL ON clIeL.CLM_HKEY = clh.CLM_HKEY
	LEFT JOIN CLM_IMPL.CLM_BENEFICIARY_LINK cbl ON cbl.CLM_HKEY = clh.CLM_HKEY
	LEFT JOIN PTY_IMPL.PARTY_HUB phClaim ON phClaim.PARTY_HKEY = capl.PARTY_HKEY
	LEFT JOIN PTY_IMPL.PARTY_HUB phBen ON phBen.PARTY_HKEY = cbl.PARTY_HKEY
	LEFT JOIN CFX.PUBLISHED_ARTIFACT pa ON pa.PUBLISHED_ARTIFACT_ID = cl.PUBLISHED_ARTIFACT_ID
	WHERE phClaim.PARTY_CODE = @partyCode OR phBen.PARTY_CODE = @partyCode

	SET @updatedClaimRows = (SELECT COUNT(*) FROM #claimsToUpdate)

	SET @claimNumbers = '{}';
	IF (@updatedClaimRows > 0) 

		BEGIN 

		SET @claimNumbers = (
            SELECT NUMBER, ID, CODE_NAME, PUBLISHED_VERSION, ENTITY
            FROM #claimsToUpdate
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		)

		UPDATE clm.CLAIM 
		SET BODY = REPLACE(BODY,
					'"partyCode": "' + @partyCode + '"',
					'"partyCode": "' + @deduplCode + '"'
			),
			COMMON_BODY = REPLACE(COMMON_BODY,
					'"partyCode": "' + @partyCode + '"',
					'"partyCode": "' + @deduplCode + '"'
			),
			SYS_UPDATED_ON = GETDATE()
		WHERE CHARINDEX('"partyCode": "' + @partyCode + '"', BODY) != 0

		END
	ELSE
		SET @updatedClaimRows = @updatedClaimRows

	drop table #claimsToUpdate

	-- SET STATISTICS TIME OFF;
	-- ########## CLAIM END ########## --

	-- ########## SAVE UPDATED PAYMENT ORDERS ########## --
	-- SET STATISTICS TIME ON;
	SET @paymentOrderNumbers = (
		SELECT po.PAYMENT_ORDER_NUMBER NUMBER, po.PAYMENT_ORDER_ID ID, pa.CODE_NAME, pa.PUBLISHED_VERSION, 'PaymentOrder' ENTITY
		FROM ACC.PAYMENT_ORDER po
		LEFT JOIN CFX.PUBLISHED_ARTIFACT pa ON pa.PUBLISHED_ARTIFACT_ID = po.PUBLISHED_ARTIFACT_ID
		WHERE JSON_VALUE(BODY, '$.recipientInformation.partyCodeName') = @partyCode
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
	);
	IF (@paymentOrderNumbers IS NULL) 
		SET @paymentOrderNumbers = '{}'

	-- SET STATISTICS TIME OFF;
	-- ########## SAVE UPDATED PAYMENT ORDERS ########## --

	-- ########## PAYMENT ORDER START ########## --
	-- PRINT '';
	-- PRINT N'Расчет на выплату';
	-- SET STATISTICS TIME ON;
	UPDATE ACC.PAYMENT_ORDER
	SET BODY = JSON_MODIFY(BODY, '$.recipientInformation.partyCodeName', @deduplCode),
		COMMON_BODY = JSON_MODIFY(
						  JSON_MODIFY(COMMON_BODY, '$.attributes.recipientInformation.partyCodeName', @deduplCode), 
						  '$.recipientInformation.code', 
						  @deduplCode
					  ),
		SYS_UPDATED_ON = GETDATE()
	WHERE JSON_VALUE(BODY, '$.recipientInformation.partyCodeName') = @partyCode
	-- SET STATISTICS TIME OFF;
	-- ########## PAYMENT ORDER END ########## --

	-- ########## ORG START ########## --
	-- PRINT '';
	-- PRINT N'Орг структура';
	-- PRINT N'Сотрудник и партнер ↓';
	-- SET STATISTICS TIME ON;

	SELECT sp.SERVICE_PROVIDER_CODE NUMBER, sp.SERVICE_PROVIDER_ID ID, pa.CODE_NAME, pa.PUBLISHED_VERSION, 'ServiceProvider' ENTITY
	INTO #serviceProvidersToUpdate
	FROM ORG.SERVICE_PROVIDER sp
	LEFT JOIN ORG_IMPL.SERVICE_PROVIDER_HUB sph ON sph.SERVICE_PROVIDER_CODE = sp.SERVICE_PROVIDER_CODE
	LEFT JOIN ORG_IMPL.SERVICE_PROVIDER_INFO_SAT_LATEST sps ON sps.SERVICE_PROVIDER_INFO_HKEY = sph.SERVICE_PROVIDER_HKEY
	LEFT JOIN CFX.PUBLISHED_ARTIFACT pa ON pa.PUBLISHED_ARTIFACT_ID = sp.PUBLISHED_ARTIFACT_ID
	WHERE sps.PARTY_CODE = @partyCode

	SET @updatedServiceProviderRows = (SELECT COUNT(*) FROM #serviceProvidersToUpdate)

	SET @serviceProviderNumbers = '{}';
	IF (@updatedServiceProviderRows > 0) 

		BEGIN

		SET @serviceProviderNumbers = (
            SELECT NUMBER, ID, CODE_NAME, PUBLISHED_VERSION, ENTITY
            FROM #serviceProvidersToUpdate
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		)

		UPDATE
			ORG.SERVICE_PROVIDER
		SET
			BODY = REPLACE(
				REPLACE(
					BODY,
					'"partyId": "' + @partyId + '"',
					'"partyId": "' + @deduplId + '"'
				),
				'"partyCode": "' + @partyCode + '"',
				'"partyCode": "' + @deduplCode + '"'
			),
			COMMON_BODY = REPLACE(
				REPLACE(
					COMMON_BODY,
					'"partyId": "' + @partyId + '"',
					'"partyId": "' + @deduplId + '"'
				),
				'"partyCode": "' + @partyCode + '"',
				'"partyCode": "' + @deduplCode + '"'
			),
			PARTY_CODE = @deduplCode,
			SYS_UPDATED_ON = GETDATE()
		FROM
			ORG.SERVICE_PROVIDER sp
			JOIN #serviceProvidersToUpdate ctu ON ctu.NUMBER = sp.SERVICE_PROVIDER_CODE


		UPDATE
			ORG.SERVICE_PROVIDER_HISTORY
		SET
			BODY = REPLACE(
				REPLACE(
					BODY,
					'"partyId": "' + @partyId + '"',
					'"partyId": "' + @deduplId + '"'
				),
				'"partyCode": "' + @partyCode + '"',
				'"partyCode": "' + @deduplCode + '"'
			),
			COMMON_BODY = REPLACE(
				REPLACE(
					COMMON_BODY,
					'"partyId": "' + @partyId + '"',
					'"partyId": "' + @deduplId + '"'
				),
				'"partyCode": "' + @partyCode + '"',
				'"partyCode": "' + @deduplCode + '"'
			),
			PARTY_CODE = @deduplCode,
			SYS_UPDATED_ON = GETDATE()
		FROM
			ORG.SERVICE_PROVIDER_HISTORY sp
			JOIN #serviceProvidersToUpdate ctu ON ctu.NUMBER = sp.SERVICE_PROVIDER_CODE
	
		END
	ELSE
		SET @updatedServiceProviderRows = @updatedServiceProviderRows

	drop table #serviceProvidersToUpdate

	-- SET STATISTICS TIME OFF;
	

	-- PRINT '';
	-- PRINT N'Пользователь ↓';
	-- SET STATISTICS TIME ON;
	SET @naturalPersonNumbers = (
           SELECT auc.VALUE, auc.APPLICATION_USER_ID ID, 'NaturalPerson' CODE_NAME, '1' PUBLISHED_VERSION, 'Party' ENTITY
           FROM ORG.APPLICATION_USER_CLAIM auc
		   WHERE CLAIM_TYPE = 'PartyCode' and VALUE = @partyCode
           FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
	)
	IF (@naturalPersonNumbers IS NULL) 
		SET @naturalPersonNumbers = '{}'

	UPDATE ORG.APPLICATION_USER_CLAIM
	SET VALUE = @deduplCode,
		SYS_UPDATED_ON = GETDATE()
	FROM ORG.APPLICATION_USER_CLAIM
	WHERE CLAIM_TYPE = 'PartyCode' and VALUE = @partyCode
	-- SET STATISTICS TIME OFF;
	-- ########## ORG END ########## --

	-- ########## COMMISSIONS START ########## --
	-- PRINT '';
	-- PRINT N'Проводки ↓';
	-- SET STATISTICS TIME ON;
	UPDATE PAS_IMPL.P_INVOICED_COMMISSION
	SET OBJECT_CODE = @deduplCode
	WHERE OBJECT_CODE = @partyCode

	UPDATE PAS_IMPL.P_PAYMENT_PLAN_SAT
	SET OBJECT_CODE = @deduplCode
	WHERE OBJECT_CODE = @partyCode

	UPDATE ACC_IMPL.MATCHING_POLICY
	SET OBJECT_CODE = @deduplCode
	WHERE OBJECT_CODE = @partyCode

	UPDATE ACC_IMPL.PAYABLE_COMMISSION
	SET OBJECT_CODE = @deduplCode
	WHERE OBJECT_CODE = @partyCode

	UPDATE ACC.JR_ADDITIONAL_ATTRIBUTES
	SET PARTY_CODE = @deduplCode
	WHERE PARTY_CODE = @partyCode

	UPDATE ACC.GL_ADDITIONAL_ATTRIBUTES
	SET PARTY_CODE = @deduplCode
	WHERE PARTY_CODE = @partyCode

	UPDATE ACC_IMPL.REVALUATION_DATA
	SET OBJECT_CODE = @deduplCode
	WHERE OBJECT_CODE = @partyCode

	UPDATE ACC_IMPL.RSD_ITEM_LINK
	SET OBJECT_CODE = @deduplCode
	WHERE OBJECT_CODE = @partyCode

	UPDATE ACC_IMPL.RSD_JOB_PP_DATA
	SET OBJECT_CODE = @deduplCode
	WHERE OBJECT_CODE = @partyCode

	UPDATE PAS_IMPL.POLICY_COMMISSION_SAT
	SET OBJECT_CODE = @deduplCode
	WHERE OBJECT_CODE = @partyCode
	-- SET STATISTICS TIME OFF;
	-- ########## COMMISSIONS END ########## --

	-- UPDATE PTY_IMPL.PARTY_DEDUP_INFO
	-- SET UPDATE_ORDER = CONVERT(INT, (SELECT MAX(UPDATE_ORDER) FROM PTY_IMPL.PARTY_DEDUP_INFO
	-- WHERE DEDUPL_NUMBER = @deduplCode) + 1)
	-- WHERE PARTY_CODE = @partyCode AND DEDUPL_NUMBER = @deduplCode

	-- ########## ASS START ########## --
	-- SET STATISTICS TIME ON;
	-- PRINT '';
	-- PRINT N'Аналитическая подсистема';
	IF (@updatedPolicyRowsHolder > 0)
		BEGIN

		UPDATE PAS_IMPL.QUOTE_SAT
		SET HOLDER_CODE = @deduplCode
		WHERE HOLDER_CODE = @partyCode

		UPDATE PAS_IMPL.POLICY_SAT
		SET HOLDER_CODE = @deduplCode
		WHERE HOLDER_CODE = @partyCode

		UPDATE UNI_IMPL.RQT_SAT
		SET APPLICANT_CODE = @deduplCode
		WHERE APPLICANT_CODE = @partyCode

		END
	ELSE
		SET @updatedPolicyRowsHolder = @updatedPolicyRowsHolder

	IF (@updatedPolicyRowsInsured > 0)
		BEGIN

		UPDATE PAS_IMPL.QUOTE_SAT
		SET INSURED_CODE = @deduplCode
		WHERE INSURED_CODE = @partyCode

		UPDATE PAS_IMPL.POLICY_SAT
		SET INSURED_CODE = @deduplCode
		WHERE INSURED_CODE = @partyCode

		END
	ELSE
		SET @updatedPolicyRowsInsured = @updatedPolicyRowsInsured

	IF (@updatedCancellationRows > 0)
		BEGIN

		SET @partyCodeHKEY = (SELECT ptyH.PARTY_HKEY FROM PTY.PARTY pty
		LEFT JOIN PTY_IMPL.PARTY_HUB ptyH ON ptyH.PARTY_CODE = pty.PARTY_CODE
		WHERE pty.PARTY_CODE = @partyCode)

		SET @deduplCodeHKEY = (SELECT ptyH.PARTY_HKEY FROM PTY.PARTY pty
		LEFT JOIN PTY_IMPL.PARTY_HUB ptyH ON ptyH.PARTY_CODE = pty.PARTY_CODE
		WHERE pty.PARTY_CODE = @deduplCode)

		UPDATE PAS_IMPL.CNL_APPLICANT_LINK
		SET PARTY_HKEY = @deduplCodeHKEY
		WHERE PARTY_HKEY = @partyCodeHKEY

		UPDATE PAS_IMPL.CNL_RECIPIENT_LINK
		SET PARTY_HKEY = @deduplCodeHKEY
		WHERE PARTY_HKEY = @partyCodeHKEY

		END
	ELSE
		SET @updatedPolicyRowsInsured = @updatedPolicyRowsInsured

	IF (@updatedServiceProviderRows > 0) 
		BEGIN

		UPDATE ORG_IMPL.SERVICE_PROVIDER_INFO_SAT
		SET PARTY_CODE = @deduplCode
		WHERE PARTY_CODE = @partyCode

		END
	ELSE
		SET @updatedServiceProviderRows = @updatedServiceProviderRows
	-- SET STATISTICS TIME OFF;
    -- ########## ASS END ########## --

	-- ########## ATTACHMENTS START ########## --
	update bfx.attachment_related_entity
	   set entity_ref_id = @deduplId
	 where entity_ref_id = @partyId
	-- ########## ATTACHMENTS END ########## --

	-- PRINT '';
	-- PRINT N'Копируем информацию о контрагенте, которую будем удалять ↓';
	-- SET STATISTICS TIME ON;
	-- INSERT INTO PTY_IMPL.PARTY_DEDUP_DELETED
	-- SELECT * FROM PTY.PARTY WHERE PARTY_CODE = @partyCode
	-- SET STATISTICS TIME OFF;

	-- PRINT '';
	-- PRINT N'Обновляем информацию старого контрагента ↓';
	-- SET STATISTICS TIME ON;
	UPDATE PTY.PARTY
	SET BODY = JSON_MODIFY(BODY, '$.partyGeneralData.duplicateMasterNumber', @deduplCode),
		COMMON_BODY = JSON_MODIFY(COMMON_BODY, '$.attributes.duplicateMasterNumber', @deduplCode)
	WHERE PARTY_CODE = @partyCode	
	
	UPDATE PTY_IMPL.PARTY_INFO_SAT
	SET DUPLICATE_MASTER_NUMBER = @deduplCode
	FROM PTY.PARTY pty
		LEFT JOIN PTY_IMPL.PARTY_HUB ph ON ph.PARTY_CODE = pty.PARTY_CODE
		LEFT JOIN PTY_IMPL.PARTY_INFO_SAT ptys ON ptys.PARTY_INFO_HKEY = ph.PARTY_HKEY
	WHERE pty.PARTY_CODE = @partyCode
		AND ptys.LOAD_DATE = (SELECT
		MAX(ptys.LOAD_DATE)
		FROM PTY.PARTY pty
		LEFT JOIN PTY_IMPL.PARTY_HUB ph ON ph.PARTY_CODE = pty.PARTY_CODE
		LEFT JOIN PTY_IMPL.PARTY_INFO_SAT ptys ON ptys.PARTY_INFO_HKEY = ph.PARTY_HKEY
		WHERE pty.PARTY_CODE = @partyCode)
	-- SET STATISTICS TIME OFF;

	-- PRINT '';
	-- PRINT N'Ставим отметку об успешном выполнении ↓';
	-- SET STATISTICS TIME ON;
	UPDATE PTY_IMPL.PARTY_DEDUP_INFO
	SET IS_PROCESSED = 1,
		UPDATED_DOCUMENTS = CONCAT('[', @contractNumbersHolder, ',', @contractNumbersInsured, ',', @contractNumbersInitiator, ',', @cancellationNumbers, ',', @serviceProviderNumbers, ',', @endowmentNumbers, ',', @requestNumbers, ',', @verificationNumbersHolder, ',', @verificationNumbersInsured, ',', @claimNumbers, ',', @paymentOrderNumbers, ',', @naturalPersonNumbers, ']')
	WHERE PARTY_CODE = @partyCode and DEDUPL_NUMBER = @deduplCode
	-- SET STATISTICS TIME OFF;
  
END;

end
GO