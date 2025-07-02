/* configuration/@config-rgsl/acc-cash-flow/model/ACC_IMPL/PAYMENT_CANCELLATION_ALLOCATION_LINK.json */
comment on table ACC_IMPL.PAYMENT_CANCELLATION_ALLOCATION_LINK is 'TODO_missing_comment';
comment on column ACC_IMPL.PAYMENT_CANCELLATION_ALLOCATION_LINK.ALLOCATION_ID is 'TODO_missing_comment';
/* configuration/@config-rgsl/acc-rsd/model/ACC_IMPL/RSD_CONTRACT_BSI_LINK.json */
comment on table ACC_IMPL.RSD_CONTRACT_BSI_LINK is 'RSD CONTRACT BSI LINK';
comment on column ACC_IMPL.RSD_CONTRACT_BSI_LINK.CONTRACT_NUMBER is 'TODO_missing_comment';
comment on column ACC_IMPL.RSD_CONTRACT_BSI_LINK.FAKE_BSI_ID is 'TODO_missing_comment';
/* configuration/@config-rgsl/acc-rsd/model/ACC_IMPL/RSD_ITEM_LINK.json */
comment on table ACC_IMPL.RSD_ITEM_LINK is 'RSD ITEM LINK';
comment on column ACC_IMPL.RSD_ITEM_LINK.CONTRACT_NUMBER is 'TODO_missing_comment';
comment on column ACC_IMPL.RSD_ITEM_LINK.DUE_DATE is 'TODO_missing_comment';
comment on column ACC_IMPL.RSD_ITEM_LINK.OBJECT_CODE is 'TODO_missing_comment';
comment on column ACC_IMPL.RSD_ITEM_LINK.ITEM_NO is 'TODO_missing_comment';
/* configuration/@config-rgsl/agent-agreement/model/PAS_IMPL/COM_CALC_LINK.json */
comment on table PAS_IMPL.COM_CALC_LINK is 'Sub account';
comment on column PAS_IMPL.COM_CALC_LINK.COM_CALC_NUMBER is 'Commission calculation number';
comment on column PAS_IMPL.COM_CALC_LINK.ENTRY is 'Entry code, usually composed from insurance class  or  tariff unit + commission entry type code (part of business key)';
comment on column PAS_IMPL.COM_CALC_LINK.VALID_ON is 'The date of a commission calculation';
comment on column PAS_IMPL.COM_CALC_LINK.EXECUTION_ID is 'Service execution id';
comment on column PAS_IMPL.COM_CALC_LINK.PARTICIPANT_NO is 'Participant number in the calculation(We need this property because, in case of 2 or more split participants, the link object will not be unique)';
/* configuration/@config-rgsl/asset-directory/model/PAS_IMPL/ASSET_CONDITION_LINK.json */
comment on table PAS_IMPL.ASSET_CONDITION_LINK is 'TODO_missing_comment';
/* configuration/@config-rgsl/contract-activation/model/PAS_IMPL/P_PAYMENT_PLAN_LINK.json */
comment on table PAS_IMPL.P_PAYMENT_PLAN_LINK is 'Payment plan on item level';
comment on column PAS_IMPL.P_PAYMENT_PLAN_LINK.DUE_DATE is 'Due date';
/* configuration/@config-rgsl/infrastructure/model/PAS_IMPL/POLICY_COMMISSION_LINK.json */
comment on table PAS_IMPL.POLICY_COMMISSION_LINK is 'Sub account';
/* configuration/@config-rgsl/portfolio-transfer/model/ACC_IMPL/PORTFOLIO_TRANSFER_ITEM_LINK.json */
comment on table ACC_IMPL.PORTFOLIO_TRANSFER_ITEM_LINK is 'PORTFOLIO TRANSFER ITEM LINK';
comment on column ACC_IMPL.PORTFOLIO_TRANSFER_ITEM_LINK.CONTRACT_NUMBER is 'TODO_missing_comment';
comment on column ACC_IMPL.PORTFOLIO_TRANSFER_ITEM_LINK.DUE_DATE is 'TODO_missing_comment';
