require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
	res.send('Hello World');
});

app.post('/contact', function (req, res) {
	const name = req.body.fullName;
	const email = req.body.email;
	const message = req.body.message;

	// Get fresh token, create transporter
	const createTransporter = async () => {
		const oauth2Client = new OAuth2(
			process.env.CLIENT_ID,
			process.env.CLIENT_SECRET,
			'https://developers.google.com/oauthplayground'
		);

		oauth2Client.setCredentials({
			refresh_token: process.env.REFRESH_TOKEN,
		});

		const accessToken = await new Promise((resolve, reject) => {
			oauth2Client.getAccessToken((err, token) => {
				if (err) {
					reject();
				}
				resolve(token);
			});
		});

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				type: 'OAuth2',
				user: process.env.EMAIL,
				accessToken,
				clientId: process.env.CLIENT_ID,
				clientSecret: process.env.CLIENT_SECRET,
				refreshToken: process.env.REFRESH_TOKEN,
			},
		});

		return transporter;
	};

	//   Set Options
	const sendEmail = async (emailOptions) => {
		let emailTransporter = await createTransporter();
		await emailTransporter.sendMail(emailOptions);
	};

	// Send email
	sendEmail({
		subject: 'New portfolio message!',
		text: message,
		to: process.env.FORWARD_EMAIL,
		from: process.env.EMAIL,
	});
});

app.listen(3000);
