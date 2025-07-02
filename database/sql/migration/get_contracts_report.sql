IF EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[GET_CONTRACTS_REPORT_VIEW]'))
BEGIN
DROP VIEW [dbo].[GET_CONTRACTS_REPORT_VIEW];
END
GO

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[dbo].[get_contracts_report]') AND type IN (N'FN', N'FS', N'FT', N'TF', N'IF'))
BEGIN
DROP FUNCTION [dbo].[get_contracts_report];
END
GO

create function get_contracts_report()
returns table
as
return (

    SELECT
        -- Номер договора страхования
        policyHub.CONTRACT_NUMBER, 

        -- Дата вступления в силу договора
        FORMAT(policySatLatest.START_DATE, 'MM/dd/yyyy') CONTRACT_START_DATE,

        -- Дата заключения договора
        FORMAT(policySatLatest.ISSUE_DATE, 'MM/dd/yyyy') CONTRACT_ISSUE_DATE,

        -- Дата окончания договора
        FORMAT(policySatLatest.END_DATE, 'MM/dd/yyyy') CONTRACT_END_DATE,

        -- Количество лет
        policySatLatest.INSURANCE_TERMS,

        -- Страхователь ФИО
        policySatLatest.HOLDER_NAME,

        -- Дата рождения
        FORMAT(policySatLatest.HOLDER_BIRTH_DATE, 'MM/dd/yyyy') HOLDER_BIRTH_DATE,

        -- Телефон страхователя 
        JSON_VALUE(partyHolder.BODY, '$.partyPhones[0].fullNumberFormatted') HOLDER_PHONE,

        -- Застрахованный ФИО
        policySatLatest.INSURED_NAME,

        -- Дата рождения застрахованного 
        FORMAT(cast(JSON_VALUE(partyInsured.BODY, '$.partyPersonData.dateOfBirth') as date), 'MM/dd/yyyy') INSURED_BIRTH_DATE,

        -- Выгодоприобретатели по закону или фио
        CASE WHEN JSON_VALUE(policy.BODY, '$.beneficiaries.isHeritors') IN (NULL, 'false', 'FALSE', '0') 
        THEN 0 
        ELSE 1 END HERITORS,

        -- Тип продукта
        CASE JSON_VALUE(policy.BODY, '$.mainInsuranceConditions.insuranceProduct.productGroup') 
            WHEN 'investment' THEN N'ИСЖ'
            WHEN 'endowment' THEN N'НСЖ'
            WHEN 'credit' THEN N'КСЖ'
            ELSE NULL  
        END	PRODUCT_GROUP,

        -- Программа страхования
        JSON_VALUE(policy.BODY, '$.mainInsuranceConditions.insuranceProduct.productDescription') PRODUCT_CODE,

        -- Размер страхового взноса в валюте договора 
        JSON_VALUE(policy.BODY, '$.basicConditions.riskPremium') RISK_PREMIUM,

        -- Размер взноса в RUR
        (SELECT TOP 1 CAST((JSON_VALUE(policy.BODY, '$.basicConditions.riskPremium') * curExchangeRate.EXCHANGE_RATE) AS DECIMAL(38, 2))
        FROM PAS.CONTRACT p
        LEFT JOIN BFX.CURRENCY_EXCHANGE_RATE curExchangeRate ON curExchangeRate.CURRENCY_CODE = JSON_VALUE(policy.BODY, '$.basicConditions.currency.currencyCode')
        WHERE p.CONTRACT_NUMBER = policy.CONTRACT_NUMBER
        ORDER BY curExchangeRate.EXCHANGE_RATE_DATE DESC) RISK_PREMIUM_RUB,

        -- Страховой риск
        CASE policyRisksSatLatest.RISK_CODE 
            WHEN 	'CD36404'	THEN	N'Критические заболевания'
            WHEN 	'CD42204'	THEN	N'КЗ'
            WHEN 	'CDH10800'	THEN	N'КЗ лечение'
            WHEN 	'CDHR10800'	THEN	N'КЗ лечение РФ'
            WHEN 	'CDHW10800'	THEN	N'КЗ лечение весь мир'
            WHEN 	'CDP36102'	THEN	N'КЗ выплата'
            WHEN 	'CDP36404'	THEN	N'КЗ выплата'
            WHEN 	'CDP42204'	THEN	N'Критическое заболевание'
            WHEN 	'CDVV36404'	THEN	N'КЗ ОУСВ'
            WHEN 	'CTDA36404'	THEN	N'ВНТ НС'
            WHEN 	'CU10800'	THEN	N'Чек-ап'
            WHEN 	'D36102'	THEN	N'Инвалидность 1,2 гр ЛП ОУСВ'
            WHEN 	'D36404'	THEN	N'Инв 1,2 ЛП ОУСВ'
            WHEN 	'D42204'	THEN	N'Инвалидность 1,2 гр. ЛП'
            WHEN 	'D42204'	THEN	N'Инвалидность'
            WHEN 	'DA10010042204'	THEN	N'Инвалидность 1,2 гр. НС'
            WHEN 	'DA10010042204'	THEN	N'ИНС 1,2 100/100'
            WHEN 	'DA1005042204'	THEN	N'ИНС 1,2 100/50'
            WHEN 	'DA12012042204'	THEN	N'ИНС 1,2 120/120'
            WHEN 	'DA36102'	THEN	N'Инвалидность 1,2 гр НС ОУСВ'
            WHEN 	'DA36404'	THEN	N'Инв 1,2 НС ОУСВ'
            WHEN 	'DASS36404'	THEN	N'ИНС 1,2'
            WHEN 	'DAVV36404'	THEN	N'ИНС 1,2 ВВ'
            WHEN 	'DDTP36404'	THEN	N'Смерть ДТП'
            WHEN 	'DI10010042204'	THEN	N'ИБ 1,2 100/100'
            WHEN 	'DI1005042204'	THEN	N'ИБ 1,2 100/50'
            WHEN 	'DI12012042204'	THEN	N'ИБ 1,2 120/120'
            WHEN 	'DIL42204'	THEN	N'Смерть Б'
            WHEN 	'DLP36404'	THEN	N'Смерть ЛП'
            WHEN 	'DLP36904'	THEN	N'Смерть ЛП'
            WHEN 	'DLP42204'	THEN	N'Смерть ЛП'
            WHEN 	'DLP42204'	THEN	N'Смерть'
            WHEN 	'DLPDP36404'	THEN	N'Смерть ЛП отлож выплата'
            WHEN 	'DLPDP36904'	THEN	N'Смерть ЛП отлож выплата'
            WHEN 	'DLPSS36102'	THEN	N'Смерть ЛП СС'
            WHEN 	'DLPSS36404'	THEN	N'Смерть ЛП СС'
            WHEN 	'DLPT36404'	THEN	N'Смерть ЛП'
            WHEN 	'DLPVV36404'	THEN	N'Смерть ЛП ВВ'
            WHEN 	'DLPVV6536404'	THEN	N'Смерть ЛП ВВ_65'
            WHEN 	'DLPVV6536404'	THEN	N'Смерть ЛП ВВ'
            WHEN 	'DLPVV7036404'	THEN	N'Смерть ЛП ВВ_70'
            WHEN 	'DLPVV7036404'	THEN	N'Смерть ЛП ВВ'
            WHEN 	'DMS110800'	THEN	N'ДМС1'
            WHEN 	'DMS210800'	THEN	N'ДМС2'
            WHEN 	'DNS36102'	THEN	N'Смерть НС'
            WHEN 	'DNS36404'	THEN	N'Смерть НС'
            WHEN 	'DNS36904'	THEN	N'Смерть НС'
            WHEN 	'DNS42204'	THEN	N'Смерть НС'
            WHEN 	'DNSVV36404'	THEN	N'Смерть НС ВВ'
            WHEN 	'DPVV36102'	THEN	N'Смерть ЛП ВВ'
            WHEN 	'DTP36404'	THEN	N'Смерть ТП'
            WHEN 	'DVV36404'	THEN	N'ИЛП 1,2 ВВ'
            WHEN 	'E36102'	THEN	N'Дожитие'
            WHEN 	'E36404'	THEN	N'Дожитие'
            WHEN 	'E36904'	THEN	N'Дожитие'
            WHEN 	'HA42204'	THEN	N'Госпитализация НС'
            WHEN 	'HI36102'	THEN	N'ТТП'
            WHEN 	'HI36404'	THEN	N'Тяжелая травма'
            WHEN 	'I42204'	THEN	N'Травма НС'
            WHEN 	'I42204'	THEN	N'Травмы'
            WHEN 	'IDLPDP36904'	THEN	N'ИСЖ-Регул. премия - Смерть ЛП отлож. Выплата'
            WHEN 	'IDLPVV36904'	THEN	N'ИСЖ-Регул. премия - Смерть ЛП ВВ'
            WHEN 	'IDNSSS36904'	THEN	N'ИСЖ-Регул. премия - Смерть НС СС'
            WHEN 	'IDNSVV36904'	THEN	N'ИСЖ-Регул. премия - Смерть НС ВВ'
            WHEN 	'IE36904'	THEN	N'ИСЖ-Регул. премия - Дожитие'
            WHEN 	'ITP42204'	THEN	N'Травма ТП'
            WHEN 	'JL36102'	THEN	N'Потеря работы ОУСВ'
            WHEN 	'JL36404'	THEN	N'Потеря работы ОУСВ'
            WHEN 	'JL42204'	THEN	N'Потеря работы'
            WHEN 	'TDA42204'	THEN	N'Временная нетрудоспособность НС'
            WHEN 	'TDLP42204'	THEN	N'Временная нетрудоспособность ЛП'
            ELSE NULL  
        END RISK_CODE,

        -- Страховая сумма по риску
        policyRisksSatLatest.INSURED_SUM,

        -- Валюта
        policySatLatest.CURRENCY_CODE,

        -- Периодичность оплаты
        JSON_VALUE(policy.BODY, '$.basicConditions.paymentFrequency.paymentFrequencyDescription') PAYMENT_FREQUENCY,

        -- ФИО основного продавца
        policySatLatest.INITIATOR_USERNAME SELLER_FULL_NAME,

        -- Табельный номер основного продавца
        JSON_VALUE(sellerEmployee.BODY, '$.tabNumber') SELLER_TAB_NUMBER,

        -- Название точки продаж
        JSON_VALUE(sellerEmployee.BODY, '$.orgUnitName') SELLER_ORG_UNIT,

        -- Банк
        policySatLatest.PARTNER_NAME BANK,

        -- Населенный пункт
        JSON_VALUE(sellerOrgUnit.BODY, '$.partyAddresses[0].settlement') SELLER_SETTLEMENT,
        
        -- Субъект РФ
        JSON_VALUE(sellerOrgUnit.BODY, '$.partyAddresses[0].region') SELLER_REGION,
        
        -- Статус полиса
        policySatLatest.STATE CONTRACT_STATE,

        -- Статус документов
        verificationSatLatest.STATE DOC_VERIF_STATE,

        -- Комментарий к статусу документов
        verificationSatLatest.OPERATIONS_COMMENT DOC_VERIF_COMMENT,

        -- Дата текущего статуса документации
        FORMAT(verificationSatLatest.LOAD_DATE, 'MM/dd/yyyy') as DOC_VERIF_DATE,

        -- Первичная дата выставления замечания по документам
        (SELECT MIN(FORMAT(vs.LOAD_DATE, 'dd-MM-yyyy')) FROM PAS_IMPL.VERIFICATION_SAT vs
        LEFT JOIN PAS_IMPL.VERIFICATION_HUB vh ON vh.VERIFICATION_HKEY = vs.VERIFICATION_HKEY
        WHERE vh.VERIFICATION_NUMBER = verificationHub.VERIFICATION_NUMBER and vs.STATE in ('Cancelled')) DOC_VERIF_MIN_DATE,

        -- Агентство
        JSON_VALUE(agentAgreement.BODY, '$.mainAttributes.agency.description') AGENCY,

        -- Электронный полис
        CASE WHEN JSON_VALUE(policy.BODY, '$.issueForm.code.issueFormCode') = 'ePolicy'
        THEN N'да' 
        ELSE N'нет' END E_POLICY,

        -- Источник данных
        N'адиншур' DATA_SOURCE,

        -- Время заключения договора
        (SELECT TOP 1 
            CAST(policySatLatest.LOAD_DATE AS TIME(0))
        FROM PAS_IMPL.POLICY_SAT policySatLatest
        LEFT JOIN PAS_IMPL.POLICY_HUB ph ON ph.POLICY_HKEY = policySatLatest.POLICY_HKEY
        WHERE STATE = 'Activated' AND ph.CONTRACT_NUMBER = policy.CONTRACT_NUMBER) CONTRACT_ISSUE_TIME,

        -- Первичная дата проверки документов
        (SELECT MIN(FORMAT(vs.LOAD_DATE, 'dd-MM-yyyy')) FROM PAS_IMPL.VERIFICATION_SAT vs
        LEFT JOIN PAS_IMPL.VERIFICATION_HUB vh ON vh.VERIFICATION_HKEY = vs.VERIFICATION_HKEY
        WHERE vh.VERIFICATION_NUMBER = verificationHub.VERIFICATION_NUMBER and vs.STATE in ('Cancelled', 'Issued')) MIN_VERIFICATION_DATE,

        -- Первичное время проверки документов 
        (SELECT MIN(CAST(vs.LOAD_DATE AS TIME(0))) FROM PAS_IMPL.VERIFICATION_SAT vs
        LEFT JOIN PAS_IMPL.VERIFICATION_HUB vh ON vh.VERIFICATION_HKEY = vs.VERIFICATION_HKEY
        WHERE vh.VERIFICATION_NUMBER = verificationHub.VERIFICATION_NUMBER and vs.STATE in ('Cancelled', 'Issued')) MIN_VERIFICATION_TIME,

        -- Последняя дата статуса "ожидает проверки"
        (SELECT MAX(FORMAT(vs.LOAD_DATE, 'dd-MM-yyyy')) FROM PAS_IMPL.VERIFICATION_SAT vs
        LEFT JOIN PAS_IMPL.VERIFICATION_HUB vh ON vh.VERIFICATION_HKEY = vs.VERIFICATION_HKEY
        WHERE vh.VERIFICATION_NUMBER = verificationHub.VERIFICATION_NUMBER and vs.STATE in ('Draft')) MAX_VERIFICATION_DATE,

        -- Последнее время статуса "ожидает проверки"
        (SELECT MAX(CAST(vs.LOAD_DATE AS TIME(0))) FROM PAS_IMPL.VERIFICATION_SAT vs
        LEFT JOIN PAS_IMPL.VERIFICATION_HUB vh ON vh.VERIFICATION_HKEY = vs.VERIFICATION_HKEY
        WHERE vh.VERIFICATION_NUMBER = verificationHub.VERIFICATION_NUMBER and vs.STATE in ('Draft')) MAX_VERIFICATION_TIME,

        -- Дата изменения статуса договора
        (SELECT contractCurState.CONTRACT_CURRENT_STATE_DATE FROM
        (SELECT 
            TOP 1
            FORMAT(ps.LOAD_DATE, 'dd-MM-yyyy') as CONTRACT_CURRENT_STATE_DATE
        FROM PAS_IMPL.POLICY_SAT ps
        LEFT JOIN PAS_IMPL.POLICY_HUB ph ON ph.POLICY_HKEY = ps.POLICY_HKEY
        WHERE ph.CONTRACT_NUMBER = policy.CONTRACT_NUMBER
        ORDER BY ps.LOAD_DATE DESC) contractCurState) CONTRACT_CHANGE_STATE_DATE,

        -- Месяц, в котором прошли расчеты по полису
        (SELECT 
            TOP 1 FORMAT(ca.PAY_DATE, 'MMyyyy')
        FROM ACC_IMPL.CA_ACT ca
        LEFT JOIN ACC_IMPL.CA_ACT_HISTORY cah ON cah.ACT_ID = ca.ACT_ID
        LEFT JOIN ACC_IMPL.CA_ACT_ITEM cai ON cai.ACT_ID = ca.ACT_ID
        where cai.REFERENCE_NO = policy.CONTRACT_NUMBER and cah.STATUS_ID_TO = '7') COMMISSION_PAYMENT_DATE,

        -- Месяц, в который включен возврат по полису
        (SELECT 
            TOP 1 FORMAT(cah.CREATE_DATE, 'MMyyyy')
        FROM ACC_IMPL.CA_ACT ca
        LEFT JOIN ACC_IMPL.CA_ACT_HISTORY cah ON cah.ACT_ID = ca.ACT_ID
        LEFT JOIN ACC_IMPL.CA_ACT_ITEM cai ON cai.ACT_ID = ca.ACT_ID
        where cai.REFERENCE_NO = policy.CONTRACT_NUMBER and cah.STATUS_ID_TO = '6') COMPLETED_PAY_ORDER_DATE,

        -- Дата привязки ПЕРВОГО платежа к договору
        FORMAT(allocation.CREATE_DATE, 'dd-MM-yyyy') as ALLOCATION_DATE,

        -- Паспорт страхователя серия
        partyDocumentsSatLatest.DOC_SERIES HOLDER_DOC_SERIES,

        -- Паспорт страхователя номер
        partyDocumentsSatLatest.DOC_NUMBER HOLDER_DOC_NUMBER,

        -- Login продавца
        sellerUser.USERNAME SELLER_USERNAME,

        -- Базовый актив
        JSON_VALUE(policy.BODY, '$.basicInvestmentParameters.baseActiveDescription') BASE_ACTIVE,

        -- Стратегия
        JSON_VALUE(policy.BODY, '$.basicInvestmentParameters.investmentStrategyDescriptionFull') STRATEGY,

        -- Платежи
        bankStatementItem.BANK_STATEMENT_ITEM_NO BANK_STATEMENT_ITEM

    FROM PAS_IMPL.POLICY_HUB policyHub
    LEFT JOIN PAS.CONTRACT policy ON policy.CONTRACT_NUMBER = policyHub.CONTRACT_NUMBER
    LEFT JOIN PAS_IMPL.POLICY_SAT_LATEST policySatLatest ON policySatLatest.POLICY_HKEY = policyHub.POLICY_HKEY
    LEFT JOIN PTY_IMPL.PARTY_HUB partyHub ON partyHub.PARTY_CODE = policySatLatest.HOLDER_CODE
    LEFT JOIN PTY_IMPL.PARTY_INFO_SAT_LATEST partyInfoSatLatest ON partyInfoSatLatest.PARTY_INFO_HKEY = partyHub.PARTY_HKEY
    LEFT JOIN PTY_IMPL.PARTY_HUB partyHubInsured ON partyHubInsured.PARTY_CODE = policySatLatest.INSURED_CODE
    LEFT JOIN PTY_IMPL.PARTY_INFO_SAT_LATEST partyInfoSatLatestInsured ON partyInfoSatLatestInsured.PARTY_INFO_HKEY = partyHubInsured.PARTY_HKEY
    LEFT JOIN PAS_IMPL.POLICY_RISKS_SAT_LATEST policyRisksSatLatest ON policyRisksSatLatest.POLICY_RISKS_HKEY = policyHub.POLICY_HKEY
    LEFT JOIN PAS_IMPL.POLICY_VERIFICATION_LINK policyVerificationLink ON policyVerificationLink.POLICY_HKEY = policySatLatest.POLICY_HKEY
    LEFT JOIN PAS_IMPL.VERIFICATION_SAT_LATEST verificationSatLatest ON verificationSatLatest.VERIFICATION_HKEY = policyVerificationLink.VERIFICATION_HKEY
    LEFT JOIN PAS_IMPL.VERIFICATION_HUB verificationHub ON verificationHub.VERIFICATION_HKEY = verificationSatLatest.VERIFICATION_HKEY
    LEFT JOIN PTY_IMPL.PARTY_DOCUMENTS_SAT_LATEST partyDocumentsSatLatest ON partyDocumentsSatLatest.PARTY_DOCUMENTS_HKEY = partyHub.PARTY_HKEY
    LEFT JOIN PTY.PARTY partyHolder ON partyHolder.PARTY_CODE = policySatLatest.HOLDER_CODE
    LEFT JOIN PTY.PARTY partyInsured ON partyInsured.PARTY_CODE = policySatLatest.INSURED_CODE
    LEFT JOIN PAS.AGENT_AGREEMENT agentAgreement ON agentAgreement.AGENT_AGREEMENT_ID = JSON_VALUE(policy.BODY, '$.commission.agentAgreement.id')
    LEFT JOIN ORG.SERVICE_PROVIDER sellerEmployee ON sellerEmployee.SERVICE_PROVIDER_CODE = JSON_VALUE(policy.BODY, '$.initiator.employeeCode')
    LEFT JOIN ORG.ORGANISATION_UNIT sellerOrgUnit ON sellerOrgUnit.ORGANISATION_UNIT_CODE = JSON_VALUE(policy.BODY, '$.initiator.organisationUnitCode')
    LEFT JOIN ORG.APPLICATION_USER_CLAIM sellerUserClaim ON sellerUserClaim.VALUE = JSON_VALUE(policy.BODY, '$.initiator.partyCode')
    LEFT JOIN ORG.APPLICATION_USER sellerUser ON sellerUser.APPLICATION_USER_ID = sellerUserClaim.APPLICATION_USER_ID
    LEFT JOIN ACC_IMPL.ALLOCATION allocation ON allocation.DOCUMENT_NO = policy.CONTRACT_NUMBER
    LEFT JOIN ACC_IMPL.BANK_STATEMENT_ITEM bankStatementItem ON bankStatementItem.REFERENCE_NO = policy.CONTRACT_NUMBER
)
GO

create view GET_CONTRACTS_REPORT_VIEW
as
select * from get_contracts_report()
GO

-- examples
/*
select * from get_contracts_report()
where CONTRACT_NUMBER = N'95700-99000001'

select * from GET_CONTRACTS_REPORT_VIEW
*/