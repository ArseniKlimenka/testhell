IF
	exists (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'ACC_IMPL.PAYMENT_ORDER_HUB') AND TYPE IN (N'U'))
	and
	exists (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'ACC_IMPL.PAYMENT_ORDER_SAT') AND TYPE IN (N'U'))
	and
	exists (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'ACC_IMPL.BANK_STATEMENT_ITEM') AND TYPE IN (N'U'))
BEGIN
	EXEC(N'
update po
set
po.BODY = json_modify(po.BODY, ''$.paymentOrderInformation.referenceNumber'', CAST(bsi.BANK_STATEMENT_ITEM_ID AS NVARCHAR(128))),
po.COMMON_BODY = json_modify(po.COMMON_BODY, ''$.attributes.referenceNumber'', CAST(bsi.BANK_STATEMENT_ITEM_ID AS NVARCHAR(128)))
from ACC.PAYMENT_ORDER po
join ACC_IMPL.PAYMENT_ORDER_HUB poh on poh.PAYMENT_ORDER_NUMBER = po.PAYMENT_ORDER_NUMBER
join ACC_IMPL.PAYMENT_ORDER_SAT pos on pos.PAYMENT_ORDER_HKEY = poh.PAYMENT_ORDER_HKEY
join ACC_IMPL.BANK_STATEMENT_ITEM bsi on bsi.BANK_STATEMENT_ITEM_NO = pos.REFERENCE_NUMBER
where pos.PAYMENT_ORDER_TYPE = ''PaymentRefund''
');
END
GO

IF
	exists (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'ACC_IMPL.PAYMENT_ORDER_SAT') AND TYPE IN (N'U'))
	and
	exists (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'ACC_IMPL.BANK_STATEMENT_ITEM') AND TYPE IN (N'U'))
BEGIN
	EXEC(N'
update pos
set
pos.REFERENCE_NUMBER = CAST(bsi.BANK_STATEMENT_ITEM_ID AS NVARCHAR(128))
from ACC_IMPL.PAYMENT_ORDER_SAT pos
join ACC_IMPL.BANK_STATEMENT_ITEM bsi on bsi.BANK_STATEMENT_ITEM_NO = pos.REFERENCE_NUMBER
where pos.PAYMENT_ORDER_TYPE = ''PaymentRefund''
');
END
GO