const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
var bodyParser = require('body-parser')
const cors = require('cors')
const app = express();

//Connect DB
connectDB();

const postRouter = require("./routes/post");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
// CORS
app.use(cors());

app.use("/post", postRouter);


app.use(errorHandler);

const port = process.env.PORT || 8022;

const server = app.listen(port, () => {
  console.log(`Server running on port ${port} from Post`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log("Logged Error: " + err.message);
  server.close(() => process.exit(1));
});
