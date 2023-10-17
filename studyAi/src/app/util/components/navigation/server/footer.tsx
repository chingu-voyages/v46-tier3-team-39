import { Logo } from "../../logo/client/Logo";
import { SubscribeAction } from "../client/subscribeAction";
import NextLink from "next/link";
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
    href: "/about",
    name: "About Us",
  },
  {
    href: "mailto:XXXXXXXXXXXXXXXXXXX",
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
    <div className="flex flex-col w-full py-14 sm:flex-row justify-center sm:justify-between">
      <div className="flex flex-col justify-center grow">
        <div className="flex w-full h-12">
          <Logo showLabel />
        </div>
        <div className="text-Black tracking-tighter mt-4 flex flex-col sm:flex-row">
          {footerContactLinks.map((link) => (
            <NextLink
              href={link.href}
              key={link.href}
              className="mr-4 text-sm font-bold"
            >
              {link.name}
            </NextLink>
          ))}
        </div>
      </div>
      <PrivacyPolicyWrapper>
        <SubscribeAction />
      </PrivacyPolicyWrapper>
    </div>
  );
};
export const FooterBottom = () => {
  return (
    <div className="flex flex-col py-6 text-Black sm:flex-row tracking-tighter text-xs">
      <div className="grow flex flex-col sm:flex-row">
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
    <footer className="bg-White flex flex-col px-[2%] sm:px-[5%]">
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
