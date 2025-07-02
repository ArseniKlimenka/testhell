--DROP TABLE #CONTRACT_WITH_PARTY_ERR_HOLDER
--DROP TABLE #PARTY_DEDUP_INFO_WITH_PARTY_ERR_HOLDER
--DROP TABLE #CONTRACT_WITH_PARTY_ERR_INSURED
--DROP TABLE #PARTY_DEDUP_INFO_WITH_PARTY_ERR_INSURED
--DROP TABLE #CONTRACT_WITH_PARTY_ERR_INITIATOR
--DROP TABLE #PARTY_DEDUP_INFO_WITH_PARTY_ERR_INITIATOR

-- ############### Some declarations
DECLARE @contractNumber nvarchar(64);
DECLARE @partyCode nvarchar(64);
DECLARE @partyId nvarchar(64);
DECLARE @deduplCode nvarchar(64);
DECLARE @deduplId nvarchar(64);

-- ########## POLICY HOLDER START ########## --
-- PRINT '';
-- PRINT N'Котировка и договор';
-- PRINT N'Страхователь ↓';
-- SET STATISTICS TIME ON;

SELECT DISTINCT
	c.CONTRACT_NUMBER, 
	JSON_VALUE(c.BODY, '$.policyHolder.partyData.partyCode') CONTRACT_HOLDER_CODE,
	psl.HOLDER_CODE SAT_HOLDER_CODE, 
	pdi.DEDUPL_NUMBER
INTO #CONTRACT_WITH_PARTY_ERR_HOLDER
FROM PAS.CONTRACT c
	LEFT JOIN PAS_IMPL.POLICY_HUB ph ON ph.CONTRACT_NUMBER = c.CONTRACT_NUMBER
	LEFT JOIN PAS_IMPL.POLICY_SAT_LATEST psl on psl.POLICY_HKEY = ph.POLICY_HKEY
	LEFT JOIN PTY_IMPL.PARTY_DEDUP_INFO pdi ON pdi.DEDUPL_NUMBER = psl.HOLDER_CODE
WHERE 
	psl.HOLDER_CODE != JSON_VALUE(c.BODY, '$.policyHolder.partyData.partyCode')
	AND pdi.DEDUPL_NUMBER = psl.HOLDER_CODE
	AND c.SEQ_NUMBER = 0

SELECT
	CONTRACT_NUMBER,
	CONTRACT_HOLDER_CODE PARTY_CODE,
	DEDUPL_NUMBER,
	0 UPDATE_ORDER,
	0 IS_PROCESSED, 
	0 ERROR, 
	GETDATE() DATE 
INTO #PARTY_DEDUP_INFO_WITH_PARTY_ERR_HOLDER
FROM #CONTRACT_WITH_PARTY_ERR_HOLDER
WHERE 
CONTRACT_HOLDER_CODE != SAT_HOLDER_CODE AND 
CONTRACT_HOLDER_CODE != DEDUPL_NUMBER 

DECLARE cur_party CURSOR LOCAL STATIC FORWARD_ONLY for
SELECT pdi.CONTRACT_NUMBER, pdi.PARTY_CODE, p.PARTY_ID, pdi.DEDUPL_NUMBER, LOWER(d.PARTY_ID) DEDUPL_ID
FROM #PARTY_DEDUP_INFO_WITH_PARTY_ERR_HOLDER pdi
LEFT JOIN PTY_IMPL.PARTY_DEDUP_DELETED p ON p.PARTY_CODE = pdi.PARTY_CODE
LEFT JOIN PTY.PARTY d ON d.PARTY_CODE = pdi.DEDUPL_NUMBER
WHERE pdi.IS_PROCESSED = 0

open cur_party;

-- ############### Update party id and code in AdInsure tables
fetch next FROM cur_party into @contractNumber, @partyCode, @partyId, @deduplCode, @deduplId;
while @@FETCH_STATUS = 0 
BEGIN

	BEGIN TRY
	BEGIN TRAN

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
			)
		FROM PAS.CONTRACT policy
		WHERE policy.CONTRACT_NUMBER = @contractNumber
	
	COMMIT TRAN
	END TRY

	BEGIN CATCH

		ROLLBACK TRAN
		DECLARE @ErrorMessage1 NVARCHAR(4000); DECLARE @ErrorSeverity1 INT; DECLARE @ErrorState1 INT;
		SELECT @ErrorMessage1 = ERROR_MESSAGE(), @ErrorSeverity1 = ERROR_SEVERITY(), @ErrorState1 = 1;

		UPDATE PTY_IMPL.PARTY_DEDUP_INFO
		SET ERROR = CONCAT('ErrorMessage:',@ErrorMessage1, ' ErrorSeverity:', @ErrorSeverity1, '. ErrorState:', @ErrorState1, '.')
		WHERE PARTY_CODE = @partyCode and DEDUPL_NUMBER = @deduplCode

		RAISERROR (@ErrorMessage1, @ErrorSeverity1, @ErrorState1);

	END CATCH

	fetch next FROM cur_party into @contractNumber, @partyCode, @partyId, @deduplCode, @deduplId;
  
END;
close cur_party;
deallocate cur_party;

DROP TABLE #CONTRACT_WITH_PARTY_ERR_HOLDER
DROP TABLE #PARTY_DEDUP_INFO_WITH_PARTY_ERR_HOLDER
-- SET STATISTICS TIME OFF;
-- ########## POLICY HOLDER END ########## --




-- ########## INSURED START ########## --
-- PRINT '';
-- PRINT N'Застрахованный ↓';
-- SET STATISTICS TIME ON;

SELECT DISTINCT
	c.CONTRACT_NUMBER, 
	JSON_VALUE(c.BODY, '$.insuredPerson.partyData.partyCode') CONTRACT_INSURED_CODE,
	psl.INSURED_CODE SAT_INSURED_CODE, 
	pdi.DEDUPL_NUMBER
INTO #CONTRACT_WITH_PARTY_ERR_INSURED
FROM PAS.CONTRACT c
	LEFT JOIN PAS_IMPL.POLICY_HUB ph ON ph.CONTRACT_NUMBER = c.CONTRACT_NUMBER
	LEFT JOIN PAS_IMPL.POLICY_SAT_LATEST psl on psl.POLICY_HKEY = ph.POLICY_HKEY
	LEFT JOIN PTY_IMPL.PARTY_DEDUP_INFO pdi ON pdi.DEDUPL_NUMBER = psl.INSURED_CODE
WHERE 
	psl.INSURED_CODE != JSON_VALUE(c.BODY, '$.insuredPerson.partyData.partyCode') 
	AND pdi.DEDUPL_NUMBER = psl.INSURED_CODE
	AND c.SEQ_NUMBER = 0

SELECT 
	CONTRACT_NUMBER,
	CONTRACT_INSURED_CODE PARTY_CODE,
	DEDUPL_NUMBER,
	0 UPDATE_ORDER,
	0 IS_PROCESSED, 
	0 ERROR, 
	GETDATE() DATE 
INTO #PARTY_DEDUP_INFO_WITH_PARTY_ERR_INSURED
FROM #CONTRACT_WITH_PARTY_ERR_INSURED
WHERE 
CONTRACT_INSURED_CODE != SAT_INSURED_CODE AND 
CONTRACT_INSURED_CODE != DEDUPL_NUMBER


DECLARE cur_party CURSOR LOCAL STATIC FORWARD_ONLY for
SELECT pdi.CONTRACT_NUMBER, pdi.PARTY_CODE, p.PARTY_ID, pdi.DEDUPL_NUMBER, LOWER(d.PARTY_ID) DEDUPL_ID
FROM #PARTY_DEDUP_INFO_WITH_PARTY_ERR_INSURED pdi
LEFT JOIN PTY_IMPL.PARTY_DEDUP_DELETED p ON p.PARTY_CODE = pdi.PARTY_CODE
LEFT JOIN PTY.PARTY d ON d.PARTY_CODE = pdi.DEDUPL_NUMBER
WHERE pdi.IS_PROCESSED = 0

open cur_party;

-- ############### Update party id and code in AdInsure tables
fetch next FROM cur_party into @contractNumber, @partyCode, @partyId, @deduplCode, @deduplId;
while @@FETCH_STATUS = 0 
BEGIN

	BEGIN TRY
	BEGIN TRAN

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
			)
		FROM PAS.CONTRACT policy
		WHERE policy.CONTRACT_NUMBER = @contractNumber
	

	-- ########## CANCELLATION AMENDMENT START ########## --
	-- PRINT '';
	-- PRINT N'Расторжение (Заявитель и Получатель) ↓';
	-- SET STATISTICS TIME ON;
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
						)
				FROM
					PAS.CONTRACT am
				WHERE
					CONTRACT_NUMBER in (
                        select DISTINCT CONTRACT_NUMBER from pas.CONTRACT c
						where ORIGINAL_DOCUMENT_ID = (
							select ORIGINAL_DOCUMENT_ID 
							from pas.CONTRACT 
							where CONTRACT_NUMBER = @contractNumber
						) AND SEQ_NUMBER !=0    
					)

	-- SET STATISTICS TIME OFF;
	-- ########## CANCELLATION AMENDMENT END ########## --
	
	COMMIT TRAN
	END TRY

	BEGIN CATCH

		ROLLBACK TRAN
		DECLARE @ErrorMessage2 NVARCHAR(4000); DECLARE @ErrorSeverity2 INT; DECLARE @ErrorState2 INT;
		SELECT @ErrorMessage2 = ERROR_MESSAGE(), @ErrorSeverity2 = ERROR_SEVERITY(), @ErrorState2 = 1;

		UPDATE PTY_IMPL.PARTY_DEDUP_INFO
		SET ERROR = CONCAT('ErrorMessage:',@ErrorMessage2, ' ErrorSeverity:', @ErrorSeverity2, '. ErrorState:', @ErrorState2, '.')
		WHERE PARTY_CODE = @partyCode and DEDUPL_NUMBER = @deduplCode

		RAISERROR (@ErrorMessage2, @ErrorSeverity2, @ErrorState2);

	END CATCH

	fetch next FROM cur_party into @contractNumber, @partyCode, @partyId, @deduplCode, @deduplId;
  
END;
close cur_party;
deallocate cur_party;

DROP TABLE #CONTRACT_WITH_PARTY_ERR_INSURED
DROP TABLE #PARTY_DEDUP_INFO_WITH_PARTY_ERR_INSURED

-- SET STATISTICS TIME OFF;
-- ########## INSURED END ########## --


-- ########## INITIATOR START ########## --
-- PRINT '';
-- PRINT N'Инициатор ↓';
-- SET STATISTICS TIME ON;

SELECT DISTINCT
	c.CONTRACT_NUMBER, 
	JSON_VALUE(c.BODY, '$.initiator.employeeCode') CONTRACT_INITIATOR_EMPLOYEE_CODE,
	psl.INITIATOR_EMPLOYEE_CODE SAT_INITIATOR_EMPLOYEE_CODE,
	pdi.DEDUPL_NUMBER
INTO #CONTRACT_WITH_PARTY_ERR_INITIATOR
FROM PAS.CONTRACT c
	LEFT JOIN PAS_IMPL.POLICY_HUB ph ON ph.CONTRACT_NUMBER = c.CONTRACT_NUMBER
	LEFT JOIN PAS_IMPL.POLICY_SAT_LATEST psl on psl.POLICY_HKEY = ph.POLICY_HKEY
	LEFT JOIN PTY_IMPL.PARTY_DEDUP_INFO pdi ON pdi.DEDUPL_NUMBER = psl.INITIATOR_EMPLOYEE_CODE
WHERE 
	psl.INITIATOR_EMPLOYEE_CODE != JSON_VALUE(c.BODY, '$.initiator.employeeCode')
	AND pdi.DEDUPL_NUMBER = psl.INITIATOR_EMPLOYEE_CODE
	AND c.SEQ_NUMBER = 0

SELECT 
	CONTRACT_NUMBER,
	CONTRACT_INITIATOR_EMPLOYEE_CODE PARTY_CODE,
	DEDUPL_NUMBER,
	0 UPDATE_ORDER,
	0 IS_PROCESSED, 
	0 ERROR, 
	GETDATE() DATE 
INTO #PARTY_DEDUP_INFO_WITH_PARTY_ERR_INITIATOR
FROM #CONTRACT_WITH_PARTY_ERR_INITIATOR
WHERE 
CONTRACT_INITIATOR_EMPLOYEE_CODE != SAT_INITIATOR_EMPLOYEE_CODE AND 
CONTRACT_INITIATOR_EMPLOYEE_CODE != DEDUPL_NUMBER


DECLARE cur_party CURSOR LOCAL STATIC FORWARD_ONLY for
SELECT pdi.CONTRACT_NUMBER, pdi.PARTY_CODE, p.PARTY_ID, pdi.DEDUPL_NUMBER, LOWER(d.PARTY_ID) DEDUPL_ID
FROM #PARTY_DEDUP_INFO_WITH_PARTY_ERR_INITIATOR pdi
LEFT JOIN PTY_IMPL.PARTY_DEDUP_DELETED p ON p.PARTY_CODE = pdi.PARTY_CODE
LEFT JOIN PTY.PARTY d ON d.PARTY_CODE = pdi.DEDUPL_NUMBER
WHERE pdi.IS_PROCESSED = 0

open cur_party;

-- ############### Update party id and code in AdInsure tables
fetch next FROM cur_party into @contractNumber, @partyCode, @partyId, @deduplCode, @deduplId;
while @@FETCH_STATUS = 0 
BEGIN

	BEGIN TRY
	BEGIN TRAN

		UPDATE policy
		SET BODY = JSON_MODIFY(policy.BODY, '$.initiator.partyCode', @deduplCode),
			SNAPSHOT_BODY = JSON_MODIFY(policy.SNAPSHOT_BODY, '$.initiator.partyCode', @deduplCode)
		FROM PAS.CONTRACT policy
		WHERE policy.CONTRACT_NUMBER = @contractNumber

	COMMIT TRAN
	END TRY

	BEGIN CATCH

		ROLLBACK TRAN
		DECLARE @ErrorMessage3 NVARCHAR(4000); DECLARE @ErrorSeverity3 INT; DECLARE @ErrorState3 INT;
		SELECT @ErrorMessage3 = ERROR_MESSAGE(), @ErrorSeverity3 = ERROR_SEVERITY(), @ErrorState3 = 1;

		UPDATE PTY_IMPL.PARTY_DEDUP_INFO
		SET ERROR = CONCAT('ErrorMessage:',@ErrorMessage3, ' ErrorSeverity:', @ErrorSeverity3, '. ErrorState:', @ErrorState3, '.')
		WHERE PARTY_CODE = @partyCode and DEDUPL_NUMBER = @deduplCode

		RAISERROR (@ErrorMessage3, @ErrorSeverity3, @ErrorState3);

	END CATCH

	fetch next FROM cur_party into @contractNumber, @partyCode, @partyId, @deduplCode, @deduplId;
  
END;
close cur_party;
deallocate cur_party;

DROP TABLE #CONTRACT_WITH_PARTY_ERR_INITIATOR
DROP TABLE #PARTY_DEDUP_INFO_WITH_PARTY_ERR_INITIATOR
-- SET STATISTICS TIME OFF;
-- ########## INITIATOR END ########## --
