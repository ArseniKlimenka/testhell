module.exports = function setUppercaseFirstLetter(input) {
    const property = input.dataProperty;
    const data = input.data;

    if (!data[property]) {
        return;
    }

    let result = Array.from(data[property]);
    result[0] = result[0].toUpperCase();
    const isContainsDash = result.find(item => item === '-' || item === '—')?.length > 0;

    if (isContainsDash) {
        result = result.map((item, number) => number > 0 ? item.toLowerCase() : item);
        result = result.filter(item => item != ' ');

        let index = 1;
        while (result[index]) {

            if (result[index] == '-' || result[index] == '—') {
                result[index + 1] ? result[index + 1] = result[index + 1].toUpperCase() : '';
            }

            index++;
        }
    }

    data[property] = result.join('');

    this.view.rebind();
    this.view.validate();
};
