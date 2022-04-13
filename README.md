# Portfolio-server
Express.js server to handle mail forwarding with Nodemailer

## Tech used:
* Express.js
* CORS
* Nodemailer
* Googleapis
* OAuth2

## Dotenv variables
```javascript
EMAIL="Email account to use"
FORWARD_EMAIL="Where to send the email"
REFRESH_TOKEN="Google cloud API refresh token"
CLIENT_ID="Google cloud API Client ID"
ORIGIN_SITE="Site sending form data"
```

## Install
```bash
cd "...file location"
npm install
```

## Start program
```bash
node index.js
```
