alter table acc_impl.matching_policy drop column IS_ADVANCE_PAYMENT
go
alter table acc_impl.allocation_policy add IS_ADVANCE_PAYMENT bit null
go
alter table acc_impl.allocation_policy add IS_FIRST_INSTALLMENT bit null
go
update acc_impl.allocation_policy set IS_ADVANCE_PAYMENT = 0, IS_FIRST_INSTALLMENT = 0
go
alter table acc_impl.allocation_policy alter column IS_ADVANCE_PAYMENT bit not null
go
alter table acc_impl.allocation_policy alter column IS_FIRST_INSTALLMENT bit not null
go
