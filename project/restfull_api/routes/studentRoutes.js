const express = require("express");
const { renderHomePage,
    renderRegisterPage,
    studentRegister,
    renderAboutPage,
    renderSecretPage,
    renderLoginPage,
    studentLogin,
    renderLogoutPage } = require("../controller/studentController");

const { studentRegisterValidate,
    studentLoginValidate } = require('../middleware/validation');

const auth = require("../middleware/auth");

const Router = express.Router();

// route

Router.route("/").get(renderHomePage);

Router.route("/registration").get(renderRegisterPage);
Router.route("/registration").post(studentRegisterValidate, studentRegister);

Router.route("/about").get(renderAboutPage);

Router.route("/secret").get(auth, renderSecretPage);

Router.route("/login").get(renderLoginPage);
Router.route("/login").post(studentLoginValidate, studentLogin);

Router.route("/logout").get(auth, renderLogoutPage);



module.exports = Router;