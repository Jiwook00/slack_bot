const axios = require("axios");

const getCatImage = async () => {
  const image = await axios({
    method: "get",
    url: `https://api.thecatapi.com/v1/images/search`,
  }).catch((err) => err.response);
  if (image.status === 200) {
    return image.data[0].url;
  } else {
    return "https://pbs.twimg.com/profile_images/625633822235693056/lNGUneLX_400x400.jpg";
  }
};

const getAdvice = async () => {
  const advice = await axios({
    method: "get",
    url: `https://api.adviceslip.com/advice`,
  }).catch((err) => err.response);
  if (advice.status === 200) {
    return advice.data.slip.advice;
  } else {
    return "";
  }
};

module.exports = async (slackApp) => {
  const imageUrl = await getCatImage();
  const advice = await getAdvice();

  slackApp.client.chat.postMessage({
    channel: "challenge",
    text: `미션 시간이 종료 되었습니다.`,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `오늘의 한마디 \n \n 🔖   ${advice}`,
        },
        accessory: {
          type: "image",
          image_url: imageUrl,
          alt_text: "cute cat",
        },
      },
    ],
  });
};
