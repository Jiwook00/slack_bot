module.exports = (slackApp) => {
  slackApp.client.chat.postMessage({
    channel: "bolt_start",
    text: `☀️ 온도 체크 해주세요`,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `☀️ 온도 체크 해주세요`,
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Click Me",
          },
          action_id: "button_click",
        },
      },
    ],
  });
};
