IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'PAS_IMPL.POLICY_INVESTMENT_SAT') AND TYPE IN (N'U'))
BEGIN

	IF COL_LENGTH('PAS_IMPL.POLICY_INVESTMENT_SAT','AIP_MF_PROD_CONF') IS NULL
	BEGIN
		ALTER TABLE PAS_IMPL.POLICY_INVESTMENT_SAT
		ADD AIP_MF_PROD_CONF DECIMAL(15, 7)
	END

	IF COL_LENGTH('PAS_IMPL.POLICY_INVESTMENT_SAT','AIP_INVESTMENT_START_DATE') IS NULL
	BEGIN
		ALTER TABLE PAS_IMPL.POLICY_INVESTMENT_SAT
		ADD AIP_INVESTMENT_START_DATE DATE
	END

	IF COL_LENGTH('PAS_IMPL.POLICY_INVESTMENT_SAT','AIP_INVESTMENT_END_DATE') IS NULL
	BEGIN
		ALTER TABLE PAS_IMPL.POLICY_INVESTMENT_SAT
		ADD AIP_INVESTMENT_END_DATE DATE
	END

	IF COL_LENGTH('PAS_IMPL.POLICY_INVESTMENT_SAT','AIP_MANUAL_RATE') IS NULL
	BEGIN
		ALTER TABLE PAS_IMPL.POLICY_INVESTMENT_SAT
		ADD AIP_MANUAL_RATE DECIMAL(15, 7)
	END

	IF COL_LENGTH('PAS_IMPL.POLICY_INVESTMENT_SAT','AIP_INVESTMENT_FREQUENCY') IS NULL
	BEGIN
		ALTER TABLE PAS_IMPL.POLICY_INVESTMENT_SAT
		ADD AIP_INVESTMENT_FREQUENCY DECIMAL(15, 7)
	END

	IF COL_LENGTH('PAS_IMPL.POLICY_INVESTMENT_SAT','AIP_MF') IS NULL
	BEGIN
		ALTER TABLE PAS_IMPL.POLICY_INVESTMENT_SAT
		ADD AIP_MF DECIMAL(15, 7)
	END

	IF COL_LENGTH('PAS_IMPL.POLICY_INVESTMENT_SAT','AIP_COST_OPEN_CONTRACTS') IS NULL
	BEGIN
		ALTER TABLE PAS_IMPL.POLICY_INVESTMENT_SAT
		ADD AIP_COST_OPEN_CONTRACTS DECIMAL(15, 7)
	END

	IF COL_LENGTH('PAS_IMPL.POLICY_INVESTMENT_SAT','AIP_COMM_WITHDRAWAL_FUNDS_1') IS NULL
	BEGIN
		ALTER TABLE PAS_IMPL.POLICY_INVESTMENT_SAT
		ADD AIP_COMM_WITHDRAWAL_FUNDS_1 DECIMAL(15, 7)
	END

	IF COL_LENGTH('PAS_IMPL.POLICY_INVESTMENT_SAT','AIP_COMM_WITHDRAWAL_FUNDS_2') IS NULL
	BEGIN
		ALTER TABLE PAS_IMPL.POLICY_INVESTMENT_SAT
		ADD AIP_COMM_WITHDRAWAL_FUNDS_2 DECIMAL(15, 7)
	END

	IF COL_LENGTH('PAS_IMPL.POLICY_INVESTMENT_SAT','AIP_COMM_WITHDRAWAL_FUNDS_3') IS NULL
	BEGIN
		ALTER TABLE PAS_IMPL.POLICY_INVESTMENT_SAT
		ADD AIP_COMM_WITHDRAWAL_FUNDS_3 DECIMAL(15, 7)
	END

	IF COL_LENGTH('PAS_IMPL.POLICY_INVESTMENT_SAT','AIP_COMM_WITHDRAWAL_FUNDS_4') IS NULL
	BEGIN
		ALTER TABLE PAS_IMPL.POLICY_INVESTMENT_SAT
		ADD AIP_COMM_WITHDRAWAL_FUNDS_4 DECIMAL(15, 7)
	END

	IF COL_LENGTH('PAS_IMPL.POLICY_INVESTMENT_SAT','AIP_COMM_WITHDRAWAL_FUNDS_5') IS NULL
	BEGIN
		ALTER TABLE PAS_IMPL.POLICY_INVESTMENT_SAT
		ADD AIP_COMM_WITHDRAWAL_FUNDS_5 DECIMAL(15, 7)
	END

	IF COL_LENGTH('PAS_IMPL.POLICY_INVESTMENT_SAT','AIP_RKO') IS NULL
	BEGIN
		ALTER TABLE PAS_IMPL.POLICY_INVESTMENT_SAT
		ADD AIP_RKO DECIMAL(15, 7)
	END

	IF COL_LENGTH('PAS_IMPL.POLICY_INVESTMENT_SAT','AIP_IS_STAND_CONTRACT_COND') IS NULL
	BEGIN
		ALTER TABLE PAS_IMPL.POLICY_INVESTMENT_SAT
		ADD AIP_IS_STAND_CONTRACT_COND BIT
	END

	IF COL_LENGTH('PAS_IMPL.POLICY_INVESTMENT_SAT','AIP_IS_COORD_UD_REQUIRED') IS NULL
	BEGIN
		ALTER TABLE PAS_IMPL.POLICY_INVESTMENT_SAT
		ADD AIP_IS_COORD_UD_REQUIRED BIT
	END

END
GO