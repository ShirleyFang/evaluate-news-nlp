var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const aylien = require("aylien_textapi");
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
console.log(__dirname)
const cors = require('cors');
app.use(cors());

// const textapi = new aylien({
// 	application_id: '976454f6',
// 	application_key: '0c1e88ac129ac699e8ddbcbe93e3eccb'
// })

const textapi = new aylien({
	application_id: process.env.API_ID,
	application_key: process.env.API_KEY
})
console.log(process.env.API_ID);
console.log(process.env.API_KEY);


app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

app.get('/check', getData);
function getData(req, res) {
    res.send()
}

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.post('/addData', function(req, res) {
	const newURL = req.body.url;
	const resultData = {};

	textapi.sentiment({
		url: newURL
	}, function(error, reponse) {
		if (error === null) {
			resultData.polarity = reponse.polarity;
      resultData.subjectivity = reponse.subjectivity;
      resultData.polarity_confidence = (reponse.polarity_confidence).toFixed(2);
      resultData.subjectivity_confidence = (reponse.subjectivity_confidence).toFixed(2);
      resultData.content = reponse.text;
      console.log(resultData);
      res.send(resultData);
		}
	});
})