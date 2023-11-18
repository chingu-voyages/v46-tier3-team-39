import Head from "next/head";
import determineOriginUrl from "../../app/util/parsers/determineOriginUrl";
const origin = determineOriginUrl() as string;
const generalMetadataProps = {
  metadataBase: origin,
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
      <meta
        property="og:locale"
        content={generalMetadataProps.openGraph.locale}
      />
      <meta property="og:url" content={generalMetadataProps.openGraph.url} />
      <meta
        property="og:site_name"
        content={generalMetadataProps.openGraph.siteName}
      />
      <meta
        property="og:image:url"
        content={`${generalMetadataProps.openGraph.url}/logo/logo.png`}
      />
      <meta property="og:image:width" content="800" />
      <meta property="og:image:height" content="600" />
      <meta property="og:type" content={generalMetadataProps.openGraph.type} />
    </Head>
  );
};
export default MetadataHead;
