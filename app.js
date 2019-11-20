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
    csv        = require('csv-parser'),
    fs         = require('fs'),
    brain      = require('brain.js'),
    stringToDom = require('string-to-dom');

    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;

app.set("view engine", "ejs"); // Rendering engine defined as EJS
app.use(express.static(__dirname + '/public')); // Tells express, CSS is in public folder
app.set("views", "views"); // Tells EJS the path to the "views" directory
app.use(bodyParser.urlencoded({extended: true})); // bodyParser config
// const sentiment = new Sentiment(); // Set's up thing for sentiment
let articles1 = []
fs.createReadStream('./data/all-the-news/articles1.csv')
.pipe(csv())
.on('data', (row) => {
  articles1.push(row);
  // columns = row.split(', ')
  })
  .on('end', () => {
    console.log('Articles 1, CSV Loaded!');
    // console.log(articles1);
    // for (let i = 0; i < articles1.length; i++) {
      // console.log(articles1[i])
      // console.log((articles1[i]).split(',', 10))
    // }
    // console.log(columns);
  });

let articles2 = []
fs.createReadStream('./data/all-the-news/articles1.csv')
  .pipe(csv())
  .on('data', (row) => {
    articles2.push(row);
})
.on('end', () => {
  console.log('Articles 2, CSV Loaded!');
  // console.log(article2);
  
});

let articles3 = []
let trainingData = []
fs.createReadStream('./data/all-the-news/articles1.csv')
  .pipe(csv())
  .on('data', (row) => {
    articles3.push(row);
})
.on('end', () => {
  console.log('Articles 3, CSV Loaded!');
  // console.log(article2);
  trainingData = articles1.concat(articles2, articles3);
});

const network = new brain.NeuralNetwork();

// network.train()
// test_article = '"After the bullet shells get counted, the blood dries and the votive candles burn out, people peer down from   windows and see crime scenes gone cold: a band of yellow police tape blowing in the breeze. The South Bronx, just across the Harlem River from Manhattan and once shorthand for urban dysfunction, still suffers violence at levels long ago slashed in many other parts of New York City. And yet the city’s efforts to fight it remain splintered, underfunded and burdened by scandal. In the 40th Precinct, at the southern tip of the Bronx, as in other poor, minority neighborhoods across the country, people long hounded for   infractions are crying out for more protection against grievous injury or death. By September, four of every five shootings in the precinct this year were unsolved. Out of the city’s 77 precincts, the 40th has the highest murder rate but the fewest detectives per violent crime, reflecting disparities in staffing that hit hardest in some neighborhoods outside Manhattan, according to a New York Times analysis of Police Department data. Investigators in the precinct are saddled with twice the number of cases the department recommends, even as their bosses are called to Police Headquarters to answer for the sharpest crime rise in the city this year. And across the Bronx, investigative resources are squeezed. It has the highest   rate of the city’s five boroughs but the thinnest detective staffing. Nine of the 14   precinct detective squads for violent crime in the city are there. The borough’s robbery squad is smaller than Manhattan’s, even though the Bronx has had 1, 300 more cases this year. And its homicide squad has one detective for every four murders, compared with one detective for roughly every two murders in Upper Manhattan and more than one detective per murder in Lower Manhattan. In   lobbies and   family apartments, outside methadone clinics and art studios, people take note of the inequity. They hear police commanders explain that they lack the resources to place a floodlight on a dangerous block or to post officers at a   corner. They watch witnesses cower behind   doors, more fearful of a gunman’s crew than confident in the Police Department’s ability to protect them. So though people see a lot, they rarely testify. And in the South Bronx, as in so many predominantly black and Hispanic neighborhoods like it in the United States, the contract between the police and the community is in tatters. Some people have stories of crime reports that were ignored, or 911 calls that went unanswered for hours. Others tell of a 911 call for help ending in the caller’s arrest, or of a minor charge leading to 12 hours in a fetid holding cell. This is the paradox of policing in the 40th Precinct. Its neighborhoods have historically been prime targets for aggressive tactics, like    that are designed to ward off disorder. But precinct detectives there have less time than anywhere else in the city to answer for the blood spilled in violent crimes. Gola White, who was beside her daughter when she was shot and killed in a playground this summer, four years after her son was gunned down in the same housing project, ticked off the public safety resources that she said were scant in Bronx neighborhoods like hers: security cameras, lights, locks, investigating police officers. “Here, we have nothing,” she said. When it comes to “  families,” she said, the authorities “don’t really care as much. That’s how I feel. ” The Times has been documenting the murders logged this year in the 40th Precinct, one of a handful of neighborhoods where deadly violence remains a problem in an era of   crime in New York City. The homicides  —   14 in the precinct this year, up from nine in 2015  —   strain detectives, and when they go unsolved, as half of them have this year, some look to take the law into their own hands. From hundreds of conversations with grieving relatives and friends, witnesses and police officers, the social forces that flare into murder in a place like the 40th Precinct become clearer: merciless gang codes, mental illness, drugs and long memories of feuds that simmered out of officers’ view. The reasons some murders will never be solved also emerge: paralyzing fear of retribution, victims carrying secrets to their graves and relentless casework that forces detectives to move on in hopes that a break will come later. Frustrations build on all sides. Detectives’ phones rarely ring with tips, and officers grow embittered with witnesses who will not cooperate. In the meantime, a victim’s friends conduct their own investigations, and talk of grabbing a stash gun from a wheel well or a mother’s apartment when they find their suspect. In the chasm between the police and the community, gangs and gun violence flourish. Parents try to protect their families from drug crews’ threats, and officers work to overcome the residue of years of mistrust and understaffing in communities where they still go racing from one 911 call to the next. The streets around St. Mary’s Park were the scene of two fatal shootings logged in the 40th Precinct this year. Both are unsolved. James Fernandez heard talk of the murders through the door of his   apartment on East 146th Street in a     the Betances Houses. He lived at the end of a long hallway strewn with hypodermic needles, empty dope bags and discarded Hennessy bottles. A   young men who spoke of being in a subset of the Bloods gang had made it their drug market, slinging marijuana and cocaine to regulars, flashing firearms and blowing smoke into the Fernandez apartment. When Mr. Fernandez, 40, asked the young men to move, they answered by busting up his car. This kind of crime, an anachronism in much of New York, still rattles the 40th Precinct, even though murders there have fallen to 14 this year from 83 in 1991. It has more major felony crimes per resident than any other residential district in the city. It is also one of the poorest communities in the country, and many young men find their way into underground markets. Mr. Fernandez was not one to shrink from the threats. When he was growing up on the Lower East Side, he rode his bicycle around to the customers of the drug dealers he worked for and collected payments in a backpack. After leaving that life, he got a tech maintenance job and, three years ago, moved into the Betances Houses with his wife and daughter, now 11. He had two choices to get help with the drug crew: call the police for help and risk being labeled a snitch, or call his old Lower East Side bosses for muscle and risk violence. He chose the police. Again and again, he walked into a local substation, Police Service Area 7, and asked for protection. His daughter was using an inhaler to relieve coughs from the marijuana smoke. Mr. Fernandez and his wife got terrible headaches. “There’s a lot of killers here, and we are going to kill you,” a sergeant’s police report quoted a    telling Mr. Fernandez in August 2015. A second report filed the same day said a    warned him, “I’m going to shoot through your window. ” Mr. Fernandez told the police both the teenagers’ names, which appear in the reports, and then went home. He said one of their friends had seen him walk into the substation, and they tried to intimidate him out of filing another report. Three days later, the same    propped his bike on their door, “then said if I was to open the door and say something, they would body slam me,” Mr. Fernandez’s wife, Maria Fernandez, wrote on slips of paper she used to document the hallway ruckus and the inadequate police response. The boys made comments about how easy a target she was and about how they would have to “slap” her if she opened the door while they made a drug sale, and they threatened to beat the Fernandez family because “they are the ones snitching,” her notes say. But another   complaint at the substation, 10 days after the first, brought no relief. A week later, feeling desperate, Ms. Fernandez tried calling: first to the substation, at 8:50 p. m. when one of the boys blew weed smoke at her door and made a   threat to attack her, and then to 911 at 10:36 p. m. The police never came, she wrote in her notes. She tried the 40th Precinct station house next, but officers at the desk left her standing in the public waiting area for a   she said, making her fear being seen again. Officers put her in worse danger some months later, she said, when they came to her door and announced in front of the teenagers that they were there on a complaint about drug activity. Mr. Fernandez started doing the work that he said the police had failed to do. He wired a camera into his peephole to record the drugs and guns. The footage hark back to the New York of the 1980s, still very much present to some of the precinct’s residents. Around 6:30 each morning, Sgt. Michael J. LoPuzzo walks through the tall wooden doors of the 40th Precinct station house. The cases that land on his metal desk  —   dead bodies with no known cause, strip club brawls, shooting victims hobbling into the hospital themselves  —   bring resistance at every turn, reminding him of an earlier era in the city’s   campaign. “I haven’t got one single phone call that’s putting me in the right direction here,” said Sergeant LoPuzzo, the head of the precinct’s detective squad, one day this summer as he worked on an answer to an email inquiry from a murder victim’s aunt about why the killer had not been caught. “And people just don’t understand that. ” Often it is detectives who most feel the effects of people turning on the police. Witnesses shout them away from their doors just so neighbors know they refuse to talk. Of the 184 people who were shot and wounded in the Bronx through early September, more than a third  —   66 victims  —   refused to c';
var article_content;
for (let i = 0; i < trainingData.length; i++) {
  article_content = trainingData[i].content;
}
const textArray = (nlp(article_content).sentences().data()).map((index) => {
  return index.text 
});

let wordsScoreArray = [];
const wordsArray = []
const sentimentScoreSentence = [];
for (let i = 0; i < textArray.length; i++) {
  sentimentScoreSentence.push(sentiment.analyze(textArray[i]));
  wordsArray.push(sentimentScoreSentence.words);
}
console.log(textArray);
//  Replace wordsArray with allWords array
for (let j = 0; j < wordsArray.length; j++) {
  const scores = sentimentScoreSentence.score;
  wordsScoreArray.push(sentiment.analyze(wordsArray[j]).score);
}

//Gets the total number from all of the words I think
var total = 0;
const wordsScoreArray_int =  (wordsScoreArray).map(function(x){return parseInt(x)});;
for (let i = 0; i < wordsScoreArray_int.length; i++) {
  total += wordsScoreArray_int[i]+=5;
}

//All the way at the end Overall Summary
var avg = total / wordsScoreArray_int.length;


function overallScore(avg) {
  let output;
  if (avg > 5.5) {
    output = "Overall, the article shows a positive slant towards the subject matter.";
  } else if (avg < 4.5){
    output = "Overall, the article shows a negative slant towards the subject matter.";
  }
  else {
    output = "Overall, the article shows a neutral slant towards the subject matter.";
  }
  console.log(avg);
  return output;
}

console.log(overallScore(avg))



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
