UPDATE po
SET po.BODY = json_modify(po.BODY, '$.paymentOrderInformation.numberOfNonAcceptancePayment', json_value(po.BODY, '$.paymentOrderInformation.numberOfNonAcceptancePayement')),
	po.COMMON_BODY = json_modify(po.COMMON_BODY, '$.attributes.paymentOrderInformation.numberOfNonAcceptancePayment', json_value(po.COMMON_BODY, '$.attributes.paymentOrderInformation.numberOfNonAcceptancePayement'))
FROM ACC.PAYMENT_ORDER po
go