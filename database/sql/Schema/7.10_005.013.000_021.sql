if exists (select 1 from sys.objects
           where object_id = object_id(N'ACC_IMPL.AGGREGATED_PAYMENT_REGISTER'))
   and not exists (select 1 from sys.columns
                   where name = N'SOURCE_FILE_FORMAT'
                   and object_id = object_id(N'ACC_IMPL.AGGREGATED_PAYMENT_REGISTER'))
begin
    alter table ACC_IMPL.AGGREGATED_PAYMENT_REGISTER add SOURCE_FILE_FORMAT int null
end

go

if exists (select 1 from sys.objects
           where object_id = object_id(N'ACC_IMPL.AGGREGATED_PAYMENT_REGISTER'))
   and not exists (select 1 from sys.columns
                   where name = N'PAYER_BIRTHDAY'
                   and object_id = object_id(N'ACC_IMPL.AGGREGATED_PAYMENT_REGISTER'))
begin
    alter table ACC_IMPL.AGGREGATED_PAYMENT_REGISTER add PAYER_BIRTHDAY datetime null
end

go

if exists (select 1 from sys.objects
           where object_id = object_id(N'ACC_IMPL.AGGREGATED_PAYMENT_REGISTER'))
   and not exists (select 1 from sys.columns
                   where name = N'PAYER_EMAIL'
                   and object_id = object_id(N'ACC_IMPL.AGGREGATED_PAYMENT_REGISTER'))
begin
    alter table ACC_IMPL.AGGREGATED_PAYMENT_REGISTER add PAYER_EMAIL nvarchar(100) null
end