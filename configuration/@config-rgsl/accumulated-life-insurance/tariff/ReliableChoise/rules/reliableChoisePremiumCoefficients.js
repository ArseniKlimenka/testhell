
/* eslint-disable */
/**
 * Additional services configuration
 *
 * @param  {object} input Expected input properties: productCode, paymentFrequency, contractTerm
 */
module.exports = function premiumCoefficients(input) {
// destructure input
    const {productCode, paymentFrequency, contractTerm} = input;

    // select outputs based on conditions
    const allOutputs = [
        {condition: productCode == "ERC" && paymentFrequency == 2 && contractTerm == "5", outputs: {E36102: 0.9764252137980917, DLPSS36102: 0.016797286137897778, DPVV36102: 0.016797286137897778, DNS36102: 0.004444262337056086, D36102: 0.002333237726954445}},
        {condition: productCode == "ERC" && paymentFrequency == 2 && contractTerm == "6", outputs: {E36102: 0.970509789126799, DLPSS36102: 0.02122137627029357, DPVV36102: 0.02122137627029357, DNS36102: 0.005422186624857278, D36102: 0.002846647978050071}},
        {condition: productCode == "ERC" && paymentFrequency == 2 && contractTerm == "7", outputs: {E36102: 0.964102338379513, DLPSS36102: 0.026091114927558126, DPVV36102: 0.026091114927558126, DNS36102: 0.006430522421592693, D36102: 0.0033760242713361636}},
        {condition: productCode == "ERC" && paymentFrequency == 2 && contractTerm == "8", outputs: {E36102: 0.9571714638930244, DLPSS36102: 0.03143773850182675, DPVV36102: 0.03143773850182675, DNS36102: 0.007469375478786124, D36102: 0.003921422126362715}},
        {condition: productCode == "ERC" && paymentFrequency == 2 && contractTerm == "9", outputs: {E36102: 0.94967496972307, DLPSS36102: 0.037303461193613364, DPVV36102: 0.037303461193613364, DNS36102: 0.008538733825125726, D36102: 0.004482835258191006}},
        {condition: productCode == "ERC" && paymentFrequency == 2 && contractTerm == "10", outputs: {E36102: 0.9415602041580353, DLPSS36102: 0.04374117357722038, DPVV36102: 0.04374117357722038, DNS36102: 0.00963844082934057, D36102: 0.005060181435403799}},
        {condition: productCode == "ERC" && paymentFrequency == 2 && contractTerm == "11", outputs: {E36102: 0.9328104342169771, DLPSS36102: 0.05076809909515242, DPVV36102: 0.05076809909515242, DNS36102: 0.010768174877292156, D36102: 0.005653291810578382}},
        {condition: productCode == "ERC" && paymentFrequency == 2 && contractTerm == "12", outputs: {E36102: 0.9233767857608878, DLPSS36102: 0.05843383191182103, DPVV36102: 0.05843383191182103, DNS36102: 0.01192746382117455, D36102: 0.006261918506116638}},
        {condition: productCode == "ERC" && paymentFrequency == 2 && contractTerm == "13", outputs: {E36102: 0.9132577623860482, DLPSS36102: 0.06674087504050212, DPVV36102: 0.06674087504050212, DNS36102: 0.013115647589147413, D36102: 0.006885714984302392}},
        {condition: productCode == "ERC" && paymentFrequency == 2 && contractTerm == "14", outputs: {E36102: 0.9024321815354966, DLPSS36102: 0.07571165613732124, DPVV36102: 0.07571165613732124, DNS36102: 0.014331909722742378, D36102: 0.007524252604439749}},
        {condition: productCode == "ERC" && paymentFrequency == 2 && contractTerm == "15", outputs: {E36102: 0.8908709360073002, DLPSS36102: 0.08537681984058332, DPVV36102: 0.08537681984058332, DNS36102: 0.015575242066961651, D36102: 0.008177002085154867}},
        {condition: productCode == "ERC" && paymentFrequency == 2 && contractTerm == "16", outputs: {E36102: 0.8785485748795424, DLPSS36102: 0.09576368058796651, DPVV36102: 0.09576368058796651, DNS36102: 0.016844422644256406, D36102: 0.008843321888234614}},
        {condition: productCode == "ERC" && paymentFrequency == 2 && contractTerm == "17", outputs: {E36102: 0.8654011888591248, DLPSS36102: 0.10693837435965832, DPVV36102: 0.10693837435965832, DNS36102: 0.018137991331945578, D36102: 0.009522445449271428}},
        {condition: productCode == "ERC" && paymentFrequency == 2 && contractTerm == "18", outputs: {E36102: 0.8512659673537153, DLPSS36102: 0.11906645700293837, DPVV36102: 0.11906645700293837, DNS36102: 0.01945414796285002, D36102: 0.01021342768049626}},
        {condition: productCode == "ERC" && paymentFrequency == 2 && contractTerm == "19", outputs: {E36102: 0.8360529662208362, DLPSS36102: 0.13224132774364442, DPVV36102: 0.13224132774364442, DNS36102: 0.020790626908537294, D36102: 0.010915079126982079}},
        {condition: productCode == "ERC" && paymentFrequency == 2 && contractTerm == "20", outputs: {E36102: 0.8197137634968629, DLPSS36102: 0.14651547096730805, DPVV36102: 0.14651547096730805, DNS36102: 0.022144764285789553, D36102: 0.011626001250039516}},
        {condition: productCode == "ERC" && paymentFrequency == 2 && contractTerm == "21", outputs: {E36102: 0.8022313698604421, DLPSS36102: 0.16191048277483525, DPVV36102: 0.16191048277483525, DNS36102: 0.023513539255555837, D36102: 0.012344608109166814}},
        {condition: productCode == "ERC" && paymentFrequency == 2 && contractTerm == "22", outputs: {E36102: 0.7835812973045899, DLPSS36102: 0.17845596854966053, DPVV36102: 0.17845596854966053, DNS36102: 0.024893596161147214, D36102: 0.013069137984602288}},
        {condition: productCode == "ERC" && paymentFrequency == 2 && contractTerm == "23", outputs: {E36102: 0.7637721560822017, DLPSS36102: 0.19614894890897447, DPVV36102: 0.19614894890897447, DNS36102: 0.026281242628736903, D36102: 0.013797652380086874}},
        {condition: productCode == "ERC" && paymentFrequency == 2 && contractTerm == "24", outputs: {E36102: 0.7427528654076816, DLPSS36102: 0.2150466365838619, DPVV36102: 0.2150466365838619, DNS36102: 0.027672457710463304, D36102: 0.014528040297993235}},
        {condition: productCode == "ERC" && paymentFrequency == 2 && contractTerm == "25", outputs: {E36102: 0.7204844686152255, DLPSS36102: 0.23519473986305633, DPVV36102: 0.23519473986305633, DNS36102: 0.029062814112602094, D36102: 0.0152579774091161}},
        {condition: productCode == "ERC" && paymentFrequency == 1 && contractTerm == "5", outputs: {E36102: 0.978334191540189, DLPSS36102: 0.016830125975410944, DPVV36102: 0.016830125975410944, DNS36102: 0.004835682484400065, D36102: 0}},
        {condition: productCode == "ERC" && paymentFrequency == 1 && contractTerm == "6", outputs: {E36102: 0.972707364307741, DLPSS36102: 0.021269428922950463, DPVV36102: 0.021269428922950463, DNS36102: 0.006023206769308487, D36102: 0}},
        {condition: productCode == "ERC" && paymentFrequency == 1 && contractTerm == "7", outputs: {E36102: 0.966550626001081, DLPSS36102: 0.026157371953567852, DPVV36102: 0.026157371953567852, DNS36102: 0.007292002045351075, D36102: 0}},
        {condition: productCode == "ERC" && paymentFrequency == 1 && contractTerm == "8", outputs: {E36102: 0.9598295671121854, DLPSS36102: 0.031525042351833905, DPVV36102: 0.031525042351833905, DNS36102: 0.008645390535980697, D36102: 0}},
        {condition: productCode == "ERC" && paymentFrequency == 1 && contractTerm == "9", outputs: {E36102: 0.9524989781682072, DLPSS36102: 0.03741438892447094, DPVV36102: 0.03741438892447094, DNS36102: 0.010086632907321787, D36102: 0}},
        {condition: productCode == "ERC" && paymentFrequency == 1 && contractTerm == "10", outputs: {E36102: 0.9445032157304598, DLPSS36102: 0.04387789428765471, DPVV36102: 0.04387789428765471, DNS36102: 0.011618889981885447, D36102: 0}},
        {condition: productCode == "ERC" && paymentFrequency == 1 && contractTerm == "11", outputs: {E36102: 0.9358227664175328, DLPSS36102: 0.05093204492386058, DPVV36102: 0.05093204492386058, DNS36102: 0.013245188658606485, D36102: 0}},
        {condition: productCode == "ERC" && paymentFrequency == 1 && contractTerm == "12", outputs: {E36102: 0.9264060835424871, DLPSS36102: 0.058625534237578505, DPVV36102: 0.058625534237578505, DNS36102: 0.014968382219934203, D36102: 0}},
        {condition: productCode == "ERC" && paymentFrequency == 1 && contractTerm == "13", outputs: {E36102: 0.9162493859215393, DLPSS36102: 0.06695950288115553, DPVV36102: 0.06695950288115553, DNS36102: 0.01679111119730533, D36102: 0}},
        {condition: productCode == "ERC" && paymentFrequency == 1 && contractTerm == "14", outputs: {E36102: 0.9053294980168097, DLPSS36102: 0.07595473327224891, DPVV36102: 0.07595473327224891, DNS36102: 0.018715768710941345, D36102: 0}},
        {condition: productCode == "ERC" && paymentFrequency == 1 && contractTerm == "15", outputs: {E36102: 0.8936156894787036, DLPSS36102: 0.08563986391707444, DPVV36102: 0.08563986391707444, DNS36102: 0.020744446604222047, D36102: 0}},
        {condition: productCode == "ERC" && paymentFrequency == 1 && contractTerm == "16", outputs: {E36102: 0.881081357670609, DLPSS36102: 0.09603975934916154, DPVV36102: 0.09603975934916154, DNS36102: 0.022878882980229293, D36102: 0}},
        {condition: productCode == "ERC" && paymentFrequency == 1 && contractTerm == "17", outputs: {E36102: 0.86766187926335, DLPSS36102: 0.10721772983070527, DPVV36102: 0.10721772983070527, DNS36102: 0.02512039090594478, D36102: 0}},
        {condition: productCode == "ERC" && paymentFrequency == 1 && contractTerm == "18", outputs: {E36102: 0.853194131266867, DLPSS36102: 0.11933614903159256, DPVV36102: 0.11933614903159256, DNS36102: 0.027469719701540565, D36102: 0}},
        {condition: productCode == "ERC" && paymentFrequency == 1 && contractTerm == "19", outputs: {E36102: 0.8375888049245198, DLPSS36102: 0.13248425655028842, DPVV36102: 0.13248425655028842, DNS36102: 0.029926938525191793, D36102: 0}},
        {condition: productCode == "ERC" && paymentFrequency == 1 && contractTerm == "20", outputs: {E36102: 0.8207991347155957, DLPSS36102: 0.146709469997663, DPVV36102: 0.146709469997663, DNS36102: 0.032491395286741234, D36102: 0}},
        {condition: productCode == "ERC" && paymentFrequency == 1 && contractTerm == "21", outputs: {E36102: 0.8028108811710941, DLPSS36102: 0.16202744274374978, DPVV36102: 0.16202744274374978, DNS36102: 0.03516167608515614, D36102: 0}},
        {condition: productCode == "ERC" && paymentFrequency == 1 && contractTerm == "22", outputs: {E36102: 0.7836034389769481, DLPSS36102: 0.1784610111835258, DPVV36102: 0.1784610111835258, DNS36102: 0.03793554983952603, D36102: 0}},
        {condition: productCode == "ERC" && paymentFrequency == 1 && contractTerm == "23", outputs: {E36102: 0.7631905049523712, DLPSS36102: 0.19599957156281247, DPVV36102: 0.19599957156281247, DNS36102: 0.04080992348481646, D36102: 0}},
        {condition: productCode == "ERC" && paymentFrequency == 1 && contractTerm == "24", outputs: {E36102: 0.7415274026141963, DLPSS36102: 0.21469183263187305, DPVV36102: 0.21469183263187305, DNS36102: 0.04378076475393074, D36102: 0}},
        {condition: productCode == "ERC" && paymentFrequency == 1 && contractTerm == "25", outputs: {E36102: 0.7185829801059226, DLPSS36102: 0.2345740185084966, DPVV36102: 0.2345740185084966, DNS36102: 0.04684300138558078, D36102: 0}},
        {condition: productCode == "ERC" && paymentFrequency == 3 && contractTerm == "5", outputs: {E36102: 0.9764252137980917, DLPSS36102: 0.016797286137897778, DPVV36102: 0.016797286137897778, DNS36102: 0.004444262337056086, D36102: 0.002333237726954445}},
        {condition: productCode == "ERC" && paymentFrequency == 3 && contractTerm == "6", outputs: {E36102: 0.970509789126799, DLPSS36102: 0.02122137627029357, DPVV36102: 0.02122137627029357, DNS36102: 0.005422186624857278, D36102: 0.002846647978050071}},
        {condition: productCode == "ERC" && paymentFrequency == 3 && contractTerm == "7", outputs: {E36102: 0.964102338379513, DLPSS36102: 0.026091114927558126, DPVV36102: 0.026091114927558126, DNS36102: 0.006430522421592693, D36102: 0.0033760242713361636}},
        {condition: productCode == "ERC" && paymentFrequency == 3 && contractTerm == "8", outputs: {E36102: 0.9571714638930244, DLPSS36102: 0.03143773850182675, DPVV36102: 0.03143773850182675, DNS36102: 0.007469375478786124, D36102: 0.003921422126362715}},
        {condition: productCode == "ERC" && paymentFrequency == 3 && contractTerm == "9", outputs: {E36102: 0.94967496972307, DLPSS36102: 0.037303461193613364, DPVV36102: 0.037303461193613364, DNS36102: 0.008538733825125726, D36102: 0.004482835258191006}},
        {condition: productCode == "ERC" && paymentFrequency == 3 && contractTerm == "10", outputs: {E36102: 0.9415602041580353, DLPSS36102: 0.04374117357722038, DPVV36102: 0.04374117357722038, DNS36102: 0.00963844082934057, D36102: 0.005060181435403799}},
        {condition: productCode == "ERC" && paymentFrequency == 3 && contractTerm == "11", outputs: {E36102: 0.9328104342169771, DLPSS36102: 0.05076809909515242, DPVV36102: 0.05076809909515242, DNS36102: 0.010768174877292156, D36102: 0.005653291810578382}},
        {condition: productCode == "ERC" && paymentFrequency == 3 && contractTerm == "12", outputs: {E36102: 0.9233767857608878, DLPSS36102: 0.05843383191182103, DPVV36102: 0.05843383191182103, DNS36102: 0.01192746382117455, D36102: 0.006261918506116638}},
        {condition: productCode == "ERC" && paymentFrequency == 3 && contractTerm == "13", outputs: {E36102: 0.9132577623860482, DLPSS36102: 0.06674087504050212, DPVV36102: 0.06674087504050212, DNS36102: 0.013115647589147413, D36102: 0.006885714984302392}},
        {condition: productCode == "ERC" && paymentFrequency == 3 && contractTerm == "14", outputs: {E36102: 0.9024321815354966, DLPSS36102: 0.07571165613732124, DPVV36102: 0.07571165613732124, DNS36102: 0.014331909722742378, D36102: 0.007524252604439749}},
        {condition: productCode == "ERC" && paymentFrequency == 3 && contractTerm == "15", outputs: {E36102: 0.8908709360073002, DLPSS36102: 0.08537681984058332, DPVV36102: 0.08537681984058332, DNS36102: 0.015575242066961651, D36102: 0.008177002085154867}},
        {condition: productCode == "ERC" && paymentFrequency == 3 && contractTerm == "16", outputs: {E36102: 0.8785485748795424, DLPSS36102: 0.09576368058796651, DPVV36102: 0.09576368058796651, DNS36102: 0.016844422644256406, D36102: 0.008843321888234614}},
        {condition: productCode == "ERC" && paymentFrequency == 3 && contractTerm == "17", outputs: {E36102: 0.8654011888591248, DLPSS36102: 0.10693837435965832, DPVV36102: 0.10693837435965832, DNS36102: 0.018137991331945578, D36102: 0.009522445449271428}},
        {condition: productCode == "ERC" && paymentFrequency == 3 && contractTerm == "18", outputs: {E36102: 0.8512659673537153, DLPSS36102: 0.11906645700293837, DPVV36102: 0.11906645700293837, DNS36102: 0.01945414796285002, D36102: 0.01021342768049626}},
        {condition: productCode == "ERC" && paymentFrequency == 3 && contractTerm == "19", outputs: {E36102: 0.8360529662208362, DLPSS36102: 0.13224132774364442, DPVV36102: 0.13224132774364442, DNS36102: 0.020790626908537294, D36102: 0.010915079126982079}},
        {condition: productCode == "ERC" && paymentFrequency == 3 && contractTerm == "20", outputs: {E36102: 0.8197137634968629, DLPSS36102: 0.14651547096730805, DPVV36102: 0.14651547096730805, DNS36102: 0.022144764285789553, D36102: 0.011626001250039516}},
        {condition: productCode == "ERC" && paymentFrequency == 3 && contractTerm == "21", outputs: {E36102: 0.8022313698604421, DLPSS36102: 0.16191048277483525, DPVV36102: 0.16191048277483525, DNS36102: 0.023513539255555837, D36102: 0.012344608109166814}},
        {condition: productCode == "ERC" && paymentFrequency == 3 && contractTerm == "22", outputs: {E36102: 0.7835812973045899, DLPSS36102: 0.17845596854966053, DPVV36102: 0.17845596854966053, DNS36102: 0.024893596161147214, D36102: 0.013069137984602288}},
        {condition: productCode == "ERC" && paymentFrequency == 3 && contractTerm == "23", outputs: {E36102: 0.7637721560822017, DLPSS36102: 0.19614894890897447, DPVV36102: 0.19614894890897447, DNS36102: 0.026281242628736903, D36102: 0.013797652380086874}},
        {condition: productCode == "ERC" && paymentFrequency == 3 && contractTerm == "24", outputs: {E36102: 0.7427528654076816, DLPSS36102: 0.2150466365838619, DPVV36102: 0.2150466365838619, DNS36102: 0.027672457710463304, D36102: 0.014528040297993235}},
        {condition: productCode == "ERC" && paymentFrequency == 3 && contractTerm == "25", outputs: {E36102: 0.7204844686152255, DLPSS36102: 0.23519473986305633, DPVV36102: 0.23519473986305633, DNS36102: 0.029062814112602094, D36102: 0.0152579774091161}}
    ]
        .filter(r => r.condition)
        .map(r => r.outputs);

    if(allOutputs.length === 0) {
        return undefined;
    }

    // return outputs based on hit policy (UNIQUE)
    return allOutputs[0];

};
