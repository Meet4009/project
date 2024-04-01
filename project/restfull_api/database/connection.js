const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE)
    .then(() => {
        console.log(`connection successful...`);
    }).catch((error) => {
        console.log(`No connection`);
    })

