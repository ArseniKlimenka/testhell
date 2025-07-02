update c
   set c.common_body = json_modify(c.common_body, '$.transitionResult.attributes.wasActive', cast(1 as bit))
  from pas.contract c,
       cfx.published_artifact pa,
       cfg.process_state ps
 where pa.published_artifact_id = c.published_artifact_id
   and c.state_id = ps.process_state_id
   and (pa.code_name like '%credit%')
   and (pa.code_name like '%quote%' or pa.code_name like '%policy%')
   and ps.code_name = 'Cancelled'
   and exists (select *
                 from bfx.entity_history eh
                where eh.entity_id = c.contract_id
                  and eh.new_state = 'Active')