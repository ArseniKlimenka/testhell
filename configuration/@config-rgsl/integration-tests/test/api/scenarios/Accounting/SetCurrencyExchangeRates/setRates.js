const { Client } = require('@adinsure-tools/api-test-framework');
const commonSql = require('@adinsure-tools/common-sql');

async function setRates(step, context, stepContext) {

    const config = JSON.parse(process.env.TEST_ENV_CONFIG);

    const testingEnvironment = config.testingProperties.databaseTestingEnvironments[config.databaseProvider];
    testingEnvironment.trustServerCertificate = true; // TODO: remove this line after LJADIRDSUP-17823 will be fixed
    const database = await commonSql.createDatabase(config.databaseProvider, testingEnvironment);

    if (!context.currencies) {
        throw new Error('currencies context parameter must be specified!');
    }

    for (const currencyCode in context.currencies) {
        const parameters = {
            currencyCode: currencyCode,
        };
        const deleteResult = await database.execute('delete from bfx.CURRENCY_EXCHANGE_RATE where CURRENCY_CODE in (@currencyCode)', parameters);
        console.log('Currency code: ' + currencyCode);
        console.log('SQL DELETE RESULT: ' + JSON.stringify(deleteResult));

        const currency = context.currencies[currencyCode];
        const sqlInsertDate = currency.map(_ => `(1, '${_.date}', @currencyCode, ${_.rate}, '${_.date}', 1)`);
        const insertResult = await database.execute('insert into bfx.CURRENCY_EXCHANGE_RATE (exchange_rate_type, exchange_rate_date, currency_code, exchange_rate, modify_date, unit) values ' + sqlInsertDate.join(','), parameters);
        console.log('SQL INSERT RESULT: ' + JSON.stringify(insertResult));
    }

    const client = new Client();
    const data = await client.HttpGet({
        apiPath: '/api/rgsl/common/shared/cache/invalidate?name=Core:ExchangeRate'});
    console.log('CACHE INVALIDATE RESULT: ' + JSON.stringify(data));
}

module.exports = {
    setRates,
};
