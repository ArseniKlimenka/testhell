namespace Adacta.AdInsure.RGSL.Accounting.Infrastructure.CashFlow.Allocation.Queries
{
    static class AccountNumberQueriesRGSL
    {
        public static string GetAccountDefaultDataAccountNumber()
        {
            return @"
                select top 1 account_no
                from acc_impl.ct_bsi_source_account
                where income_source_id = 0
                and payment_source_id = 1";
        }

        public static string GetAccountDefaultIncomingDataAccountNumber()
        {
            return @"
                select top 1 account_no
                from acc_impl.ct_bsi_source_account
                where income_source_id = 20
                and payment_source_id = 1";
        }

        public static string GetAccountDefaultOutgoingEndowmentDataAccountNumber()
        {
            return @"
                select top 1 account_no
                from acc_impl.ct_bsi_source_account
                where income_source_id = 22
                and payment_source_id = 1";
        }

        public static string GetAccountDefaultRiskDeathDataAccountNumber()
        {
            return @"
                select top 1 account_no
                from acc_impl.ct_bsi_source_account
                where income_source_id = 71
                and payment_source_id = 1";
        }

    }
}
