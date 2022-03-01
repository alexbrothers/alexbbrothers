import { GetStaticProps } from 'next'
import { getContentfulClient } from "../lib/contentful";
import HeaderSection from "../components/HeaderSection";
import RecentBlogsSection from "../components/RecentBlogsSection";

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
}

export default function Home(props: HomeProps) {
  return (
    <>
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
      order: 'sys.createdAt',
    });
    const recentBlogs = recentBlogsResponse.items as any;
    console.log("RECENT BLOGS ID: ", recentBlogs[0].sys.id)
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
          }
        ))
      }
    }
  } catch(e: any) {
    console.log(`error retrieving intro content from contentful: ${e.message}`);
    throw e;
  }
}
