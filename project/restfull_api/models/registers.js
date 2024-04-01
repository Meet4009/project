const mongoose = require("mongoose");       // npm i mongoose
const validator = require("validator");     // npm i validator
const bcrypt = require("bcryptjs");         // npm i bcryptjs
const jwt = require("jsonwebtoken");        // npm i jsonwebtoken

const studentSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "please Enter your first"]

    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email");
            }
        }
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
        min: 10
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})
// generating token

studentSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (error) {
        res.send("the error part" + error);
  

    }
}

// pasword hash


studentSchema.pre("save", async function (next) {
    if (this.isModified('password')) {
       
        this.password = await bcrypt.hash(this.password, 10);
        

        this.confirmpassword = await bcrypt.hash(this.password, 10);
    }
    next();
})

const Register = new mongoose.model("Register", studentSchema);

module.exports = Register;