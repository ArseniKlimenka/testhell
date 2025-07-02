namespace Adacta.AdInsure.RGSL.PAS.Infrastructure.InvestmentProfit.Queries
{
    public static class InvestmentProfitQueries
    {
        public static string SelectInvestProfitRecords()
        {
            return @"
SELECT
	p.INV_PROFIT_ROW_ID,
	p.IMPORT_DOCUMENT_ID,
	p.CONTRACT_NUMBER,
	p.INV_PROFIT_CALC_DATE,
	p.INV_PROFIT_RATE,
	p.INV_PROFIT_PAY_TYPE_CODE,
	p.LOAD_DATE
FROM
	PAS_IMPL.INVESTMENT_PROFIT p WITH (UPDLOCK)
WHERE /**where**/
";
        }

        public static string SelectInvestProfitAllocations()
        {
            return @"
SELECT
	a.ALLOCATION_ID,
	a.INV_PROFIT_ROW_ID,
	a.REFERENCE_NUMBER,
	a.REFERENCE_CONF,
	a.IS_CANCELLED,
	a.LOAD_DATE
FROM
	PAS_IMPL.INVEST_PROFIT_ALLOCATION a WITH (UPDLOCK)
WHERE /**where**/
";
        }

        public static string InsertInvestProfitRecord()
        {
            return @"
INSERT INTO PAS_IMPL.INVESTMENT_PROFIT
   (INV_PROFIT_ROW_ID,
	IMPORT_DOCUMENT_ID,
	CONTRACT_NUMBER,
	INV_PROFIT_CALC_DATE,
	INV_PROFIT_RATE,
	INV_PROFIT_PAY_TYPE_CODE,
	LOAD_DATE)
VALUES (@0, @1, @2, @3, @4, @5, @6)
";
        }
    }
}
