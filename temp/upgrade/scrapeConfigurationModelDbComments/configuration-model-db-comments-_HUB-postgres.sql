/* configuration/@config-rgsl/acc-cash-flow/model/ACC_IMPL/GET_NEW_BS_LOG_HUB.json */
comment on table ACC_IMPL.GET_NEW_BS_LOG_HUB is 'Get new RGSL payments ETL log';
comment on column ACC_IMPL.GET_NEW_BS_LOG_HUB.ETL_EXECUTION_STATUS_ID is 'TODO_missing_comment';
comment on column ACC_IMPL.GET_NEW_BS_LOG_HUB.RGSL_GUID is 'TODO_missing_comment';
/* configuration/@config-rgsl/acc-cash-flow/model/ACC_IMPL/PAYMENT_CANCELLATION_ITEM_HUB.json */
comment on table ACC_IMPL.PAYMENT_CANCELLATION_ITEM_HUB is 'TODO_missing_comment';
comment on column ACC_IMPL.PAYMENT_CANCELLATION_ITEM_HUB.IMPORT_DOCUMENT_ID is 'TODO_missing_comment';
comment on column ACC_IMPL.PAYMENT_CANCELLATION_ITEM_HUB.BANK_STATEMENT_ITEM_ID is 'TODO_missing_comment';
/* configuration/@config-rgsl/acc-payment-order/model/ACC_IMPL/PAYMENT_ORDER_HUB.json */
comment on table ACC_IMPL.PAYMENT_ORDER_HUB is 'Hub for payment orders';
comment on column ACC_IMPL.PAYMENT_ORDER_HUB.PAYMENT_ORDER_NUMBER is 'Payment order number';
/* configuration/@config-rgsl/acc-rsd/model/ACC_IMPL/RSD_HUB.json */
comment on table ACC_IMPL.RSD_HUB is 'RSD HUB';
comment on column ACC_IMPL.RSD_HUB.RSD_NUMBER is 'TODO_missing_comment';
/* configuration/@config-rgsl/accounting/model/ACC_IMPL/CRT_HUB.json */
comment on table ACC_IMPL.CRT_HUB is 'Hub for accounting certificates';
comment on column ACC_IMPL.CRT_HUB.CERTIFICATE_NUMBER is 'Accounting certificate number';
/* configuration/@config-rgsl/agent-agreement/model/PAS_IMPL/AA_COMM_TYPE_HUB.json */
comment on table PAS_IMPL.AA_COMM_TYPE_HUB is 'Commission type';
comment on column PAS_IMPL.AA_COMM_TYPE_HUB.COMMISSION_TYPE is 'Commission type';
/* configuration/@config-rgsl/agent-agreement/model/PAS_IMPL/AA_HUB.json */
comment on table PAS_IMPL.AA_HUB is 'Agent Agreement';
comment on column PAS_IMPL.AA_HUB.AA_NUMBER is 'Agreement business number';
/* configuration/@config-rgsl/asset-directory/model/PAS_IMPL/ASSET_HUB.json */
comment on table PAS_IMPL.ASSET_HUB is 'TODO_missing_comment';
comment on column PAS_IMPL.ASSET_HUB.ASSET_NUMBER is 'Asset number';
/* configuration/@config-rgsl/claim/model/CLM_IMPL/CLM_HUB.json */
comment on table CLM_IMPL.CLM_HUB is 'Hub for claims';
comment on column CLM_IMPL.CLM_HUB.CLAIM_NUMBER is 'Claim number';
/* configuration/@config-rgsl/claim/model/CLM_IMPL/IE_HUB.json */
comment on table CLM_IMPL.IE_HUB is 'Hub for insured events';
comment on column CLM_IMPL.IE_HUB.IE_NUMBER is 'Insured event number';
/* configuration/@config-rgsl/claim/model/EWT_IMPL/ENDOWMENT_INQUIRY_HUB.json */
comment on table EWT_IMPL.ENDOWMENT_INQUIRY_HUB is 'Inquiry';
comment on column EWT_IMPL.ENDOWMENT_INQUIRY_HUB.INQUIRY_NUMBER is 'Contract number';
/* configuration/@config-rgsl/claim/model/EWT_IMPL/EWT_HUB.json */
comment on table EWT_IMPL.EWT_HUB is 'Hub for endowments';
comment on column EWT_IMPL.EWT_HUB.ENDOWMENT_NUMBER is 'Endowment number';
/* configuration/@config-rgsl/collective-life-insurance/model/PAS_IMPL/CP_IMPORT_TEMPLATE_HUB.json */
comment on table PAS_IMPL.CP_IMPORT_TEMPLATE_HUB is 'Collective policy insured list import template';
comment on column PAS_IMPL.CP_IMPORT_TEMPLATE_HUB.TEMPLATE_NUMBER is 'Template number';
/* configuration/@config-rgsl/editable-code-tables/model/PAS_IMPL/STRATEGY_CONFIGURATION_HUB.json */
comment on table PAS_IMPL.STRATEGY_CONFIGURATION_HUB is 'Strategy Configuration';
comment on column PAS_IMPL.STRATEGY_CONFIGURATION_HUB.STRATEGY_CONFIGURATION_NUMBER is 'Strategy Configuration number';
/* configuration/@config-rgsl/editable-code-tables/model/PAS_IMPL/STRATEGY_INSTRUMENTS_HUB.json */
comment on table PAS_IMPL.STRATEGY_INSTRUMENTS_HUB is 'Strategy Instruments';
comment on column PAS_IMPL.STRATEGY_INSTRUMENTS_HUB.STRATEGY_INSTRUMENT_NUMBER is 'Strategy Instrument number';
/* configuration/@config-rgsl/infrastructure/model/PAS_IMPL/AMENDMENT_HUB.json */
comment on table PAS_IMPL.AMENDMENT_HUB is 'TODO_missing_comment';
comment on column PAS_IMPL.AMENDMENT_HUB.AMENDMENT_NUMBER is 'Amendment number';
/* configuration/@config-rgsl/infrastructure/model/PAS_IMPL/CUMULATION_HUB.json */
comment on table PAS_IMPL.CUMULATION_HUB is 'Cumulation hub';
comment on column PAS_IMPL.CUMULATION_HUB.CUMULATION_NUMBER is 'Cumulation quote number';
/* configuration/@config-rgsl/infrastructure/model/PAS_IMPL/INQUIRY_HUB.json */
comment on table PAS_IMPL.INQUIRY_HUB is 'Inquiry';
comment on column PAS_IMPL.INQUIRY_HUB.INQUIRY_NUMBER is 'Contract number';
/* configuration/@config-rgsl/infrastructure/model/PAS_IMPL/POLICY_HUB.json */
comment on table PAS_IMPL.POLICY_HUB is 'Policy';
comment on column PAS_IMPL.POLICY_HUB.CONTRACT_NUMBER is 'Policy number';
/* configuration/@config-rgsl/infrastructure/model/PAS_IMPL/QUOTE_HUB.json */
comment on table PAS_IMPL.QUOTE_HUB is 'Quote';
comment on column PAS_IMPL.QUOTE_HUB.CONTRACT_NUMBER is 'Inquiry number';
/* configuration/@config-rgsl/infrastructure/model/PAS_IMPL/VERIFICATION_HUB.json */
comment on table PAS_IMPL.VERIFICATION_HUB is 'Verifiaction';
comment on column PAS_IMPL.VERIFICATION_HUB.VERIFICATION_NUMBER is 'Verifiaction number';
/* configuration/@config-rgsl/life-insurance/model/BFX_IMPL/ADDITIONAL_PARAMETERS_HUB.json */
comment on table BFX_IMPL.ADDITIONAL_PARAMETERS_HUB is 'Contract additional parameters hub';
comment on column BFX_IMPL.ADDITIONAL_PARAMETERS_HUB.DOCUMENT_NUMBER is 'TODO_missing_comment';
/* configuration/@config-rgsl/life-insurance/model/UNI_IMPL/AGENT_VERIFICATION_HUB.json */
comment on table UNI_IMPL.AGENT_VERIFICATION_HUB is 'Hub for agent verifications';
comment on column UNI_IMPL.AGENT_VERIFICATION_HUB.AGENT_VERIFICATION_NUMBER is 'agent verification number';
/* configuration/@config-rgsl/life-insurance/model/UNI_IMPL/RQT_HUB.json */
comment on table UNI_IMPL.RQT_HUB is 'Hub for requests';
comment on column UNI_IMPL.RQT_HUB.REQUEST_NUMBER is 'Request number';
/* configuration/@config-rgsl/life-insurance/model/UNIV_IMPL/ECONOMIC_PARAMETER_HUB.json */
comment on table UNIV_IMPL.ECONOMIC_PARAMETER_HUB is 'Hub for product configuration';
comment on column UNIV_IMPL.ECONOMIC_PARAMETER_HUB.PRODUCT_CONF_NUMBER is 'Request number';
/* configuration/@config-rgsl/life-insurance/model/UNIV_IMPL/PRODUCT_CONF_HUB.json */
comment on table UNIV_IMPL.PRODUCT_CONF_HUB is 'Hub for product configuration';
comment on column UNIV_IMPL.PRODUCT_CONF_HUB.PRODUCT_CONF_NUMBER is 'Request number';
/* configuration/@config-rgsl/organisation-unit/model/ORG_IMPL/ORGANISATION_UNIT_HUB.json */
comment on table ORG_IMPL.ORGANISATION_UNIT_HUB is 'Organisation unit hub';
comment on column ORG_IMPL.ORGANISATION_UNIT_HUB.ORGANISATION_UNIT_CODE is 'Organisation unit code';
/* configuration/@config-rgsl/party/model/PTY_IMPL/PARTY_HUB.json */
comment on table PTY_IMPL.PARTY_HUB is 'Party hub';
comment on column PTY_IMPL.PARTY_HUB.PARTY_CODE is 'TODO_missing_comment';
/* configuration/@config-rgsl/portfolio-transfer/model/ACC_IMPL/PORTFOLIO_TRANSFER_HUB.json */
comment on table ACC_IMPL.PORTFOLIO_TRANSFER_HUB is 'PORTFOLIO TRANSFER HUB';
comment on column ACC_IMPL.PORTFOLIO_TRANSFER_HUB.PORTFOLIO_TRANSFER_NUMBER is 'TODO_missing_comment';
/* configuration/@config-rgsl/service-provider/model/ORG_IMPL/SERVICE_PROVIDER_HUB.json */
comment on table ORG_IMPL.SERVICE_PROVIDER_HUB is 'Service provider hub';
comment on column ORG_IMPL.SERVICE_PROVIDER_HUB.SERVICE_PROVIDER_CODE is 'TODO_missing_comment';
