DECLARE @mainBranchOrgUnitID NVARCHAR(100);
DECLARE @branchTreeIds TABLE (organisation_unit_code NVARCHAR(100))

-- get ORG_UNIT_CODE for the main branch 'АО "МИнБанк " НА УДАЛЕНИЕ'
SELECT @mainBranchOrgUnitID = organisation_unit_id
FROM   org.organisation_unit
WHERE  Json_value(body, '$.name') = N'АО "МИнБанк " НА УДАЛЕНИЕ'

-- get all child branches
;WITH branchtree
     AS (SELECT *
         FROM   org.organisation_unit
         WHERE  organisation_unit_id = @mainBranchOrgUnitID
         UNION ALL
         SELECT t.*
         FROM   branchtree
                INNER JOIN org.organisation_unit t
                        ON branchtree.organisation_unit_id = t.parent_id)

INSERT INTO @branchTreeIds
SELECT organisation_unit_code
FROM   branchtree

-- before deletion check if there are some connected service providers to any of @branchTreeIds
IF NOT EXISTS (SELECT *
               FROM   org.service_provider
               WHERE  Json_value(body, '$.orgUnitCode') 
					IN (SELECT organisation_unit_code FROM @branchTreeIds))
  BEGIN
      DELETE FROM org.organisation_unit_info_sat
      WHERE  organisation_unit_info_hkey IN
             (SELECT organisation_unit_hkey
              FROM   org.organisation_unit_hub
              WHERE
             organisation_unit_code
				 IN (SELECT organisation_unit_code FROM @branchTreeIds))

      DELETE FROM org.organisation_unit_hub
      WHERE  organisation_unit_code 
			IN (SELECT organisation_unit_code FROM @branchTreeIds)

      DELETE FROM org_impl.organisation_unit_info_sat
      WHERE  organisation_unit_info_hkey IN
             (SELECT organisation_unit_hkey
              FROM   org_impl.organisation_unit_hub
              WHERE
             organisation_unit_code
				 IN (SELECT organisation_unit_code FROM @branchTreeIds))

      DELETE FROM org_impl.organisation_unit_hub
      WHERE  organisation_unit_code 
			IN (SELECT organisation_unit_code FROM @branchTreeIds)

      DELETE FROM org.organisation_unit
      WHERE  organisation_unit_code 
			IN (SELECT organisation_unit_code FROM @branchTreeIds)
  END