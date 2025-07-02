update pas.contract
   set version_state = 'Applied'
 where state_id in (29, 34, 36)

update pas.contract
   set version_state = 'Discarded'
 where state_id in (13)