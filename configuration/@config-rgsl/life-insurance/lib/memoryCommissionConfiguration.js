
/* eslint-disable */

module.exports = (function moduleDefinition() {


    /* eslint-disable */
    /**
     * Memory Commission Configuration
     *
     * @param  {object} input Expected input properties: productCode, paymentFrequencyCode, insuranceTerms, issueDate
     */
    function memoryCommissionConfiguration(input) {
        // destructure input
        const {productCode, paymentFrequencyCode, insuranceTerms, issueDate} = input;

        // select outputs based on conditions
        const allOutputs = [
            {condition: ["ERC", "ERCP"].includes(productCode) && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 19, rko: 0}},
            {condition: ["ERC", "ERCP"].includes(productCode) && ["2", "3"].includes(paymentFrequencyCode) && insuranceTerms == "5" && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 12, rko: 0}},
            {condition: ["ERC", "ERCP"].includes(productCode) && ["2", "3"].includes(paymentFrequencyCode) && insuranceTerms == "6" && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 10, rko: 0}},
            {condition: ["ERC", "ERCP"].includes(productCode) && ["2", "3"].includes(paymentFrequencyCode) && insuranceTerms == "7" && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 10, rko: 0}},
            {condition: ["ERC", "ERCP"].includes(productCode) && ["2", "3"].includes(paymentFrequencyCode) && insuranceTerms == "8" && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 8.75, rko: 0}},
            {condition: ["ERC", "ERCP"].includes(productCode) && ["2", "3"].includes(paymentFrequencyCode) && insuranceTerms == "9" && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 7.78, rko: 0}},
            {condition: ["ERC", "ERCP"].includes(productCode) && ["2", "3"].includes(paymentFrequencyCode) && insuranceTerms == "10" && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 9, rko: 0}},
            {condition: ["ERC", "ERCP"].includes(productCode) && ["2", "3"].includes(paymentFrequencyCode) && insuranceTerms == "11" && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 8.18, rko: 0}},
            {condition: ["ERC", "ERCP"].includes(productCode) && ["2", "3"].includes(paymentFrequencyCode) && insuranceTerms == "12" && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 7.5, rko: 0}},
            {condition: ["ERC", "ERCP"].includes(productCode) && ["2", "3"].includes(paymentFrequencyCode) && insuranceTerms == "13" && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 6.92, rko: 0}},
            {condition: ["ERC", "ERCP"].includes(productCode) && ["2", "3"].includes(paymentFrequencyCode) && insuranceTerms == "14" && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 6.43, rko: 0}},
            {condition: ["ERC", "ERCP"].includes(productCode) && ["2", "3"].includes(paymentFrequencyCode) && insuranceTerms == "15" && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 6, rko: 0}},
            {condition: ["ERC", "ERCP"].includes(productCode) && ["2", "3"].includes(paymentFrequencyCode) && insuranceTerms == "16" && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 5.63, rko: 0}},
            {condition: ["ERC", "ERCP"].includes(productCode) && ["2", "3"].includes(paymentFrequencyCode) && insuranceTerms == "17" && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 5.29, rko: 0}},
            {condition: ["ERC", "ERCP"].includes(productCode) && ["2", "3"].includes(paymentFrequencyCode) && insuranceTerms == "18" && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 5, rko: 0}},
            {condition: ["ERC", "ERCP"].includes(productCode) && ["2", "3"].includes(paymentFrequencyCode) && insuranceTerms == "19" && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 7.74, rko: 0}},
            {condition: ["ERC", "ERCP"].includes(productCode) && ["2", "3"].includes(paymentFrequencyCode) && insuranceTerms == "20" && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 4.5, rko: 0}},
            {condition: ["ERC", "ERCP"].includes(productCode) && ["2", "3"].includes(paymentFrequencyCode) && insuranceTerms == "21" && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 4.29, rko: 0}},
            {condition: ["ERC", "ERCP"].includes(productCode) && ["2", "3"].includes(paymentFrequencyCode) && insuranceTerms == "22" && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 4.09, rko: 0}},
            {condition: ["ERC", "ERCP"].includes(productCode) && ["2", "3"].includes(paymentFrequencyCode) && insuranceTerms == "23" && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 3.91, rko: 0}},
            {condition: ["ERC", "ERCP"].includes(productCode) && ["2", "3"].includes(paymentFrequencyCode) && insuranceTerms == "24" && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 3.75, rko: 0}},
            {condition: ["ERC", "ERCP"].includes(productCode) && ["2", "3"].includes(paymentFrequencyCode) && insuranceTerms == "25" && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 3.6, rko: 0}},
            {condition: productCode == "EHVP" && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 20, rko: 0}},
            {condition: productCode == "EHVP" && ["2", "3"].includes(paymentFrequencyCode) && true && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 4.29, rko: 0}},
            {condition: ["IDC3", "IDCP3"].includes(productCode) && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2022-01-31"), outputs: {allIncome: 10.75, rko: 0}},
            {condition: ["IDC3", "IDCP3"].includes(productCode) && paymentFrequencyCode == "1" && true && (issueDate >= "2022-02-01" && issueDate <= "2022-02-28"), outputs: {allIncome: 12.5, rko: 0}},
            {condition: ["IDC3", "IDCP3"].includes(productCode) && paymentFrequencyCode == "1" && true && (issueDate >= "2022-03-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 13.5, rko: 0}},
            {condition: ["IDC5", "IDCP5", "IDC", "IDCP"].includes(productCode) && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2022-01-31"), outputs: {allIncome: 13.75, rko: 0}},
            {condition: ["IDC5", "IDCP5", "IDC", "IDCP"].includes(productCode) && paymentFrequencyCode == "1" && true && (issueDate >= "2022-02-01" && issueDate <= "2022-02-28"), outputs: {allIncome: 15.5, rko: 0}},
            {condition: ["IDC5", "IDCP5", "IDC", "IDCP"].includes(productCode) && paymentFrequencyCode == "1" && true && (issueDate >= "2022-03-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 16.5, rko: 0}},
            {condition: ["IBI3", "IBIP3"].includes(productCode) && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 7, rko: 0}},
            {condition: ["IBI5", "IBIP5"].includes(productCode) && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 11, rko: 0}},
            {condition: ["IBI10", "IBIP10"].includes(productCode) && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 16, rko: 0}},
            {condition: ["IBI3BFKO", "IBI3BFKO17"].includes(productCode) && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 3.21, rko: 0}},
            {condition: ["IBI5BFKO", "IBI5BFKO17"].includes(productCode) && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 5.66, rko: 0}},
            {condition: productCode == "IBI3AKCEPT" && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 7, rko: 0}},
            {condition: productCode == "IBI5AKCEPT" && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 9, rko: 0}},
            {condition: productCode == "IBI2ZENIT" && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 4.3, rko: 0}},
            {condition: productCode == "IBI3ZENIT" && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2022-10-09"), outputs: {allIncome: 7.4, rko: 0}},
            {condition: productCode == "IBI3ZENIT" && paymentFrequencyCode == "1" && true && (issueDate >= "2022-10-10" && issueDate <= "2099-12-31"), outputs: {allIncome: 6.9, rko: 0}},
            {condition: productCode == "IBI5ZENIT" && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2022-10-09"), outputs: {allIncome: 9.5, rko: 0}},
            {condition: productCode == "IBI5ZENIT" && paymentFrequencyCode == "1" && true && (issueDate >= "2022-10-10" && issueDate <= "2099-12-31"), outputs: {allIncome: 9, rko: 0}},
            {condition: productCode == "IBA3" && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 7, rko: 0}},
            {condition: productCode == "IBA5" && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 11, rko: 0}},
            {condition: productCode == "IBA3BFKO" && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 3.21, rko: 0}},
            {condition: productCode == "IBA5BFKO" && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 5.66, rko: 0}},
            {condition: ["IBAP3", "IBA3REINVEST"].includes(productCode) && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 7, rko: 0}},
            {condition: ["IBAP5", "IBA5REINVEST"].includes(productCode) && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 11, rko: 0}},
            {condition: productCode == "IBI3OAS" && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2022-12-31"), outputs: {allIncome: 4.93, rko: 0}},
            {condition: productCode == "IBI3OAS" && paymentFrequencyCode == "1" && true && (issueDate >= "2023-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 2.96, rko: 0}},
            {condition: productCode == "IBI5OAS" && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2022-12-31"), outputs: {allIncome: 7.56, rko: 0}},
            {condition: productCode == "IBI5OAS" && paymentFrequencyCode == "1" && true && (issueDate >= "2023-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 4.29, rko: 0}},
            {condition: productCode == "EBMIBFKO" && paymentFrequencyCode == "2" && true && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 1.53, rko: 0}},
            {condition: productCode == "NOTEV2BFKO" && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 4, rko: 0}},
            {condition: productCode == "NOTEV3BFKO" && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 1, rko: 0}},
            {condition: productCode == "IBA3SMP" && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 6.3, rko: 0}},
            {condition: productCode == "IBA5SMP" && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 10.3, rko: 0}},
            {condition: productCode == "NOTE2BFKO" && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 4, rko: 0}},
            {condition: productCode == "NOTE3BFKO" && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 1.5, rko: 0}},
            {condition: productCode == "NOTE1BFKO" && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 1.5, rko: 0}},
            {condition: ["NOTE1BFKO3", "NOTE1BFKO4"].includes(productCode) && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 1.5, rko: 0}},
            {condition: productCode == "IBI3ZENIT17" && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 6.9, rko: 0}},
            {condition: productCode == "IBI5ZENIT17" && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 9, rko: 0}},
            {condition: productCode == "NOTEV1BFKO" && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 1, rko: 0}},
            {condition: productCode == "IBAV3VTB" && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2024-06-12"), outputs: {allIncome: 7.5, rko: 0}},
            {condition: productCode == "IBAV3VTB" && paymentFrequencyCode == "1" && true && (issueDate >= "2024-06-13" && issueDate <= "2024-07-31"), outputs: {allIncome: 7.5, rko: 0.027}},
            {condition: productCode == "IBAV3VTB" && paymentFrequencyCode == "1" && true && (issueDate >= "2024-08-01" && issueDate <= "2024-09-01"), outputs: {allIncome: 9, rko: 0.027}},
            {condition: productCode == "IBAV3VTB" && paymentFrequencyCode == "1" && true && (issueDate >= "2024-09-02" && issueDate <= "2024-12-10"), outputs: {allIncome: 9.47, rko: 0.027}},
            {condition: productCode == "IBAV3VTB" && paymentFrequencyCode == "1" && true && (issueDate >= "2024-12-11" && issueDate <= "2025-04-27"), outputs: {allIncome: 9, rko: 0.027}},
            {condition: productCode == "IBAV3VTB" && paymentFrequencyCode == "1" && true && (issueDate >= "2025-04-28" && issueDate <= "2025-06-24"), outputs: {allIncome: 8, rko: 0.027}},
            {condition: productCode == "IBAV3VTB" && paymentFrequencyCode == "1" && true && (issueDate >= "2025-06-25" && issueDate <= "2099-12-31"), outputs: {allIncome: 6.5, rko: 0.027}},
            {condition: productCode == "IBAV5VTB" && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2024-06-12"), outputs: {allIncome: 8, rko: 0}},
            {condition: productCode == "IBAV5VTB" && paymentFrequencyCode == "1" && true && (issueDate >= "2024-06-13" && issueDate <= "2024-07-31"), outputs: {allIncome: 8, rko: 0.027}},
            {condition: productCode == "IBAV5VTB" && paymentFrequencyCode == "1" && true && (issueDate >= "2024-08-01" && issueDate <= "2024-09-01"), outputs: {allIncome: 10.5, rko: 0.027}},
            {condition: productCode == "IBAV5VTB" && paymentFrequencyCode == "1" && true && (issueDate >= "2024-09-02" && issueDate <= "2024-12-10"), outputs: {allIncome: 10.97, rko: 0.027}},
            {condition: productCode == "IBAV5VTB" && paymentFrequencyCode == "1" && true && (issueDate >= "2024-12-11" && issueDate <= "2025-04-27"), outputs: {allIncome: 10.5, rko: 0.027}},
            {condition: productCode == "IBAV5VTB" && paymentFrequencyCode == "1" && true && (issueDate >= "2025-04-28" && issueDate <= "2099-12-31"), outputs: {allIncome: 10, rko: 0.027}},
            {condition: productCode == "IBAP3VTB" && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2024-06-12"), outputs: {allIncome: 8, rko: 0}},
            {condition: productCode == "IBAP3VTB" && paymentFrequencyCode == "1" && true && (issueDate >= "2024-06-13" && issueDate <= "2024-07-31"), outputs: {allIncome: 8, rko: 0.36}},
            {condition: productCode == "IBAP3VTB" && paymentFrequencyCode == "1" && true && (issueDate >= "2024-08-01" && issueDate <= "2025-04-27"), outputs: {allIncome: 10, rko: 0.36}},
            {condition: productCode == "IBAP3VTB" && paymentFrequencyCode == "1" && true && (issueDate >= "2025-04-28" && issueDate <= "2025-06-24"), outputs: {allIncome: 8.5, rko: 0.36}},
            {condition: productCode == "IBAP3VTB" && paymentFrequencyCode == "1" && true && (issueDate >= "2025-06-25" && issueDate <= "2099-12-31"), outputs: {allIncome: 7, rko: 0.36}},
            {condition: productCode == "IBAP5VTB" && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2024-06-12"), outputs: {allIncome: 10, rko: 0}},
            {condition: productCode == "IBAP5VTB" && paymentFrequencyCode == "1" && true && (issueDate >= "2024-06-13" && issueDate <= "2024-07-31"), outputs: {allIncome: 10, rko: 0.36}},
            {condition: productCode == "IBAP5VTB" && paymentFrequencyCode == "1" && true && (issueDate >= "2024-08-01" && issueDate <= "2025-04-27"), outputs: {allIncome: 12, rko: 0.36}},
            {condition: productCode == "IBAP5VTB" && paymentFrequencyCode == "1" && true && (issueDate >= "2025-04-28" && issueDate <= "2099-12-31"), outputs: {allIncome: 11.5, rko: 0.36}},
            {condition: productCode == "IBA2P3" && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 7, rko: 0}},
            {condition: productCode == "IBAKVV5VTB" && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 4, rko: 0.027}},
            {condition: productCode == "IBAKVP5VTB" && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 4, rko: 0.36}},
            {condition: productCode == "IBA2P3VTB" && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 5.5, rko: 0.36}},
            {condition: productCode == "IBA2P5VTB" && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 7, rko: 0.36}},
            {condition: productCode == "IBA2V3VTB" && paymentFrequencyCode == "1" && true && (issueDate >= "2024-08-01" && issueDate <= "2024-09-01"), outputs: {allIncome: 5.5, rko: 0.027}},
            {condition: productCode == "IBA2V3VTB" && paymentFrequencyCode == "1" && true && (issueDate >= "2024-09-02" && issueDate <= "2024-12-10"), outputs: {allIncome: 5.97, rko: 0.027}},
            {condition: productCode == "IBA2V3VTB" && paymentFrequencyCode == "1" && true && (issueDate >= "2024-12-11" && issueDate <= "2099-12-31"), outputs: {allIncome: 5.5, rko: 0.027}},
            {condition: productCode == "IBA2V5VTB" && paymentFrequencyCode == "1" && true && (issueDate >= "2024-08-01" && issueDate <= "2024-09-01"), outputs: {allIncome: 7, rko: 0.027}},
            {condition: productCode == "IBA2V5VTB" && paymentFrequencyCode == "1" && true && (issueDate >= "2024-09-02" && issueDate <= "2024-12-10"), outputs: {allIncome: 7.47, rko: 0.027}},
            {condition: productCode == "IBA2V5VTB" && paymentFrequencyCode == "1" && true && (issueDate >= "2024-12-11" && issueDate <= "2099-12-31"), outputs: {allIncome: 7, rko: 0.027}},
            {condition: productCode == "IBAKVV5PEVTB" && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 4, rko: 0.027}},
            {condition: productCode == "IBAKVP5PEVTB" && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 4, rko: 0.36}},
            {condition: productCode == "PREEQUITYVTB" && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 11.663, rko: 0}},
            {condition: productCode == "PREEQUITYPVTB" && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 11.663, rko: 0}},
            {condition: productCode == "PREEQUITYOAS" && paymentFrequencyCode == "1" && true && (issueDate >= "2000-01-01" && issueDate <= "2099-12-31"), outputs: {allIncome: 12.363, rko: 0}}
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
        memoryCommissionConfiguration: memoryCommissionConfiguration
    };
})();
