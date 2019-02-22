const express      = require("express"),
		app        = express(),
		ejs        = require("ejs"),
		keys       = require("./config/keys.js"),
		request    = require("request"),
		cheerio    = require("cheerio"),
		bodyParser = require("body-parser");


app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req, res, next) => {
	res.redirect("index");
});

app.get("/index", (req, res, next) => {
	res.render("index");
})



app.post("/index", (req, res, next) => {
	console.log(req.body.url);
		request(req.body.url, (err, res, html) => {
		if (!err && res.statusCode === 200) {
			const $ = cheerio.load(html);
			// const siteHeading = $(".css-1ygdjhk");
			// const output = siteHeading.find("h1").text();
			console.log($.html());
		} else {
			console.log(err);
		}
	});
	res.send("Hi")
});

app.listen(keys.PORT, () => {
	console.log(`Server running on port ${keys.PORT}!`);
});