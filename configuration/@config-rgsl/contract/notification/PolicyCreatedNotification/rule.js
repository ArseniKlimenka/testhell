const { product, productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function rule(input) {

    const parsedInput = JSON.parse(input);

    let productCode;
    if (parsedInput.productCode) {
        productCode = parsedInput.productCode;
    }
    else {
        productCode = parsedInput?.content?.sinkOutput?.productCode;
    }
    // productCode may be empty
    const isNewForm = productGroupArray.EPOLICY_SEND_NEW_SMS_EMAIL.includes(productCode);

    if (isNewForm) {
        return [
            {
                staticAsset: {
                    name: 'Logo.png'
                }
            },
            {
                staticAsset: {
                    name: 'prev_doc.png'
                }
            },
            {
                staticAsset: {
                    name: 'Соглашение об ЭДО.pdf'
                }
            }
        ];
    }

    return [
        {
            staticAsset: {
                name: 'Logo.png'
            }
        },
        {
            staticAsset: {
                name: 'Doc.png'
            }
        },
        {
            staticAsset: {
                name: 'Mail.png'
            }
        },
        {
            staticAsset: {
                name: 'Smartphone.png'
            }
        },
        {
            staticAsset: {
                name: 'Соглашение об ЭДО.pdf'
            }
        }
    ];

};
