ALTER TABLE acc_impl.matching_policy ADD IS_ADVANCE_PAYMENT bit null
go
ALTER TABLE acc_impl.matching_policy ADD IS_POSTED bit null
go
update acc_impl.matching_policy set IS_ADVANCE_PAYMENT = 0, IS_POSTED = 1
go
ALTER TABLE acc_impl.matching_policy alter column IS_ADVANCE_PAYMENT bit not null
go
ALTER TABLE acc_impl.matching_policy alter column IS_POSTED bit not null
go
