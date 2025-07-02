
/* eslint-disable */
/**
 * Additional services configuration (opt)
 *
 * @param  {object} input Expected input properties: serviceCode, productCode, issueDate
 */
module.exports = function additionalServicesConfiguration({
    serviceCode,
    productCode,
    issueDate
}) {
    if(serviceCode == "EDU5" && (issueDate >= "2024-02-10" && issueDate <= "2099-12-31")) {
        if(productCode == "CAPCLCHILDBOXOAS") {
            return {serviceName: "Правовая консультация", minSumPrem: 80000, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "6 раз в течение полисного года", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "EDU", serviceType: "Образовательные сервисы", serviceSubTypeCode: "4002", serviceSubType: "Программы образования", serviceAgreement: "ООО «Мобильная помощь онлайн»", serviceStartDate: "2024-02-10", serviceEndDate: undefined};
        }
        if(productCode == "CAPCLCHILDOAS") {
            return {serviceName: "Правовая консультация", minSumPrem: 80000, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "6 раз в течение полисного года", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "EDU", serviceType: "Образовательные сервисы", serviceSubTypeCode: "4002", serviceSubType: "Программы образования", serviceAgreement: "ООО «Мобильная помощь онлайн»", serviceStartDate: "2024-02-10", serviceEndDate: undefined};
        }
    }
    if((issueDate >= "2024-02-10" && issueDate <= "2099-12-31")) {
        if(serviceCode == "EDU5") {
            return {serviceName: "Правовая консультация", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "6 раз в течение полисного года", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "EDU", serviceType: "Образовательные сервисы", serviceSubTypeCode: "4002", serviceSubType: "Программы образования", serviceAgreement: "ООО «Мобильная помощь онлайн»", serviceStartDate: "2024-02-10", serviceEndDate: undefined};
        }
        if(serviceCode == "EDU6") {
            if(productCode == "CAPCLCHILDBOXOAS") {
                return {serviceName: "Профориентация", minSumPrem: 80000, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "1 раз в течение полисного года", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "EDU", serviceType: "Образовательные сервисы", serviceSubTypeCode: "4002", serviceSubType: "Программы образования", serviceAgreement: "ООО «Мобильная помощь онлайн»", serviceStartDate: "2024-02-10", serviceEndDate: undefined};
            }
            if(productCode == "CAPCLCHILDOAS") {
                return {serviceName: "Профориентация", minSumPrem: 80000, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "1 раз в течение полисного года", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "EDU", serviceType: "Образовательные сервисы", serviceSubTypeCode: "4002", serviceSubType: "Программы образования", serviceAgreement: "ООО «Мобильная помощь онлайн»", serviceStartDate: "2024-02-10", serviceEndDate: undefined};
            }
        }
    }
    if((issueDate >= "2024-02-10" && issueDate <= "2099-12-31")) {
        if(serviceCode == "EDU6") {
            return {serviceName: "Профориентация", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "1 раз в течение полисного года", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "EDU", serviceType: "Образовательные сервисы", serviceSubTypeCode: "4002", serviceSubType: "Программы образования", serviceAgreement: "ООО «Мобильная помощь онлайн»", serviceStartDate: "2024-02-10", serviceEndDate: undefined};
        }
        if(serviceCode == "EDU7") {
            if(productCode == "CAPCLCHILDBOXOAS") {
                return {serviceName: "Консультация тьютора", minSumPrem: 80000, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "3 раза в течение полисного года", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "EDU", serviceType: "Образовательные сервисы", serviceSubTypeCode: "4002", serviceSubType: "Программы образования", serviceAgreement: "ООО «Мобильная помощь онлайн»", serviceStartDate: "2024-02-10", serviceEndDate: undefined};
            }
            if(productCode == "CAPCLCHILDOAS") {
                return {serviceName: "Консультация тьютора", minSumPrem: 80000, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "3 раза в течение полисного года", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "EDU", serviceType: "Образовательные сервисы", serviceSubTypeCode: "4002", serviceSubType: "Программы образования", serviceAgreement: "ООО «Мобильная помощь онлайн»", serviceStartDate: "2024-02-10", serviceEndDate: undefined};
            }
        }
    }
    if((issueDate >= "2024-02-10" && issueDate <= "2099-12-31")) {
        if(serviceCode == "EDU7") {
            return {serviceName: "Консультация тьютора", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "3 раза в течение полисного года", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "EDU", serviceType: "Образовательные сервисы", serviceSubTypeCode: "4002", serviceSubType: "Программы образования", serviceAgreement: "ООО «Мобильная помощь онлайн»", serviceStartDate: "2024-02-10", serviceEndDate: undefined};
        }
        if(serviceCode == "EDU8") {
            if(productCode == "CAPCLCHILDBOXOAS") {
                return {serviceName: "Прочее по Образовательному Консьержу", minSumPrem: 80000, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "Без ограничений", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "EDU", serviceType: "Образовательные сервисы", serviceSubTypeCode: "4002", serviceSubType: "Программы образования", serviceAgreement: "ООО «Мобильная помощь онлайн»", serviceStartDate: "2024-02-10", serviceEndDate: undefined};
            }
            if(productCode == "CAPCLCHILDOAS") {
                return {serviceName: "Прочее по Образовательному Консьержу", minSumPrem: 80000, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "Без ограничений", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "EDU", serviceType: "Образовательные сервисы", serviceSubTypeCode: "4002", serviceSubType: "Программы образования", serviceAgreement: "ООО «Мобильная помощь онлайн»", serviceStartDate: "2024-02-10", serviceEndDate: undefined};
            }
        }
    }
    if(serviceCode == "EDU8" && (issueDate >= "2024-02-10" && issueDate <= "2099-12-31")) {
        return {serviceName: "Прочее по Образовательному Консьержу", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "Без ограничений", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "EDU", serviceType: "Образовательные сервисы", serviceSubTypeCode: "4002", serviceSubType: "Программы образования", serviceAgreement: "ООО «Мобильная помощь онлайн»", serviceStartDate: "2024-02-10", serviceEndDate: undefined};
    }
    if(serviceCode == "EduConcierge" && (issueDate >= "2021-06-05" && issueDate <= "2099-12-31")) {
        return {serviceName: "Детский консьерж", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "Ежегодно", specialConditions: "При условии что размер взносов по договору составляет от 80 000 ₽ (суммарно) в год", requiredRisks: [], serviceTypeCode: "EDU", serviceType: "Образовательные сервисы", serviceSubTypeCode: "4001", serviceSubType: "Программы образования", serviceAgreement: "ООО «Мобильная помощь онлайн»", serviceStartDate: "2021-06-05", serviceEndDate: undefined};
    }
    if(serviceCode == "EduConcierge2" && productCode == "CAPCLCHILDOAS" && (issueDate >= "2023-02-01" && issueDate <= "2099-12-31")) {
        return {serviceName: "Образовательный консьерж", minSumPrem: 80000, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "Ежегодно", specialConditions: "При условии что размер взносов по договору составляет от 80 000 ₽ (суммарно) в год", requiredRisks: [], serviceTypeCode: "EDU", serviceType: "Образовательные сервисы", serviceSubTypeCode: "4002", serviceSubType: "Программы образования", serviceAgreement: "ООО «Мобильная помощь онлайн»", serviceStartDate: "2023-02-01", serviceEndDate: undefined};
    }
    if((issueDate >= "2023-02-01" && issueDate <= "2099-12-31")) {
        if(serviceCode == "EduConcierge2") {
            return {serviceName: "Образовательный консьерж", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "Ежегодно", specialConditions: "При условии что размер взносов по договору составляет от 80 000 ₽ (суммарно) в год", requiredRisks: [], serviceTypeCode: "EDU", serviceType: "Образовательные сервисы", serviceSubTypeCode: "4002", serviceSubType: "Программы образования", serviceAgreement: "ООО «Мобильная помощь онлайн»", serviceStartDate: "2023-02-01", serviceEndDate: undefined};
        }
        if(serviceCode == "EduConcierge3") {
            return {serviceName: "Здоровье и спорт", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "Ежегодно", specialConditions: "При условии что размер взносов по договору составляет от 80 000 ₽ (суммарно) в год", requiredRisks: [], serviceTypeCode: "EDU", serviceType: "Образовательные сервисы", serviceSubTypeCode: "3002", serviceSubType: "Программы образования", serviceAgreement: "ООО «Мобильная помощь онлайн»", serviceStartDate: "2023-02-01", serviceEndDate: undefined};
        }
    }
    if((issueDate >= "2022-09-01" && issueDate <= "2099-12-31")) {
        if(serviceCode == "FIN2") {
            return {serviceName: "Персональное финансовое планирование", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "Без ограничений", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "FIN", serviceType: "Финансовые сервисы", serviceSubTypeCode: "5001", serviceSubType: "Сервисы Финансовой поддержки", serviceAgreement: "ООО «Масару Инвестиции»", serviceStartDate: "2022-09-01", serviceEndDate: undefined};
        }
        if(serviceCode == "FIN3") {
            return {serviceName: "Персональное финасовое планирование_ПФП", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "Без ограничений", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "FIN", serviceType: "Финансовые сервисы", serviceSubTypeCode: "5001", serviceSubType: "Сервисы Финансовой поддержки", serviceAgreement: "ООО «Масару Инвестиции»", serviceStartDate: "2022-09-01", serviceEndDate: undefined};
        }
    }
    if(serviceCode == "FIN4") {
        if((issueDate >= "2024-09-30" && issueDate <= "2099-12-31")) {
            if(productCode == "EBMGNVTB") {
                return {serviceName: "Финансовый чекап", minSumPrem: 500000, groupCode: "000009", groupName: "Финансовый чекап", startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "1 раз в первый год прикрепления", specialConditions: "При условии, что достигнут размер взноса, необходимый для подключения сервиса", requiredRisks: [], serviceTypeCode: "FIN", serviceType: "Финансовые сервисы", serviceSubTypeCode: "5001", serviceSubType: "Сервисы Финансовой поддержки", serviceAgreement: "ООО «Масару Инвестиции»", serviceStartDate: "2024-09-30", serviceEndDate: undefined};
            }
            if(productCode == "EBMGVTB") {
                return {serviceName: "Финансовый чекап", minSumPrem: 500000, groupCode: "000009", groupName: "Финансовый чекап", startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "1 раз в первый год прикрепления", specialConditions: "При условии, что достигнут размер взноса, необходимый для подключения сервиса", requiredRisks: [], serviceTypeCode: "FIN", serviceType: "Финансовые сервисы", serviceSubTypeCode: "5001", serviceSubType: "Сервисы Финансовой поддержки", serviceAgreement: "ООО «Масару Инвестиции»", serviceStartDate: "2024-09-30", serviceEndDate: undefined};
            }
        }
        if((issueDate >= "2022-10-27" && issueDate <= "2099-12-31")) {
            return {serviceName: "Финансовый чекап", minSumPrem: undefined, groupCode: "000009", groupName: "Финансовый чекап", startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "1 раз в первый год прикрепления", specialConditions: "При условии, что достигнут размер взноса, необходимый для подключения сервиса", requiredRisks: [], serviceTypeCode: "FIN", serviceType: "Финансовые сервисы", serviceSubTypeCode: "5001", serviceSubType: "Сервисы Финансовой поддержки", serviceAgreement: "ООО «Масару Инвестиции»", serviceStartDate: "2022-10-27", serviceEndDate: undefined};
        }
    }
    if(serviceCode == "FIN5") {
        if((issueDate >= "2025-04-25" && issueDate <= "2099-12-31")) {
            if(productCode == "EBMGP") {
                return {serviceName: "Финансовый навигатор", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "1 раз в течение срока страхования по договору", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "FIN", serviceType: "Финансовые сервисы", serviceSubTypeCode: "5001", serviceSubType: "Сервисы Финансовой поддержки", serviceAgreement: "ООО «СКТ»", serviceStartDate: "2025-02-15", serviceEndDate: undefined};
            }
            if(productCode == "IDGP3") {
                return {serviceName: "Финансовый навигатор", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "1 раз в течение срока страхования по договору", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "FIN", serviceType: "Финансовые сервисы", serviceSubTypeCode: "5001", serviceSubType: "Сервисы Финансовой поддержки", serviceAgreement: "ООО «СКТ»", serviceStartDate: "2025-02-15", serviceEndDate: undefined};
            }
            if(productCode == "IDGP5") {
                return {serviceName: "Финансовый навигатор", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "1 раз в течение срока страхования по договору", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "FIN", serviceType: "Финансовые сервисы", serviceSubTypeCode: "5001", serviceSubType: "Сервисы Финансовой поддержки", serviceAgreement: "ООО «СКТ»", serviceStartDate: "2025-02-15", serviceEndDate: undefined};
            }
            if(productCode == "ERC2") {
                return {serviceName: "Финансовый навигатор", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "1 раз в течение срока страхования по договору", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "FIN", serviceType: "Финансовые сервисы", serviceSubTypeCode: "5001", serviceSubType: "Сервисы Финансовой поддержки", serviceAgreement: "ООО «СКТ»", serviceStartDate: "2025-02-15", serviceEndDate: undefined};
            }
            if(productCode == "ERCP2") {
                return {serviceName: "Финансовый навигатор", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "1 раз в течение срока страхования по договору", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "FIN", serviceType: "Финансовые сервисы", serviceSubTypeCode: "5001", serviceSubType: "Сервисы Финансовой поддержки", serviceAgreement: "ООО «СКТ»", serviceStartDate: "2025-02-15", serviceEndDate: undefined};
            }
            if(productCode == "IDG3") {
                return {serviceName: "Финансовый навигатор", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "1 раз в течение срока страхования по договору", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "FIN", serviceType: "Финансовые сервисы", serviceSubTypeCode: "5001", serviceSubType: "Сервисы Финансовой поддержки", serviceAgreement: "ООО «СКТ»", serviceStartDate: "2025-02-15", serviceEndDate: undefined};
            }
            if(productCode == "IDG5") {
                return {serviceName: "Финансовый навигатор", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "1 раз в течение срока страхования по договору", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "FIN", serviceType: "Финансовые сервисы", serviceSubTypeCode: "5001", serviceSubType: "Сервисы Финансовой поддержки", serviceAgreement: "ООО «СКТ»", serviceStartDate: "2025-02-15", serviceEndDate: undefined};
            }
            if(productCode == "IBA2P3") {
                return {serviceName: "Финансовый навигатор", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "1 раз в течение срока страхования по договору", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "FIN", serviceType: "Финансовые сервисы", serviceSubTypeCode: "5001", serviceSubType: "Сервисы Финансовой поддержки", serviceAgreement: "ООО «СКТ»", serviceStartDate: "2025-02-15", serviceEndDate: undefined};
            }
        }
        if((issueDate >= "2024-12-01" && issueDate <= "2099-12-31")) {
            return {serviceName: "Финансовый навигатор", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "1 раз в течение первого года страхования", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "FIN", serviceType: "Финансовые сервисы", serviceSubTypeCode: "5001", serviceSubType: "Сервисы Финансовой поддержки", serviceAgreement: "ООО «СКТ»", serviceStartDate: "2024-12-01", serviceEndDate: undefined};
        }
    }
    if((issueDate >= "2022-05-23" && issueDate <= "2099-12-31")) {
        if(serviceCode == "GenCheckHealth") {
            return {serviceName: "Генетический паспорт", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 14, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "1 раз в течение срока действия договора", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1003", serviceSubType: "Сервисы генетического чекапа", serviceAgreement: "ООО «Медоблако»", serviceStartDate: "2022-05-23", serviceEndDate: undefined};
        }
        if(serviceCode == "GenCheckSport") {
            return {serviceName: "Генетический тест «Питание и спорт»", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 14, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "1 раз в течение срока действия договора", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1003", serviceSubType: "Сервисы генетического чекапа", serviceAgreement: "ООО «Медоблако»", serviceStartDate: "2022-05-23", serviceEndDate: undefined};
        }
        if(serviceCode == "GenCheckTalents") {
            return {serviceName: "Генетический чек-ап «Таланты и способности»", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 14, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "1 раз в течение срока действия договора", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1003", serviceSubType: "Сервисы генетического чекапа", serviceAgreement: "ООО «Медоблако»", serviceStartDate: "2022-05-23", serviceEndDate: undefined};
        }
    }
    if(serviceCode == "MED15" && (issueDate >= "2022-10-27" && issueDate <= "2099-12-31")) {
        return {serviceName: "КЗ (лечение РФ)", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "Ежегодно", specialConditions: "Сервис, включается в договор одновременно с риском КЗ лечение РФ", requiredRisks: ["CDHR10800"], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "10099", serviceSubType: "Медицинские сервисы", serviceAgreement: "ООО «Маданес»", serviceStartDate: "2022-10-27", serviceEndDate: undefined};
    }
    if((issueDate >= "2024-10-09" && issueDate <= "2099-12-31")) {
        if(serviceCode == "MED38") {
            return {serviceName: "КЗ (лечение РФ) - Стандарт", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 90, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "Ежегодно", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "10095", serviceSubType: "Критические заболевания лечение в РФ", serviceAgreement: "ООО «Маданес»", serviceStartDate: "2024-10-09", serviceEndDate: undefined};
        }
        if(serviceCode == "MED39") {
            return {serviceName: "КЗ (лечение весь мир) - Стандарт Плюс", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 90, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "Ежегодно", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "10099", serviceSubType: "Критические заболевания лечение за рубежом", serviceAgreement: "ООО «Маданес»", serviceStartDate: "2024-10-09", serviceEndDate: undefined};
        }
        if(serviceCode == "MED40") {
            return {serviceName: "КЗ (лечение весь мир) - Премиум", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 90, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "Ежегодно", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "10099", serviceSubType: "Критические заболевания лечение за рубежом", serviceAgreement: "ООО «Маданес»", serviceStartDate: "2024-10-09", serviceEndDate: undefined};
        }
        if(serviceCode == "MED51" && productCode == "EHVP2") {
            return {serviceName: "Специализированный чек-ап", minSumPrem: 200000, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "В соответствии с программой ДМС «Медицинский обследования» №<1/2/3> (в зависимости от выбранного варианта)", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1005", serviceSubType: "Сервисы специализированного чекапа", serviceAgreement: "ООО «Медоблако»", serviceStartDate: "2024-10-09", serviceEndDate: undefined};
        }
    }
    if((issueDate >= "2024-10-09" && issueDate <= "2099-12-31")) {
        if(serviceCode == "MED51") {
            return {serviceName: "Специализированный чек-ап", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "Ежегодно", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1005", serviceSubType: "Сервисы специализированного чекапа", serviceAgreement: "ООО «Медоблако»", serviceStartDate: "2024-10-09", serviceEndDate: undefined};
        }
        if(serviceCode == "MED24" && productCode == "EHVP2") {
            return {serviceName: "Чек-ап Генетический", minSumPrem: 200000, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "В соответствии с программой ДМС «Медицинский обследования» №<1/2/3> (в зависимости от выбранного варианта)", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1003", serviceSubType: "Сервисы генетического чек-апа", serviceAgreement: "ООО «Медоблако»", serviceStartDate: "2024-10-09", serviceEndDate: undefined};
        }
    }
    if((issueDate >= "2024-10-09" && issueDate <= "2099-12-31")) {
        if(serviceCode == "MED24") {
            return {serviceName: "Чек-ап Генетический", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "Ежегодно", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1003", serviceSubType: "Сервисы генетического чек-апа", serviceAgreement: "ООО «Медоблако»", serviceStartDate: "2024-10-09", serviceEndDate: undefined};
        }
        if(serviceCode == "MED41") {
            return {serviceName: "Комплексный чек-ап - Стандарт", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "В соответствии с программой ДМС «Медицинский обследования» №<1/2/3> (в зависимости от выбранного варианта)", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "10068", serviceSubType: "Check Up", serviceAgreement: "ООО «Медоблако»", serviceStartDate: "2024-10-09", serviceEndDate: undefined};
        }
        if(serviceCode == "MED42") {
            return {serviceName: "Комплексный чек -ап - Стандарт Плюс", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "В соответствии с программой ДМС «Медицинский обследования» №<1/2/3> (в зависимости от выбранного варианта)", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "10068", serviceSubType: "Check Up", serviceAgreement: "ООО «Медоблако»", serviceStartDate: "2024-10-09", serviceEndDate: undefined};
        }
        if(serviceCode == "MED43") {
            return {serviceName: "Комплексный чек ап - Премиум", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "В соответствии с программой ДМС «Медицинский обследования» №<1/2/3> (в зависимости от выбранного варианта)", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1006", serviceSubType: "Сервисы комплексного чекапа", serviceAgreement: "ООО «Медоблако»", serviceStartDate: "2024-10-09", serviceEndDate: undefined};
        }
    }
    if(serviceCode == "MED60" && (issueDate >= "2023-02-01" && issueDate <= "2099-12-31")) {
        return {serviceName: "Лечение КЗ - ДМС  КСЖ 2 (РФ + за рубежом)", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 90, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "В течении 90 дней", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "10099", serviceSubType: "Медицинские сервисы", serviceAgreement: "ООО «СМС»", serviceStartDate: "2023-02-01", serviceEndDate: undefined};
    }
    if((issueDate >= "2022-10-15" && issueDate <= "2099-12-31")) {
        if(serviceCode == "MED62") {
            return {serviceName: "Реабилитация COVID", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "1 раз за весь срок действия договора (Длительность курса реабилитации 14 дней)", specialConditions: "Отсутствуют", requiredRisks: ["RC10800"], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "6001", serviceSubType: "Сервисы реабилитации", serviceAgreement: "ООО «Евразия Ассистанс»", serviceStartDate: "2022-10-15", serviceEndDate: undefined};
        }
        if(serviceCode == "MED64") {
            return {serviceName: "Реабилитация расширенные заболевания", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "1 раз за весь срок действия договора (Длительность курса реабилитации 14 дней)", specialConditions: "Отсутствуют", requiredRisks: ["RAD10800"], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "6001", serviceSubType: "Сервисы реабилитации", serviceAgreement: "ООО «Евразия Ассистанс»", serviceStartDate: "2022-10-15", serviceEndDate: undefined};
        }
        if(serviceCode == "MED65") {
            return {serviceName: "Реабилитация Инсульт", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "1 раз за весь срок действия договора (Длительность курса реабилитации 14 дней)", specialConditions: "Отсутствуют", requiredRisks: ["RS10800"], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "6001", serviceSubType: "Сервисы реабилитации", serviceAgreement: "ООО «Евразия Ассистанс»", serviceStartDate: "2022-10-15", serviceEndDate: undefined};
        }
        if(serviceCode == "MED66") {
            return {serviceName: "Реабилитация Травма Головы", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "1 раз за весь срок действия договора (Длительность курса реабилитации 14 дней)", specialConditions: "Отсутствуют", requiredRisks: ["RIH10800"], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "6001", serviceSubType: "Сервисы реабилитации", serviceAgreement: "ООО «Евразия Ассистанс»", serviceStartDate: "2022-10-15", serviceEndDate: undefined};
        }
        if(serviceCode == "MED67") {
            return {serviceName: "Онлайн Реабилитация COVID", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "1 раз в течение срока действия договора", specialConditions: "Отсутствуют", requiredRisks: ["RCON10800"], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "6001", serviceSubType: "Сервисы реабилитации", serviceAgreement: "ООО «Евразия Ассистанс»", serviceStartDate: "2022-10-15", serviceEndDate: undefined};
        }
        if(serviceCode == "MED68") {
            return {serviceName: "Онлайн Реабилитация инсульт", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "1 раз в течение срока действия договора", specialConditions: "Отсутствуют", requiredRisks: ["RSON10800"], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "6001", serviceSubType: "Сервисы реабилитации", serviceAgreement: "ООО «Евразия Ассистанс»", serviceStartDate: "2022-10-15", serviceEndDate: undefined};
        }
        if(serviceCode == "MED69") {
            return {serviceName: "Онлайн Реабилитация травма головы", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "1 раз в течение срока действия договора", specialConditions: "Отсутствуют", requiredRisks: ["RIHON10800"], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "6001", serviceSubType: "Сервисы реабилитации", serviceAgreement: "ООО «Евразия Ассистанс»", serviceStartDate: "2022-10-15", serviceEndDate: undefined};
        }
    }
    if(serviceCode == "MED72" && productCode == "EHVP2" && (issueDate >= "2022-10-05" && issueDate <= "2099-12-31")) {
        return {serviceName: "Телемедицина (ПФП)", minSumPrem: 680000, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "Без ограничений", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1002", serviceSubType: "Сервисы Телемедицины", serviceAgreement: "ООО «Медоблако»", serviceStartDate: "2022-10-05", serviceEndDate: undefined};
    }
    if(serviceCode == "MED72" && (issueDate >= "2022-10-05" && issueDate <= "2099-12-31")) {
        return {serviceName: "Телемедицина (ПФП)", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "Без ограничений", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1002", serviceSubType: "Сервисы Телемедицины", serviceAgreement: "ООО «Медоблако»", serviceStartDate: "2022-10-05", serviceEndDate: undefined};
    }
    if((issueDate >= "2023-03-07" && issueDate <= "2099-12-31")) {
        if(serviceCode == "MED74") {
            return {serviceName: "Здоровье", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 14, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "1 раз в течение срока действия договора", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1010", serviceSubType: "Сервис Здоровье", serviceAgreement: "ООО «Медоблако»", serviceStartDate: "2023-03-07", serviceEndDate: undefined};
        }
        if(serviceCode == "MED75") {
            return {serviceName: "ЗОЖ", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 14, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "1 раз в течение срока действия договора", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1011", serviceSubType: "Сервисы ЗОЖ", serviceAgreement: "ООО «МК Доктор Рядом»", serviceStartDate: "2023-03-07", serviceEndDate: undefined};
        }
        if(serviceCode == "MED76") {
            return {serviceName: "Чек-ап  «Иммунитет»", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 14, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "1 раз в течение срока действия договора", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1012", serviceSubType: "Сервисы Ген.чек-ап и исследования", serviceAgreement: "ООО «Евразия Ассистанс»", serviceStartDate: "2023-03-07", serviceEndDate: undefined};
        }
        if(serviceCode == "MED77") {
            return {serviceName: "Чек-ап  «Энергия»", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 14, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "1 раз в течение срока действия договора", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1012", serviceSubType: "Сервисы Ген.чек-ап и исследования", serviceAgreement: "ООО «Евразия Ассистанс»", serviceStartDate: "2023-03-07", serviceEndDate: undefined};
        }
        if(serviceCode == "MED78") {
            return {serviceName: "Чек-ап  «Таланты»", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 14, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "1 раз в течение срока действия договора", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1012", serviceSubType: "Сервисы Ген.чек-ап и исследования", serviceAgreement: "ООО «Евразия Ассистанс»", serviceStartDate: "2023-03-07", serviceEndDate: undefined};
        }
        if(serviceCode == "MED85") {
            if(productCode == "ECOFPVTB") {
                return {serviceName: "Здоровье_дс", minSumPrem: undefined, groupCode: "000008", groupName: "ПРО Здоровье", startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "1 раз в первый год прикрепления", specialConditions: "При условии, что достигнут размер взноса, необходимый для подключения сервиса", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1010", serviceSubType: "Медицинские сервисы", serviceAgreement: "ООО «Медоблако»", serviceStartDate: "2023-03-07", serviceEndDate: "2025-02-20"};
            }
            if(productCode == "ECOFVVTB") {
                return {serviceName: "Здоровье_дс", minSumPrem: undefined, groupCode: "000008", groupName: "ПРО Здоровье", startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "1 раз в первый год прикрепления", specialConditions: "При условии, что достигнут размер взноса, необходимый для подключения сервиса", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1010", serviceSubType: "Медицинские сервисы", serviceAgreement: "ООО «Медоблако»", serviceStartDate: "2023-03-07", serviceEndDate: "2025-02-20"};
            }
        }
    }
    if(serviceCode == "MED85") {
        if(productCode == "EBMGNVTB") {
            if((issueDate >= "2024-09-30" && issueDate <= "2099-12-31")) {
                return {serviceName: "Здоровье_дс", minSumPrem: 500000, groupCode: "000008", groupName: "ПРО Здоровье", startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "1 раз в первый год прикрепления", specialConditions: "При условии, что достигнут размер взноса, необходимый для подключения сервиса", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1010", serviceSubType: "Медицинские сервисы", serviceAgreement: "ООО «Медоблако»", serviceStartDate: "2024-09-30", serviceEndDate: "2025-02-20"};
            }
            if((issueDate >= "2025-02-21" && issueDate <= "2099-12-31")) {
                return {serviceName: "Здоровье_дс", minSumPrem: 500000, groupCode: "000008", groupName: "ПРО Здоровье", startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "1 раз в первый год прикрепления", specialConditions: "При условии, что достигнут размер взноса, необходимый для подключения сервиса", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1010", serviceSubType: "Медицинские сервисы", serviceAgreement: "ООО «Кроссхаб»", serviceStartDate: "2025-02-21", serviceEndDate: undefined};
            }
        }
        if(productCode == "EBMGVTB") {
            if((issueDate >= "2024-09-30" && issueDate <= "2099-12-31")) {
                return {serviceName: "Здоровье_дс", minSumPrem: 500000, groupCode: "000008", groupName: "ПРО Здоровье", startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "1 раз в первый год прикрепления", specialConditions: "При условии, что достигнут размер взноса, необходимый для подключения сервиса", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1010", serviceSubType: "Медицинские сервисы", serviceAgreement: "ООО «Медоблако»", serviceStartDate: "2024-09-30", serviceEndDate: "2025-02-20"};
            }
            if((issueDate >= "2025-02-21" && issueDate <= "2099-12-31")) {
                return {serviceName: "Здоровье_дс", minSumPrem: 500000, groupCode: "000008", groupName: "ПРО Здоровье", startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "1 раз в первый год прикрепления", specialConditions: "При условии, что достигнут размер взноса, необходимый для подключения сервиса", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1010", serviceSubType: "Медицинские сервисы", serviceAgreement: "ООО «Кроссхаб»", serviceStartDate: "2025-02-21", serviceEndDate: undefined};
            }
        }
        if((issueDate >= "2025-02-21" && issueDate <= "2099-12-31")) {
            if(productCode == "ECOFPVTB") {
                return {serviceName: "Здоровье_дс", minSumPrem: undefined, groupCode: "000008", groupName: "ПРО Здоровье", startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "1 раз в первый год прикрепления", specialConditions: "При условии, что достигнут размер взноса, необходимый для подключения сервиса", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1010", serviceSubType: "Медицинские сервисы", serviceAgreement: "ООО «Кроссхаб»", serviceStartDate: "2025-02-21", serviceEndDate: undefined};
            }
            if(productCode == "ECOFVVTB") {
                return {serviceName: "Здоровье_дс", minSumPrem: undefined, groupCode: "000008", groupName: "ПРО Здоровье", startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "1 раз в первый год прикрепления", specialConditions: "При условии, что достигнут размер взноса, необходимый для подключения сервиса", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1010", serviceSubType: "Медицинские сервисы", serviceAgreement: "ООО «Кроссхаб»", serviceStartDate: "2025-02-21", serviceEndDate: undefined};
            }
        }
    }
    if((issueDate >= "2023-03-07" && issueDate <= "2099-12-31")) {
        if(serviceCode == "MED85") {
            return {serviceName: "Здоровье_дс", minSumPrem: 150000, groupCode: "000005", groupName: "ПРО Здоровье", startDateDiff: 30, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "1 раз в первый год прикрепления", specialConditions: "При условии, что достигнут размер взноса, необходимый для подключения сервиса", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1010", serviceSubType: "Медицинские сервисы", serviceAgreement: "ООО «Медоблако»", serviceStartDate: "2023-03-07", serviceEndDate: undefined};
        }
        if(serviceCode == "MED86") {
            return {serviceName: "ЗОЖ_дс", minSumPrem: 150000, groupCode: "000006", groupName: "ПРО ЗОЖ", startDateDiff: 30, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "1 раз в первый год прикрепления", specialConditions: "При условии, что достигнут размер взноса, необходимый для подключения сервиса", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1011", serviceSubType: "Медицинские сервисы", serviceAgreement: "ООО «МК Доктор Рядом»", serviceStartDate: "2023-03-07", serviceEndDate: undefined};
        }
        if(serviceCode == "MED87") {
            return {serviceName: "Чек-ап «Иммунитет»_дс", minSumPrem: 150000, groupCode: "000007", groupName: "ПРО Генетику", startDateDiff: 30, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "1 раз в первый год прикрепления", specialConditions: "При условии, что достигнут размер взноса, необходимый для подключения сервиса", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1012", serviceSubType: "Медицинские сервисы", serviceAgreement: "ООО «Евразия Ассистанс»", serviceStartDate: "2023-03-07", serviceEndDate: undefined};
        }
        if(serviceCode == "MED88") {
            if(productCode == "ECATFPVTB") {
                return {serviceName: "Чек-ап «Энергия»_дс", minSumPrem: undefined, groupCode: "000007", groupName: "ПРО Генетику", startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "1 раз в первый год прикрепления", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1012", serviceSubType: "Медицинские сервисы", serviceAgreement: "ООО «Евразия Ассистанс»", serviceStartDate: "2023-03-07", serviceEndDate: undefined};
            }
            if(productCode == "ECATFVVTB") {
                return {serviceName: "Чек-ап «Энергия»_дс", minSumPrem: undefined, groupCode: "000007", groupName: "ПРО Генетику", startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "1 раз в первый год прикрепления", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1012", serviceSubType: "Медицинские сервисы", serviceAgreement: "ООО «Евразия Ассистанс»", serviceStartDate: "2023-03-07", serviceEndDate: undefined};
            }
            if(productCode == "ECATFUBRR") {
                return {serviceName: "Чек-ап «Энергия»_дс", minSumPrem: undefined, groupCode: "000007", groupName: "ПРО Генетику", startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "1 раз в первый год прикрепления", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1012", serviceSubType: "Медицинские сервисы", serviceAgreement: "ООО «Евразия Ассистанс»", serviceStartDate: "2023-03-07", serviceEndDate: undefined};
            }
            if(productCode == "ECATFZENIT") {
                return {serviceName: "Чек-ап «Энергия»_дс", minSumPrem: undefined, groupCode: "000007", groupName: "ПРО Генетику", startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "1 раз в первый год прикрепления", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1012", serviceSubType: "Медицинские сервисы", serviceAgreement: "ООО «Евразия Ассистанс»", serviceStartDate: "2023-03-07", serviceEndDate: undefined};
            }
        }
    }
    if((issueDate >= "2023-03-07" && issueDate <= "2099-12-31")) {
        if(serviceCode == "MED88") {
            return {serviceName: "Чек-ап «Энергия»_дс", minSumPrem: 150000, groupCode: "000007", groupName: "ПРО Генетику", startDateDiff: 30, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "1 раз в первый год прикрепления", specialConditions: "При условии, что достигнут размер взноса, необходимый для подключения сервиса", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1012", serviceSubType: "Медицинские сервисы", serviceAgreement: "ООО «Евразия Ассистанс»", serviceStartDate: "2023-03-07", serviceEndDate: undefined};
        }
        if(serviceCode == "MED89") {
            if(productCode == "ECATFPVTB") {
                return {serviceName: "Чек-ап «Таланты»_дс", minSumPrem: undefined, groupCode: "000007", groupName: "ПРО Генетику", startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "1 раз в первый год прикрепления", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1012", serviceSubType: "Медицинские сервисы", serviceAgreement: "ООО «Евразия Ассистанс»", serviceStartDate: "2023-03-07", serviceEndDate: undefined};
            }
            if(productCode == "ECATFVVTB") {
                return {serviceName: "Чек-ап «Таланты»_дс", minSumPrem: undefined, groupCode: "000007", groupName: "ПРО Генетику", startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "1 раз в первый год прикрепления", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1012", serviceSubType: "Медицинские сервисы", serviceAgreement: "ООО «Евразия Ассистанс»", serviceStartDate: "2023-03-07", serviceEndDate: undefined};
            }
            if(productCode == "ECATFUBRR") {
                return {serviceName: "Чек-ап «Таланты»_дс", minSumPrem: undefined, groupCode: "000007", groupName: "ПРО Генетику", startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "1 раз в первый год прикрепления", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1012", serviceSubType: "Медицинские сервисы", serviceAgreement: "ООО «Евразия Ассистанс»", serviceStartDate: "2023-03-07", serviceEndDate: undefined};
            }
            if(productCode == "ECATFZENIT") {
                return {serviceName: "Чек-ап «Таланты»_дс", minSumPrem: undefined, groupCode: "000007", groupName: "ПРО Генетику", startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "1 раз в первый год прикрепления", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1012", serviceSubType: "Медицинские сервисы", serviceAgreement: "ООО «Евразия Ассистанс»", serviceStartDate: "2023-03-07", serviceEndDate: undefined};
            }
        }
    }
    if(serviceCode == "MED89" && (issueDate >= "2023-03-07" && issueDate <= "2099-12-31")) {
        return {serviceName: "Чек-ап «Таланты»_дс", minSumPrem: 150000, groupCode: "000007", groupName: "ПРО Генетику", startDateDiff: 30, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "1 раз в первый год прикрепления", specialConditions: "При условии, что достигнут размер взноса, необходимый для подключения сервиса", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1012", serviceSubType: "Медицинские сервисы", serviceAgreement: "ООО «Евразия Ассистанс»", serviceStartDate: "2023-03-07", serviceEndDate: undefined};
    }
    if((issueDate >= "2022-10-27" && issueDate <= "2099-12-31")) {
        if(serviceCode == "MED93") {
            return {serviceName: "КЗ (лечение РФ) - Term Life_VIP", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 90, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "Ежегодно", specialConditions: "Отсутствуют", requiredRisks: ["CDHR10800"], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "10095", serviceSubType: "Медицинские сервисы", serviceAgreement: "ООО «Маданес»", serviceStartDate: "2022-10-27", serviceEndDate: undefined};
        }
        if(serviceCode == "MED94") {
            return {serviceName: "КЗ  (лечение за рубежом) - Term life_VIP", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 90, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "Ежегодно", specialConditions: "Отсутствуют", requiredRisks: ["CDHW10800"], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "10099", serviceSubType: "Медицинские сервисы", serviceAgreement: "ООО «Маданес»", serviceStartDate: "2022-10-27", serviceEndDate: undefined};
        }
        if(serviceCode == "MED95") {
            return {serviceName: "ВММ (РФ_ за рубежом) - Term Life VIP", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 90, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "1 раз в течение первого года страхования", specialConditions: "Отсутствуют", requiredRisks: ["CDHR10800","CDHW10800"], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1004", serviceSubType: "Медицинские сервисы", serviceAgreement: "ООО «Маданес»", serviceStartDate: "2022-10-27", serviceEndDate: undefined};
        }
    }
    if(serviceCode == "MED96" && (issueDate >= "2024-09-30" && issueDate <= "2099-12-31")) {
        if(productCode == "EBMGVNVTB") {
            return {serviceName: "Генетический паспорт «Сила генетики»", minSumPrem: 1000000, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "1 раз в течение первого года страхования", specialConditions: "При условии, что достигнут размер взноса, необходимый для подключения сервиса", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1003", serviceSubType: "Медицинские сервисы", serviceAgreement: "ООО «Генотек»", serviceStartDate: "2024-09-30", serviceEndDate: undefined};
        }
        if(productCode == "EBMGVVTB") {
            return {serviceName: "Генетический паспорт «Сила генетики»", minSumPrem: 1000000, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "1 раз в течение первого года страхования", specialConditions: "При условии, что достигнут размер взноса, необходимый для подключения сервиса", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1003", serviceSubType: "Медицинские сервисы", serviceAgreement: "ООО «Генотек»", serviceStartDate: "2024-09-30", serviceEndDate: undefined};
        }
    }
    if((issueDate >= "2024-09-30" && issueDate <= "2099-12-31")) {
        if(serviceCode == "MED96") {
            return {serviceName: "Генетический паспорт «Сила генетики»", minSumPrem: 1000000, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "1 раз в течение первого года страхования", specialConditions: "При условии, что достигнут размер взноса, необходимый для подключения сервиса", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1003", serviceSubType: "Медицинские сервисы", serviceAgreement: "ООО «Генотек»", serviceStartDate: "2024-09-30", serviceEndDate: undefined};
        }
        if(serviceCode == "MED97") {
            if(productCode == "EBMGVNVTB") {
                return {serviceName: "Здоровый образ жизни", minSumPrem: 1000000, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "1 раз в течение первого года страхования", specialConditions: "При условии, что достигнут размер взноса, необходимый для подключения сервиса", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1011", serviceSubType: "Медицинские сервисы", serviceAgreement: "ООО «МК Доктор рядом»", serviceStartDate: "2024-09-30", serviceEndDate: undefined};
            }
            if(productCode == "EBMGVVTB") {
                return {serviceName: "Здоровый образ жизни", minSumPrem: 1000000, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "1 раз в течение первого года страхования", specialConditions: "При условии, что достигнут размер взноса, необходимый для подключения сервиса", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1011", serviceSubType: "Медицинские сервисы", serviceAgreement: "ООО «МК Доктор рядом»", serviceStartDate: "2024-09-30", serviceEndDate: undefined};
            }
        }
    }
    if(serviceCode == "MED97" && (issueDate >= "2024-09-30" && issueDate <= "2099-12-31")) {
        return {serviceName: "Здоровый образ жизни", minSumPrem: 1000000, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "1 раз в течение первого года страхования", specialConditions: "При условии, что достигнут размер взноса, необходимый для подключения сервиса", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1011", serviceSubType: "Медицинские сервисы", serviceAgreement: "ООО «МК Доктор рядом»", serviceStartDate: "2024-09-30", serviceEndDate: undefined};
    }
    if(serviceCode == "MedNavigator" && (issueDate >= "2022-11-07" && issueDate <= "2099-12-31")) {
        return {serviceName: "Лекарственный навигатор", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "Без ограничений", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1009", serviceSubType: "Сервисы Медицинской навигации", serviceAgreement: "ООО «Евразия Ассистанс»", serviceStartDate: "2022-11-07", serviceEndDate: undefined};
    }
    if(serviceCode == "PFP" && (issueDate >= "2020-05-01" && issueDate <= "2099-12-31")) {
        return {serviceName: "ПФП", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "Без ограничений", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "FIN", serviceType: "Финансовые сервисы", serviceSubTypeCode: "5001", serviceSubType: "Сервисы Финансовой поддержки", serviceAgreement: "ООО «Масару Инвестиции»", serviceStartDate: "2020-05-01", serviceEndDate: undefined};
    }
    if(serviceCode == "PsychologicalHelp" && (issueDate >= "2022-06-09" && issueDate <= "2099-12-31")) {
        return {serviceName: "Психологическая помощь", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "1 раз в течение 5 лет", specialConditions: "Сервис, включается в договор одновременно с рисками Безраб ОУСВ пер ", requiredRisks: ["MJL36404"], serviceTypeCode: "LEG", serviceType: "Юридические сервисы", serviceSubTypeCode: "3001", serviceSubType: "Сервисы юридической поддержки", serviceAgreement: "ООО «Медоблако»", serviceStartDate: "2022-06-09", serviceEndDate: undefined};
    }
    if(serviceCode == "TAX1") {
        if((issueDate >= "2021-08-26" && issueDate <= "2099-12-31")) {
            if(productCode == "EBMGUBRR") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "Ежегодно", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "IDG5UBRR") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "Один раз в теч.трех лет с момента заключения", specialConditions: "Для договоров со сроком от 5 лет", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "IBA5BFKO") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "1 раз в течение 3 лет", specialConditions: "Для договоров со сроком от 5 лет", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Серсивы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "IBI5OAS") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "1 раз в течение 3 лет", specialConditions: "Для договоров со сроком от 5 лет", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Серсивы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "IBG5OAS") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "1 раз в течение 3 лет", specialConditions: "Для договоров со сроком от 5 лет", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Серсивы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "IBG5BFKO2") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "1 раз в течение 3 лет", specialConditions: "Для договоров со сроком от 5 лет", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Серсивы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "IBI5BFKO17") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "1 раз в течение 3 лет", specialConditions: "Для договоров со сроком от 5 лет", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Серсивы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "EBMOPTIMAOAS2") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "Ежегодно", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Серсивы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
        }
        if((issueDate >= "2021-08-26" && issueDate <= "2025-05-31")) {
            if(productCode == "CAPCLCHILDBOXOAS") {
                return {serviceName: "Налоговый вычет", minSumPrem: 30000, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "Ежегодно", specialConditions: "При условии что размер взносов по договору составляет от 30 000 ₽ (суммарно) в год", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Серсивы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "CAPCLCHILDOAS") {
                return {serviceName: "Налоговый вычет", minSumPrem: 30000, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "Ежегодно", specialConditions: "При условии что размер взносов по договору составляет от 30 000 ₽ (суммарно) в год", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Серсивы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "CAPCLRELOAS") {
                return {serviceName: "Налоговый вычет", minSumPrem: 30000, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "Ежегодно", specialConditions: "При условии что размер взносов по договору составляет от 30 000 ₽ (суммарно) в год", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Серсивы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "CAPCLRELBOXOAS") {
                return {serviceName: "Налоговый вычет", minSumPrem: 30000, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "Ежегодно", specialConditions: "При условии что размер взносов по договору составляет от 30 000 ₽ (суммарно) в год", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Серсивы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
        }
        if((issueDate >= "2024-02-10" && issueDate <= "2099-12-31")) {
            return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Серсивы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2024-02-10", serviceEndDate: undefined};
        }
    }
    if(productCode == "CAPCLCHILDBOXOAS") {
        if(serviceCode == "MED98" && (issueDate >= "2025-06-01" && issueDate <= "2099-12-31")) {
            return {serviceName: "Лайфстайл", minSumPrem: 30000, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "Один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Юридические сервисы", serviceSubTypeCode: "3001", serviceSubType: "Медицинские сервисы", serviceAgreement: "ООО «Юридические решения»", serviceStartDate: "2019-10-01", serviceEndDate: undefined};
        }
        if((issueDate >= "2025-05-22" && issueDate <= "2099-12-31")) {
            if(serviceCode == "LEG15") {
                return {serviceName: "Защита персональных данных", minSumPrem: 30000, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "Один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "LEG", serviceType: "Юридические сервисы", serviceSubTypeCode: "3001", serviceSubType: "Сервисы юридической поддержки", serviceAgreement: "ООО «Юридические решения»", serviceStartDate: "2019-10-01", serviceEndDate: undefined};
            }
            if(serviceCode == "TAX2") {
                return {serviceName: "Налоговый", minSumPrem: 30000, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "Один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Юридические сервисы", serviceSubTypeCode: "3001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Юридические решения»", serviceStartDate: "2019-10-01", serviceEndDate: undefined};
            }
        }
    }
    if((issueDate >= "2025-06-01" && issueDate <= "2099-12-31")) {
        if(productCode == "CAPCLCHILDOAS") {
            if(serviceCode == "MED98") {
                return {serviceName: "Лайфстайл", minSumPrem: 30000, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "Один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Юридические сервисы", serviceSubTypeCode: "3001", serviceSubType: "Медицинские сервисы", serviceAgreement: "ООО «Юридические решения»", serviceStartDate: "2019-10-01", serviceEndDate: undefined};
            }
            if(serviceCode == "LEG15") {
                return {serviceName: "Защита персональных данных", minSumPrem: 30000, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "Один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "LEG", serviceType: "Юридические сервисы", serviceSubTypeCode: "3001", serviceSubType: "Сервисы юридической поддержки", serviceAgreement: "ООО «Юридические решения»", serviceStartDate: "2019-10-01", serviceEndDate: undefined};
            }
            if(serviceCode == "TAX2") {
                return {serviceName: "Налоговый", minSumPrem: 30000, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "Один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Юридические сервисы", serviceSubTypeCode: "3001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Юридические решения»", serviceStartDate: "2019-10-01", serviceEndDate: undefined};
            }
        }
        if(productCode == "CAPCLRELOAS") {
            if(serviceCode == "MED98") {
                return {serviceName: "Лайфстайл", minSumPrem: 30000, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "Один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Юридические сервисы", serviceSubTypeCode: "3001", serviceSubType: "Медицинские сервисы", serviceAgreement: "ООО «Юридические решения»", serviceStartDate: "2019-10-01", serviceEndDate: undefined};
            }
            if(serviceCode == "LEG15") {
                return {serviceName: "Защита персональных данных", minSumPrem: 30000, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "Один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "LEG", serviceType: "Юридические сервисы", serviceSubTypeCode: "3001", serviceSubType: "Сервисы юридической поддержки", serviceAgreement: "ООО «Юридические решения»", serviceStartDate: "2019-10-01", serviceEndDate: undefined};
            }
            if(serviceCode == "TAX2") {
                return {serviceName: "Налоговый", minSumPrem: 30000, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "Один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Юридические сервисы", serviceSubTypeCode: "3001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Юридические решения»", serviceStartDate: "2019-10-01", serviceEndDate: undefined};
            }
        }
        if(productCode == "CAPCLRELBOXOAS") {
            if(serviceCode == "MED98") {
                return {serviceName: "Лайфстайл", minSumPrem: 30000, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "Один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Юридические сервисы", serviceSubTypeCode: "3001", serviceSubType: "Медицинские сервисы", serviceAgreement: "ООО «Юридические решения»", serviceStartDate: "2019-10-01", serviceEndDate: undefined};
            }
            if(serviceCode == "LEG15") {
                return {serviceName: "Защита персональных данных", minSumPrem: 30000, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "Один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "LEG", serviceType: "Юридические сервисы", serviceSubTypeCode: "3001", serviceSubType: "Сервисы юридической поддержки", serviceAgreement: "ООО «Юридические решения»", serviceStartDate: "2019-10-01", serviceEndDate: undefined};
            }
            if(serviceCode == "TAX2") {
                return {serviceName: "Налоговый", minSumPrem: 30000, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "Один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Юридические сервисы", serviceSubTypeCode: "3001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Юридические решения»", serviceStartDate: "2019-10-01", serviceEndDate: undefined};
            }
        }
    }
    if(serviceCode == "TaxDeduction10" && (issueDate >= "2024-06-24" && issueDate <= "2099-12-31")) {
        if(productCode == "ERCP2") {
            return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "Ежегодно", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2024-06-24", serviceEndDate: undefined};
        }
        if(productCode == "ERC2") {
            return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "Ежегодно", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2024-06-24", serviceEndDate: undefined};
        }
    }
    if((issueDate >= "2021-08-26" && issueDate <= "2099-12-31")) {
        if(serviceCode == "TaxDeduction10") {
            return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "Ежегодно", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
        }
        if(serviceCode == "TaxDeduction14") {
            if(productCode == "ERCP2") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "один раз в течение трех лет при единовременной оплате взноса", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "ERC2") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "один раз в течение трех лет при единовременной оплате взноса", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
        }
    }
    if((issueDate >= "2021-08-26" && issueDate <= "2099-12-31")) {
        if(serviceCode == "TaxDeduction14") {
            return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "1 раз в течение 3 лет", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
        }
        if(serviceCode == "TaxDeduction2") {
            if(productCode == "EBMGP") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "IDGP3") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "IDGP5") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "ERC2") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "IBI3AKCEPT") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "IBI5AKCEPT") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "IBI3ZENIT") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "IBI5ZENIT") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "EPCLZENIT") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "IBA3") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "IBA5") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "IBAP3") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "IBAP5") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "EBMAKCEPT") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "EBMG") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "IDG3NT") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "IDG5NT") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "EBMGNT") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "IDG3") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "IDG5") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "IBA3SMP") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "IBA5SMP") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "EBMGSMP") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "IBA5REINVEST") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "IBA3REINVEST") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "IDG3REINVEST") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "IDG5REINVEST") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "EBMGREINVEST") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "IDG5ZENIT") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "IBI5ZENIT17") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "EBMGLIFEINVEST") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "IDG5LIFEINVEST") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "EBMGN") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "IDGN3") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
            if(productCode == "IDGN5") {
                return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
            }
        }
    }
    if(serviceCode == "TaxDeduction2" && productCode == "EBMGZENIT" && (issueDate >= "2024-06-24" && issueDate <= "2099-12-31")) {
        return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "Ежегодно", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2024-06-24", serviceEndDate: undefined};
    }
    if(serviceCode == "TaxDeduction2" && (issueDate >= "2021-08-26" && issueDate <= "2099-12-31")) {
        return {serviceName: "Налоговый вычет", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "Ежегодно", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Налоговые сервисы", serviceSubTypeCode: "2001", serviceSubType: "Серсивы Налоговой Поддержки", serviceAgreement: "ООО «Инновационные сервисы»", serviceStartDate: "2021-08-26", serviceEndDate: undefined};
    }
    if((issueDate >= "2019-10-01" && issueDate <= "2099-12-31")) {
        if(serviceCode == "TMBase") {
            return {serviceName: "Телемедицина ПСБ Базовая", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "Без ограничений", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1002", serviceSubType: "Сервисы Телемедицины", serviceAgreement: "ООО «Медоблако»", serviceStartDate: "2019-10-01", serviceEndDate: undefined};
        }
        if(serviceCode == "TMExtended") {
            return {serviceName: "Телемедицина ПСБ Расширенная", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "Без ограничений", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1002", serviceSubType: "Сервисы Телемедицины", serviceAgreement: "ООО «Медоблако»", serviceStartDate: "2019-10-01", serviceEndDate: undefined};
        }
        if(serviceCode == "VMM") {
            return {serviceName: "ВММ для НСЖ_БФКО", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "1 раз за весь срок страхования по КЗ", specialConditions: "Сервис, включается в договор одновременно с рисками КЗ лечение РФ и КЗ лечение весь мир (входит в риски). Сервис не предоставляется по риску  КЗ-11 выплата.", requiredRisks: ["CDHR10800","CDHW10800"], serviceTypeCode: "MED", serviceType: "Медицинские сервисы", serviceSubTypeCode: "1004", serviceSubType: "Второе Медициснкое Мнение", serviceAgreement: "ООО «НМС»", serviceStartDate: "2019-10-01", serviceEndDate: undefined};
        }
    }
    if((issueDate >= "2025-03-20" && issueDate <= "2099-12-31")) {
        if(serviceCode == "LEG4") {
            return {serviceName: "Психологическая помощь", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "1 раз в течение 5 лет", specialConditions: "Сервис, включается в договор одновременно с рисками Безраб ОУСВ пер ", requiredRisks: ["MJL36404"], serviceTypeCode: "LEG", serviceType: "Юридические сервисы", serviceSubTypeCode: "3001", serviceSubType: "Сервисы юридической поддержки", serviceAgreement: "ООО «Медоблако»", serviceStartDate: "2019-10-01", serviceEndDate: undefined};
        }
        if(serviceCode == "LEG5") {
            return {serviceName: "Юристы", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "1 раз в течение 5 лет", specialConditions: "Сервис, включается в договор одновременно с рисками Безраб ОУСВ пер ", requiredRisks: ["MJL36404"], serviceTypeCode: "LEG", serviceType: "Юридические сервисы", serviceSubTypeCode: "3001", serviceSubType: "Сервисы юридической поддержки", serviceAgreement: "ООО «Медоблако»", serviceStartDate: "2019-10-01", serviceEndDate: undefined};
        }
        if(serviceCode == "LEG6") {
            return {serviceName: "HR", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Застрахованный", serviceFrequency: "1 раз в течение 5 лет", specialConditions: "Сервис, включается в договор одновременно с рисками Безраб ОУСВ пер ", requiredRisks: ["MJL36404"], serviceTypeCode: "LEG", serviceType: "Юридические сервисы", serviceSubTypeCode: "3001", serviceSubType: "Сервисы юридической поддержки", serviceAgreement: "ООО «Медоблако»", serviceStartDate: "2019-10-01", serviceEndDate: undefined};
        }
    }
    if((issueDate >= "2025-05-22" && issueDate <= "2099-12-31")) {
        if(serviceCode == "MED98") {
            return {serviceName: "Лайфстайл", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "Один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "MED", serviceType: "Юридические сервисы", serviceSubTypeCode: "3001", serviceSubType: "Медицинские сервисы", serviceAgreement: "ООО «Юридические решения»", serviceStartDate: "2019-10-01", serviceEndDate: undefined};
        }
        if(serviceCode == "LEG15") {
            return {serviceName: "Защита персональных данных", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "Один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "LEG", serviceType: "Юридические сервисы", serviceSubTypeCode: "3001", serviceSubType: "Сервисы юридической поддержки", serviceAgreement: "ООО «Юридические решения»", serviceStartDate: "2019-10-01", serviceEndDate: undefined};
        }
        if(serviceCode == "TAX2") {
            return {serviceName: "Налоговый", minSumPrem: undefined, groupCode: undefined, groupName: undefined, startDateDiff: 30, endDateDiff: 0, serviceParty: "Страхователь", serviceFrequency: "Один раз в течение трех лет при единовременной оплате взноса или ежегодно при оплате в рассрочку", specialConditions: "Отсутствуют", requiredRisks: [], serviceTypeCode: "TAX", serviceType: "Юридические сервисы", serviceSubTypeCode: "3001", serviceSubType: "Сервисы Налоговой Поддержки", serviceAgreement: "ООО «Юридические решения»", serviceStartDate: "2019-10-01", serviceEndDate: undefined};
        }
    }
};
