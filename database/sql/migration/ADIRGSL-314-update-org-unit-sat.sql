update ouis
   set ouis.coach_code = json_value(ou.body, '$.coach.employeeCode'),
       ouis.territorial_chief_code = json_value(ou.body, '$.territorialChief.employeeCode'),
       ouis.regional_chief_code = json_value(ou.body, '$.regionalChief.employeeCode')
  from org.organisation_unit ou,
       org_impl.organisation_unit_hub ouh,
       org_impl.organisation_unit_info_sat ouis
 where ou.organisation_unit_code = ouh.organisation_unit_code
   and ouh.organisation_unit_hkey = ouis.organisation_unit_info_hkey