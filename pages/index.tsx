import { GetStaticProps } from 'next'
import { getContentfulClient } from "../lib/contentful";
import HeaderSection from "../components/HeaderSection";

interface IntroContent {
  headline: string,
  subHeadline: string,
  introText: any,
}

interface HomeProps {
  introContent: IntroContent,
}

export default function Home(props: HomeProps) {
  return (
    <>
      <HeaderSection 
        headline={props.introContent.headline}
        subHeadline={props.introContent.subHeadline}
        introText={props.introContent.introText}
      />
    </>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const client = getContentfulClient();
  try {
    const introResponse = await client.getEntries({
      content_type: "intro",
      limit: 1,
    });
    return {
      props: {
        introContent: introResponse.items[0].fields,
      }
    }
  } catch(e: any) {
    console.log(`error retrieving intro content from contentful: ${e.message}`);
    throw e;
  }
}
