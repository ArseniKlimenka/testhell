### Usage example:
```
{
    "$ref": "CancelAllocation",
    "description": "Invoice second installment",
    "context": {
        "contractNumber": "{{$.contractNumber}}",
        "dueDate": "2022-07-01"
    }
},
```