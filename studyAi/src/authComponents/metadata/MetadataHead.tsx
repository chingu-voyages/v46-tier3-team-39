import Head from "next/head";
import determineOriginUrl from "../../app/util/parsers/determineOriginUrl";
const generalMetadataProps = {
  metadataBase: new URL(determineOriginUrl() as string).toString(),
  openGraph: {
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
};
const MetadataHead = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={generalMetadataProps.metadataBase} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content={generalMetadataProps.metadataBase} />
      <meta property="og:site_name" content="Study AI" />
      <meta
        property="og:image:url"
        content={`${generalMetadataProps.metadataBase}/logo/logo.png`}
      />
      <meta property="og:image:width" content="800" />
      <meta property="og:image:height" content="600" />
      <meta property="og:type" content="website" />
    </Head>
  );
};
export default MetadataHead;
