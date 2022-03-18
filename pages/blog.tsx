import { Grid } from "@mui/material";
import SectionContainer from "../components/SectionContainer";
import SectionHeader from "../components/SectionHeader";
import BlogCard from "../components/BlogCard";
import { getContentfulClient } from "../lib/contentful";
import { GetStaticProps } from 'next'
import Head from 'next/head';

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

interface Author {
    firstName: string,
    lastName: string,
    avatarPhotoLink: string,
}

interface BlogsPageProps {
    header: string,
    blogs?: BlogPost[],
}

export default function Blog(props: BlogsPageProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.alexbrothers.dev";
  const canonicalUrl = process.env.NEXT_PUBLIC_CANONICAL_URL || "https://www.alexbrothers.dev";
  return (
    <>
        <Head>
            <title>Blogs | AlexBrothers</title>
            <meta
                name="description"
                content="Blog posts from Alex Brothers."
                key="desc"
            />
            <meta
                property="og:title"
                content="Blogs | AlexBrothers"
            />
            <meta
                property="og:description"
                content="Blog posts from Alex Brothers."
            />
            <meta
                property="og:image"
                content={`${baseUrl}/avatar.png`}
            />
            <link
                rel="canonical"
                href={`${canonicalUrl}/blog`}
                key="canonical"
            />
        </Head>
        <SectionContainer>
            <SectionHeader name={props.header} />
            <Grid container spacing={4}>
                {
                    props.blogs.map(blog => (
                        <Grid item xs={12} md={6}>
                            <BlogCard
                                key={blog.id}
                                id={blog.id}
                                title={blog.title}
                                createdAt={blog.createdAt}
                                content={blog.content}
                                tags={blog.tags}
                                author={blog.author}
                                lastUpdated={blog.lastUpdated}
                                contentPreview={blog.contentPreview}
                                url={blog.url}
                            />
                        </Grid>
                    ))
                }
            </Grid>
        </SectionContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async context => {
    const client = getContentfulClient();
    try {
        const blogsResponse = await client.getEntries({
            content_type: "blogPost",
        });
        const blogs = blogsResponse.items as any;
        return {
            props: {
                header: "Posts",
                blogs: blogs.map(item => (
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
        console.log(`error retrieving blogs from contentful: ${e.message}`);
        throw e;
    }
}
