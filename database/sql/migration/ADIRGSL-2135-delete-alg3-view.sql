if exists (select * from sys.views where object_id = object_id(N'[dbo].[impl_ldwh_zds_algl_3_view]'))
begin
    drop view [dbo].[impl_ldwh_zds_algl_3_view];
end
go

if exists (select * from dbo.sysobjects where id = object_id(N'[dbo].[impl_ldwh_zds_algl_3]') and type in (N'FN', N'FS', N'FT', N'TF', N'IF'))
begin
    drop function [dbo].[impl_ldwh_zds_algl_3];
end
go