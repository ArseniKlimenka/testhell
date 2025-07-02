module.exports = function sendEmailMapping(input, ambientProperties) {

    if (input?.data?.resultData?.resultSummary?.sendEmail) {
        return 'Да';
    }

    return 'Нет';


};


