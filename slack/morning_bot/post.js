const checkAnswer = (question, answer) => {
  const questionArr = question.split(" ");
  const result = +questionArr[0] + +questionArr[2];
  if (result === +answer) {
    return "정답입니다. 🙆‍♂️";
  } else {
    return "틀렸습니다. 🙅‍♂️";
  }
};

module.exports = (slackApp) => {
  slackApp.view("morning_modal", async ({ ack, body, view, client }) => {
    await ack();
    const question = view.blocks[1]["label"]["text"];
    const answer = view["state"]["values"]["question"]["answer"]["value"];
    const user = body.user.name;
    const result = checkAnswer(question, answer);

    try {
      await client.chat.postMessage({
        channel: "challenge",
        text: `${user}님 ${result}`,
      });
    } catch (error) {
      console.error(error);
    }
  });
};
