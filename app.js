const express      = require("express"),
		app        = express(),
		ejs        = require("ejs"),
		keys       = require("./config/keys.js"),
		request    = require("request"),
		compromise = require("compromise"),
		bodyParser = require("body-parser"),
		Sentiment  = require('sentiment'),
		sentiment  = new Sentiment(),
		html       = require('html-parse-stringify'),
		stringToDom = require('string-to-dom');

		const jsdom = require("jsdom");
		const { JSDOM } = jsdom;

app.set("view engine", "ejs"); // Rendering engine defined as EJS
app.use(express.static(__dirname + '/public')); // Tells express, CSS is in public folder
app.set("views", "views"); // Tells EJS the path to the "views" directory
app.use(bodyParser.urlencoded({extended: true})); // bodyParser config
// const sentiment = new Sentiment(); // Set's up thing for sentiment

// Index Route, redirects to display homepage
app.get("/", (req, res, next) => {
	res.redirect("index");
});

// Renders the index page
app.get("/index", (req, res, next) => {
	res.render("index");
})


// Post route, the forms sends a URL to be exported as an object with article feautures 
app.post("/index", (req, res, next) => {
	// Initializes article-parser, which helps parse articles into object forme
	const {
		extract 
	  } = require('article-parser');
	//   User-entered URL
	  let url = req.body.url;

	  extract(url).then((article) => {
		  const articleInHTMLForm = article.content;
			const articleInTextForm = articleInHTMLForm
				.replace(/<\/?[^>]+(>|$)/g, " ") //Replaces the Tags and leaves a space.
				.replace(/  +/g, " ") //Replaces double spaces and leaves a single.
				.replace(/ \.+/g, "."); //Replaces the space between a word and the period to end a sentence.

			//title, publishedTime, author, source, content, url,
			//Formatts all of the neccesary inforamtion into one object
			const articleFormatting = {
				title: article.title,
				publishedTime: article.publishedTime,
				author: article.author,
				source: article.source,
				content: articleInTextForm,
				url: article.url
			};

		return articleFormatting;
		}).then((article) => {
			res.render("new", { article: article, Sentiment: Sentiment, html: html, stringToDom: stringToDom, JSDOM: JSDOM}); //Must be an object
	  }).catch((err) => {
		console.log(err);
	  });
});


// Server Setup/Initialization
app.listen(process.env.PORT || keys.PORT, () => {
	console.log(`Server running on port ${keys.PORT}!`);
});