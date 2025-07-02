alter table ACC_IMPL.PAYMENT_REFERENCE add IS_ERROR bit null
go

update ACC_IMPL.PAYMENT_REFERENCE set IS_ERROR = (case when AUTO_ALLOCATION_MESSAGE = 'OK' then 0 else 1 end) where AUTO_ALLOCATION_MESSAGE is not null
go