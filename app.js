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
		  const articleInTextForm = articleInHTMLForm.replace(/<\/?[^>]+(>|$)/g, "");
		//   console.log(articleInTextForm);
		  const nlpArticle = nlp(articleInTextForm);
			// const textArray = (nlpArticle.sentences().data()).map((index) => {
			// 	return index.text
			// 	});

		//   console.log(textArray);

		// res.send(articleInHTMLForm);

		// res.render('index', function(err, nlpArticle) {
		// 	res.send(nlpArticle);
		// });
		
		// res.redirect("/", 
		// 	{
		// 	hi: "hi",
		// 	articleInHTMLForm: articleInHTMLForm
		// 	});
		return nlpArticle;
	  }).then((article) => {
			res.render("new", 
						{
						hi: "hi",
						nlpArticle: article
						});

			// console.log(article)
	  }).catch((err) => {
		console.log(err);
	  });

});

app.listen(keys.PORT, () => {
	console.log(`Server running on port ${keys.PORT}!`);
});