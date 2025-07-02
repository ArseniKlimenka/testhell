'use strict';

const { getArrayOfUniqueObjects } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');
const { addressTypeLikeInUI } = require('@config-rgsl/party/lib/partyConstantsImpl');
const ObjectUtils = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const yes = 'Да';
const no = 'Нет';
const empty = '';

function historyMapping(dataSourceResponse) {

    if (!dataSourceResponse.data) {
        return;
    }

    let partyHistory = dataSourceResponse?.data?.map(i => i.resultData) ?? [];
    partyHistory = sortPartyHistoryBySysUpdatedOn(partyHistory);

    let partyHistoryDifferences = [];

    if (partyHistory.length > 1) {

        for (let i = 0; i < partyHistory.length - 1; i++) {
            partyHistoryDifferences.push(...findDifferences(partyHistory[i].body, partyHistory[i + 1].body, partyHistory[i + 1].sysUpdatedOn, partyHistory[i + 1].sysUpdatedByUserName));
        }

        changeArrayToValue(partyHistoryDifferences);
        partyHistoryDifferences = formatDate(partyHistoryDifferences);
        partyHistoryDifferences = excludeBothEmptyValues(partyHistoryDifferences);
        partyHistoryDifferences = translateBooleanValues(partyHistoryDifferences);
        addPartyHistoryTranslations(partyHistoryDifferences, 'NaturalPerson');
        partyHistoryDifferences = removePartyHistoryPath(partyHistoryDifferences);
        partyHistoryDifferences = getArrayOfUniqueObjects(partyHistoryDifferences);
        partyHistoryDifferences = sortPartyHistoryDifferencesBySysUpdatedOn(partyHistoryDifferences);
        partyHistoryDifferences = packValueToArrayForUI(partyHistoryDifferences);
    }

    return partyHistoryDifferences;
}


function findDifferences(obj1, obj2, sysUpdatedOn, sysUpdatedByUserName) {

    const differences = [];

    let mainKey = 'partyPersonData';

    const partyPersonDataObj1 = getPartyPersonDataAttributes(obj1[mainKey], mainKey);
    const partyPersonDataObj2 = getPartyPersonDataAttributes(obj2[mainKey], mainKey);
    compareAttributes(partyPersonDataObj1, partyPersonDataObj2, differences, sysUpdatedOn, sysUpdatedByUserName);
    compareCitizenship(partyPersonDataObj1.arrays.citizenship, partyPersonDataObj2.arrays.citizenship, 'citizenship', differences, sysUpdatedOn, sysUpdatedByUserName);
    compareSoleProprietorHistory(partyPersonDataObj1.arrays.soleProprietorHistory, partyPersonDataObj2.arrays.soleProprietorHistory, 'soleProprietorHistory', differences, sysUpdatedOn, sysUpdatedByUserName);
    comparePartyLicenses(partyPersonDataObj1.arrays.partyLicenses, partyPersonDataObj2.arrays.partyLicenses, 'partyLicenses', differences, sysUpdatedOn, sysUpdatedByUserName);

    mainKey = 'partyGeneralData';
    const partyGeneralDataObj1 = getPartyGeneralDataAttributes(obj1[mainKey], mainKey);
    const partyGeneralDataObj2 = getPartyGeneralDataAttributes(obj2[mainKey], mainKey);
    compareAttributes(partyGeneralDataObj1, partyGeneralDataObj2, differences, sysUpdatedOn, sysUpdatedByUserName);

    mainKey = 'partyCRS';
    const partyCRSObj1 = getPartyCRSAttributes(obj1[mainKey], mainKey);
    const partyCRSObj2 = getPartyCRSAttributes(obj2[mainKey], mainKey);
    compareAttributes(partyCRSObj1, partyCRSObj2, differences, sysUpdatedOn, sysUpdatedByUserName);

    mainKey = 'partyEmailsAdditionalInfo';
    const partyEmailsAdditionalInfoObj1 = getPartyEmailsAdditionalInfoAttributes(obj1[mainKey], mainKey);
    const partyEmailsAdditionalInfoObj2 = getPartyEmailsAdditionalInfoAttributes(obj2[mainKey], mainKey);
    compareAttributes(partyEmailsAdditionalInfoObj1, partyEmailsAdditionalInfoObj2, differences, sysUpdatedOn, sysUpdatedByUserName);

    mainKey = 'partyPhones';
    comparePartyPhones(obj1[mainKey], obj2[mainKey], mainKey, differences, sysUpdatedOn, sysUpdatedByUserName);

    mainKey = 'partyEmails';
    comparePartyEmails(obj1[mainKey], obj2[mainKey], mainKey, differences, sysUpdatedOn, sysUpdatedByUserName);

    mainKey = 'partyBankAccounts';
    comparePartyBankAccounts(obj1[mainKey], obj2[mainKey], mainKey, differences, sysUpdatedOn, sysUpdatedByUserName);

    mainKey = 'partyDocuments';
    comparePartyDocuments(obj1[mainKey], obj2[mainKey], mainKey, differences, sysUpdatedOn, sysUpdatedByUserName);

    mainKey = 'partyAddresses';
    comparePartyAddresses(obj1[mainKey], obj2[mainKey], mainKey, differences, sysUpdatedOn, sysUpdatedByUserName);

    return differences;
}

function changeArrayToValue(partyHistoryDifferences) {

    partyHistoryDifferences.forEach(difference => {

        if (Array.isArray(difference.newValue)) {

            const countryShortName = difference.newValue[0]?.countryShortName ?? empty;

            if (countryShortName) {
                difference.newValue = countryShortName;
            }
        }

        if (Array.isArray(difference.oldValue)) {

            const countryShortName = difference.oldValue[0]?.countryShortName ?? empty;

            if (countryShortName) {
                difference.oldValue = countryShortName;
            }
        }
    });
}

function addPartyHistoryTranslations(partyHistoryDifferences) {

    partyHistoryDifferences.map(i => {

        const translateValues = [
            'insurance', 'otherwise', 'longTerm', 'shortTerm', 'soleProprietor', 'privatePracticeAccordingToLaw',
            'unstable', 'sustainable', 'negative', 'positive',
            '/policyHolder', '/insuredPerson', '/beneficiary', '/agentNaturalPerson',
            '/policyHolderLegalEntity', '/insuredPersonLegalEntity', '/agentLegalEntity',
            '/applicantNaturalPerson', '/taxPayer', '/beneficiaryOwner',
            'Female', 'Male'
        ];

        if (translateValues.includes(i.newValue)) {
            let translatedValue = '';

            translatedValue = translations[i.attribute.toLowerCase()];
            i.newValue = translatedValue;
        }

        if (translateValues.includes(i.oldValue)) {
            let translatedValue = '';

            translatedValue = translations[i.attribute.toLowerCase()];
            i.oldValue = translatedValue;
        }

        if (i.attribute) {

            i.attributeRu = translations[i.attribute.toLowerCase()];
        }

        return i;
    });
}


// If you added a field on party's card, maybe you should add translation here too
// I was forced to hardcode translations because of party history printout
const translations = {
    'beneficiaryownerquestionnaire': 'Анкета бенефициарного владельца',
    'employername': 'Наименование работодателя',
    'employeraddress': 'Адрес работодателя',
    'answer1': 'Является ли Ваш бенефициарный владелец иностранным публичным должностным лицом, его супругом, близким родственником родственником по прямой восходящей или нисходящей линии родителем или ребёнком, дедушкой, бабушкой или внуком, полнородными или неполнородными имеющими общего отца или мать братом или сестрой, усыновителем или усыновленным? В случае ответа «да», укажите степень родства/должность, наименование и адрес работодателя:',
    'answer2': 'Является ли Ваш бенефициарный владелец российским публичным должностным лицом, а так же лицом, замещающим занимающим государственные должности РФ, должности членов Совета директоров Банка России, должности федеральной государственной службы, назначение на которые и освобождение от которых осуществляются Президентом РФ или Правительством РФ, должности в Банке России, государственных корпорациях и иных организациях, созданных РФ на основании федеральных законов, включенные в перечни должностей, определяемые Президентом РФ, а так же супругом, близким родственником родственником по прямой восходящей или нисходящей линии родителем или ребёнком, дедушкой, бабушкой или внуком, полнородными или неполнородными имеющими общего отца или мать братом или сестрой, усыновителем или усыновленным вышеперечисленных лиц? В случае ответа «да», укажите степень родства/должность, наименование и адрес работодателя:',
    'answer3': 'Является ли Ваш бенефициарный владелец должностным лицом публичных международных организаций, его супругом, близким родственником родственником по прямой восходящей или нисходящей линии родителем или ребёнком, дедушкой, бабушкой или внуком, полнородными или неполнородными имеющими общего отца или мать братом или сестрой, усыновителем или усыновленным? В случае ответа «да», укажите степень родства/должность, наименование и адрес работодателя:',
    'relationtype': 'Степень родства',
    'relationtypedesc': 'Степень родства',
    'position': 'Должность',
    'finknowledgequestionnaire': 'Анкета фин. грамотности',
    'itemtext': 'Текст пункта',
    'itemconfirmation': 'Согласие',
    'lastupdatedate': 'Дата последнего обновления',
    'confirmation': 'Я понимаю, что заключение договора страхования жизни с инвестиционной составляющей мне настоятельно не рекомендовано. Несмотря на то, что я не обладаю специальными знаниями в области финансов, я подтверждаю, что ознакомлен с рекомендацией Страховщика, понимаю все условия заключения договора страхования жизни и изъявляю желание заключить договор страхования жизни с участием в инвестиционном доходе с ООО СК «Росгосстрах Жизнь» на предложенных мне условиях.',
    'itemnumber': 'Номер',
    'check blacklist': 'Проверка черного списка',
    'country': 'Страна',
    'region': 'Субъект РФ',
    'area': 'Район',
    'city': 'Город',
    'settlement': 'Населенный пункт',
    'street': 'Улица',
    'house': 'Дом',
    'houseextension': 'Расширение дома',
    'flat': 'Квартира офис',
    'postalcode': 'Индекс',
    'codeokato': 'Код ОКАТО',
    'codekladr': 'Код КЛАДР',
    'comment': 'Комментарии',
    'full address': 'Полный адрес',
    'addresstype': 'Тип адреса',
    'addresstypecode': 'Код типа',
    'addresstypedesc': 'Наименование типа',
    'actualfrom': 'Актуален С',
    'actualto': 'Актуален По',
    'isforeignaddress': 'Иностранный адрес',
    'issameasregistration': 'Совпадает с адресом регистрации',
    'ismanualaddress': 'Ввод адреса вручную',
    'partyaddresses': 'Адреса',
    'bankid': 'ИД банка',
    'bankname': 'Банк',
    'bankbic': 'БИК',
    'bankcorrespondentaccount': 'Корр. счет',
    'currency': 'Валюта',
    'currencycode': 'Код валюты',
    'currencydesc': 'Валюта',
    'currencynumericcode': 'Числовой код валюты',
    'number': 'Номер',
    'openingdate': 'Дата открытия',
    'closingdate': 'Дата закрытия',
    'swift': 'SWIFT',
    'iban': 'IBAN',
    'foreignbank': 'Иностранный банк',
    'inn': 'ИНН',
    'partybankaccounts': 'Банковские счета',
    'countryshortname': 'Краткое название страны',
    'countrycode': 'Код страны',
    'countryfullname': 'Полное название страны',
    'alfa2': 'Код страны alpha-2',
    'alfa3': 'Код страны alpha-3',
    'party crs data': 'CRS',
    'statuscheckdate': 'Дата проверки статуса резидентства',
    'doctype': 'Документ, подтверждающий пребывание',
    'docseries': 'Серия',
    'docnumber': 'Номер',
    'issuedate': 'Дата выдачи',
    'expiredate': 'Дата окончания срока действия',
    'issuername': 'Кем выдан',
    'issuercode': 'Код подразделения',
    'otherdoctypedesc': 'Наименование иного вида документа',
    'partydocuments': 'Документы',
    'doctypedesc': 'Документ, подтверждающий пребывание',
    'partydocumenttype': 'Тип документа',
    'doctypecode': 'Код типа',
    'doctypeclass': 'Класс типа',
    'allowtosalers': 'Доступно для продавца',
    'deduplicated parties': 'Дедуплицированные контрагенты',
    'partydeduplicationsection': 'Информация о дедупликации',
    'duplicate master number': 'Мастер контрагент',
    'email': 'E-mail',
    'isfornewsletters': 'Для информационной рассылки',
    'ispreferable': 'Предпочтительно',
    'partyemails': 'E-mail',
    'noemail': 'Нет E-mail',
    'excludedpersonname': 'Имя',
    'partyexcludedpersons': 'Список лиц, исключаемых из списка 3-х лиц по отношению к данному контрагенту',
    'party fatca data': 'Fatca',
    'confirmationexists': 'Согласие на передачу сведений',
    'confirmationdate': 'Дата согласия/отказа',
    'partyfinquesthistory': 'История изменения Анкеты финансовой грамотности',
    'foreigntaxobl': 'Foreign tax obl.',
    'yes': 'Да',
    'no': 'Нет',
    'maybe': 'Может быть',
    'insurance': 'Страхование',
    'otherwise': 'Иное',
    'longterm': 'Долгосрочный',
    'shortterm': 'Краткосрочный',
    'sustainable': 'Устойчивое',
    'unstable': 'Неустойчивое',
    'positive': 'Положительная',
    'negative': 'Негативная',
    'isnonresident': 'Нерезидент РФ',
    'registrationcountry': 'Страна регистрации',
    'innkio': 'ИНН России',
    'tin': 'TIN',
    'tradingpartnercode': 'Код Trading partner',
    'beneficiaryowner': 'ЕИО/БВ/Представитель',
    'riskestimation': 'Оценка риска',
    'relationgoal': 'Цель установки отношений',
    'suggestedrelationtype': 'Предполагаемый характер отношений',
    'goaloffinancialactivity': 'Цель финансово-хозяйственной деятельности',
    'financialstate': 'Финансовое положение',
    'businessreputation': 'Деловая репутация',
    'incomesource': 'Источник происхождения денежных средств',
    'beneficiaryownerdesc': 'Бенефициарный владелец',
    'goaloffinancialactivitydesc': 'Цель финансово-хозяйственной деятельности',
    'incomesourcedesc': 'Источник происхождения денежных средств',
    'beneficiaryownercode': 'beneficiaryOwnerCode',
    'notin': 'TIN нет',
    'taxresidence': 'Страна налогового резидентства',
    'descriptionforgoaloffinancialactivity': 'Описание цели финансово-хозяйственной деятельности',
    'descriptionforincomesource': 'Описание источника происхождения денежных средств',
    'ispodft': 'ПОД/ФТ',
    'nonresidentcode': 'Код нерезидента',
    'isnotificationsent': 'Уведомление отправлено',
    'okpo': 'ОКПО',
    'okved': 'ОКВЭД',
    'party general data': 'Общая информация',
    'nonresident code': 'Код нерезидента',
    'tinabsencereason': 'Причина отсутствия TIN',
    'beneficiaryowners': 'Список бенефициарных владельцев',
    'beneficiaryownerpartyname': 'Ф. И. О.',
    'fraction': 'Фракция',
    'documentsvalidationdate': 'Дата валидации документов',
    'anothernaturalpersons': 'Другие контрагенты',
    'anothernaturalperson': 'Другой контрагент',
    'duplicatescount': 'Количество дубликатов',
    'duplicatemasternumber': 'Главный номер дубликата',
    'innerbankid': 'Внутренний ID контрагента в банке',
    'partyhistorychangestitle': 'История изменений',
    'licensenumber': 'Номер лицензии/разрешения',
    'licensingauthority': 'Наименование органа, выдавшего лицензию разрешение',
    'dateofissueoflicense': 'Дата выдачи лицензии разрешения',
    'partylicenses': 'Информация о лицензируемой деятельности',
    'haslicenses': 'Наличие лицензии на право осуществления деятельности, подлежащей лицензированию',
    'partyid': 'partyId',
    'partycode': 'partyCode',
    'partytype': 'partyType',
    'partyfullname': 'partyFullName',
    'fullname': 'ФИО',
    'male': 'Мужской',
    'female': 'Женский',
    'dateofbirth': 'Дата рождения',
    'persongender': 'Пол',
    'dateofstateregistration': 'Дата государственной регистрации',
    'ogrnogrnip': 'ОГРН/ОГРНИП',
    'dateofrecordingtermination': 'Дата внесения записи о прекращении деятельности',
    'registrationagencycode': 'Наименование регистрирующего органа',
    'ismanualregistrationagency': 'Внести наименование регистрирующего органа вручную',
    'registrationagencynamemanual': 'Наименование регистрирующего органа ручной ввод',
    'fullorgname': 'Полное наименование',
    'shortorgname': 'Сокращенное наименование',
    'numberofemployee': 'Количество сотрудников',
    'organisationalform': 'Организационная форма',
    'kpp': 'КПП',
    'organisationalformcode': 'organisationalFormCode',
    'organisationalformdesc': 'organisationalFormDesc',
    'issoleexecutiveauthority': 'Сведения о единоличном исполнительном органе ЮЛ/ИП',
    'isdefault': 'Признак дефолта',
    'unfulfilledobligationcb': 'Наличие неисполненного обязательства по ЦБ',
    'licenserevoked': 'Отозвана лицензия',
    'bankruptcyprocedure': 'Введена процедура банкротства',
    'unfulfilledobligationbyguarantee': 'Наличие неисполненного обязательства по поручительству',
    'anothersign': 'Другой признак',
    'unfulfilledobligationcbcomment': 'Наличие неисполненного обязательства по ЦБ комментарий',
    'licenserevokedcomment': 'Отозвана лицензия комментарий',
    'bankruptcyprocedurecomment': 'Введена процедура банкротства комментарий',
    'unfulfilledobligationbyguaranteecomment': 'Наличие неисполненного обязательства по поручительству комментарий',
    'anothersigncomment': 'Другой признак комментарий',
    'party organisation data': 'Данные организации',
    'soleexecutiveauthority': 'Сведения о единоличном исполнительном органе ЮЛ/ИП',
    'licenserevokeddesc': 'У лица отозвана аннулирована лицензия на осуществление банковских операций либо отозвана аннулирована лицензия на осуществление деятельности на финансовом рынке, если такой вид деятельности является основным видом деятельности такого лица, отраженным в едином государственном реестре юридических лиц, либо сведения о лице исключены из реестра некредитных финансовых организаций, ведение которого осуществляется Банком России',
    'bankruptcyproceduredesc': 'В отношении лица введена процедура банкротства в соответствии с законодательством Российской Федерации о несостоятельности банкротстве',
    'unfulfilledobligationcbdesc': 'Лицо имеет не исполненное в срок и в полном объеме обязательство перед владельцами ценных бумаг, выпущенных выданных таким лицом',
    'unfulfilledobligationbyguaranteedesc': 'Лицо имеет не исполненное в срок и в полном объеме обязательство по договору поручительства независимой гарантии, которым обеспечивается исполнение обязательств по ценным бумагам',
    'full name': 'Full name',
    'short name': 'Abbreviated name',
    'party registration data': 'Информация о государственной регистрации',
    'ispersonrepresentative': 'Представитель Юр. лица',
    'soleproprietor': 'Индивидуальный предприниматель',
    'privatepracticeaccordingtolaw': 'Физическое лицо, занимающееся в установленном законодательством российской федерации порядке частной практикой',
    'ispublicofficial': 'Публичное должностное лицо',
    'segment': 'Сегмент',
    'segmentcode': 'Сегмент код',
    'segmentdesc': 'Сегмент',
    'executiveperson': 'Должностное лицо',
    'executivepersondesc': 'Должностное лицо',
    'executivepersoncode': 'Должностное лицо код',
    'naturalpersoncategory': 'Категория',
    'lastname': 'Фамилия',
    'firstname': 'Имя',
    'middlename': 'Отчество',
    'birthplace': 'Место рождения',
    'countryplace': 'Страна рождения',
    'snils': 'СНИЛС',
    'citizenship': 'Гражданство',
    'isstatelessperson': 'Лицо без гражданства',
    'party person data': 'Данные физического лица',
    'birthplacedescription': 'Согласно документу удостоверяющему личность',
    'ispublicofficialdescription': 'Заполняется, если в заявлении есть информация о том, что страхователь является российским публичным должностным лицом, иностранным публичным должностным лицом, должностным лицом публичной международной организации или является супругом/близким родственником ПДЛ',
    'ispublicofficialfulldescription': 'Страхователь является иностранным публичным должностным лицом «иностранное публичное должностное лицо» означает любое назначаемое или избираемое лицо, занимающее какую-либо должность в законодательном, исполнительном, административном или судебном органе иностранного государства, и любое лицо, выполняющее какую-либо публичную функцию для иностранного государства, в том числе для публичного ведомства или публичного предприятия, должностным лицом публичных международных организаций «должностное лицо публичной международной организации» означает международного гражданского служащего или любое лицо, которое уполномочено такой организацией действовать от ее имени, российским публичным должностным лицом, лицом, замещающим занимающим государственные должности в Российской Федерации, должности членов Совета директоров Банка России, должности федеральной государственной службы, назначение на которые и освобождение от которых осуществляются Президентом Российской Федерации или Правительством Российской Федерации, должности в Банке России, государственных корпорациях и иных организациях, созданных Российской Федерацией на основании федеральных законов, включенные в перечни должностей, определяемые Президентом Российской Федерации, родственником кого-то из вышеперечисленных лиц супругом, родителем, ребенком, дедушкой, бабушкой, внуком, полнородным и неполнородным имеющим общих отца или мать братом и сестрой, усыновителем и усыновленным или представителем, действующим от его имени.',
    'isstatelesspersondescription': 'Лицо без гражданства',
    'foreigndocumenttype': 'Наименование документа иностранного гражданина',
    'foreigndocumentseria': 'Серия документа иностранного гражданина',
    'foreigndocumentnumber': 'Номер документа иностранного гражданина',
    'foreigndocumentstartdate': 'Дата начала срока действия права пребывания проживания',
    'foreigndocumentenddate': 'Дата окончания срока действия пребывания проживания',
    'phonetype': 'Тип',
    'phonetypecode': 'Код типа',
    'phonetypedesc': 'Тип',
    'citycode': 'Код города',
    'fullnumber': 'Полный номер ручной ввод',
    'isadditional': 'Дополнительный',
    'isnonactual': 'Неактуальный',
    'comments': 'Примечание',
    'fullnumberformatted': 'Номер',
    'partyphones': 'Телефоны',
    'partyrole': 'Роль для визуализации валидаций',
    'policyholder': 'Страхователь',
    'insuredperson': 'Застрахованный',
    'beneficiary': 'Выгодоприобретатель',
    'agent': 'Агент',
    'applicant': 'Заявитель',
    'taxpayer': 'Налогоплательщик',
    'party role': 'Роль для визуализации валидаций',
    'partytaxresidencehistory': 'История изменения страны налогового резидентства',
    'partytaxresidencies': 'Периоды налогового резидентства',
    'residencecountry': 'Страна пребывания',
    'startdate': 'Срок пребывания, с',
    'enddate': 'Срок пребывания, по',
    'dayscount': 'Количество дней',
    'natural person': 'Физ. лицо',
    'legal entity': 'Юр. лицо',
    'haswebsite': 'Официальный сайт',
    'websiteaddress': 'Адрес сайта',
    'clear': 'Очистить',
    'search': 'Поиск',
    'soleproprietorhistory': 'Сведения об индивидуальном предпринимателе',
    'ogrnip': 'ОГРН/ОГРНИП',
    'taxResidenceCountryShortName': 'Страна налогового резиденства',
    'registrationCountryCountryShortName': 'Страна регистрации',
    'longTerm': 'Долгосрочный',
    'shortTerm': 'Краткосрочный',
    'soleProprietor': 'Индивидуальный предприниматель',
    'privatePracticeAccordingToLaw': 'Физическое лицо, занимающееся в установленном законодательством российской федерации порядке частной практикой',
    'Female': ':Женский',
    'Male': 'Мужской',
    'false': 'Нет',
    'true': 'Да',
    '/policyHolder': 'Страхователь',
    '/insuredPerson': 'Застрахованное лицо',
    '/agentNaturalPerson': 'Агент',
    '/policyHolderLegalEntity': 'Страхователь',
    '/insuredPersonLegalEntity': 'Застрахованный',
    '/agentLegalEntity': 'Агент',
    '/applicantNaturalPerson': 'Заявитель',
    '/taxPayer': 'Налогоплательщик',
    '/beneficiaryOwner': 'Бенефициарный владелец'
};

function excludeBothEmptyValues(partyHistoryDifferences) {

    return partyHistoryDifferences.filter(i => {

        let hasNewValue = false;
        let hasOldValue = false;

        if (i?.newValue !== undefined) {
            if (typeof i?.newValue == 'object' && ObjectUtils.checkObjectHasValues(i?.newValue)) {
                hasNewValue = true;
            } else if (typeof i?.newValue == 'object' && !ObjectUtils.checkObjectHasValues(i?.newValue)) {
                hasNewValue = false;
            } else {
                hasNewValue = true;
            }
        }

        if (i?.oldValue !== undefined) {
            if (typeof i?.oldValue == 'object' && ObjectUtils.checkObjectHasValues(i?.oldValue)) {
                hasOldValue = true;
            } else if (typeof i?.oldValue == 'object' && !ObjectUtils.checkObjectHasValues(i?.oldValue)) {
                hasOldValue = false;
            } else {
                hasOldValue = true;
            }
        }

        if (hasNewValue || hasOldValue) {
            return i;
        }

    });
}

function translateBooleanValues(partyHistoryDifferences) {

    return partyHistoryDifferences.filter(i => {

        if (typeof i?.newValue === 'boolean') {
            i.newValue = i?.newValue ? yes : no;
        }

        if (typeof i?.oldValue === 'boolean') {
            i.oldValue = i?.oldValue ? yes : no;
        }

        return i;
    });
}

function formatDate(partyHistoryDifferences) {

    return partyHistoryDifferences.map(i => {

        const attributesToFormat = [
            "dateOfBirth", "dateOfStateRegistration", "dateOfRecordingTermination",
            "dateOfIssueOfLicense", "lastUpdateDate", "issueDate", "expireDate",
            "actualFrom", "actualTo", "openingDate", "closingDate"
        ];

        if (attributesToFormat.includes(i.attribute)) {
            return {
                ...i,
                newValue: isDateCheckAndFormat(i.newValue),
                oldValue: isDateCheckAndFormat(i.oldValue)
            };
        }
        return {
            ...i
        };

    });
}

function removePartyHistoryPath(partyHistoryDifferences) {

    return partyHistoryDifferences.map(i => {
        if (i.path) {
            delete i.path;
        }

        return i;
    });
}

function sortPartyHistoryBySysUpdatedOn(partyHistory) {
    return partyHistory.sort((a, b) => new Date(a.sysUpdatedOn) - new Date(b.sysUpdatedOn));
}

function sortPartyHistoryDifferencesBySysUpdatedOn(partyHistory) {
    return partyHistory.sort((a, b) => new Date(b.sysUpdatedOn) - new Date(a.sysUpdatedOn));
}

function packValueToArrayForUI(partyHistoryDifferences) {

    return partyHistoryDifferences.map(i => {
        return {
            ...i,
            oldValue: Array.isArray(i.oldValue) ? i.oldValue : [i.oldValue],
            newValue: Array.isArray(i.newValue) ? i.newValue : [i.newValue]
        };
    });
}

function isDateCheckAndFormat(attribute) {

    const excludeNumbers = true;
    const excludeDotInString = true;

    if (DateTimeUtils.isDate(attribute, excludeNumbers, excludeDotInString)) {
        return DateTimeUtils.formatDate(new Date(attribute), DateTimeUtils.DateFormats.CALENDAR);
    }
    return attribute;

}

function capitalizedFirstLetter(attribute) {
    return attribute?.charAt(0)?.toUpperCase() + attribute?.slice(1);
}

function hasDifferencesInArrays(arr1, arr2) {

    if (!arr1) {
        arr1 = [];
    }

    if (!arr2) {
        arr2 = [];
    }

    if (Array.isArray(arr1) || Array.isArray(arr2)) {

        let searchCycle = arr1.length;
        if (arr1.length < arr2.length) {
            searchCycle = arr2.length;
        }

        let hasDifference = false;

        for (let i = 0; i < searchCycle; i++) {
            const obj1 = arr1[i];
            const obj2 = arr2[i];

            const allKeys = new Set([...Object.keys(obj1 ?? {}), ...Object.keys(obj2 ?? {})]);

            for (const key of allKeys) {
                if (!obj1 || !obj2) {
                    hasDifference = true;
                } else if ((typeof obj1[key] === 'object' || typeof obj2[key] === 'object') && !ObjectUtils.objectComparison(obj1[key], obj2[key])) {
                    hasDifference = true;
                } else if ((typeof obj1[key] !== 'object' && typeof obj2[key] !== 'object') && obj1[key] !== obj2[key]) {
                    hasDifference = true;
                }
            }

        }

        return hasDifference;
    }
}

function comparePartyAddresses(arr1, arr2, mainObjKey, differences, sysUpdatedOn, sysUpdatedByUserName) {

    const hasDifference = hasDifferencesInArrays(arr1, arr2);

    if (hasDifference) {

        const mapAttributesToString1 = getPartyAddressesString(arr1 ?? []);
        const mapAttributesToString2 = getPartyAddressesString(arr2 ?? []);

        differences.push({
            attribute: capitalizedFirstLetter(mainObjKey),
            oldValue: mapAttributesToString1,
            newValue: mapAttributesToString2,
            sysUpdatedOn,
            sysUpdatedByUserName,
            path: mainObjKey
        });
    }

}

function getPartyAddressesString(arr) {

    return arr.map((entry, index) => {

        const addressTypeCode = entry?.addressType?.addressTypeCode ?? empty;
        const addressTypeDesc = entry?.addressType?.addressTypeDesc ?? empty;

        const isRegistrationAddress = addressTypeCode == addressTypeLikeInUI.registration;

        const isManualAddress = entry?.isManualAddress;
        const manualAddress = isManualAddress ? yes : no;

        const isSameAsRegistration = entry?.isSameAsRegistration;
        const sameAsRegistration = isSameAsRegistration ? yes : no;

        const isForeignAddress = entry?.isForeignAddress;
        const foreignAddress = isForeignAddress ? yes : no;

        const fullAddress = entry?.fullAddress?.value ?? empty;

        const country = entry?.country ?? empty;
        const region = entry?.region ?? empty;
        const area = entry?.area ?? empty;
        const city = entry?.city ?? empty;
        const settlement = entry?.settlement ?? empty;
        const street = entry?.street ?? empty;
        const house = entry?.house ?? empty;
        const houseExtension = entry?.houseExtension ?? empty;
        const postalCode = entry?.postalCode ?? empty;
        const flat = entry?.flat ?? empty;
        const comment = entry?.comment ?? empty;
        const actualFrom = entry?.actualFrom ? DateTimeUtils.formatDate(new Date(entry.actualFrom), DateTimeUtils.DateFormats.CALENDAR) : empty;
        const actualTo = entry?.actualTo ? DateTimeUtils.formatDate(new Date(entry.actualTo), DateTimeUtils.DateFormats.CALENDAR) : empty;

        let string = `   ${index + 1}. Тип адреса: ${addressTypeDesc}.
        Ввод адреса вручную: ${manualAddress}.
        Иностранный адрес: ${foreignAddress}.
        Адрес целиком: ${fullAddress}.
        Комментарии: ${comment}.
        Актуален С: ${actualFrom}.
        Актуален По: ${actualTo}.
        `;

        if (!isRegistrationAddress) {
            string += `Совпадает с адресом регистрации: ${sameAsRegistration}.
        `;
        }

        if (!isForeignAddress && !isManualAddress) {
            string += `Индекс: ${postalCode}.
        Страна: ${country}.
        Субъект РФ: ${region}.
        Район: ${area}.
        Город: ${city}.
        Населенный пункт: ${settlement}.
        Улица: ${street}.
        Дом: ${house}.
        Расширение дома: ${houseExtension}.
        Квартира (офис): ${flat}.
        `;
        }

        return string;

    }).join('\n');
}

function comparePartyDocuments(arr1, arr2, mainObjKey, differences, sysUpdatedOn, sysUpdatedByUserName) {

    const hasDifference = hasDifferencesInArrays(arr1, arr2);

    if (hasDifference) {

        const mapAttributesToString1 = getPartyDocumentsString(arr1 ?? []);
        const mapAttributesToString2 = getPartyDocumentsString(arr2 ?? []);

        differences.push({
            attribute: capitalizedFirstLetter(mainObjKey),
            oldValue: mapAttributesToString1,
            newValue: mapAttributesToString2,
            sysUpdatedOn,
            sysUpdatedByUserName,
            path: mainObjKey
        });
    }

}

function getPartyDocumentsString(arr) {

    return arr.map((entry, index) => {

        const docTypeCode = entry?.docType?.docTypeCode ?? empty;
        const docTypeDesc = entry?.docType?.docTypeDesc ?? empty;
        const isOtherDocument = docTypeCode == 'otherDocument';

        const docSeries = entry?.docSeries ?? empty;
        const docNumber = entry?.docNumber ?? empty;
        const issueDate = entry?.issueDate ? DateTimeUtils.formatDate(new Date(entry.issueDate), DateTimeUtils.DateFormats.CALENDAR) : empty;
        const expireDate = entry?.expireDate ? DateTimeUtils.formatDate(new Date(entry.expireDate), DateTimeUtils.DateFormats.CALENDAR) : empty;
        const issuerName = entry?.issuerName ?? empty;
        const issuerCode = entry?.issuerCode ?? empty;
        const otherDocTypeDesc = entry?.otherDocTypeDesc ?? empty;

        let string = `   ${index + 1}. Тип: ${docTypeDesc}.
        Серия: ${docSeries}.
        Номер: ${docNumber}.
        Дата выдачи: ${issueDate}.
        Дата окончания срока действия: ${expireDate}.
        Кем выдан: ${issuerName}.
        Код подразделения: ${issuerCode}.
        `;

        if (isOtherDocument) {
            string += `Наименование иного вида документа: ${otherDocTypeDesc}.`;
        }

        return string;

    }).join('\n');
}

function comparePartyPhones(arr1, arr2, mainObjKey, differences, sysUpdatedOn, sysUpdatedByUserName) {

    const hasDifference = hasDifferencesInArrays(arr1, arr2);

    if (hasDifference) {

        const mapAttributesToString1 = getPartyPhonesString(arr1 ?? []);
        const mapAttributesToString2 = getPartyPhonesString(arr2 ?? []);

        differences.push({
            attribute: capitalizedFirstLetter(mainObjKey),
            oldValue: mapAttributesToString1,
            newValue: mapAttributesToString2,
            sysUpdatedOn,
            sysUpdatedByUserName,
            path: mainObjKey
        });
    }

}

function getPartyPhonesString(arr) {

    return arr.map((entry, index) => {

        const phoneTypeDesc = entry?.phoneType?.phoneTypeDesc ?? empty;

        const countryPhoneCode = entry?.countryCode?.countryPhoneCode ?? empty;
        const countryShortName = entry?.countryCode?.countryShortName ?? empty;

        const fullNumber = entry?.fullNumber ?? empty;
        const fullNumberFormatted = entry?.fullNumberFormatted ?? empty;
        const isAdditional = entry?.isAdditional ? yes : no;
        const isForNewsletters = entry?.isForNewsletters ? yes : no;
        const isNonActual = entry?.isNonActual ? yes : no;
        const isPreferable = entry?.isPreferable ? yes : no;

        const comments = entry?.comments ?? empty;

        const string = `   ${index + 1}. Тип: ${phoneTypeDesc}.
        Код страны: ${countryPhoneCode} (${countryShortName}).
        Полный номер (ручной ввод): ${fullNumber}.
        Полный номер (отформатированный): ${fullNumberFormatted}.
        Предпочтительно: ${isPreferable}.
        Дополнительный: ${isAdditional}.
        Неактуальный: ${isNonActual}.
        Для информационной рассылки: ${isForNewsletters}.
        Примечание: ${comments}.
        `;

        return string;

    }).join('\n');
}

function comparePartyEmails(arr1, arr2, mainObjKey, differences, sysUpdatedOn, sysUpdatedByUserName) {

    const hasDifference = hasDifferencesInArrays(arr1, arr2);

    if (hasDifference) {

        const mapAttributesToString1 = getPartyEmailsString(arr1 ?? []);
        const mapAttributesToString2 = getPartyEmailsString(arr2 ?? []);

        differences.push({
            attribute: capitalizedFirstLetter(mainObjKey),
            oldValue: mapAttributesToString1,
            newValue: mapAttributesToString2,
            sysUpdatedOn,
            sysUpdatedByUserName,
            path: mainObjKey
        });
    }

}

function getPartyEmailsString(arr) {

    return arr.map((entry, index) => {

        const email = entry?.email ?? empty;
        const isForNewsletters = entry?.isForNewsletters ? yes : no;
        const isPreferable = entry?.isPreferable ? yes : no;

        const string = `   ${index + 1}. E-mail: ${email}.
        Предпочтительно: ${isPreferable}.
        Для информационной рассылки: ${isForNewsletters}.
        `;

        return string;

    }).join('\n');
}

function comparePartyBankAccounts(arr1, arr2, mainObjKey, differences, sysUpdatedOn, sysUpdatedByUserName) {

    const hasDifference = hasDifferencesInArrays(arr1, arr2);

    if (hasDifference) {

        const mapAttributesToString1 = getPartyBankAccountsString(arr1 ?? []);
        const mapAttributesToString2 = getPartyBankAccountsString(arr2 ?? []);

        differences.push({
            attribute: capitalizedFirstLetter(mainObjKey),
            oldValue: mapAttributesToString1,
            newValue: mapAttributesToString2,
            sysUpdatedOn,
            sysUpdatedByUserName,
            path: mainObjKey
        });
    }

}

function getPartyBankAccountsString(arr) {

    return arr.map((entry, index) => {

        const bankBic = entry?.bankBic ?? empty;
        const bankName = entry?.bankName ?? empty;
        const bankCorrespondentAccount = entry?.bankCorrespondentAccount ?? empty;
        const bankInn = entry?.bankInn ?? empty;
        const foreignBank = entry?.foreignBank ? yes : no;
        const currencyDesc = entry?.currency?.currencyDesc ?? empty;
        const currencyCode = entry?.currency?.currencyCode ?? empty;
        const number = entry?.number ?? empty;
        const openingDate = entry?.openingDate ? DateTimeUtils.formatDate(new Date(entry.openingDate), DateTimeUtils.DateFormats.CALENDAR) : empty;
        const closingDate = entry?.closingDate ? DateTimeUtils.formatDate(new Date(entry.closingDate), DateTimeUtils.DateFormats.CALENDAR) : empty;
        const SWIFT = entry?.SWIFT ?? empty;
        const IBAN = entry?.IBAN ?? empty;

        const string = `   ${index + 1}. Банк: ${bankName}.
        Валюта: ${currencyDesc} (${currencyCode}).
        Номер счета: ${number}.
        Дата открытия: ${openingDate}.
        Дата закрытия: ${closingDate}.
        БИК: ${bankBic}.
        Корр. счет: ${bankCorrespondentAccount}.
        ИНН: ${bankInn}.
        Иностранный банк: ${foreignBank}.
        SWIFT: ${SWIFT}.
        IBAN: ${IBAN}.
        `;

        return string;

    }).join('\n');
}

function getPartyPersonDataAttributes(obj, mainObjKey) {

    // Simple attributes
    const executivePersonDesc = obj?.executivePerson?.executivePersonDesc;
    const isPublicOfficial = obj?.isPublicOfficial;
    const lastName = obj?.lastName;
    const firstName = obj?.firstName;
    const middleName = obj?.middleName;
    const personGender = obj?.personGender;
    const dateOfBirth = obj?.dateOfBirth;
    const birthPlace = obj?.birthPlace;
    const countryShortName = obj?.countryPlace?.countryShortName;
    const SNILS = obj?.SNILS;
    const segmentDesc = obj?.segment?.segmentDesc;
    const naturalPersonCategory = obj?.naturalPersonCategory;
    const hasWebsite = obj?.site?.hasWebsite;
    const websiteAddress = obj?.site?.websiteAddress;
    const hasLicenses = obj?.partyLicensesAdditionalInfo?.hasLicenses;
    const isStatelessPerson = obj?.isStatelessPerson;

    // Arrays
    const citizenship = obj?.citizenship;
    const soleProprietorHistory = obj?.soleProprietorHistory;
    const partyLicenses = obj?.partyLicenses;

    const attributes = {
        executivePersonDesc,
        isPublicOfficial,
        lastName,
        firstName,
        middleName,
        personGender,
        dateOfBirth,
        birthPlace,
        countryShortName,
        SNILS,
        segmentDesc,
        naturalPersonCategory,
        hasWebsite,
        websiteAddress,
        hasLicenses,
        isStatelessPerson
    };

    const paths = [];
    for (const [key, value] of Object.entries(attributes)) {
        findAttributePath(obj, key, value, mainObjKey, paths);
    }

    const arrays = {
        citizenship,
        soleProprietorHistory,
        partyLicenses
    };

    const arraysPaths = [];
    for (const [key, value] of Object.entries(arrays)) {
        findAttributePath(obj, key, value, mainObjKey, paths);
    }

    return {
        attributes,
        paths,
        arrays,
        arraysPaths,
    };

}

function getPartyGeneralDataAttributes(obj, mainObjKey) {

    const isNonResident = obj?.isNonResident;
    const registrationCountryCountryShortName = obj?.registrationCountry?.countryShortName;
    const taxResidenceCountryShortName = obj?.taxResidence?.countryShortName;
    const riskEstimation = obj?.riskEstimation;
    const beneficiaryOwnerDesc = obj?.beneficiaryOwner?.beneficiaryOwnerDesc;
    const relationGoal = obj?.relationGoal;
    const suggestedRelationType = obj?.suggestedRelationType;
    const financialState = obj?.financialState;
    const businessReputation = obj?.businessReputation;
    const goalOfFinancialActivityDesc = obj?.goalOfFinancialActivity?.goalOfFinancialActivityDesc;
    const descriptionForGoalOfFinancialActivity = obj?.descriptionForGoalOfFinancialActivity;
    const incomeSourceDesc = obj?.incomeSource?.incomeSourceDesc;
    const descriptionForIncomeSource = obj?.descriptionForIncomeSource;
    const INNKIO = obj?.INNKIO;
    const tradingPartnerCode = obj?.tradingPartnerCode;
    const TIN = obj?.TIN;
    const noTIN = obj?.noTIN;
    const nonResidentCode = obj?.nonResidentCode;
    const TINAbsenceReason = obj?.TINAbsenceReason;
    const isPodFt = obj?.isPodFt;
    const OKPO = obj?.OKPO;
    const OKVED = obj?.OKVED;
    const lastUpdateDate = obj?.lastUpdateDate;

    const attributes = {
        isNonResident,
        registrationCountryCountryShortName,
        taxResidenceCountryShortName,
        riskEstimation,
        beneficiaryOwnerDesc,
        relationGoal,
        suggestedRelationType,
        financialState,
        businessReputation,
        goalOfFinancialActivityDesc,
        descriptionForGoalOfFinancialActivity,
        incomeSourceDesc,
        descriptionForIncomeSource,
        INNKIO,
        tradingPartnerCode,
        TIN,
        noTIN,
        nonResidentCode,
        TINAbsenceReason,
        lastUpdateDate,
        isPodFt,
        OKPO,
        OKVED
    };

    const paths = [];

    for (const [key, value] of Object.entries(attributes)) {
        findAttributePath(obj, key, value, mainObjKey, paths);
    }

    const arrays = {};
    const arraysPaths = [];
    for (const [key, value] of Object.entries(arrays)) {
        findAttributePath(obj, key, value, mainObjKey, paths);
    }

    return {
        attributes,
        paths,
        arrays,
        arraysPaths,
    };

}

function getPartyCRSAttributes(obj, mainObjKey) {

    const statusCheckDate = obj?.statusCheckDate;

    const attributes = {
        statusCheckDate
    };

    const paths = [];

    for (const [key, value] of Object.entries(attributes)) {
        findAttributePath(obj, key, value, mainObjKey, paths);
    }

    const arrays = {};
    const arraysPaths = [];
    for (const [key, value] of Object.entries(arrays)) {
        findAttributePath(obj, key, value, mainObjKey, paths);
    }

    return {
        attributes,
        paths,
        arrays,
        arraysPaths,
    };

}

function getPartyEmailsAdditionalInfoAttributes(obj, mainObjKey) {

    const noEmail = obj?.noEmail;

    const attributes = {
        noEmail
    };

    const paths = [];

    for (const [key, value] of Object.entries(attributes)) {
        findAttributePath(obj, key, value, mainObjKey, paths);
    }

    const arrays = {};
    const arraysPaths = [];
    for (const [key, value] of Object.entries(arrays)) {
        findAttributePath(obj, key, value, mainObjKey, paths);
    }

    return {
        attributes,
        paths,
        arrays,
        arraysPaths,
    };

}

function compareAttributes(obj1, obj2, differences, sysUpdatedOn, sysUpdatedByUserName) {

    for (const key in obj1.attributes) {

        if (obj1.attributes[key] !== obj2.attributes[key]) {

            const path = obj1.paths.find(i => i[key]) ?? obj2.paths.find(i => i[key]);
            const pathByKey = path && path[key] ? path[key] : empty;

            differences.push({
                attribute: key,
                oldValue: obj1.attributes[key],
                newValue: obj2.attributes[key],
                sysUpdatedOn,
                sysUpdatedByUserName,
                path: pathByKey
            });
        }
    }
}

function findAttributePath(obj, attributeName, attributeValue, mainObjKey, paths) {

    function search(current, currentPath) {

        if (typeof current === 'object' && current !== null) {

            if (Object.prototype.hasOwnProperty.call(current, attributeName) && current[attributeName] === attributeValue) {
                paths.push({ [attributeName]: [mainObjKey, ...currentPath, attributeName].join('.') });
            }

            for (const key in current) {
                if (Object.prototype.hasOwnProperty.call(current, key)) {
                    search(current[key], [...currentPath, key]);
                }
            }
        }
    }

    search(obj, []);
}

function compareCitizenship(arr1, arr2, mainObjKey, differences, sysUpdatedOn, sysUpdatedByUserName) {

    const hasDifference = hasDifferencesInArrays(arr1, arr2);

    if (hasDifference) {

        const mapAttributesToString1 = getCitizenshipString(arr1 ?? []);
        const mapAttributesToString2 = getCitizenshipString(arr2 ?? []);

        differences.push({
            attribute: capitalizedFirstLetter(mainObjKey),
            oldValue: mapAttributesToString1,
            newValue: mapAttributesToString2,
            sysUpdatedOn,
            sysUpdatedByUserName,
            path: mainObjKey
        });
    }

}

function getCitizenshipString(arr) {

    return arr.map((entry, index) => {
        const countryShortName = entry?.countryShortName ?? empty;
        const string = `${index + 1}. Гражданство: ${countryShortName}.`;

        return string;

    }).join('\n');
}

function compareSoleProprietorHistory(arr1, arr2, mainObjKey, differences, sysUpdatedOn, sysUpdatedByUserName) {

    const hasDifference = hasDifferencesInArrays(arr1, arr2);

    if (hasDifference) {

        const mapAttributesToString1 = getSoleProprietorHistoryString(arr1 ?? []);
        const mapAttributesToString2 = getSoleProprietorHistoryString(arr2 ?? []);

        differences.push({
            attribute: capitalizedFirstLetter(mainObjKey),
            oldValue: mapAttributesToString1,
            newValue: mapAttributesToString2,
            sysUpdatedOn,
            sysUpdatedByUserName,
            path: mainObjKey
        });
    }

}

function getSoleProprietorHistoryString(arr) {

    return arr.map((entry, index) => {

        const OGRNOGRNIP = entry?.partyOGRN.OGRNOGRNIP ?? empty;
        const dateOfStateRegistration = entry?.partyOGRN.dateOfStateRegistration ? DateTimeUtils.formatDate(new Date(entry.partyOGRN.dateOfStateRegistration), DateTimeUtils.DateFormats.CALENDAR) : empty;
        const dateOfRecordingTermination = entry?.partyOGRN.dateOfRecordingTermination ? DateTimeUtils.formatDate(new Date(entry.partyOGRN.dateOfRecordingTermination), DateTimeUtils.DateFormats.CALENDAR) : empty;

        const string = `    ${index + 1}. ОГРН/ОГРНИП: ${OGRNOGRNIP}.
        Дата государственной регистрации: ${dateOfStateRegistration}.
        Дата внесения записи о прекращении деятельности: ${dateOfRecordingTermination}.
        `;

        return string;

    }).join('\n');
}

function comparePartyLicenses(arr1, arr2, mainObjKey, differences, sysUpdatedOn, sysUpdatedByUserName) {

    const hasDifference = hasDifferencesInArrays(arr1, arr2);

    if (hasDifference) {

        const mapAttributesToString1 = getPartyLicensesString(arr1 ?? []);
        const mapAttributesToString2 = getPartyLicensesString(arr2 ?? []);

        differences.push({
            attribute: capitalizedFirstLetter(mainObjKey),
            oldValue: mapAttributesToString1,
            newValue: mapAttributesToString2,
            sysUpdatedOn,
            sysUpdatedByUserName,
            path: mainObjKey
        });
    }

}

function getPartyLicensesString(arr) {

    return arr.map((entry, index) => {

        const licenseNumber = entry?.licenseNumber ?? empty;
        const licensingAuthority = entry?.licensingAuthority ?? empty;
        const dateOfIssueOfLicense = entry?.dateOfIssueOfLicense ? DateTimeUtils.formatDate(new Date(entry.dateOfIssueOfLicense), DateTimeUtils.DateFormats.CALENDAR) : empty;

        const string = `    ${index + 1}. Номер лицензии/разрешения: ${licenseNumber}.
        Наименование органа, выдавшего лицензию (разрешение): ${licensingAuthority}.
        Дата выдачи лицензии (разрешения): ${dateOfIssueOfLicense}.
        `;

        return string;

    }).join('\n');
}

module.exports = {
    historyMapping,
    translations
};
