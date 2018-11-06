function main(event, context, callback) {
    const response = {
        statusCode: 200,
        body: 'Hello Ipsum',
    };
    callback(null, response);
}

module.exports = { main };
