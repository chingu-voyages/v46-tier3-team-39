import React from "react";
import NavigationWrapper from "../util/components/navigation/navigationWrapper";
import { Container, Typography } from "@mui/material";

export default async function Terms() {
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
            Terms and Conditions
          </Typography>

          <Typography variant="h6" component="h2">
            1. Acceptance of Terms
          </Typography>
          <Container>
            By using our app, you agree to comply with and be bound by these
            terms and conditions. If you do not agree to these terms, please do
            not use the app.
          </Container>

          <Typography variant="h6" component="h2">
            2. User Accounts
          </Typography>
          <Container>
            You may be required to create an account to access certain features
            of the app. You are responsible for maintaining the confidentiality
            of your account information and for all activities that occur under
            your account.
          </Container>

          <Typography variant="h6" component="h2">
            3. Content
          </Typography>
          <Container>
            Our app may contain educational content. The content is for
            informational purposes only, and we do not guarantee the accuracy or
            completeness of the information provided. We are not responsible for
            any decisions made based on the content available in the app.
          </Container>

          <Typography variant="h6" component="h2">
            4. Privacy
          </Typography>
          <Container>
            We respect your privacy. Please review our{" "}
            <a href="/privacy">Privacy Policy</a> to understand how we collect,
            use, and disclose information.
          </Container>

          <Typography variant="h6" component="h2">
            5. Termination
          </Typography>
          <Container>
            We reserve the right to terminate or suspend your account and access
            to the app at our sole discretion, without notice, for any reason,
            including violation of these terms.
          </Container>

          <Typography variant="h6" component="h2">
            6. Changes to Terms
          </Typography>
          <Container>
            We may update these terms from time to time. It is your
            responsibility to review the terms periodically. Continued use of
            the app after the changes will constitute acceptance of the updated
            terms.
          </Container>

          <Typography variant="h6" component="h2">
            7. Contact Us
          </Typography>
          <Container>
            If you have any questions about these terms, please contact us{" "}
            <a href="mailto:studyai610@gmail.com">
              <u>here</u>
            </a>
            .
          </Container>

          <Container>Last updated: 16/11/2023</Container>
        </Container>
      </NavigationWrapper>
    </>
  );
}
