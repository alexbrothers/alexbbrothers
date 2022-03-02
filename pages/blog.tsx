import { Grid } from "@mui/material";
import SectionContainer from "../components/SectionContainer";
import SectionHeader from "../components/SectionHeader";
import BlogCard from "../components/BlogCard";
import { getContentfulClient } from "../lib/contentful";
import { GetStaticProps } from 'next'

interface BlogPost {
    id: string,
    title: string,
    createdAt: string,
    lastUpdated: string,
    content: any,
    author: Author,
    tags: string[],
    contentPreview: string,
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
  return (
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
                        />
                    </Grid>
                ))
            }
        </Grid>
    </SectionContainer>
  )
}

export const getStaticProps: GetStaticProps = async context => {
    const client = getContentfulClient();
    try {
        const blogsResponse = await client.getEntries({
            content_type: "blogPost",
            order: 'sys.createdAt',
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
                    }
                ))
            }
        }
    } catch(e: any) {
        console.log(`error retrieving blogs from contentful: ${e.message}`);
        throw e;
    }
}
