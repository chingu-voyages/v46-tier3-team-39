import React from "react";
import { questions } from "./questions";
import SingleQuestion from "./SingleQuestion";
import NavigationWrapper from "@/app/util/components/navigation/navigationWrapper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import "./index.css";
export default function FaqsPage() {
  return (
    <NavigationWrapper
      appBars={{
        navbar: true,
        footer: true,
      }}
    >
      <></>
      <Container className="py-16 px-8">
        <Typography
          variant="h4"
          component="h2"
          className="mb-8 font-bold text-4xl sm:text-6xl"
        >
          Frequently Asked Questions
        </Typography>

        <section className="grid grid-cols-1 gap-8">
          {questions.map((card, index) => (
            <SingleQuestion {...card} key={index} />
          ))}
        </section>
      </Container>
    </NavigationWrapper>
  );
}
