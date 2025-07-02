const commonSql = require('@adinsure-tools/common-sql');

async function executor(step, context, stepContext) {

    const config = JSON.parse(process.env.TEST_ENV_CONFIG);

    const testingEnvironment = config.testingProperties.databaseTestingEnvironments[config.databaseProvider];
    testingEnvironment.trustServerCertificate = true; // TODO: remove this line after LJADIRDSUP-17823 will be fixed
    const database = await commonSql.createDatabase(config.databaseProvider, testingEnvironment);

    const parameters = {
        contractNumber: context.contractNumber,
        calcDate: context.cancellationValidFrom,
        amount: context.amount,
    };
    const result = await database.execute(`
INSERT INTO PAS_IMPL.INVESTMENT_PROFIT
(
    INV_PROFIT_ROW_ID,
    IMPORT_DOCUMENT_ID,
    CONTRACT_NUMBER,
    INV_PROFIT_CALC_DATE,
    INV_PROFIT_RATE,
    INV_PROFIT_PAY_TYPE_CODE,
    LOAD_DATE
)
VALUES
(
    NEWID(),
    '00000000-0000-0000-0000-000000000000',
    @contractNumber,
    @calcDate,
    @amount,
    1,
    SYSDATETIME()
)`, parameters);
    console.log('SQL UPDATE RESULT: ' + JSON.stringify(result));
}

module.exports = {
    executor,
};
