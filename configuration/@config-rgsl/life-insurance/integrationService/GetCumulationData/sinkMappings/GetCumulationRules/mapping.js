'use strict';

module.exports = function mapInput(input, sinkExchange) {

    const isCumulationEnabled = this.environmentVariables['rgsl.cumulation.enabled'] === 'true';

    if (!isCumulationEnabled) {
        this.stopExecution(`Кумуляция отключена для данной среды.`);
    }

    const currentDate = input.currentDate;
    const productCode = input.productCode;
    const cumulationProductGroup = input.cumulationProductGroup;

    if (!currentDate || !productCode || !cumulationProductGroup) {

        this.stopExecution(`Правила кумуляции по коду продукта ${productCode} и группы ${cumulationProductGroup} на дату ${currentDate} не найдены.`);
    }

    return {
        input: {
            data: {
                criteria: {
                    currentDate,
                    productCode,
                    cumulationProductGroup
                }
            }
        }
    };
};
