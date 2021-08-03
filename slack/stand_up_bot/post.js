module.exports = (slackApp) => {
  slackApp.view("stand_up_modal", async ({ ack, body, view, client }) => {
    await ack();
    const user = body.user.name;

    const answer_1 = view["state"]["values"]["question_1"]["answer_1"]["value"];
    const answer_2 = view["state"]["values"]["question_2"]["answer_2"]["value"];
    const answer_3 = view["state"]["values"]["question_3"]["answer_3"]["value"];
    const answer_4 = view["state"]["values"]["question_4"]["answer_4"]["value"];
    const selected =
      view["state"]["values"]["select_question"]["select_answer"][
        "selected_option"
      ]["text"]["text"];

    // Message the user
    try {
      await client.chat.postMessage({
        channel: "bolt_start",
        text: `🙆‍♂️ ${user}`,
        attachments: [
          {
            //   pretext: " ",
            // color: "#eddd00",
            fields: [
              {
                title: ``,
              },
              {
                title: "1. 오늘 온도체크 해주세요! 이유도 같이 적어주세요.",
                value: `🌡  ${selected} \n ${answer_1}`,
                short: false,
              },
              {
                title: "2. 직전 업무일에는 어떤 작업을 하셨나요?",
                value: `\n ${answer_2} \n`,
                short: false,
              },
              {
                title: "3. 오늘은 어떤 작업을 하셨나요? 혹은 하실 예정인가요?",
                value: `${answer_3}`,
                short: false,
              },
              {
                title: "4. 오늘은 어떤 작업을 하셨나요? 혹은 하실 예정인가요?",
                value: `${answer_4}`,
                short: false,
              },
            ],
          },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  });
};
