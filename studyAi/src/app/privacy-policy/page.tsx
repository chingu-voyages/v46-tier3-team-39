import React from "react";
import NavigationWrapper from "../util/components/navigation/navigationWrapper";

export default async function PrivacyPolicy() {
  return (
    <>
      <NavigationWrapper
        appBars={{
          navbar: true,
          footer: true,
        }}
      >
        <div>
          <header className="headerStyle">
            <h1>Terms and Conditions</h1>
          </header>

          <section className="sectionStyle">
            <h2 className="h2Style">1. Acceptance of Terms</h2>
            <p className="pStyle">
              By accessing or using Your Education App (the "App"), you agree to
              comply with and be bound by these terms and conditions. If you do
              not agree with any part of these terms, you may not use the App.
            </p>
          </section>

          <section className="sectionStyle">
            <h2 className="h2Style">2. User Accounts</h2>
            <p className="pStyle">
              (a) Users may be required to create an account to access certain
              features of the App. You are responsible for maintaining the
              confidentiality of your account information and for all activities
              that occur under your account.
            </p>
            <p className="pStyle">
              (b) You agree to provide accurate and complete information during
              the account registration process.
            </p>
          </section>

          <section className="sectionStyle">
            <h2 className="h2Style">3. Educational Content</h2>
            <p className="pStyle">
              (a) The App provides educational content, including but not
              limited to quizzes, assessments, and interactive learning
              materials.
            </p>
            <p className="pStyle">
              (b) While we strive for accuracy, we do not guarantee the
              correctness or completeness of the educational content. Users
              should verify information before relying on it.
            </p>
          </section>

          <section className="sectionStyle">
            <h2 className="h2Style">4. User Conduct</h2>
            <p className="pStyle">
              (a) Users must not engage in any behavior that could harm the App,
              other users, or violate any applicable laws. This includes, but is
              not limited to, misuse, cheating, or unauthorized access.
            </p>
            <p className="pStyle">
              (b) Users are prohibited from attempting to interfere with the
              proper functioning of the App.
            </p>
          </section>

          <section className="sectionStyle">
            <h2 className="h2Style">5. Privacy</h2>
            <p className="pStyle">
              (a) We collect and use information in accordance with our Privacy
              Policy. By using the App, you consent to the collection and use of
              your data as described in the Privacy Policy.
            </p>
            <p className="pStyle">
              (b) Users are responsible for reviewing and understanding the
              Privacy Policy.
            </p>
          </section>

          <section className="sectionStyle">
            <h2 className="h2Style">6. Termination</h2>
            <p className="pStyle">
              We reserve the right to terminate or suspend user accounts and
              access to the App for violation of these terms.
            </p>
          </section>

          <section className="sectionStyle">
            <h2 className="h2Style">7. Changes to Terms</h2>
            <p className="pStyle">
              We may update or modify these terms at any time. Users will be
              notified of changes, and continued use of the App after such
              modifications constitutes acceptance of the updated terms.
            </p>
          </section>

          <section className="sectionStyle">
            <h2 className="h2Style">8. Intellectual Property</h2>
            <p className="pStyle">
              (a) The App and its content are protected by intellectual property
              laws. Users agree not to reproduce, distribute, or create
              derivative works based on the App without our prior written
              consent.
            </p>
          </section>

          <section className="sectionStyle">
            <h2 className="h2Style">9. Limitation of Liability</h2>
            <p className="pStyle">
              (a) To the extent permitted by law, we shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages,
              or any loss of profits or revenues, whether incurred directly or
              indirectly.
            </p>
          </section>

          <section className="sectionStyle">
            <h2 className="h2Style">10. Governing Law</h2>
            <p className="pStyle">
              These terms and conditions are governed by and construed in
              accordance with the laws of Your Jurisdiction. Any disputes
              arising under or in connection with these terms shall be subject
              to the exclusive jurisdiction of the courts located in Your
              Jurisdiction.
            </p>
          </section>

          <section className="sectionStyle">
            <h2 className="h2Style">11. Contact Information</h2>
            <p className="pStyle">
              If you have any questions about these terms and conditions, please
              contact us at [Your Contact Email].
            </p>
          </section>

          <footer>
            <p className="pStyle">Last Updated: [Date]</p>
          </footer>
        </div>
      </NavigationWrapper>
    </>
  );
}

