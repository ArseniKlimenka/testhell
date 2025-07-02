-- body update
update c
   set c.body = json_modify(c.body, '$.beneficiaries.beneficiaries[' + b.[key] + '].beneficiaryCategory', 'Standard')
  from pas.contract c
       cross apply openjson(json_query(c.body, '$.beneficiaries.beneficiaries')) b
 where b.[key] = 0

update c
   set c.body = json_modify(c.body, '$.beneficiaries.beneficiaries[' + b.[key] + '].beneficiaryCategory', 'Standard')
  from pas.contract c
       cross apply openjson(json_query(c.body, '$.beneficiaries.beneficiaries')) b
 where b.[key] = 1

update c
   set c.body = json_modify(c.body, '$.beneficiaries.beneficiaries[' + b.[key] + '].beneficiaryCategory', 'Standard')
  from pas.contract c
       cross apply openjson(json_query(c.body, '$.beneficiaries.beneficiaries')) b
 where b.[key] = 2

update c
   set c.body = json_modify(c.body, '$.beneficiaries.beneficiaries[' + b.[key] + '].beneficiaryCategory', 'Standard')
  from pas.contract c
       cross apply openjson(json_query(c.body, '$.beneficiaries.beneficiaries')) b
 where b.[key] = 3

-- snapshot body update
update c
   set c.snapshot_body = json_modify(c.snapshot_body, '$.beneficiaries.beneficiaries[' + b.[key] + '].beneficiaryCategory', 'Standard')
  from pas.contract c
       cross apply openjson(json_query(c.snapshot_body, '$.beneficiaries.beneficiaries')) b
 where b.[key] = 0

update c
   set c.snapshot_body = json_modify(c.snapshot_body, '$.beneficiaries.beneficiaries[' + b.[key] + '].beneficiaryCategory', 'Standard')
  from pas.contract c
       cross apply openjson(json_query(c.snapshot_body, '$.beneficiaries.beneficiaries')) b
 where b.[key] = 1

update c
   set c.snapshot_body = json_modify(c.snapshot_body, '$.beneficiaries.beneficiaries[' + b.[key] + '].beneficiaryCategory', 'Standard')
  from pas.contract c
       cross apply openjson(json_query(c.snapshot_body, '$.beneficiaries.beneficiaries')) b
 where b.[key] = 2

update c
   set c.snapshot_body = json_modify(c.snapshot_body, '$.beneficiaries.beneficiaries[' + b.[key] + '].beneficiaryCategory', 'Standard')
  from pas.contract c
       cross apply openjson(json_query(c.snapshot_body, '$.beneficiaries.beneficiaries')) b
 where b.[key] = 3