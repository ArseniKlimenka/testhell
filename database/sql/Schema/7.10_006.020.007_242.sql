alter table acc_impl.CA_ACT_ITEM ADD LC_VAT_AMOUNT decimal(15,2)
go

update ai
set ai.LC_VAT_AMOUNT = round(ai.LC_COMM_AMOUNT_FINAL * act.VAT_RATE / (100 + act.VAT_RATE), 2)
from acc_impl.CA_ACT_ITEM ai
	inner join acc_impl.CA_ACT act on act.ACT_ID = ai.ACT_ID
where ai.LC_VAT_AMOUNT is null
go

alter table acc_impl.CA_ACT_ITEM alter column LC_VAT_AMOUNT decimal(15,2) not null
go

alter table acc_impl.CA_ACT_ITEM alter column LC_VAT_AMOUNT decimal(15,2) not null
go

update acc_impl.CA_ACT set VAT_RATE = VAT_RATE / 100
go

update bfx_impl.VAT set RATE = RATE / 100
go
