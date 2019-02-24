const express      = require("express"),
		app        = express(),
		ejs        = require("ejs"),
		keys       = require("./config/keys.js"),
		request    = require("request"),
		compromise = require("compromise"),
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
	const {
		extract 
	  } = require('article-parser');
	   
	  let url = req.body.url;
	  extract(url).then((article) => {
		  const articleInHTMLForm = article.content;
			const articleInTextForm = articleInHTMLForm
				.replace(/<\/?[^>]+(>|$)/g, " ") //Replaces the Tags and leaves a space.
				.replace(/  +/g, " ") //Replaces double spaces and leaves a single.
				.replace(/ \.+/g, "."); //Replaces the space between a word and the period to end a sentence.
			//const nlpArticle = nlp(articleInTextForm);
			//console.log(article);
			//title, publishedTime, author, source, content, url,

			//Formatts all of the neccesary inforamtion into one object
			const articleFormatting ={
				title: article.title,
				publishedTime: article.publishedTime,
				author: article.author,
				source: article.source,
				content: articleInTextForm,
				url: article.url
			};

	 		// const textArray = (articleFormatting.content.sentences().data()).map((index) => { 
			// return index.text
			// }); 

		return articleFormatting;
	  }).then((article) => {
			res.render("new", {
				article: article}); //Must be an object

	  }).catch((err) => {
		console.log(err);
	  });

});

app.listen(keys.PORT, () => {
	console.log(`Server running on port ${keys.PORT}!`);
});