module.exports = function correctLetters(input) {
    const property = input.dataProperty;
    const data = input.data;
    if (data[property]) {
        data[property] = data[property][0].toUpperCase() + data[property].slice(1).toLowerCase();
    }
};
