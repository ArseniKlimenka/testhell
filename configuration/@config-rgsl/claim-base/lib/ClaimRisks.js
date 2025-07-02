
/* eslint-disable */

module.exports = (function moduleDefinition() {


    /* eslint-disable */
    /**
     * Title
     *
     * @param  {object} input Expected input properties: riskCode
     */
    function claimRisks(input) {
        // destructure input
        const {riskCode} = input;

        // select outputs based on conditions
        const allOutputs = [
            {condition: riskCode == "CD36404", outputs: {isOUSVRisk: 0, isDeathRisk: 0}},
            {condition: riskCode == "CD42204", outputs: {isOUSVRisk: 0, isDeathRisk: 0}},
            {condition: riskCode == "CDH10800", outputs: {isOUSVRisk: 0, isDeathRisk: 0}},
            {condition: riskCode == "CDHR10800", outputs: {isOUSVRisk: 0, isDeathRisk: 0}},
            {condition: riskCode == "CDHW10800", outputs: {isOUSVRisk: 0, isDeathRisk: 0}},
            {condition: riskCode == "CDP36102", outputs: {isOUSVRisk: 0, isDeathRisk: 0}},
            {condition: riskCode == "CDP36404", outputs: {isOUSVRisk: 0, isDeathRisk: 0}},
            {condition: riskCode == "CDP42204", outputs: {isOUSVRisk: 0, isDeathRisk: 0}},
            {condition: riskCode == "CDVV36404", outputs: {isOUSVRisk: 1, isDeathRisk: 0}},
            {condition: riskCode == "CTDA36404", outputs: {isOUSVRisk: 0, isDeathRisk: 0}},
            {condition: riskCode == "CU10800", outputs: {isOUSVRisk: 0, isDeathRisk: 0}},
            {condition: riskCode == "D36102", outputs: {isOUSVRisk: 1, isDeathRisk: 0}},
            {condition: riskCode == "D36404", outputs: {isOUSVRisk: 1, isDeathRisk: 0}},
            {condition: riskCode == "D42204", outputs: {isOUSVRisk: 0, isDeathRisk: 0}},
            {condition: riskCode == "DA10010042204", outputs: {isOUSVRisk: 0, isDeathRisk: 0}},
            {condition: riskCode == "DA1005042204", outputs: {isOUSVRisk: 0, isDeathRisk: 0}},
            {condition: riskCode == "DA12012042204", outputs: {isOUSVRisk: 0, isDeathRisk: 0}},
            {condition: riskCode == "DA36102", outputs: {isOUSVRisk: 1, isDeathRisk: 0}},
            {condition: riskCode == "DA36404", outputs: {isOUSVRisk: 1, isDeathRisk: 0}},
            {condition: riskCode == "DASS36404", outputs: {isOUSVRisk: 0, isDeathRisk: 0}},
            {condition: riskCode == "DAVV36404", outputs: {isOUSVRisk: 0, isDeathRisk: 0}},
            {condition: riskCode == "DDTP36404", outputs: {isOUSVRisk: 0, isDeathRisk: 1}},
            {condition: riskCode == "DI10010042204", outputs: {isOUSVRisk: 0, isDeathRisk: 0}},
            {condition: riskCode == "DI1005042204", outputs: {isOUSVRisk: 0, isDeathRisk: 0}},
            {condition: riskCode == "DI12012042204", outputs: {isOUSVRisk: 0, isDeathRisk: 0}},
            {condition: riskCode == "DIL42204", outputs: {isOUSVRisk: 0, isDeathRisk: 1}},
            {condition: riskCode == "DLP36404", outputs: {isOUSVRisk: 0, isDeathRisk: 1}},
            {condition: riskCode == "DLP36904", outputs: {isOUSVRisk: 0, isDeathRisk: 1}},
            {condition: riskCode == "DLP42204", outputs: {isOUSVRisk: 0, isDeathRisk: 1}},
            {condition: riskCode == "DLPDP36404", outputs: {isOUSVRisk: 0, isDeathRisk: 0}},
            {condition: riskCode == "DLPDP36904", outputs: {isOUSVRisk: 0, isDeathRisk: 0}},
            {condition: riskCode == "DLPSS36102", outputs: {isOUSVRisk: 0, isDeathRisk: 1}},
            {condition: riskCode == "DLPSS36404", outputs: {isOUSVRisk: 0, isDeathRisk: 1}},
            {condition: riskCode == "DLPT36404", outputs: {isOUSVRisk: 0, isDeathRisk: 1}},
            {condition: riskCode == "DLPVV36404", outputs: {isOUSVRisk: 0, isDeathRisk: 1}},
            {condition: riskCode == "DLPVV7036404", outputs: {isOUSVRisk: 0, isDeathRisk: 1}},
            {condition: riskCode == "DMS210800", outputs: {isOUSVRisk: 0, isDeathRisk: 0}},
            {condition: riskCode == "DNS36102", outputs: {isOUSVRisk: 0, isDeathRisk: 1}},
            {condition: riskCode == "DNS36404", outputs: {isOUSVRisk: 0, isDeathRisk: 1}},
            {condition: riskCode == "DNS36904", outputs: {isOUSVRisk: 0, isDeathRisk: 1}},
            {condition: riskCode == "DNS42204", outputs: {isOUSVRisk: 0, isDeathRisk: 1}},
            {condition: riskCode == "DNSVV36404", outputs: {isOUSVRisk: 0, isDeathRisk: 1}},
            {condition: riskCode == "DPVV36102", outputs: {isOUSVRisk: 0, isDeathRisk: 1}},
            {condition: riskCode == "DTP36404", outputs: {isOUSVRisk: 0, isDeathRisk: 1}},
            {condition: riskCode == "DVV36404", outputs: {isOUSVRisk: 0, isDeathRisk: 0}},
            {condition: riskCode == "E36102", outputs: {isOUSVRisk: 0, isDeathRisk: 0}},
            {condition: riskCode == "E36404", outputs: {isOUSVRisk: 0, isDeathRisk: 0}},
            {condition: riskCode == "E36904", outputs: {isOUSVRisk: 0, isDeathRisk: 0}},
            {condition: riskCode == "HA42204", outputs: {isOUSVRisk: 0, isDeathRisk: 0}},
            {condition: riskCode == "HI36102", outputs: {isOUSVRisk: 0, isDeathRisk: 0}},
            {condition: riskCode == "HI36404", outputs: {isOUSVRisk: 0, isDeathRisk: 0}},
            {condition: riskCode == "I42204", outputs: {isOUSVRisk: 0, isDeathRisk: 0}},
            {condition: riskCode == "IDLPDP36904", outputs: {isOUSVRisk: 0, isDeathRisk: 0}},
            {condition: riskCode == "IDLPVV36904", outputs: {isOUSVRisk: 0, isDeathRisk: 1}},
            {condition: riskCode == "IDNSSS36904", outputs: {isOUSVRisk: 0, isDeathRisk: 1}},
            {condition: riskCode == "IDNSVV36904", outputs: {isOUSVRisk: 0, isDeathRisk: 1}},
            {condition: riskCode == "IE36904", outputs: {isOUSVRisk: 0, isDeathRisk: 0}},
            {condition: riskCode == "ITP42204", outputs: {isOUSVRisk: 0, isDeathRisk: 0}},
            {condition: riskCode == "JL36102", outputs: {isOUSVRisk: 1, isDeathRisk: 0}},
            {condition: riskCode == "JL36404", outputs: {isOUSVRisk: 1, isDeathRisk: 0}},
            {condition: riskCode == "JL42204", outputs: {isOUSVRisk: 0, isDeathRisk: 0}},
            {condition: riskCode == "TDA42204", outputs: {isOUSVRisk: 0, isDeathRisk: 0}},
            {condition: riskCode == "TDLP42204", outputs: {isOUSVRisk: 0, isDeathRisk: 0}}
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
        claimRisks: claimRisks
    };
})();
