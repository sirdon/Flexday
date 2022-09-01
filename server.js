const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Router = require('./routes/route')
// read env
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());

// middleware

app.use("/api/v1", Router)

app.listen(PORT, (err) => {
    if (err) console.log("server fail", err);
    else console.log("listening on port " + PORT)
});