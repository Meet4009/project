
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");

const auth = require("../middleware/auth");

const staticProject = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../template/views");
const partialsPath = path.join(__dirname, "../template/partials");

app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialsPath);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));


app.use(express.static(staticProject));


const Register = require("../models/registers");


exports.renderHomePage = (async (req, res) => {
    res.render('index');
});

exports.renderSecretPage = (async (req, res) => {
    res.render('secret');
});

exports.renderAboutPage = (async (req, res) => {
    res.render('about');
});

exports.renderRegisterPage = (async (req, res) => {
    res.render('ragister');
});

exports.renderLoginPage = (async (req, res) => {
    res.render('login');
});

exports.studentRegister = (async (req, res) => {
    try {

        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if (password === cpassword) {
            const studentdata = new Register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                phone: req.body.phone,
                age: req.body.age,
                gender: req.body.gender,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword,
            })


            const token = await studentdata.generateAuthToken();

            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 60000),
                httpOnly: true
            });

            const registered = await studentdata.save();
         
            res.status(201).render('index');
        } else {
            res.send("Password not mathching");
        }

    } catch (error) {
        res.status(400).send(error);
    }
});



exports.studentLogin = (async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({ email: email });

        const isMatch = await bcrypt.compare(password, useremail.password);

        if (isMatch && useremail) {

            const token = await useremail.generateAuthToken();

            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 600000),
                httpOnly: true
            });
            res.status(201).render("index");
        } else {
            res.send("password are not matching");
        }

    } catch (error) {
        res.status(400).render("ragister");
    }

});


exports.renderLogoutPage = (async (req, res) => {
    try {

        req.user.tokens = req.user.tokens.filter((currElement) => {
            return currElement.token !== req.token
        })

        res.clearCookie("jwt");

        await req.user.save();

        res.render("login");

    } catch (error) {
        res.status(500).send(error);
    }
});


