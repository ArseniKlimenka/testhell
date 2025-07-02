### Example:

```
{
    "$ref": "CreatePaymentAndAllocate",
    "description": "Pay first two installments",
    "context": {
        "payAmount": 300000,
        "referenceNo": "{{$.contractNumber}}",
        "paymentDetails": {
            "amount": 300000
        }
    }
},
```