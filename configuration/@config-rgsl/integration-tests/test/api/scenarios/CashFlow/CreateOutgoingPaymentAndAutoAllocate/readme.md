### Usage example:
```
{
    "$ref": "CreateOutgoingPaymentAndAutoAllocate",
    "context": {
        "paymentAmount": 1000,
        "amountToAllocate": 1000,
        "transactionDate": "2022-01-01",
        "referenceNoToAllocate": "{{$.paymentOrder.paymentOrderNumber}}"
    }
},
```