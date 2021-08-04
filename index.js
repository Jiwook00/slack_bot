const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(express.json());
const schedule = require("node-schedule");

// slack
const configuration = require("./slack/config");
const { App } = require("@slack/bolt");
const slackApp = new App(configuration);
const { stand_up_bot, morning_bot } = require("./slack");

// stand up slack bot
app.get("/stand-up/notice", (req, res) => {
  stand_up_bot.notice(slackApp);
  res.status(200).send("OK");
});
stand_up_bot.modal(slackApp);
stand_up_bot.post(slackApp);

// miracle morning slack bot
app.get("/morning/notice", (req, res) => {
  morning_bot.notice(slackApp);
  res.status(200).send("OK");
});

schedule.scheduleJob("00 00 06 * * 1-5", () => {
  morning_bot.notice(slackApp);
});

schedule.scheduleJob("00 03 06 * * 1-5", () => {
  morning_bot.done(slackApp);
});

morning_bot.modal(slackApp);
morning_bot.post(slackApp);

(async () => {
  await slackApp.start(port || 4000);
  console.log("⚡️ Bolt app is running!");
})();

app.listen(port, () => {
  console.log(`server is running, port : ${port}`);
});

module.exports = { slackApp };
