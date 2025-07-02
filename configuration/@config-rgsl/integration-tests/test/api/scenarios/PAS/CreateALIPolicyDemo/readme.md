### Goal of the test scenario:

Create accumulated life insurance policy and activate.

Policy will have:
- Demo accumulated life insurance product (1 life cover, 1 non-life cover)
- By default halfyear installments for 5 years. (payment frequency can be changed with parameter `paymentFrequencyCode`)

Example:
```
{
    "$ref": "CreateALIPolicyDemo",
    "context": {
        "policyStartDate": "2022-01-01",
        "paymentFrequencyCode": "1",
        "riskPremium": 100000,
        "currencyCode": "RUB",
        "invoiceOnActivation": false,
        "contractFieldName": null
    }
}
```