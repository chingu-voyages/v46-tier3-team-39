import React from "react";
import NavigationWrapper from "../util/components/navigation/navigationWrapper";
import { Container, Typography } from "@mui/material";

export default async function PrivacyPolicy() {
  return (
    <NavigationWrapper
      appBars={{
        navbar: true,
        footer: true,
      }}
    >
      <Container>
        <Typography variant="h4" component="h2">
          Privacy Policy
        </Typography>

        <Typography variant="h6" component="h2">
          1. Acceptance of Terms
        </Typography>
        <Container>
          By accessing or using StudyAI, you agree to comply with and be bound
          by these terms and conditions. If you do not agree with any part of
          these terms, you may not use the App.
        </Container>

        <Typography variant="h6" component="h2">
          2. User Accounts
        </Typography>
        <Container>
          (a) Users may be required to create an account to access certain
          features of the App. You are responsible for maintaining the
          confidentiality of your account information and for all activities
          that occur under your account. (b) You agree to provide accurate and
          complete information during the account registration process.
        </Container>

        <Typography variant="h6" component="h2">
          3. Educational Content
        </Typography>
        <Container>
          (a) The App provides educational content, including but not limited to
          quizzes, assessments, and interactive learning materials. (b) While we
          strive for accuracy, we do not guarantee the correctness or
          completeness of the educational content. Users should verify
          information before relying on it.
        </Container>

        <Typography variant="h6" component="h2">
          4. User Conduct
        </Typography>
        <Container>
          (a) Users must not engage in any behavior that could harm the App,
          other users, or violate any applicable laws. This includes, but is not
          limited to, misuse, cheating, or unauthorized access. (b) Users are
          prohibited from attempting to interfere with the proper functioning of
          the App.
        </Container>

        <Typography variant="h6" component="h2">
          5. Privacy
        </Typography>
        <Container>
          (a) We collect and use information in accordance with our Privacy
          Policy. By using the App, you consent to the collection and use of
          your data as described in the Privacy Policy. (b) Users are
          responsible for reviewing and understanding the Privacy Policy.
        </Container>

        <Typography variant="h6" component="h2">
          6. Termination
        </Typography>
        <Container>
          We reserve the right to terminate or suspend user accounts and access
          to the App for violation of these terms.
        </Container>

        <Typography variant="h6" component="h2">
          7. Changes to Terms
        </Typography>
        <Container>
          We may update or modify these terms at any time. Users will be
          notified of changes, and continued use of the App after such
          modifications constitutes acceptance of the updated terms.
        </Container>

        <Typography variant="h6" component="h2">
          8. Intellectual Property
        </Typography>
        <Container>
          (a) The App and its content are protected by intellectual property
          laws. Users agree not to reproduce, distribute, or create derivative
          works based on the App without our prior written consent.
        </Container>

        <Typography variant="h6" component="h2">
          9. Limitation of Liability
        </Typography>
        <Container>
          (a) To the extent permitted by law, we shall not be liable for any
          indirect, incidental, special, consequential, or punitive damages, or
          any loss of profits or revenues, whether incurred directly or
          indirectly.
        </Container>

        <Typography variant="h6" component="h2">
          10. Governing Law
        </Typography>
        <Container>
          These terms and conditions are governed by and construed in accordance
          with the laws of Your Jurisdiction. Any disputes arising under or in
          connection with these terms shall be subject to the exclusive
          jurisdiction of the courts located in Your Jurisdiction.
        </Container>

        <Typography variant="h6" component="h2">
          11. Contact Information
        </Typography>
        <Container>
          If you have any questions about these terms and conditions, please
          contact us{" "}
          <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}>
            <u>here</u>
          </a>
          .
        </Container>

        <Container>Last Updated: 16/11/2023</Container>
      </Container>
    </NavigationWrapper>
  );
}
