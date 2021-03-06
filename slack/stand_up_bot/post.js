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
        text: `πββοΈ ${user}`,
        attachments: [
          {
            //   pretext: " ",
            // color: "#eddd00",
            fields: [
              {
                title: ``,
              },
              {
                title: "1. μ€λ μ¨λμ²΄ν¬ ν΄μ£ΌμΈμ! μ΄μ λ κ°μ΄ μ μ΄μ£ΌμΈμ.",
                value: `π‘  ${selected} \n ${answer_1}`,
                short: false,
              },
              {
                title: "2. μ§μ  μλ¬΄μΌμλ μ΄λ€ μμμ νμ¨λμ?",
                value: `\n ${answer_2} \n`,
                short: false,
              },
              {
                title: "3. μ€λμ μ΄λ€ μμμ νμ¨λμ? νΉμ νμ€ μμ μΈκ°μ?",
                value: `${answer_3}`,
                short: false,
              },
              {
                title: "4. μ€λμ μ΄λ€ μμμ νμ¨λμ? νΉμ νμ€ μμ μΈκ°μ?",
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
