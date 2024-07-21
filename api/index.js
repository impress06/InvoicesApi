const express = require("express");
require("dotenv").config();
require("express-async-errors");
const app = express();
const path = require("path");
const cors = require("cors");

//accepted Json
app.use(express.json());

//accepted form data
app.use(express.urlencoded({ extended: true }));

const HOST = process.env.HOST;
const PORT = process.env.PORT;


// cors use
app.use(
  cors({origin:"http://localhost:3000"
  })
);

//authentication
app.use(require('./src/midilwares/authentication'))



//Swager
const swaggerUi = require('swagger-ui-express')
const swaggerJson = require('./src/config/swagger.json')
app.use('/documents/swagger', swaggerUi.serve, swaggerUi.setup(swaggerJson, { swaggerOptions: { persistAuthorization: true } }))

//Server Checking

app.all("/", (req, res) => {
  res.status(200).send({
    message: "hello welcome",
    user: req.user,
    documents: {
        swagger: '/documents/swagger',
        redoc: '/documents/redoc',
        json: '/documents/json',
    },

  });
});





//Mongo Db Connect

const { dbConnect } = require("./src/config/dbConnection");
dbConnect();

//password Encrypt

require("./src/helper/passwordCrypto");

//logger
app.use(require("./src/midilwares/logger"));

//cookie-session
const session = require("cookie-session");

app.use(
  session({
    secret: process.env.SECRET_KEY,
  })
);

// Static Files:
app.use("/upload", express.static(path.join(__dirname, "upload")));

//filter-search midilwares

app.use(require("./src/midilwares/pageSortSerchFilter"));

//router

app.use(require("./src/routers/"));

//errorHandlar
app.use(require("./src/midilwares/errorHandler"));

app.listen(PORT, () => {
  console.log(`Your server work on http://${HOST}:${PORT}`);
});
