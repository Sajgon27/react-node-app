const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
dotenv.config({ path: "./config.env" });

const app = require("./app");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

console.log(process.env.PORT);

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,

  useUnifiedTopology: true,
});

const server = app.listen(3001, () => {
  console.log(`listen on $ 3001`);
});
