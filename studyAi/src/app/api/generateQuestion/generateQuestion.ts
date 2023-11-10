import generatePrompts from "../../util/openAI/openAI";
import { NextResponse } from "next/server";
import * as z from "zod";
//schema for validating user inputs
const questionSchema = z.object({
  type: z.string(),
  tags: z.array(z.string()),
  title: z.array(z.string()),
  question: z.string(),
  answers: z.array(
    z.object({
      value: z.string(),
      id: z.string(),
    })
  ),
  numberOfOptions: z.number(),
});
type QuesitonSchema = z.infer<typeof questionSchema>;
const determinePromptTemplateStr = (questionType: string) => {
  let str: string;
  switch (questionType) {
    case "Multiple Choice":
      str = `
        {
          description: 'QuestionDescription'
          title: 'QuestionTitle'
          options: 'QuestionOptions'
          answer: 'CorrectAnswers'
        }
      `;
      return str;
    case "Short Answer":
      str = `
        {
          description: 'QuestionDescription'
          title: 'QuestionTitle'
          answer: 'CorrectAnswers'
        }
      `;
      return str;
    case "Select Multiple":
      str = `
        {
          description: 'QuestionDescription'
          title: 'QuestionTitle'
          options: 'QuestionOptions'
          answer: 'CorrectAnswers'
        }
      `;
      return str;
    default:
      str = `
        {
          description: 'QuestionDescription'
          title: 'QuestionTitle'
          answer: 'CorrectAnswers'
        }
      `;
      return str;
  }
};
const determineVariableTypeTemplateStr = (
  questionType: string,
  numberOfOptions: number
) => {
  let str: string;
  switch (questionType) {
    case "Multiple Choice":
      str = `the new options as a list of strings with length ${numberOfOptions} called 'QuestionOptions', and the new correct answer inside a list of strings, with length 1, called 'CorrectAnswers'.`;
      break;
    case "Short Answer":
      str = `the new correct answer inside a list of strings with length 1, called 'CorrectAnswers'`;
      break;
    case "Select Multiple":
      str = `the new options as a list of strings with length ${numberOfOptions} called 'QuestionOptions', and the new correct answer/answers as a list of strings called 'CorrectAnswers'`;
      break;
    default:
      str = `the new correct answer inside a list of strings with length 1, called 'CorrectAnswers'`;
      break;
  }
  return str;
};
export async function generateQuestion(req: Request) {
  try {
    const bodyPromise = req.json();
    const body = await bodyPromise;
    let parsedBody: QuesitonSchema;
    try {
      parsedBody = questionSchema.parse(body);
    } catch (err) {
      return NextResponse.json({
        status: 400,
        message: "Invalid input",
        error: err,
      });
    }
    const { type, tags, title, question, numberOfOptions, answers } =
      parsedBody;
    const questionType =
      type === "Multiple Choice"
        ? `A Multiple choice question, with ${numberOfOptions} unique options, but only one correct answer`
        : "Select Multiple"
        ? `A Select Multiple/Select All question, with ${numberOfOptions} unique options, where each option can be a correct answer OR incorrect answer. However, there MUST be at least ONE correct answer`
        : "Short Answer question";

    const prompt = `Give me a completely NEW question where the question type is: ${questionType}. 
    It should also be similar to the following question:
    questionTitle: ${title}, description: ${question}, answer: ${answers
      .map((a) => a.value)
      .join(", ")}.

    Also, try to ensure that the question is related to the following subjects: ${tags.join(
      ", "
    )}
    
    Then, store the new question description as a string called 'QuestionDescription', the new question title as a string 'QuestionTitle', ${determineVariableTypeTemplateStr(type, numberOfOptions)}

    Finally, return the new generated question data as a JSON object, in the following format:
    ${determinePromptTemplateStr(type)}`;
    // Indicate which is the correct response, and Return your response in a JSON object,
    // with the following format: {"question": "", "correct": ["",...], "incorrect": ["",...]};
    const model = "gpt-3.5-turbo";
    const questionGenerated = (await generatePrompts(model, prompt)) || "";
    let newQuestion = null;
    try {
      newQuestion = JSON.parse(questionGenerated);
    } catch (err) {
      return NextResponse.json({
        status: 500,
        message: `Failed to parse the following response ${questionGenerated}`,
        error: err,
      });
    }
    return NextResponse.json({
      newQuestion,
      message: `Question Generated Successfully`,
      status: 201,
    });
  } catch (err) {
    return NextResponse.json({
      status: 500,
      message: "Something went wrong",
    });
  }
}
