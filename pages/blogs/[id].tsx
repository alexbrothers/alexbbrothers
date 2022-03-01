import { Box, Typography } from "@mui/material";
import { GetStaticProps, GetStaticPaths } from 'next'
import AuthorInfo from "../../components/AuthorInfo";
import SectionContainer from "../../components/SectionContainer";
import SectionHeader from "../../components/SectionHeader";
import { getContentfulClient } from "../../lib/contentful";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

interface Author {
    firstName: string,
    lastName: string,
    avatarPhotoLink: string,
}

interface BlogPostProps {
    title: string,
    createdAt: string,
    content: any,
    tags: string[],
    author: Author,
    lastUpdated: string,
}

export default function BlogPost(props: BlogPostProps) {
    return (
        <>
            <SectionContainer>
                <SectionHeader name={props.title}/>
                <AuthorInfo 
                    firstName={props.author.firstName}
                    lastName={props.author.lastName}
                    avatarPhotoLink={props.author.avatarPhotoLink}
                />
                <Typography variant="h6" fontWeight={300} sx={{
                    marginBottom: "50px"
                }}>
                    Posted on {new Date(props.createdAt).toLocaleDateString()}
                </Typography>
                <Box>
                    {documentToReactComponents(
                        props.content,
                        {
                            renderNode: {
                                [BLOCKS.PARAGRAPH]: (_node, children) => <Typography paragraph>{children}</Typography>
                            }
                        }
                    )}
                </Box>
            </SectionContainer>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const client = getContentfulClient();
    try {
        const blogResponse = await client.getEntries({
            content_type: "blogPost",
        });
        const blogs = blogResponse.items as any;
        const paths = blogs.map(blog => (
            {
                params: {
                    id: blog.sys.id,
                }
            }
        ));
        return {
            paths: paths,
            fallback: false,
        }
    } catch(e: any) {
        console.log(`error retrieving blogs from contentful: ${e.message}`);
        throw e;
    }
}

export const getStaticProps: GetStaticProps = async context => {
    const client = getContentfulClient();
    try {
        const getBlogResponse = await client.getEntry(context.params.id as string);
        const blog = getBlogResponse.fields as any;
        return {
            props: {
                title: blog.title,
                createdAt: blog.createdAt,
                content: blog.content,
                tags: blog.tags,
                author: {
                    firstName: blog.author.fields.firstName,
                    lastName: blog.author.fields.lastName,
                    avatarPhotoLink: blog.author.fields.avatar.fields.file.url,
                },
                lastUpdated: blog.lastUpdated,
            }
        }
    } catch(e: any) {
        console.log(`error retrieving blogs from contentful: ${e.message}`);
        throw e;
    }
}