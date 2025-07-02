update pols
set IS_MIGRATED = case when json_value(c.body, '$.migrationAttributes.isMigrated') = 'true' then 1 else 0 end
from
	pas_impl.POLICY_SAT pols
	inner join pas_impl.POLICY_HUB polh on polh.POLICY_HKEY = pols.POLICY_HKEY
	inner join pas.CONTRACT c on c.CONTRACT_NUMBER = polh.CONTRACT_NUMBER
where pols.IS_MIGRATED is null
