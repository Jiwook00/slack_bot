module.exports = (slackApp) => {
  slackApp.action("button_click", async ({ body, ack, client }) => {
    await ack();
    try {
      const result = await client.views.open({
        trigger_id: body.trigger_id,
        view: {
          type: "modal",
          // View identifier
          callback_id: "stand_up_modal",
          title: {
            type: "plain_text",
            text: "Stand Up Meeting",
          },
          blocks: [
            {
              type: "input",
              block_id: "question_1",
              element: {
                type: "plain_text_input",
                action_id: "answer_1",
              },
              label: {
                type: "plain_text",
                text: "1. 오늘 온도체크 해주세요! 이유도 같이 적어주세요.",
                emoji: true,
              },
            },
            {
              type: "section",
              block_id: "select_question",
              text: {
                type: "mrkdwn",
                text: " ",
              },
              accessory: {
                type: "static_select",
                action_id: "select_answer",
                placeholder: {
                  type: "plain_text",
                  text: "Select an item",
                  emoji: true,
                },
                options: [
                  {
                    text: {
                      type: "plain_text",
                      text: "1",
                      emoji: true,
                    },
                    value: "value_1",
                  },
                  {
                    text: {
                      type: "plain_text",
                      text: "2",
                      emoji: true,
                    },
                    value: "value_2",
                  },
                  {
                    text: {
                      type: "plain_text",
                      text: "3",
                      emoji: true,
                    },
                    value: "value_3",
                  },
                  {
                    text: {
                      type: "plain_text",
                      text: "4",
                      emoji: true,
                    },
                    value: "value_4",
                  },
                  {
                    text: {
                      type: "plain_text",
                      text: "5",
                      emoji: true,
                    },
                    value: "value_5",
                  },
                ],
              },
            },
            {
              type: "input",
              block_id: "question_2",
              element: {
                type: "plain_text_input",
                multiline: true,
                action_id: "answer_2",
              },
              label: {
                type: "plain_text",
                text: "2. 직전 업무일에는 어떤 작업을 하셨나요?",
                emoji: true,
              },
            },
            {
              type: "input",
              block_id: "question_3",
              element: {
                type: "plain_text_input",
                multiline: true,
                action_id: "answer_3",
              },
              label: {
                type: "plain_text",
                text: "3. 오늘은 어떤 작업을 하셨나요? 혹은 하실 예정인가요?",
                emoji: true,
              },
            },
            {
              type: "input",
              block_id: "question_4",
              element: {
                type: "plain_text_input",
                multiline: true,
                action_id: "answer_4",
              },
              label: {
                type: "plain_text",
                text:
                  "4. 직전 업무일에 작업하면서 어려운 점은 없었나요? 혹시 있었다면 말해주세요",
                emoji: true,
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
