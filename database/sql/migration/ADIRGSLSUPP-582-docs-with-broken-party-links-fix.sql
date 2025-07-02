-- ############### Some declarations
DECLARE @contractNumber nvarchar(64);
DECLARE @contractHolderCode nvarchar(64);
DECLARE @contractInsuredCode nvarchar(64);
DECLARE @contractInitiatorCode nvarchar(64);
DECLARE @qHolderCode nvarchar(64);
DECLARE @qInsuredCode nvarchar(64);
DECLARE @qInitiatorEmpCode nvarchar(64);
DECLARE @pHolderCode nvarchar(64);
DECLARE @pInsuredCode nvarchar(64);
DECLARE @pInitiatorEmpCode nvarchar(64);
DECLARE @contractHolderCodeExist nvarchar(64);
DECLARE @contractInsuredCodeExist nvarchar(64);
DECLARE @contractInitiatorCodeExist nvarchar(64);
DECLARE @holderDedupNumber nvarchar(64);
DECLARE @insuredDedupNumber nvarchar(64);
DECLARE @initiatorDedupNumber nvarchar(64);
DECLARE @holderDedupId nvarchar(64);
DECLARE @insuredDedupId nvarchar(64);
DECLARE @initiatorDedupId nvarchar(64);
DECLARE @holderDeletedNumber nvarchar(64);
DECLARE @insuredDeletedNumber nvarchar(64);
DECLARE @initiatorDeletedNumber nvarchar(64);
DECLARE @holderDeletedId nvarchar(64);
DECLARE @insuredDeletedId nvarchar(64);
DECLARE @initiatorDeletedId nvarchar(64);

SELECT
	c.CONTRACT_NUMBER,
	JSON_VALUE(c.BODY, '$.policyHolder.partyData.partyCode') CONTRACT_HOLDER_CODE,
	JSON_VALUE(c.BODY, '$.insuredPerson.partyData.partyCode') CONTRACT_INSURED_CODE,
	JSON_VALUE(c.BODY, '$.initiator.partyCode') CONTRACT_INITIATOR_CODE,
	ptyHolder.PARTY_CODE HOLDER_CODE_EXIST,
	ptyInsured.PARTY_CODE INSURED_CODE_EXIST,
	ptyInitiator.PARTY_CODE INITIATOR_CODE_EXIST
INTO #DOC_WITH_BROKEN_PARTY
FROM PAS.CONTRACT c
LEFT JOIN PTY.PARTY ptyHolder ON ptyHolder.PARTY_CODE = JSON_VALUE(c.BODY, '$.policyHolder.partyData.partyCode')
LEFT JOIN PTY.PARTY ptyInsured ON ptyInsured.PARTY_CODE = JSON_VALUE(c.BODY, '$.insuredPerson.partyData.partyCode')
LEFT JOIN PTY.PARTY ptyInitiator ON ptyInitiator.PARTY_CODE = JSON_VALUE(c.BODY, '$.initiator.partyCode')
WHERE 
((JSON_VALUE(c.BODY, '$.policyHolder.partyData.partyCode') IS NOT NULL AND ptyHolder.PARTY_CODE IS NULL) OR 
(JSON_VALUE(c.BODY, '$.insuredPerson.partyData.partyCode') IS NOT NULL AND ptyInsured.PARTY_CODE IS NULL) OR 
(JSON_VALUE(c.BODY, '$.initiator.partyCode') IS NOT NULL AND ptyInitiator.PARTY_CODE IS NULL))

--SELECT * FROM #DOC_WITH_BROKEN_PARTY

DECLARE cur_contract CURSOR LOCAL STATIC FORWARD_ONLY for
SELECT 	
	c.CONTRACT_NUMBER,
	JSON_VALUE(c.BODY, '$.policyHolder.partyData.partyCode') CONTRACT_HOLDER_CODE,
	JSON_VALUE(c.BODY, '$.insuredPerson.partyData.partyCode') CONTRACT_INSURED_CODE,
	JSON_VALUE(c.BODY, '$.initiator.partyCode') CONTRACT_INITIATOR_CODE, 
	qsl.HOLDER_CODE Q_HOLDER_CODE,
	qsl.INSURED_CODE Q_INSURED_CODE,
	qsl.INITIATOR_EMPLOYEE_CODE Q_INITIATOR_EMPLOYEE_CODE,
	psl.HOLDER_CODE P_HOLDER_CODE,
	psl.INSURED_CODE P_INSURED_CODE,
	psl.INITIATOR_EMPLOYEE_CODE P_INITIATOR_EMPLOYEE_CODE,
	ptyHolder.PARTY_CODE HOLDER_CODE_EXIST,
	ptyInsured.PARTY_CODE INSURED_CODE_EXIST,
	ptyInitiator.PARTY_CODE INITIATOR_CODE_EXIST,
	pdiHolder.DEDUPL_NUMBER HOLDER_DEDUPL_NUMBER,
	pdiInsured.DEDUPL_NUMBER INSURED_DEDUPL_NUMBER,
	pdiInitiator.DEDUPL_NUMBER INITIATOR_DEDUPL_NUMBER,
	ptyDedupHolder.PARTY_ID HOLDER_DEDUPL_ID,
	ptyDedupInsured.PARTY_ID INSURED_DEDUPL_ID,
	ptyDedupInitiator.PARTY_ID INITIATOR_DEDUPL_ID,
	pddHolder.PARTY_CODE HOLDER_DELETED_NUMBER,
	pddInsured.PARTY_CODE INSURED_DELETED_NUMBER,
	pddInitiator.PARTY_CODE INITIATOR_DELETED_NUMBER,
	pddHolder.PARTY_ID HOLDER_DELETED_ID,
	pddInsured.PARTY_ID INSURED_DELETED_ID,
	pddInitiator.PARTY_ID INITIATOR_DELETED_ID
FROM #DOC_WITH_BROKEN_PARTY dwbp
LEFT JOIN PAS.CONTRACT c ON c.CONTRACT_NUMBER = dwbp.CONTRACT_NUMBER
LEFT JOIN PAS_IMPL.QUOTE_HUB qs ON qs.CONTRACT_NUMBER = c.CONTRACT_NUMBER 
LEFT JOIN PAS_IMPL.QUOTE_SAT_LATEST qsl on qsl.QUOTE_HKEY = qs.QUOTE_HKEY 
LEFT JOIN PAS_IMPL.POLICY_HUB ps ON ps.CONTRACT_NUMBER = c.CONTRACT_NUMBER 
LEFT JOIN PAS_IMPL.POLICY_SAT_LATEST psl on psl.POLICY_HKEY = ps.POLICY_HKEY 
LEFT JOIN PTY.PARTY ptyHolder ON ptyHolder.PARTY_CODE = JSON_VALUE(c.BODY, '$.policyHolder.partyData.partyCode')
LEFT JOIN PTY.PARTY ptyInsured ON ptyInsured.PARTY_CODE = JSON_VALUE(c.BODY, '$.insuredPerson.partyData.partyCode')
LEFT JOIN PTY.PARTY ptyInitiator ON ptyInitiator.PARTY_CODE = JSON_VALUE(c.BODY, '$.initiator.partyCode')
LEFT JOIN PTY_IMPL.PARTY_DEDUP_INFO pdiHolder ON pdiHolder.PARTY_CODE = JSON_VALUE(c.BODY, '$.policyHolder.partyData.partyCode')
LEFT JOIN PTY_IMPL.PARTY_DEDUP_INFO pdiInsured ON pdiInsured.PARTY_CODE = JSON_VALUE(c.BODY, '$.insuredPerson.partyData.partyCode')
LEFT JOIN PTY_IMPL.PARTY_DEDUP_INFO pdiInitiator ON pdiInitiator.PARTY_CODE = JSON_VALUE(c.BODY, '$.initiator.partyCode')
LEFT JOIN PTY.PARTY ptyDedupHolder ON ptyDedupHolder.PARTY_CODE = pdiHolder.DEDUPL_NUMBER
LEFT JOIN PTY.PARTY ptyDedupInsured ON ptyDedupInsured.PARTY_CODE = pdiInsured.DEDUPL_NUMBER
LEFT JOIN PTY.PARTY ptyDedupInitiator ON ptyDedupInitiator.PARTY_CODE = pdiInitiator.DEDUPL_NUMBER
LEFT JOIN PTY_IMPL.PARTY_DEDUP_DELETED pddHolder ON pddHolder.PARTY_CODE = JSON_VALUE(c.BODY, '$.policyHolder.partyData.partyCode')
LEFT JOIN PTY_IMPL.PARTY_DEDUP_DELETED pddInsured ON pddInsured.PARTY_CODE = JSON_VALUE(c.BODY, '$.insuredPerson.partyData.partyCode')
LEFT JOIN PTY_IMPL.PARTY_DEDUP_DELETED pddInitiator ON pddInitiator.PARTY_CODE = JSON_VALUE(c.BODY, '$.initiator.partyCode')

open cur_contract;

-- ############### Update contracts with broken party links
fetch next FROM cur_contract into 
	@contractNumber, 
	@contractHolderCode, 
	@contractInsuredCode, 
	@contractInitiatorCode, 
	@qHolderCode, 
	@qInsuredCode, 
	@qInitiatorEmpCode,
	@pHolderCode, 
	@pInsuredCode, 
	@pInitiatorEmpCode,
	@contractHolderCodeExist, 
	@contractInsuredCodeExist, 
	@contractInitiatorCodeExist, 
	@holderDedupNumber, 
	@insuredDedupNumber, 
	@initiatorDedupNumber, 
	@holderDedupId, 
	@insuredDedupId, 
	@initiatorDedupId, 
	@holderDeletedNumber, 
	@insuredDeletedNumber, 
	@initiatorDeletedNumber, 
	@holderDeletedId, 
	@insuredDeletedId, 
	@initiatorDeletedId
while @@FETCH_STATUS = 0 
BEGIN

	BEGIN TRY
	BEGIN TRAN

		IF (@contractHolderCodeExist IS NULL)
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
													'"partyCode": "' + @holderDeletedNumber + '"',
													'"partyCode": "' + @holderDedupNumber + '"'
												)
											)
										),
										'$.paymentPlan',
										JSON_QUERY(
											REPLACE(
												JSON_QUERY(policy.BODY, '$.paymentPlan'),
												'"partyCode": "' + @holderDeletedNumber + '"',
												'"partyCode": "' + @holderDedupNumber + '"'
											)
										)
									),
									'$.policyHolder.partyData.partyCode',
									@holderDedupNumber
								),
								'$.policyHolder.partyData.partyId',
								@holderDedupId
							),
							'$.triggersConditions.policyHolderPartyCode',
							@holderDedupNumber
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
																'"objectRef": "' + @holderDeletedId + '"',
																'"objectRef": "' + @holderDedupId + '"'
															)
														)
													),
													'$.summary',
													JSON_QUERY(
														REPLACE(
															JSON_QUERY(policy.COMMON_BODY, '$.summary'),
															'"partyCode": "' + @holderDeletedNumber + '"',
															'"partyCode": "' + @holderDedupNumber + '"'
														)
													)
												),
												'$.paymentPlan',
												JSON_QUERY(
													REPLACE(
														JSON_QUERY(policy.COMMON_BODY, '$.paymentPlan'),
														'"payerCode": "' + @holderDeletedNumber + '"',
														'"payerCode": "' + @holderDedupNumber + '"'
													)
												)
											),
											'$.items',
											JSON_QUERY(
												REPLACE(
													REPLACE(
														REPLACE(
															JSON_QUERY(policy.COMMON_BODY, '$.items'),
															'"objectRef": "' + @holderDeletedId + '"',
															'"objectRef": "' + @holderDedupId + '"'
														),
														'"partyCode": "' + @holderDeletedNumber + '"',
														'"partyCode": "' + @holderDedupNumber + '"'
													),
													'"policyHolderId": "' + @holderDeletedId + '"',
													'"policyHolderId": "' + @holderDedupId + '"'
												)
											)
										),
										'$.parties.holder.personCode',
										@holderDedupNumber
									),
									'$.parties.holder.personId',
									@holderDedupId
								),
								'$.parties.otherParties[0].personCode',
								@holderDedupNumber
							),
							'$.parties.otherParties[0].personId',
							@holderDedupId
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
													'"partyCode": "' + @holderDeletedNumber + '"',
													'"partyCode": "' + @holderDedupNumber + '"'
												)
											)
										),
										'$.paymentPlan',
										JSON_QUERY(
											REPLACE(
												JSON_QUERY(policy.SNAPSHOT_BODY, '$.paymentPlan'),
												'"partyCode": "' + @holderDeletedNumber + '"',
												'"partyCode": "' + @holderDedupNumber + '"'
											)
										)
									),
									'$.policyHolder.partyData.partyCode',
									@holderDedupNumber
								),
								'$.policyHolder.partyData.partyId',
								@holderDedupId
							),
							'$.triggersConditions.policyHolderPartyCode',
							@holderDedupNumber
						)
					FROM PAS.CONTRACT policy
					WHERE policy.CONTRACT_NUMBER = @contractNumber

					UPDATE ps
					SET ps.HOLDER_CODE = @holderDedupNumber
					FROM PAS_IMPL.POLICY_SAT ps
					LEFT JOIN PAS_IMPL.POLICY_HUB ph ON ph.POLICY_HKEY = ps.POLICY_HKEY
					WHERE ph.CONTRACT_NUMBER = @contractNumber AND (ps.HOLDER_CODE = @holderDeletedNumber OR ps.HOLDER_CODE IS NULL)

					UPDATE qs
					SET qs.INSURED_CODE = @holderDedupNumber
					FROM PAS_IMPL.QUOTE_SAT qs
					LEFT JOIN PAS_IMPL.QUOTE_HUB qh ON qh.QUOTE_HKEY = qs.QUOTE_HKEY
					WHERE qh.CONTRACT_NUMBER = @contractNumber AND (qs.HOLDER_CODE = @holderDeletedNumber OR qs.HOLDER_CODE IS NULL)

		IF (@contractInsuredCodeExist IS NULL)
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
													'"insuredObjectCode": "' + @insuredDeletedNumber + '"',
													'"insuredObjectCode": "' + @insuredDedupNumber + '"'
												)
											)
									 ),
									'$.insuredPerson.partyData.partyCode',
									@insuredDedupNumber
								),
								'$.insuredPerson.partyData.partyId',
								@insuredDedupId
							),
							'$.triggersConditions.insuredPersonPartyCode',
							@insuredDedupNumber
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
												'"insuredPersonId": "' + @insuredDeletedId + '"',
												'"insuredPersonId": "' + @insuredDedupId + '"'
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
													'"insuredPerson": "' + @insuredDeletedNumber + '"',
													'"insuredPerson": "' + @insuredDedupNumber + '"'
												),
												'"code": "' + @insuredDeletedNumber + '"',
												'"code": "' + @insuredDedupNumber + '"'
											),
											'"id": "' + @insuredDeletedId + '"',
											'"id": "' + @insuredDedupId + '"'
										)
									)
								),
								'$.parties.insuredPersons[0].personCode',
								@insuredDedupNumber
							),
							'$.parties.insuredPersons[0].personId',
							@insuredDedupId
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
													'"insuredObjectCode": "' + @insuredDeletedNumber + '"',
													'"insuredObjectCode": "' + @insuredDedupNumber + '"'
												)
											)
									 ),
									'$.insuredPerson.partyData.partyCode',
									@insuredDedupNumber
								),
								'$.insuredPerson.partyData.partyId',
								@insuredDedupId
							),
							'$.triggersConditions.insuredPersonPartyCode',
							@insuredDedupNumber
						)
					FROM PAS.CONTRACT policy
					WHERE policy.CONTRACT_NUMBER = @contractNumber

        IF (@contractInsuredCodeExist IS NULL)
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
                                                                                                            '"insuredPerson": "' + @insuredDeletedNumber + '"',
                                                                                                            '"insuredPerson": "' + @insuredDedupNumber + '"'
                                                                                                        )
                                                                                                    ),
                                                                                                    '"code": "' + @insuredDeletedNumber + '"',
                                                                                                    '"code": "' + @insuredDedupNumber + '"'
                                                                                                )
                                                                                            ),
                                                                                            '"id": "' + @insuredDeletedId + '"',
                                                                                            '"id": "' + @insuredDedupId + '"'
                                                                                        )
                                                                                    )
                                                                                ),
                                                                                '$.technicalData.partiesInfo',
                                                                                JSON_QUERY(
                                                                                    REPLACE(
                                                                                        JSON_QUERY(am.BODY, '$.technicalData.partiesInfo'),
                                                                                        '"code": "' + @insuredDeletedNumber + '"',
                                                                                        '"code": "' + @insuredDedupNumber + '"'
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
                                                                '"insuredPersonPartyCode": "' + @insuredDeletedNumber + '"',
                                                                '"insuredPersonPartyCode": "' + @insuredDedupNumber + '"'
                                                            ),
                                                            '"payerCode": "' + @insuredDeletedNumber + '"',
                                                            '"payerCode": "' + @insuredDedupNumber + '"'
                                                        ),
                                                        '"insuredObjectCode": "' + @insuredDeletedNumber + '"',
                                                        '"insuredObjectCode": "' + @insuredDedupNumber + '"'
                                                    ),
                                                    '"policyHolderPartyCode": "' + @insuredDeletedNumber + '"',
                                                    '"policyHolderPartyCode": "' + @insuredDedupNumber + '"'
                                                ),
                                                '"partyCode": "' + @insuredDeletedNumber + '"',
                                                '"partyCode": "' + @insuredDedupNumber + '"'
                                            ),
                                            '"personCode": "' + @insuredDeletedNumber + '"',
                                            '"personCode": "' + @insuredDedupNumber + '"'
                                        ),
                                        '"personId": "' + @insuredDeletedId + '"',
                                        '"personId": "' + @insuredDedupId + '"'
                                    ),
                                    '"partyId": "' + @insuredDeletedId + '"',
                                    '"partyId": "' + @insuredDedupId + '"'
                                ),
                                '"objectRef": "' + @insuredDeletedId + '"',
                                '"objectRef": "' + @insuredDedupId + '"'
                            ),
                            '"insuredPersonId": "' + @insuredDeletedId + '"',
                            '"insuredPersonId": "' + @insuredDedupId + '"'
                        ),
                        '"policyHolderId": "' + @insuredDeletedId + '"',
                        '"policyHolderId": "' + @insuredDedupId + '"'
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
                                                                                                                            '"insuredPerson": "' + @insuredDeletedNumber + '"',
                                                                                                                            '"insuredPerson": "' + @insuredDedupNumber + '"'
                                                                                                                        )
                                                                                                                    ),
                                                                                                                    '"code": "' + @insuredDeletedNumber + '"',
                                                                                                                    '"code": "' + @insuredDedupNumber + '"'
                                                                                                                )
                                                                                                            ),
                                                                                                            '"id": "' + @insuredDeletedId + '"',
                                                                                                            '"id": "' + @insuredDedupId + '"'
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
                                                                                                        '"code": "' + @insuredDeletedNumber + '"',
                                                                                                        '"code": "' + @insuredDedupNumber + '"'
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
                                                                                '"insuredPersonPartyCode": "' + @insuredDeletedNumber + '"',
                                                                                '"insuredPersonPartyCode": "' + @insuredDedupNumber + '"'
                                                                            ),
                                                                            '"payerCode": "' + @insuredDeletedNumber + '"',
                                                                            '"payerCode": "' + @insuredDedupNumber + '"'
                                                                        ),
                                                                        '"insuredObjectCode": "' + @insuredDeletedNumber + '"',
                                                                        '"insuredObjectCode": "' + @insuredDedupNumber + '"'
                                                                    ),
                                                                    '"policyHolderPartyCode": "' + @insuredDeletedNumber + '"',
                                                                    '"policyHolderPartyCode": "' + @insuredDedupNumber + '"'
                                                                ),
                                                                '"partyCode": "' + @insuredDeletedNumber + '"',
                                                                '"partyCode": "' + @insuredDedupNumber + '"'
                                                            ),
                                                            '"personCode": "' + @insuredDeletedNumber + '"',
                                                            '"personCode": "' + @insuredDedupNumber + '"'
                                                        ),
                                                        '"personId": "' + @insuredDeletedId + '"',
                                                        '"personId": "' + @insuredDedupId + '"'
                                                    ),
                                                    '"partyId": "' + @insuredDeletedId + '"',
                                                    '"partyId": "' + @insuredDedupId + '"'
                                                ),
                                                '"objectRef": "' + @insuredDeletedId + '"',
                                                '"objectRef": "' + @insuredDedupId + '"'
                                            ),
                                            '"insuredPersonId": "' + @insuredDeletedId + '"',
                                            '"insuredPersonId": "' + @insuredDedupId + '"'
                                        ),
                                        '"policyHolderId": "' + @insuredDeletedId + '"',
                                        '"policyHolderId": "' + @insuredDedupId + '"'
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
                                                                                                                        '"insuredPerson": "' + @insuredDeletedNumber + '"',
                                                                                                                        '"insuredPerson": "' + @insuredDedupNumber + '"'
                                                                                                                    )
                                                                                                                ),
                                                                                                                '"code": "' + @insuredDeletedNumber + '"',
                                                                                                                '"code": "' + @insuredDedupNumber + '"'
                                                                                                            )
                                                                                                        ),
                                                                                                        '"id": "' + @insuredDeletedId + '"',
                                                                                                        '"id": "' + @insuredDedupId + '"'
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
                                                                                                    '"code": "' + @insuredDeletedNumber + '"',
                                                                                                    '"code": "' + @insuredDedupNumber + '"'
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
                                                                            '"insuredPersonPartyCode": "' + @insuredDeletedNumber + '"',
                                                                            '"insuredPersonPartyCode": "' + @insuredDedupNumber + '"'
                                                                        ),
                                                                        '"payerCode": "' + @insuredDeletedNumber + '"',
                                                                        '"payerCode": "' + @insuredDedupNumber + '"'
                                                                    ),
                                                                    '"insuredObjectCode": "' + @insuredDeletedNumber + '"',
                                                                    '"insuredObjectCode": "' + @insuredDedupNumber + '"'
                                                                ),
                                                                '"policyHolderPartyCode": "' + @insuredDeletedNumber + '"',
                                                                '"policyHolderPartyCode": "' + @insuredDedupNumber + '"'
                                                            ),
                                                            '"partyCode": "' + @insuredDeletedNumber + '"',
                                                            '"partyCode": "' + @insuredDedupNumber + '"'
                                                        ),
                                                        '"personCode": "' + @insuredDeletedNumber + '"',
                                                        '"personCode": "' + @insuredDedupNumber + '"'
                                                    ),
                                                    '"personId": "' + @insuredDeletedId + '"',
                                                    '"personId": "' + @insuredDedupId + '"'
                                                ),
                                                '"partyId": "' + @insuredDeletedId + '"',
                                                '"partyId": "' + @insuredDedupId + '"'
                                            ),
                                            '"objectRef": "' + @insuredDeletedId + '"',
                                            '"objectRef": "' + @insuredDedupId + '"'
                                        ),
                                        '"insuredPersonId": "' + @insuredDeletedId + '"',
                                        '"insuredPersonId": "' + @insuredDedupId + '"'
                                    ),
                                    '"policyHolderId": "' + @insuredDeletedId + '"',
                                    '"policyHolderId": "' + @insuredDedupId + '"'
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

            UPDATE ps
            SET ps.INSURED_CODE = @insuredDedupNumber
            FROM PAS_IMPL.POLICY_SAT ps
            LEFT JOIN PAS_IMPL.POLICY_HUB ph ON ph.POLICY_HKEY = ps.POLICY_HKEY
            WHERE ph.CONTRACT_NUMBER = @contractNumber AND (ps.INSURED_CODE = @insuredDeletedNumber OR ps.INSURED_CODE IS NULL)

            UPDATE qs
            SET qs.INSURED_CODE = @insuredDedupNumber
            FROM PAS_IMPL.QUOTE_SAT qs
            LEFT JOIN PAS_IMPL.QUOTE_HUB qh ON qh.QUOTE_HKEY = qs.QUOTE_HKEY
            WHERE qh.CONTRACT_NUMBER = @contractNumber AND (qs.INSURED_CODE = @insuredDeletedNumber OR qs.INSURED_CODE IS NULL)

		IF (@contractInitiatorCodeExist IS NULL)
			UPDATE policy
			SET BODY = JSON_MODIFY(policy.BODY, '$.initiator.partyCode', @initiatorDedupNumber),
				SNAPSHOT_BODY = JSON_MODIFY(policy.SNAPSHOT_BODY, '$.initiator.partyCode', @initiatorDedupNumber)
			FROM PAS.CONTRACT policy
			WHERE policy.CONTRACT_NUMBER = @contractNumber

	COMMIT TRAN
	END TRY

	BEGIN CATCH

		ROLLBACK TRAN
		DECLARE @ErrorMessage3 NVARCHAR(4000); DECLARE @ErrorSeverity3 INT; DECLARE @ErrorState3 INT;
		SELECT @ErrorMessage3 = ERROR_MESSAGE(), @ErrorSeverity3 = ERROR_SEVERITY(), @ErrorState3 = 1;

		RAISERROR (@ErrorMessage3, @ErrorSeverity3, @ErrorState3);

	END CATCH

	fetch next FROM cur_contract into 
	@contractNumber, 
	@contractHolderCode, 
	@contractInsuredCode, 
	@contractInitiatorCode, 
	@qHolderCode, 
	@qInsuredCode, 
	@qInitiatorEmpCode,
	@pHolderCode, 
	@pInsuredCode, 
	@pInitiatorEmpCode,
	@contractHolderCodeExist, 
	@contractInsuredCodeExist, 
	@contractInitiatorCodeExist, 
	@holderDedupNumber, 
	@insuredDedupNumber, 
	@initiatorDedupNumber, 
	@holderDedupId, 
	@insuredDedupId, 
	@initiatorDedupId, 
	@holderDeletedNumber, 
	@insuredDeletedNumber, 
	@initiatorDeletedNumber, 
	@holderDeletedId, 
	@insuredDeletedId, 
	@initiatorDeletedId;
  
END;
close cur_contract;
deallocate cur_contract;

DROP TABLE #DOC_WITH_BROKEN_PARTY