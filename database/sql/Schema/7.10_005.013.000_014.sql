if exists (select 1 from sys.objects
            where object_id = object_id(N'ACC_IMPL.AGGREGATED_PAYMENT_REGISTER'))
   and not exists (select 1 from sys.columns
                    where name = N'SEGMENT'
                      and object_id = object_id(N'ACC_IMPL.AGGREGATED_PAYMENT_REGISTER'))
begin
    alter table ACC_IMPL.AGGREGATED_PAYMENT_REGISTER add SEGMENT nvarchar(100) null
end