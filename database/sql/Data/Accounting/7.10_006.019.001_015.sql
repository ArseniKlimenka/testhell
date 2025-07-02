update matpNeg
set POSTING_DATE = matp.POSTING_DATE
from
	acc_impl.MATCHING matNeg
	inner join acc_impl.MATCHING_POLICY matpNeg on matpNeg.MATCHING_ID = matNeg.MATCHING_ID
	inner join acc_impl.MATCHING_POLICY matp on matp.MATCHING_ID = matNeg.CANCELLED_MATCHING_ID
where 1=1
	and matpNeg.POSTING_DATE = '0001-01-01'
	and matp.POSTING_DATE != '0001-01-01'
go
