const axios = require('axios');
const Twitter = require('twitter');

const config = {
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.SECRET,
    access_token_key: process.env.TOKEN_KEY,
    access_token_secret: process.env.TOKEN_SECRET,
};

function publishOnTwitter(joke) {
    console.log('Publishing joke ', joke);
    const twitter = new Twitter(config);
    const tweet = { status: joke };
    return new Promise((resolve, reject) => {
        twitter.post('statuses/update', tweet, (error, data, response) => {
            if (error) {
                console.log('Error publishing tweet', error);
                reject(error);
            } else {
                console.log('Tweet successfully published', data);
                resolve(data);
            }
        });
    });
}

function getDadJoke() {
    const options = {
        url: 'https://icanhazdadjoke.com/',
        headers: { 'Accept': 'text/plain' },
    };

    return axios(options);
}

async function main(event, context) {
    return getDadJoke()
        .then((joke) => publishOnTwitter(joke.data))
        .then((response) => ({ statusCode: 200, body: JSON.stringify(response) }));
}

module.exports = { main };
