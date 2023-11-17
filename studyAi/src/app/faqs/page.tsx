import React from "react";
import NavigationWrapper from "../util/components/navigation/navigationWrapper";
import { Container, Typography } from "@mui/material";

export default async function FAQs() {
  return (
    <>
      <NavigationWrapper
        appBars={{
          navbar: true,
          footer: true,
        }}
      >
        <Container>
          <Typography variant="h4" component="h2">
            Frequently Asked Questions
          </Typography>

          
            <Typography variant="h6" component="h2">Q: How do I start a quiz?</Typography>
            <Container>
              A: To start a quiz, click on the "Start Quiz" button on the
              homepage.
            </Container>
          

          
            <Typography variant="h6" component="h2">Q: Can I skip a question?</Typography>
            <Container>
              A: Yes, you can skip a question and come back to it later. Use the
              navigation buttons to move between questions.
            </Container>
          

          
            <Typography variant="h6" component="h2">Q: How do I submit my answers?</Typography>
            <Container>
              A: Click on the "Submit" button after answering each question
              to submit your quiz answers.
            </Container>
          

          
            <Typography variant="h6" component="h2">Q: Can I review my quiz results?</Typography>
            <Container>
              A: Yes, after submitting the quiz, you can review your results,
              including correct and incorrect answers.
            </Container>
          

            <Typography variant="h6" component="h2">Q: Is there a time limit for quizzes?</Typography>
            <Container>
              A: The time limit for quizzes may vary. Check the quiz
              instructions for information on time constraints.
            </Container>
          
        </Container>
      </NavigationWrapper>
    </>
  );
}
