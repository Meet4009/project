require('dotenv').config();
const express = require('express');   
const app = express();
const path = require('path');
const hbs = require('hbs');    
const cookieParser = require("cookie-parser");

const student = require("../routes/studentRoutes");

require("../database/connection");  

const staticProject = path.join(__dirname, "../public");          
const templatePath = path.join(__dirname, "../template/views");   
const partialsPath = path.join(__dirname, "../template/partials");  

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "hbs");         
app.set("views", templatePath);        
hbs.registerPartials(partialsPath);    

app.use(express.static(staticProject));

app.use(student);


app.listen(port, () => {
    console.log(`listing to the potr ${port}`);
});
