
/* eslint-disable */

module.exports = (function moduleDefinition() {


    /* eslint-disable */
    /**
     * medFixedConfig
     *
     * @param  {object} input Expected input properties: productCode, riskCode
     */
    function medFixedConfig(input) {
        // destructure input
        const {productCode, riskCode} = input;

        // select outputs based on conditions
        const allOutputs = [
            {condition: productCode == "CRHELIGHTOAS" && riskCode == "RCON10800", outputs: {sumInsured: 150000, premium: 390}},
            {condition: productCode == "CRHELIGHTOAS" && riskCode == "RIHON10800", outputs: {sumInsured: 150000, premium: 300}},
            {condition: productCode == "CRHELIGHTOAS" && riskCode == "RSON10800", outputs: {sumInsured: 150000, premium: 300}},
            {condition: productCode == "CRHEBASEOAS" && riskCode == "RIH10800", outputs: {sumInsured: 750000, premium: 795}},
            {condition: productCode == "CRHEBASEOAS" && riskCode == "RS10800", outputs: {sumInsured: 750000, premium: 795}},
            {condition: productCode == "CRHEBASEOAS" && riskCode == "TIH10800", outputs: {sumInsured: 350000, premium: 100}},
            {condition: productCode == "CRHEBASEOAS" && riskCode == "TS10800", outputs: {sumInsured: 350000, premium: 100}},
            {condition: productCode == "CRHEBASEOAS" && riskCode == "HC20700", outputs: {sumInsured: 30000, premium: 110}},
            {condition: productCode == "CRHEOPTIMAOAS" && riskCode == "RC10800", outputs: {sumInsured: 750000, premium: 750}},
            {condition: productCode == "CRHEOPTIMAOAS" && riskCode == "RIH10800", outputs: {sumInsured: 750000, premium: 750}},
            {condition: productCode == "CRHEOPTIMAOAS" && riskCode == "RS10800", outputs: {sumInsured: 750000, premium: 750}},
            {condition: productCode == "CRHEOPTIMAOAS" && riskCode == "RAD10800", outputs: {sumInsured: 750000, premium: 500}},
            {condition: productCode == "CRHEOPTIMAOAS" && riskCode == "TC10800", outputs: {sumInsured: 50000, premium: 100}},
            {condition: productCode == "CRHEOPTIMAOAS" && riskCode == "TIH10800", outputs: {sumInsured: 350000, premium: 100}},
            {condition: productCode == "CRHEOPTIMAOAS" && riskCode == "TS10800", outputs: {sumInsured: 350000, premium: 100}},
            {condition: productCode == "CRHEOPTIMAOAS" && riskCode == "TAD10800", outputs: {sumInsured: 350000, premium: 100}},
            {condition: productCode == "CRHEOPTIMAOAS" && riskCode == "HC20700", outputs: {sumInsured: 30000, premium: 150}},
            {condition: productCode == "GENCHKSPORT" && riskCode == "CU10800", outputs: {sumInsured: 20000, premium: 8900}},
            {condition: productCode == "GENCHKTALENTS" && riskCode == "CU10800", outputs: {sumInsured: 20000, premium: 8900}},
            {condition: productCode == "GENCHKHEALTH" && riskCode == "CU10800", outputs: {sumInsured: 20000, premium: 6900}},
            {condition: productCode == "PROGENTICSBFKO" && riskCode == "CU10800", outputs: {sumInsured: 30000, premium: 11500}},
            {condition: productCode == "PROHEALTHBFKO" && riskCode == "CU10800", outputs: {sumInsured: 130000, premium: 15000}},
            {condition: productCode == "PROZOZHBFKO" && riskCode == "TCU10800", outputs: {sumInsured: 30000, premium: 15000}}
        ]
            .filter(r => r.condition)
            .map(r => r.outputs);

        if(allOutputs.length === 0) {
            return undefined;
        }

        // return outputs based on hit policy (UNIQUE)
        return allOutputs[0];

    }


    // exported functions
    return {
        medFixedConfig: medFixedConfig
    };
})();
