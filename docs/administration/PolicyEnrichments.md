## Использование сервиса по созданию котировки\договора

### Структура запроса
> {{SERVER_URI}}/api/pas/contracts/{configurationCodeName}/{version}

### Изменения в структуре запроса
![Изменения](images\policyEnrichments\policyEnrichmentsChanges.png "Изменения")

##### Необходимо вызывать один энричмент ```"/policyEnrichments"``` в корне запроса (enrichFields), который первым делом получит конфигурацию продукта.
![Главный энричмент](images\policyEnrichments\policyEnrichmentsRoot.png "Главный энричмент")

##### Дополнительные энричменты указываются в Data.policyEnrichments.enrichFields и выполняются в свободном порядке.
![Дополнительные энричменты](images\policyEnrichments\policyEnrichmentsOptional.png "Дополнительные энричменты")

##### Вызывать энричмент ```"/productConfiguration"``` больше нет необходимости.

### Данные для создания запроса
```sql
-- configurationCodeName
SELECT CODE_NAME FROM CFX.PUBLISHED_ARTIFACT
WHERE CODE_NAME LIKE '%InsuranceQuote' OR CODE_NAME LIKE '%InsurancePolicy'
-- AccumulatedLifeInsurancePolicy
-- AccumulatedLifeInsuranceQuote
-- CollectiveLifeInsurancePolicy
-- CreateMedLifeInsuranceQuote
-- CreditLifeInsurancePolicy
-- CreditLifeInsuranceQuote
-- EquityLifeInsurancePolicy
-- EquityLifeInsuranceQuote
-- InvestmentLifeInsurancePolicy
-- InvestmentLifeInsuranceQuote
-- MedLifeInsurancePolicy
-- MedLifeInsuranceQuote
-- RiskLifeInsurancePolicy
-- RiskLifeInsuranceQuote

-- initiator id
SELECT APPLICATION_USER_ID FROM ORG.APPLICATION_USER
WHERE USERNAME LIKE N'%ОАСИнициатор%'

-- agent agreement id and number
SELECT AGENT_AGREEMENT_ID, AGENT_AGREEMENT_NUMBER FROM PAS.AGENT_AGREEMENT
WHERE AGENT_AGREEMENT_NUMBER = 1

-- product configuration
SELECT * FROM BFX_IMPL.PRODUCT_CONF pc
WHERE CONF_VERSION = (SELECT MAX(CONF_VERSION) FROM BFX_IMPL.PRODUCT_CONF)
AND PRODUCT_CODE = 'WCENOAS'
AND '2024-11-14' >= pc.ISSUE_DATE_FROM AND '2024-11-14' <= pc.ISSUE_DATE_TO
```

### Пример
##### Сервис
> {{SERVER_URI}}/api/pas/contracts/AccumulatedLifeInsuranceQuote/1
##### Запрос
```json
{
    "Data": {
        "mainInsuranceConditions": {
            "partner": {
                "partnerCode": "9"
            },
            "insuranceProduct": {
                "productCode": "WCENOAS",
                "productGroup": "endowment",
                "productDescription": "Достойный век 2.0"
            }
        },
        "policyTerms": {
            "startDate": "2024-11-18",
            "endDate": "2092-11-17",
            "effectiveDate": "2024-11-18"
        },
        "initiator": {
            "userId": "72C93BA5-FFEB-40B9-8765-00FBFD0F29F4"
        },
        "paymentPlan": [],
        "basicConditions": {
            "currency": {
                "currencyCode": "RUB"
            },
            "endowmentPaymentVariant": {
                "endowmentPaymentVariantCode": "single",
                "endowmentPaymentVariantDescription": "Единовременно"
            },
            "issueDate": "2024-11-14",
            "fixedPremiums": [],
            "fixedInsuredSums": [],
            "calcFromInsuredSum": true,
            "applicationDate": "2024-11-14",
            "receiptDate": "2024-11-14",
            "acceptToWorkDate": "2024-11-14",
            "paymentFrequency": {
                "paymentFrequencyCode": "1",
                "paymentFrequencyDescription": "Единовременно"
            },
            "riskInsuredSum": 15000,
            "insuranceTerms": "1"
        },
        "basicInvestmentParameters": {},
        "insuranceRules": {},
        "policyHolder": {
            "participantType": "policyHolder",
            "partyData": {
                "partyCode": "22"
            }
        },
        "insuredPerson": {
            "participantType": "insuredPerson",
            "isPolicyHolder": false,
            "partyData": {
                "partyCode": "248"
            }
        },
        "issueForm": {
            "code": {
                "issueFormCode": "paper",
                "issueFormDescription": "Бумага"
            }
        },
        "beneficiaries": {
            "beneficiaries": [
                {
                    "partyFullName": "Выгодоприобретатель Иван Иванович",
                    "dateOfBirth": "1977-01-19",
                    "personGender": "Male",
                    "share": 1,
                    "relationType": "Брат",
                    "beneficiaryId": "ea24937f-68e8-4876-8d78-54f3a9a2b413"
                }
            ],
            "isHeritors": false,
            "isNotHeritors": true
        },
        "inquiriesList": {
            "inquiresCheck": false
        },
        "attachmentsPackage": [],
        "technicalInformation": {},
        "risks": [],
        "riskConditions": {},
        "surrenderValues": [],
        "risksCorrection": {},
        "risksPackages": {},
        "giftServices": {},
        "declarationMain": [],
        "declarationMainConfirmation": {
            "isConfirmedPolicyHolder": true,
            "isNotConfirmedPolicyHolder": false,
            "isConfirmedInsuredPerson": true,
            "isNotConfirmedInsuredPerson": false
        },
        "declarationMedicalConfirmation": {},
        "declarationMedicalConfirmationPolicyHolder": {},
        "declarationMedicalPolicyHolder": [],
        "declarationMedical": [],
        "commission": {
            "agentAgreement": {
                "id": "B8FD3554-18EC-4274-AE99-5038519AABA3",
                "number": "1"
            }
        },
        "allocationInformation": [],
        "additionalServices": [],
        "cumulation": {},
        "uwTriggers": [],
        "promotions": {},
        "productConfiguration": {},
        "policyEnrichments": {
            "enrichFields": [
                "/basicConditions",
                "/basicInvestmentParameters",
                "/beneficiaries",
                "/insuranceRules",
                "/issueForm",
                "/paymentPlan",
                "/policyHolder/**",
                "/insuredPerson/**",
                "/policyTerms",
                "/risks",
                "/risks/**",
                "/risksPackages",
                "/giftServices",
                "/uwTriggers",
                "/mainInsuranceConditions",
                "/initiator",
                "/technicalInformation",
                "/declarationMedicalConfirmationPolicyHolder",
                "/declarationMedicalPolicyHolder",
                "/declarationMedical",
                "/socialTaxDeduction",
                "/declarationMain",
                "/inquiriesList",
                "/attachmentsPackage",
                "/commission",
                "/allocationInformation",
                "/cumulation"
            ]
        }
    },
    "enrichFields": [
        "/policyEnrichments"
    ]
}
```
