import { Metadata } from "next";
import determineOriginUrl from "../parsers/determineOriginUrl";
export function generateMetadataProps({
  title,
  description,
}: {
  title: string;
  description: string;
}): () => Promise<Metadata> {
  const origin = determineOriginUrl() as string;
  return async () => ({
    title,
    description,
    metadataBase: new URL(origin),
    openGraph: {
      title,
      description,
      locale: "en_US",
      type: "website",
      siteName: "Study AI",
      url: origin,
      images: [
        {
          url: "/logo/logo.png",
          width: 800,
          height: 800,
        },
      ],
    },
  });
}
