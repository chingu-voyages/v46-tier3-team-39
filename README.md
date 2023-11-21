# StudyAi

## Overview

StudyAI was made as a tier 3 project of Chingu's Voyage 46, a program that connects developers to create a minimum viable product (MVP) at the end of a six-week incremental sprint process. The vision for this project is to utilize AI technology to create an infinite exam prep generator using previous questions as a template. For example, a student could take a practice exam given by their teacher and use StudyAI to generate similar questions to get more vital practice before the actual exam.

## Features
- A landing page that describes the project, introduces the team and directs the user to sign up
- User authentication with Google account integration
- A dashboard that welcomes the user back with weekly stats, allows the user to edit their profile and directs them to view or generate questions
- Users can upload questions with a title, tags (e.g. science), description, and an answer that is either multiple choice, checkbox, or short answer
- Users can use AI to generate a new similar question using a previously entered question
- Question library that displays all questions created by the user categorized by public or private
- Question view page that includes an optional timer and allows the user to attempt solving the problem before viewing the solution
### Future features:
- Users can create quizzes with questions from either their library or the community library
- Environment for users to take quizzes with timer, results, etc.

## Running the project
First, make sure to `cd` into the StudyAi directory and run `npm install` to install the dependencies.

### Secrets
This project uses Hashicorp Vault as a centralized secret solution. To get the secrets for this project you need a Hashicorp account and an invitation to join the project. The process for integrating the secrets once you have been added to the project is described in this presentation: [Accessing Vault Secrets](https://docs.google.com/presentation/d/1wDo0icO_-ZLVZzBWgixg4VPqchTOLW6pNqpG3F1rHmw/edit?usp=sharing)

### Prisma
This project uses Prisma to generate the schemas for our database. After obtaining the secrets to the database in the previous step using `npm run secrets`, generate the schemas using the command `npm run prisma`. 

After completing these steps, you should be able to run the project using `npm run dev`. 

## Dependencies 
- [Apollo](https://www.npmjs.com/package/@apollo/client)
- [Axios](https://www.npmjs.com/package/axios)
- [GraphQL](https://www.npmjs.com/package/graphql)
- [Next Auth](https://www.npmjs.com/package/next-auth)
- [Next Auth Prisma Adapter](https://authjs.dev/reference/adapter/prisma)
- [OpenAI](https://www.npmjs.com/package/openai)
- [Prisma](https://www.npmjs.com/package/next-auth)
- [React Sweet State](https://www.npmjs.com/package/react-sweet-state)

## Contributors

### Arky Asmal
- [LinkedIn](https://www.linkedin.com/in/arky-asmal/)

### Irha
- [LinkedIn](https://www.linkedin.com/in/irha-ali-522039105/)

### Tiffany

### Fung

### Connor
- [LinkedIn](https://www.linkedin.com/in/connor-crump-b83166264/)
