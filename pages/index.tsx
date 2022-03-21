import { GetStaticProps } from 'next'
import { getContentfulClient } from "../lib/contentful";
import HeaderSection from "../components/HeaderSection";
import RecentBlogsSection from "../components/RecentBlogsSection";
import Head from 'next/head';

interface IntroContent {
  headline: string,
  subHeadline: string,
  introText: any,
}

interface HomeProps {
  introContent: IntroContent,
  blogPosts?: BlogPost[],
}

interface Author {
  firstName: string,
  lastName: string,
  avatarPhotoLink: string,
}

interface BlogPost {
  id: string,
  title: string,
  createdAt: string,
  lastUpdated: string,
  content: any,
  author: Author,
  tags: string[],
  contentPreview: string,
  url: string,
}

export default function Home(props: HomeProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.alexbrothers.dev";
  const canonicalUrl = process.env.NEXT_PUBLIC_CANONICAL_URL || "https://www.alexbrothers.dev";
  return (
    <>
      <Head>
        <title>Alex Brothers | Coding Interview Practice, Guides, and Solutions</title>
        <meta
          name="description"
          content="Blog posts by Alex Brothers about coding interviews, systems design, and technical tutorials. Ace your technical interviews, improve your coding skills, and discover solutions to numerous LeetCode problems here on alexbrothers.dev."
          key="desc"
        />
        <meta
          property="og:title"
          content="Alex Brothers | Coding Interview Practice, Guides, and Solutions"
        />
        <meta
          property="og:description"
          content="Blog posts by Alex Brothers about coding interviews, systems design, and technical tutorials. Ace your technical interviews, improve your coding skills, and discover solutions to numerous LeetCode problems here on alexbrothers.dev."
        />
        <meta
          property="og:image"
          content={`${baseUrl}/avatar.png`}
        />
        <meta
          property="og:url"
          content={`${canonicalUrl}`}
        />
        <link
          rel="canonical"
          href={`${canonicalUrl}`}
          key="canonical"
        />
      </Head>
      <HeaderSection 
        headline={props.introContent.headline}
        subHeadline={props.introContent.subHeadline}
        introText={props.introContent.introText}
      />
      <RecentBlogsSection 
        header="Recent Posts"
        blogs={props.blogPosts}
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
    const recentBlogsResponse = await client.getEntries({
      content_type: "blogPost",
      limit: 5,
    });
    const recentBlogs = recentBlogsResponse.items as any;
    return {
      props: {
        introContent: introResponse.items[0].fields,
        blogPosts: recentBlogs.map(item => (
          {
            id: item.sys.id,
            title: item.fields.title,
            createdAt: item.fields.createdAt,
            lastUpdated: item.fields.lastUpdated,
            content: item.fields.content,
            author: {
              firstName: item.fields.author.fields.firstName,
              lastName: item.fields.author.fields.lastName,
              avatarPhotoLink: item.fields.author.fields.avatar.fields.file.url,
            },
            tags: item.fields.tags,
            contentPreview: item.fields.contentPreview,
            url: item.fields.url,
          }
        ))
      }
    }
  } catch(e: any) {
    console.log(`error retrieving intro content from contentful: ${e.message}`);
    throw e;
  }
}
