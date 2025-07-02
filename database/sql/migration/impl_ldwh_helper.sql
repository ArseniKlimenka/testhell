-- helper functions
IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[dbo].[impl_sap_date]') AND type IN (N'FN', N'FS', N'FT', N'TF', N'IF'))
BEGIN
DROP FUNCTION [dbo].[impl_sap_date];
END
GO

create function impl_sap_date(@datetime datetime)
returns bigint
as
begin
  return cast(convert(varchar, @datetime, 112) + replace(convert(varchar, @datetime, 108), ':', '') as bigint)
end
GO