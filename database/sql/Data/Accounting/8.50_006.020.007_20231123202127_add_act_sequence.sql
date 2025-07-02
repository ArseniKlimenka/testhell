insert into bfx.SEQUENCES_BIG (SEQUENCE_CODE, INFO, SEQUENCE_ID)
values
('ACC_IMPL.CA_ACT.2023', 'System generated sequence for entity UniversalDocument', coalesce((select max(ACT_ID) from acc_impl.CA_ACT), 0))
go
