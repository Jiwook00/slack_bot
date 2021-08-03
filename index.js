const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(express.json());

// slack
const configuration = require("./slack/config");
const { App } = require("@slack/bolt");
const slackApp = new App(configuration);

const { stand_up_bot, morning_bot } = require("./slack");

app.get("/stand-up/notice", (req, res) => {
  stand_up_bot.notice(slackApp);
  res.send("OK");
});

stand_up_bot.modal(slackApp);
stand_up_bot.post(slackApp);

//morning_bot.notice(slackApp);

(async () => {
  await slackApp.start(port || 4000);
  console.log("⚡️ Bolt app is running!");
})();

app.listen(port, () => {
  console.log(`server is running, port : ${port}`);
});

module.exports = { slackApp };
