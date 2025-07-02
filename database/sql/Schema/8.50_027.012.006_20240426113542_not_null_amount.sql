update pas_impl.P_PAYMENT_PLAN_SAT set AMOUNT = 0 where AMOUNT is null
go

alter table pas_impl.P_PAYMENT_PLAN_SAT alter column AMOUNT decimal(15, 2) not null
go
