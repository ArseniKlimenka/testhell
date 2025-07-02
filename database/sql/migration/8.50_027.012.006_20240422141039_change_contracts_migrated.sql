UPDATE c 
SET BODY = json_modify(BODY, '$.mainInsuranceConditions.insuranceProduct.productGroup', 'endowment'),
	COMMON_BODY = json_modify(COMMON_BODY, '$.contract.productGroup', 'endowment')
FROM PAS.CONTRACT c
JOIN PAS_IMPL.POLICY_HUB ph ON ph.CONTRACT_NUMBER = c.CONTRACT_NUMBER
JOIN PAS_IMPL.POLICY_SAT_LATEST ps ON ps.POLICY_HKEY = ph.POLICY_HKEY
WHERE ps.PRODUCT_CODE IN ('R103Khusainova','R103Makarova','R103OAS','R103SAS','R103Sviderskaya','R103Tatian','R104OAS','R104SAS','R105OAS','R105SAS','R203Chizhikova','R203Khusainova','R203Makarova','R203Mirlina','R203OAS','R203SAS','R203Sankova','R203Starkova','R203Tatarskaya','R203Vahitova','R205OAS','R205SAS','R205Tatian')
