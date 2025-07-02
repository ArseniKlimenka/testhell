namespace Adacta.AdInsure.RGSL.Accounting.Infrastructure.Commission.Queries
{
    static class InvoicedCommissionQueries
	{
        public static string DeclareInvCommRequestFilter(string tempTable)
        {
			return $@"
create table {tempTable}
(
    CONTRACT_NUMBER nvarchar(64),
    DUE_DATE date
)";

		}

		public static string InsertInvCommRequestFilter(string tempTable)
		{
			return $@"
insert into {tempTable} (
	contract_number,
	due_date
)
values (
	@ContractNumber,
	@DueDate
)
";
		}

        public static string SelectInvCommFromRequestFilter(string tempTable)
        {
			return $@"
select
	ic.CONTRACT_NUMBER,
	ic.DUE_DATE,
	ic.POSTING_DATE,
	ic.OBJECT_CODE,
	ic.ITEM_NO,
	ic.AA_COMM_RATE,
	ic.DOC_COMM_RATE,
	ic.CALC_COMM_AMOUNT
from
	pas_impl.P_INVOICED_COMMISSION ic
where 1=1
	and exists (select * from {tempTable} f where f.CONTRACT_NUMBER = ic.CONTRACT_NUMBER and f.DUE_DATE = ic.DUE_DATE)
	and ic.COMM_TYPE = 1
";
		}
	}
}
