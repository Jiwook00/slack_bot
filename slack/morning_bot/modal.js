const getQuestion = () => {
  let randomNumber1 = "";
  let randomNumber2 = "";
  const getRandom = () => Math.floor(Math.random() * 10);
  for (let i = 0; i < 3; i++) {
    randomNumber1 += getRandom();
    randomNumber2 += getRandom();
  }
  return `${randomNumber1} + ${randomNumber2} = ?`;
};

module.exports = (slackApp) => {
  slackApp.action("morning_button", async ({ body, ack, say, client }) => {
    await ack();
    try {
      const result = await client.views.open({
        trigger_id: body.trigger_id,
        view: {
          type: "modal",
          callback_id: "morning_modal",
          title: {
            type: "plain_text",
            text: "미라클 모닝 챌린지",
          },
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: "오늘의 문제.",
              },
            },
            {
              type: "input",
              block_id: "question",
              label: {
                type: "plain_text",
                text: `${getQuestion()}`,
              },
              element: {
                type: "plain_text_input",
                action_id: "answer",
              },
            },
          ],
          submit: {
            type: "plain_text",
            text: "Submit",
          },
        },
      });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  });
};
