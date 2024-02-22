import express from "express";
import { dirname } from "path";
import bodyParser from "body-parser";
import morgan from "morgan";
import { fileURLToPath } from "url";

const app=express();
const port=3000;
const __dirname=dirname(fileURLToPath(import.meta.url));

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('tiny'));
// Get current date and time
let currentDate = new Date();

// Get individual components of the date and time
let month = currentDate.getMonth() + 1; // Adding 1 because months are zero-based (0 for January)
let day = currentDate.getDate();
let year = currentDate.getFullYear();
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();
let seconds = currentDate.getSeconds();
let ampm = hours >= 12 ? 'PM' : 'AM'; // Determine whether it's AM or PM
hours = hours % 12; // Convert to 12-hour format
hours = hours ? hours : 12; // Handle midnight (12 AM)

// Pad single-digit numbers with leading zeros
month = month < 10 ? '0' + month : month;
day = day < 10 ? '0' + day : day;
hours = hours < 10 ? '0' + hours : hours;
minutes = minutes < 10 ? '0' + minutes : minutes;
seconds = seconds < 10 ? '0' + seconds : seconds;

// Construct the formatted date and time string
let formattedDateTime = month + '/' + day + '/' + year + ', ' + hours + ':' + minutes + ':' + seconds + ' ' + ampm;

console.log(formattedDateTime); // Output example: "2/20/2024, 1:43:10 PM"

let mainContent=["What do a normal kid will be dreaming of to be when he will grow up? A Pilot, A Doctor,A Chef Right I wanted to be a F1 driver sounds crazy ut thats who I wanted to be just because of the cool cars they drive and the speed is fascinating enough to make 10 year old a fanof F1. Tell your stories who you"];
let titleBlog=["What you wanted to be Growing Up I wanted to be an F1 driver."];


app.get("/",(req,res)=>{
    res.render(__dirname+"/views/index.ejs",{
        formattedDateTime: formattedDateTime,
        content:mainContent,
        title:titleBlog,
    });
});


app.post("/submit",(req,res)=>{
    mainContent.push(req.body['content']);
    titleBlog.push(req.body['header']);
    res.redirect("/");
})


app.get("/create", (req, res) => {
    res.render(__dirname+"/views/post.ejs");
});


app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
});