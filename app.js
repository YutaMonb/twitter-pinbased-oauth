#!/usr/bin/env node
'use strict';

const OAuth = require('oauth').OAuth;


let TwitterOauth = (consumerKey, consumerSecret) => {

    let auth = new OAuth(
        'https://twitter.com/oauth/request_token',
        'https://twitter.com/oauth/access_token',
        consumerKey, consumerSecret, '1.0a', null, 'HMAC-SHA1'
    );

    auth.getOAuthRequestToken((err, token, secret) => {
        if (err) {
            console.log(err.data);
            process.exit(1);
        }
        this.token = token;
        this.secret = secret;
        console.log(`https://twitter.com/oauth/authorize?oauth_token=${token}`);
    });

    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (pin) => {
        auth.getOAuthAccessToken(this.token, this.secret, pin, (err, token, secret) => {
            if (err) {
                console.log(err.data);
                process.exit(1);
            }
            console.log(`Token: ${token}`);
            console.log(`Secret: ${secret}`);
            process.exit(0);
        });
    });

}

if (process.argv.length < 4) {
    console.log('twitter-pinbased-oauth {consumerKey} {consumerSecret}');
    process.exit(1);
}

TwitterOauth(process.argv[2], process.argv[3]);
