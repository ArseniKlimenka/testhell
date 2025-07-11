DELETE FROM BFX_IMPL.SEND_EVENT_CONFIGURATION
WHERE SEND_EVENT_TYPE_ID IN (
	SELECT SEND_EVENT_TYPE_ID
	FROM BFX_IMPL.SEND_EVENT_TYPE
	WHERE SEND_EVENT_TYPE_NAME IN ('SportsmanContractIsActivated', 'SportsmanContractIsCancelled')
)
GO

DELETE FROM BFX_IMPL.SEND_EVENT_TYPE
WHERE SEND_EVENT_TYPE_NAME IN ('SportsmanContractIsActivated', 'SportsmanContractIsCancelled')
GO

INSERT INTO BFX_IMPL.SEND_EVENT_TYPE VALUES
('SportsmanContractIsCancelledOrFinished')
GO

INSERT INTO BFX_IMPL.SEND_EVENT_CONFIGURATION VALUES
((SELECT SEND_EVENT_TYPE_ID FROM BFX_IMPL.SEND_EVENT_TYPE WHERE SEND_EVENT_TYPE_NAME = 'SportsmanContractIsCancelledOrFinished'), 'SPORTSMAN_DELETE', '', '006', '2022-01-01', '2030-12-31', NULL)
GO