import { Logo } from "../../logo/client/Logo";
import { SubscribeAction } from "../client/subscribeAction";
import NextLink from "next/link";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import MessageIcon from "@mui/icons-material/Message";
import Link from "next/link";

export const footerLinks = [];
export const footerServiceLinks = [
  {
    href: "/privacy-policy",
    name: "Privacy Policy",
  },
  {
    href: "/terms",
    name: "Terms of Service",
  },
];
export const footerContactLinks = [
  {
    href: `mailto:${process.env.NEXT_PUBLIC_EMAIL}`,
    name: "Contact Us",
  },
  {
    href: "faqs",
    name: "FAQs",
  },
];
export const PrivacyPolicyWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col">
      {children}
      <div className="flex items-center text-Black tracking-tighter text-xs mt-4">
        <span>By subscribing you agree to our</span>
        <NextLink className="ml-1 underline" href="/privacy-policy">
          Privacy Policy
        </NextLink>
      </div>
    </div>
  );
};
export const FooterBody = () => {
  return (
    <div className="flex flex-col justify-center space-y-10 w-full py-14 max-w-screen-xl sm:flex-row sm:justify-between sm:space-y-0">
      <div className="flex flex-col justify-center grow space-y-10 sm:space-y-6">
        <div className="flex w-full h-12 justify-center sm:justify-start">
          <Logo showLabel />
        </div>
        <div className="text-Black tracking-tighter flex flex-col items-center sm:items-start sm:flex-row space-y-4 sm:space-y-0">
          {footerContactLinks.map((link) => (
            <NextLink
              href={link.href}
              key={link.href}
              className="mr-0 sm:mr-4 text-sm font-semibold"
            >
              {link.name}
            </NextLink>
          ))}
        </div>
        {/* <div >
          <Link
            href={
              "mailto:?subject=StudyAI&body=Check out this cool study app I found."
            }
          >
            <EmailIcon />
          </Link>
          <Link
            href={
              "whatsapp://send?text=Check out this cool study app I found StudyAI."
            }
          >
            <WhatsAppIcon />
          </Link>
          <a
            target="_blank"
            rel="noreferrer"
            href={
              "https://twitter.com/share?url=&text=Check out this cool study app I found StudyAI."
            }
          >
            <TwitterIcon />
          </a>
          <Link
            href={"sms:?&body=Check out this cool study app I found StudyAI."}
          >
            <MessageIcon />
          </Link>
        </div> */}
      </div>
      <PrivacyPolicyWrapper>
        <SubscribeAction />
      </PrivacyPolicyWrapper>
    </div>
  );
};
export const FooterBottom = () => {
  return (
    <div className="text-Black flex flex-col w-full py-6 items-center sm:items-start sm:flex-row tracking-tighter text-xs space-y-3 sm:space-y-0 max-w-screen-xl">
      <div className="grow flex flex-row">
        {footerServiceLinks.map((link) => (
          <NextLink href={link.href} key={link.href} className="mr-2 underline">
            {link.name}
          </NextLink>
        ))}
      </div>
      <span>©{new Date().getFullYear()} Study AI. All rights reserved.</span>
    </div>
  );
};
export const Footer = () => {
  return (
    <footer className="bg-White flex flex-col items-center px-[3%] sm:px-[5%] border-Black border-solid border-t">
      <FooterBody />
      <div
        style={{
          height: "1px",
        }}
        className="bg-Black w-full"
      />
      <FooterBottom />
    </footer>
  );
};
