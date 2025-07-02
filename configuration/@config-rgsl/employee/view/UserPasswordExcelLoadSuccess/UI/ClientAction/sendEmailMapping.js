module.exports = function sendEmailMapping(input, ambientProperties) {

    if (input?.data?.resultData?.data?.sendEmail) {
        return 'Да';
    }

    return 'Нет';


};
