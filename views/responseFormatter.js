const responseView = {
    formatResponse: (data) =>{
        return JSON.stringify(data, null, 2);
    }
};

module.exports = responseView;