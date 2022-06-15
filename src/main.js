const dbRun = require("./db/db-run.js");
const express = require("express");
const wordsRouter = require("./routers/words-router.js");
const userRouter = require("./routers/user-router.js");

//init the server.
dbRun.dbStart();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(wordsRouter);
app.use(userRouter);
app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
