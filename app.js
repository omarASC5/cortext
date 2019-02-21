const express   = require("express"),
		app     = express(),
		ejs     = require("ejs"),
		keys    = require("./config/keys.js"),
		request = require("request"),
		cheerio = require("cheerio");


app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

app.get("/", (req, res, next) => {
	res.render("index");
})

request("https://www.nytimes.com/2019/02/20/us/north-carolina-voter-fraud.html", (err, res, html) => {
	if (!err && res.statusCode === 200) {
		const $ = cheerio.load(html);
		const siteHeading = $(".css-1ygdjhk");
		// const output = siteHeading.find("h1").text();
		console.log(siteHeading.html());
	} else {
		console.log(err);
	}
});
app.listen(keys.PORT, () => {
	console.log(`Server running on port ${keys.PORT}!`);
});