const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const  session = require('express-session');


const app = express();

app.use(express.static(__dirname + "/static"));
app.use(session({secret: 'codingdojorocks'}));

app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

app.use (bodyParser.urlencoded({extended:true}) )

let magicNumber=Math.floor(Math.random() * 100);
if(magicNumber==0){
    magicNumber=Math.floor(Math.random() * 100);
}
let startGame=0;
let ccs="";
let text="";
let number = 0;
let finish = false;

app.get("/", function (req, response){
    console.log ("The winner number is: " + magicNumber);
    startGame++;
    let result = {
            ccs,
            text
        };
    response.render('index', {startGame, result, finish});
});

app.post ("/test", function (request, response){
    number=request.body.number;
    if (number==magicNumber){
        finish = true;
        ccs="good";
        text=number + " was the number!"
    }
    else if (number>magicNumber){
        ccs="bad";
        text="Too high!"
    }
    else if (number<magicNumber){
        ccs="bad";
        text="Too low!"
    };
    response.redirect('/');
});

app.get("/restart", function (req, response){
    finish = false;
    startGame=0;
    magicNumber=Math.floor(Math.random() * 100);
    response.redirect('/');
});

app.listen(8080, function() {
    console.log("listening on port 8080");
});