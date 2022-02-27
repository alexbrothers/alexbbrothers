import { GetStaticProps } from 'next'
import { getContentfulClient } from "../lib/contentful";
import AboutSection from '../components/AboutSection';

interface AboutContent {
  header: string,
  content: any,
  portraitPhotoLink: string,
}

interface AboutProps {
  aboutContent: AboutContent,
}

export default function Home(props: AboutProps) {
  return (
    <>
      <AboutSection
        header={props.aboutContent.header}
        content={props.aboutContent.content}
        portraitPhotoLink={props.aboutContent.portraitPhotoLink}
      />
    </>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const client = getContentfulClient();
  try {
    const aboutResponse = await client.getEntries({
      content_type: "about",
      limit: 1,
    });
    const aboutEntry = aboutResponse.items[0].fields as any;
    const aboutContent: AboutContent = {
      header: aboutEntry.sectionHeader,
      content: aboutEntry.content,
      portraitPhotoLink: aboutEntry.portrait?.fields?.file?.url
    }
    return {
      props: {
        aboutContent: aboutContent,
      }
    }
  } catch(e: any) {
    console.log(`error retrieving about content from contentful: ${e.message}`);
    throw e;
  }
}
