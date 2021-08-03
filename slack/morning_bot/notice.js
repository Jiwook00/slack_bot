module.exports = (slackApp) => {
  slackApp.client.chat.postMessage({
    channel: "challenge",
    text: `☀️ Good Morning`,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `☀️ Good Morning`,
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "오늘의 문제",
          },
          action_id: "morning_button",
        },
      },
    ],
  });
};
