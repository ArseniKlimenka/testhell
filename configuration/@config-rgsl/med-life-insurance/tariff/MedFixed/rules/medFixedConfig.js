
/* eslint-disable */
/**
 * medFixedConfig
 *
 * @param  {object} input Expected input properties: productCode, riskCode
 */
module.exports = function medFixedConfig(input) {
// destructure input
    const {productCode, riskCode} = input;

    // select outputs based on conditions
    const allOutputs = [
        {condition: productCode == "RHELIGHTOAS" && riskCode == "RCON10800", outputs: {sumInsured: 150000, premium: 390}},
        {condition: productCode == "RHELIGHTOAS" && riskCode == "RIHON10800", outputs: {sumInsured: 150000, premium: 300}},
        {condition: productCode == "RHELIGHTOAS" && riskCode == "RSON10800", outputs: {sumInsured: 150000, premium: 300}},
        {condition: productCode == "RHEBASEOAS" && riskCode == "RIH10800", outputs: {sumInsured: 750000, premium: 795}},
        {condition: productCode == "RHEBASEOAS" && riskCode == "RS10800", outputs: {sumInsured: 750000, premium: 795}},
        {condition: productCode == "RHEBASEOAS" && riskCode == "TIH10800", outputs: {sumInsured: 350000, premium: 100}},
        {condition: productCode == "RHEBASEOAS" && riskCode == "TS10800", outputs: {sumInsured: 350000, premium: 100}},
        {condition: productCode == "RHEBASEOAS" && riskCode == "HC20700", outputs: {sumInsured: 30000, premium: 110}},
        {condition: productCode == "RHEOPTIMAOAS" && riskCode == "RC10800", outputs: {sumInsured: 750000, premium: 750}},
        {condition: productCode == "RHEOPTIMAOAS" && riskCode == "RIH10800", outputs: {sumInsured: 750000, premium: 750}},
        {condition: productCode == "RHEOPTIMAOAS" && riskCode == "RS10800", outputs: {sumInsured: 750000, premium: 750}},
        {condition: productCode == "RHEOPTIMAOAS" && riskCode == "RAD10800", outputs: {sumInsured: 750000, premium: 500}},
        {condition: productCode == "RHEOPTIMAOAS" && riskCode == "TC10800", outputs: {sumInsured: 50000, premium: 100}},
        {condition: productCode == "RHEOPTIMAOAS" && riskCode == "TIH10800", outputs: {sumInsured: 350000, premium: 100}},
        {condition: productCode == "RHEOPTIMAOAS" && riskCode == "TS10800", outputs: {sumInsured: 350000, premium: 100}},
        {condition: productCode == "RHEOPTIMAOAS" && riskCode == "TAD10800", outputs: {sumInsured: 350000, premium: 100}},
        {condition: productCode == "RHEOPTIMAOAS" && riskCode == "HC20700", outputs: {sumInsured: 30000, premium: 150}},
        {condition: productCode == "GENCHKSPORT" && riskCode == "CU10800", outputs: {sumInsured: 20000, premium: 8900}},
        {condition: productCode == "GENCHKTALENTS" && riskCode == "CU10800", outputs: {sumInsured: 20000, premium: 8900}},
        {condition: productCode == "GENCHKHEALTH" && riskCode == "CU10800", outputs: {sumInsured: 20000, premium: 6900}},
        {condition: productCode == "PROGENTICSBFKO" && riskCode == "CU10800", outputs: {sumInsured: 30000, premium: 11500}},
        {condition: productCode == "PROHEALTHBFKO" && riskCode == "CU10800", outputs: {sumInsured: 130000, premium: 15000}},
        {condition: productCode == "PROZOZHBFKO" && riskCode == "TCU10800", outputs: {sumInsured: 30000, premium: 15000}},
        {condition: productCode == "MOPROZVBFKO" && riskCode == "CU10800", outputs: {sumInsured: 30000, premium: 13500}},
        {condition: productCode == "MOPROCHEKVBFKO" && riskCode == "CU10800", outputs: {sumInsured: 30000, premium: 13500}}
    ]
        .filter(r => r.condition)
        .map(r => r.outputs);

    if(allOutputs.length === 0) {
        return undefined;
    }

    // return outputs based on hit policy (UNIQUE)
    return allOutputs[0];

};
