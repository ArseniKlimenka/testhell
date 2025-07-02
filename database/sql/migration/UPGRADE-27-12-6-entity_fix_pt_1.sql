-- Migration script for BFX.ENTITY_RETENTION and BFX.ENTITY_RELATION tables
--
-- Document version relations are removed from entity relation table: all relations are based on a corresponding original document id
-- Retentions of versions are removed from the retention table: last applied version determines the retention of a document referenced by original document id
--
-- Run the script on the copies of relations and retentions tables (BFX.ENTITY_RETENTION_TEST, BFX.ENTITY_RELATION_TEST) first.
-- If everything runs smoothly, rename the table names in the script to originals and run again

-- TEST TABLES:

-- drop table BFX.ENTITY_RETENTION_TEST
-- drop table BFX.ENTITY_RELATION_TEST

select * into BFX.ENTITY_RETENTION_TEST from BFX.ENTITY_RETENTION
select * into BFX.ENTITY_RELATION_TEST from BFX.ENTITY_RELATION


-- SCRIPT:

-- delete all unapplied versions from retention table
delete
from bfx.entity_retention_test
where exists
    (select 1
     from pas.contract c
     where c.contract_id = entity_id
       and (c.version_state <> 'Applied'
            or c.version_state is null)
       and c.seq_number > 0);

go 

-- delete all applied versions except last applied
delete
from bfx.entity_retention_test
where entity_id in
    (select entity_id
     from
       (select r.entity_id,
               c.seq_number,
               max(c.seq_number) over (partition by c.original_document_id) as last_applied_version
        from bfx.entity_retention_test r
        join pas.contract c on c.contract_id = r.entity_id) t
     where t.seq_number <> t.last_applied_version);

go 

-- set original document id as entity id in retention table
update x
set x.retention_group_id = y.original_document_id
from bfx.entity_retention_test x,
     bfx.entity_retention_test z,
     pas.contract y
where x.retention_group_id = z.retention_group_id
  and z.entity_id = y.contract_id
  and z.retention_group_id <> y.original_document_id
  and exists
    (select 1
     from pas.contract c
     where c.original_document_id = y.original_document_id
       and c.seq_number = 1);

go

update x
set x.entity_id = y.original_document_id
from bfx.entity_retention_test x,
     pas.contract y
where x.entity_id = y.contract_id
  and y.contract_id <> y.original_document_id;

go 

-- reset group retention date in modified retention groups
update x
set x.group_retention_date = q.max_retention_date
from bfx.entity_retention_test x,

  (select (case
               when count(*) = count(entity_retention_date) then max(entity_retention_date)
           end) as max_retention_date,
          retention_group_id
   from
     (select entity_retention_date,
             retention_group_id
      from bfx.entity_retention_test
      where retention_group_id in
          (select r.retention_group_id
           from bfx.entity_retention_test r
           where exists
               (select 1
                from pas.contract
                where original_document_id = r.entity_id
                  and seq_number = 1) )) t
   group by retention_group_id) q
where q.retention_group_id = x.retention_group_id;

go

-- delete all document version relations
delete
from bfx.entity_relation_test
where source_id = 'DocumentVersion';

go 

-- delete duplicates arising after substituting versioned document id with original document id
delete
from bfx.entity_relation_test
where entity_relation_id in
(select t.entity_relation_id from
(select 
    r.entity_relation_id,
    row_number() over(partition by c.original_document_id, r.related_entity_id, r.source_id, r.relation_type order by r.sys_created_on) n
from
    bfx.entity_relation_test r
    join pas.contract c on r.entity_id = c.contract_id) t
where t.n > 1);

go

delete
from bfx.entity_relation_test
where entity_relation_id in
(select t.entity_relation_id from
(select 
    r.entity_relation_id,
    row_number() over(partition by r.entity_id, c.original_document_id, r.source_id, r.relation_type order by r.sys_created_on) n
from
    bfx.entity_relation_test r
    join pas.contract c on r.related_entity_id = c.contract_id) t
where t.n > 1);

go

delete
from bfx.entity_relation_test
where entity_relation_id in
(select t.entity_relation_id from
(select 
    r.entity_relation_id,
    row_number() over(partition by c1.original_document_id, c2.original_document_id, r.source_id, r.relation_type order by r.sys_created_on) n
from
    bfx.entity_relation_test r
    join pas.contract c1 on r.entity_id = c1.contract_id
    join pas.contract c2 on r.related_entity_id = c2.contract_id) t
where t.n > 1);

go

-- substitute versioned document id with original document id
update x
set x.entity_id = c.original_document_id
from bfx.entity_relation_test x,
     pas.contract c
where c.contract_id = x.entity_id
  and c.seq_number > 0;

go

update x
set x.related_entity_id = c.original_document_id
from bfx.entity_relation_test x,
     pas.contract c
where c.contract_id = x.related_entity_id
  and c.seq_number > 0;

go 

-- set group retention date to null if there are some relations without retention
update x
set x.group_retention_date = null
from bfx.entity_retention_test x,

  (select q.retention_group_id
   from
     (select r.related_entity_id as entity_id,
             t.retention_group_id
      from bfx.entity_relation_test r
      join
        (select z.entity_id,
                z.retention_group_id
         from bfx.entity_retention_test z
         where z.retention_group_id in
             (select g.retention_group_id
              from bfx.entity_retention_test g
              where exists
                  (select 1
                   from pas.contract c
                   where c.original_document_id = g.entity_id
                     and c.seq_number = 1))) t on t.entity_id = r.entity_id
      union select r.entity_id,
                   t.retention_group_id
      from bfx.entity_relation_test r
      join
        (select z.entity_id,
                z.retention_group_id
         from bfx.entity_retention_test z
         where retention_group_id in
             (select g.retention_group_id
              from bfx.entity_retention_test g
              where exists
                  (select 1
                   from pas.contract c
                   where c.original_document_id = g.entity_id
                     and c.seq_number = 1))) t on t.entity_id = r.related_entity_id) q
   where not exists
       (select 1
        from bfx.entity_retention_test f
        where f.entity_id = q.entity_id)) y
where x.retention_group_id = y.retention_group_id;