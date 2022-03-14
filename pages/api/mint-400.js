import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/db";

export default async function handler(req, res) {
  const data = req.body;
  const info = data.BasicInformation;
  const addressInfo = data.MailingAddress;
  let privacyOptin;
  let offerOptin;

  const colRef = collection(db, "mint-400-2022");

  if (info.PrivacyPolicy.length > 0) {
    privacyOptin = true;
  } else {
    privacyOptin = false;
  }

  if (info.SpecialOffer.length > 0) {
    offerOptin = true;
  } else {
    offerOptin = false;
  }

  const submission = {
    basicInformation: {
      firstName: info.FirstName,
      lastName: info.LastName,
      gender: info.Gender,
      age: info.Age,
      email: info.Email,
    },
    privacyPolicy: privacyOptin,
    specialOffer: offerOptin,
    mailingAddress: addressInfo.FullAddress,
    questions: [
      {
        label:
          "What is the most important factor in your motor oil purchase decision?",
        answer: data.QuestionOne,
      },
      {
        label:
          "Which of these attributes are most important to you in a motor oil?",
        answer: data.QuestionTwo,
      },
      {
        label: "How do you change your oil?",
        answer: data.QuestionThree,
      },
      {
        label: "What motor oil brand do you typically use?",
        answer: data.QuestionFour,
      },
      {
        label:
          "Do you use conventional or synthetic motor oil in your primary, personal car?",
        answer: data.QuestionFive,
      },
      {
        label: "Where do you purchase your motor oil?",
        answer: data.QuestionSix,
      },
      {
        label: "What type of racing do you primarily follow?",
        answer: data.QuestionSeven,
      },
      {
        label:
          "How many times per year do you change your oil in your primary?",
        answer: data.QuestionEight,
      },
      {
        label: "What drives you to get an oil change?",
        answer: data.QuestionNine,
      },
      {
        label: "What is the make of your primary personal car?",
        answer: data.QuestionTen,
      },
      {
        label:
          "How many cars do you have in your household including your primary?",
        answer: data.QuestionEleven,
      },
      {
        label: "Which of the following do you spend the most time using?",
        answer: data.QuestionTwelve,
      },
      {
        label:
          "What types of communications would you like to see from the Mobil 1 brand?",
        answer: data.QuestionThirteen,
      },
    ],
  };

  await addDoc(colRef, submission);

  console.log(submission);

  res.status(200).send("Success");
}
