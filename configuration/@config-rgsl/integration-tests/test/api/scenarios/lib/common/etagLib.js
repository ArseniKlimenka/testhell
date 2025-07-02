function parseEtag(etag) {
    const matches = etag.match(/"(.+):.*"/);
    return {
        id: matches[1]
    };
}

module.exports = {
    parseEtag,
};
