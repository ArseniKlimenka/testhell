update pcs 
		set pcs.AA_AMENDMENT_NUMBER = COALESCE(JSON_VALUE(c.BODY, '$.commission.agentAgreement.amendmentNumber'), JSON_VALUE(c.BODY, '$.commission.agentAgreement.number'))
			from PAS_IMPL.POLICY_COMMISSION_SAT pcs
			join PAS_IMPL.POLICY_COMMISSION_LINK pcl on pcs.POLICY_COMMISSION_HKEY = pcl.POLICY_COMMISSION_HKEY
			join PAS_IMPL.POLICY_HUB ph on ph.POLICY_HKEY = pcl.POLICY_HKEY
			join PAS.CONTRACT c on c.CONTRACT_NUMBER = ph.CONTRACT_NUMBER