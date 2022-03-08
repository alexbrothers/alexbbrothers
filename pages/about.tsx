import { GetStaticProps } from 'next'
import { getContentfulClient } from "../lib/contentful";
import AboutSection from '../components/AboutSection';
import Head from 'next/head';

interface WorkExperience {
    title: string,
    company: string,
    companyLogoLink: string,
    startDate: string,
    endDate: string,
    description: string,
    technologies: string[],
}

interface AboutContent {
  header: string,
  content: any,
  portraitPhotoLink: string,
  workExperience?: WorkExperience[],
}

interface AboutProps {
  aboutContent: AboutContent,
}

export default function About(props: AboutProps) {
  return (
    <>
      <Head>
        <title>About | AlexBrothers</title>
        <meta
          name="description"
          content="Learn more about Alex Brothers."
          key="desc"
        />
        <meta
          property="og:title"
          content="About | AlexBrothers"
        />
        <meta
          property="og:description"
          content="Learn more about Alex Brothers."
        />
        <meta
          property="og:image"
          content="https://alexbrothers.dev/avatar.png"
        />
      </Head>
      <AboutSection
        header={props.aboutContent.header}
        content={props.aboutContent.content}
        portraitPhotoLink={props.aboutContent.portraitPhotoLink}
        workExperience={props.aboutContent.workExperience}
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
      portraitPhotoLink: aboutEntry.portrait?.fields?.file?.url,
      workExperience: aboutEntry.workExperience.map(item => (
        {
            title: item.fields.title,
            company: item.fields.company,
            companyLogoLink: item.fields.companyLogo.fields.file.url,
            startDate: item.fields.startDate,
            endDate: item.fields.endDate,
            description: item.fields.description,
            technologies: item.fields.technologies,
        }
      )),
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
