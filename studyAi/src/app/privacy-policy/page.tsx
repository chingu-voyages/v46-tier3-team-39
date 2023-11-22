import React from "react";
import NavigationWrapper from "../util/components/navigation/navigationWrapper";
import { Container, Typography } from "@mui/material";

export default async function PrivacyPolicy() {
  const styles = {
    h6: [
      "font-semibold",
      "text-lg",
      "sm:text-xl",
      "mb-2"
    ].join(" "),
    body: [
      "mb-8",
      "text-sm",
      "sm:text-base",
      "px-0"
    ].join(" ")
  }
  return (
    <NavigationWrapper
      appBars={{
        navbar: true,
        footer: true,
      }}
    >
      <Container className="py-16 px-8">
        <Typography variant="h4" component="h2" className="mb-8 font-bold text-4xl sm:text-6xl">
          Privacy Policy
        </Typography>

        <Typography variant="h6" component="h2" className={styles.h6}>
          Acceptance of Terms
        </Typography>
        <Container className={styles.body}>
          By accessing or using StudyAI, you agree to comply with and be bound
          by these terms and conditions. If you do not agree with any part of
          these terms, you may not use the App.
        </Container>

        <Typography variant="h6" component="h2" className={styles.h6}>
          User Accounts
        </Typography>
        <Container className={styles.body}>
          (a) Users may be required to create an account to access certain
          features of the App. You are responsible for maintaining the
          confidentiality of your account information and for all activities
          that occur under your account. (b) You agree to provide accurate and
          complete information during the account registration process.
        </Container>

        <Typography variant="h6" component="h2" className={styles.h6}>
          Educational Content
        </Typography>
        <Container className={styles.body}>
          (a) The App provides educational content, including but not limited to
          quizzes, assessments, and interactive learning materials. (b) While we
          strive for accuracy, we do not guarantee the correctness or
          completeness of the educational content. Users should verify
          information before relying on it.
        </Container>

        <Typography variant="h6" component="h2" className={styles.h6}>
          User Conduct
        </Typography>
        <Container className={styles.body}>
          (a) Users must not engage in any behavior that could harm the App,
          other users, or violate any applicable laws. This includes, but is not
          limited to, misuse, cheating, or unauthorized access. (b) Users are
          prohibited from attempting to interfere with the proper functioning of
          the App.
        </Container>

        <Typography variant="h6" component="h2" className={styles.h6}>
          Privacy
        </Typography>
        <Container className={styles.body}>
          (a) We collect and use information in accordance with our Privacy
          Policy. By using the App, you consent to the collection and use of
          your data as described in the Privacy Policy. (b) Users are
          responsible for reviewing and understanding the Privacy Policy.
        </Container>

        <Typography variant="h6" component="h2" className={styles.h6}>
          Termination
        </Typography>
        <Container className={styles.body}>
          We reserve the right to terminate or suspend user accounts and access
          to the App for violation of these terms.
        </Container>

        <Typography variant="h6" component="h2" className={styles.h6}>
          Changes to Terms
        </Typography>
        <Container className={styles.body}>
          We may update or modify these terms at any time. Users will be
          notified of changes, and continued use of the App after such
          modifications constitutes acceptance of the updated terms.
        </Container>

        <Typography variant="h6" component="h2" className={styles.h6}>
          Intellectual Property
        </Typography>
        <Container className={styles.body}>
          (a) The App and its content are protected by intellectual property
          laws. Users agree not to reproduce, distribute, or create derivative
          works based on the App without our prior written consent.
        </Container>

        <Typography variant="h6" component="h2" className={styles.h6}>
          Limitation of Liability
        </Typography>
        <Container className={styles.body}>
          (a) To the extent permitted by law, we shall not be liable for any
          indirect, incidental, special, consequential, or punitive damages, or
          any loss of profits or revenues, whether incurred directly or
          indirectly.
        </Container>

        <Typography variant="h6" component="h2" className={styles.h6}>
          Governing Law
        </Typography>
        <Container className={styles.body}>
          These terms and conditions are governed by and construed in accordance
          with the laws of Your Jurisdiction. Any disputes arising under or in
          connection with these terms shall be subject to the exclusive
          jurisdiction of the courts located in Your Jurisdiction.
        </Container>

        <Typography variant="h6" component="h2" className={styles.h6}>
          Contact Information
        </Typography>
        <Container className={styles.body}>
          If you have any questions about these terms and conditions, please
          contact us{" "}
          <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}>
            <u>here</u>
          </a>
          .
        </Container>

        <Container className={styles.body}>Last Updated: 16/11/2023</Container>
      </Container>
    </NavigationWrapper>
  );
}
