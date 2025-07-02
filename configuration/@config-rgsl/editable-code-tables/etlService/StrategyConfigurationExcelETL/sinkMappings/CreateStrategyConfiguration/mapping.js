module.exports = function mapping(input) {
    const { data } = input;

    const productCodes = [data?.productCode];
    productCodes.push();

    const strategyConfigurationBody = {
        strategyConfiguration: {
            productCodes,
            strategyCode: data?.strategyCode,
            issueDateMin: data?.issueDateMin,
            issueDateMax: data?.issueDateMax,
            strategyDescriptionFull: data?.strategyDescriptionFull,
            payOffDescription: data?.payOffDescription,
            baseActiveDescription: data?.baseActiveDescription,
            participationCoeffByPeriods: data?.participationCoeffByPeriods,
            participationCoeff: data?.participationCoeff,
            optionPrice: data?.optionPrice,
            emitent: data?.emitent,
            barrierAutoCall: data?.barrierAutoCall,
            barrier: data?.barrier,
            fixRate: data?.fixRate,
            intialShare: data?.intialShare,
            hedgeCost: data?.hedgeCost,
            spreadBA: data?.spreadBA,
            payOffShortDescription: data?.payOffShortDescription,
            toolType: data?.toolType,
            measureToolNominal: data?.measureToolNominal,
            calculatingAgent: data?.calculatingAgent,
            priceOfMeasureTool: data?.priceOfMeasureTool,
            partOfPremiumForTool: data?.partOfPremiumForTool
        }
    };

    return {
        body: strategyConfigurationBody
    };
};
