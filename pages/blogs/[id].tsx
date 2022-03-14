import { Box, Container, Typography } from "@mui/material";
import { GetStaticProps, GetStaticPaths } from 'next'
import AuthorInfo from "../../components/AuthorInfo";
import SectionContainer from "../../components/SectionContainer";
import SectionHeader from "../../components/SectionHeader";
import { getContentfulClient } from "../../lib/contentful";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import Head from 'next/head';
import SyntaxHighlighter from 'react-syntax-highlighter';
import androidstudio from 'react-syntax-highlighter/dist/cjs/styles/hljs/androidstudio';

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
    contentPreview: string,
    url: string,
}

export default function BlogPost(props: BlogPostProps) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://alexbrothers.dev";
    const canonicalUrl = process.env.NEXT_PUBLIC_CANONICAL_URL || "https://alexbrothers.dev";
    return (
        <>
            <Head>
                <title>{props.title}</title>
                <meta
                    name="description"
                    content={props.contentPreview}
                    key="desc"
                />
                <meta
                    property="og:title"
                    content={props.title}
                />
                <meta
                    property="og:description"
                    content={props.contentPreview}
                />
                <meta
                    property="og:image"
                    content={`${baseUrl}/avatar.png`}
                />
                <link
                    rel="canonical"
                    href={`${canonicalUrl}/blogs/${props.url}`}
                    key="canonical"
                />
            </Head>
            <SectionContainer>
                <Container maxWidth="md">
                    <SectionHeader name={props.title} gutterBottom />
                    <AuthorInfo 
                        firstName={props.author.firstName}
                        lastName={props.author.lastName}
                        avatarPhotoLink={props.author.avatarPhotoLink}
                        datePosted={props.createdAt}
                    />
                    <Box component="article" sx={{
                        "a": {
                            color: "#0070f3",
                            textDecoration: "none",
                        },
                        "a:hover": {
                            textDecoration: "underline",
                        },
                        marginTop: "50px",
                    }}>
                        {documentToReactComponents(
                            props.content,
                            {
                                renderNode: {
                                    [BLOCKS.PARAGRAPH]: (_node, children) => {
                                        return <Typography paragraph>{children}</Typography>;
                                    },
                                    [BLOCKS.EMBEDDED_ENTRY]: (node, _children) => {
                                        const type: string = node.data.target.sys.contentType.sys.id;
                                        if (type === "codeBlock") {
                                            const code: string = node.data.target.fields.code;
                                            const language: string = node.data.target.fields.language;
                                            return (
                                                <SyntaxHighlighter language={language} style={androidstudio} showLineNumbers>
                                                    {code}
                                                </SyntaxHighlighter>
                                            )
                                        }
                                    },
                                    [INLINES.EMBEDDED_ENTRY]: (node) => {
                                        const type: string = node.data.target.sys.contentType.sys.id;
                                        if (type === "superscript") {
                                            const value: string = node.data.target.fields.value;
                                            const code: boolean = node.data.target.fields.code;
                                            if (!code) {
                                                return (<sup>{value}</sup>);
                                            }
                                            return (
                                                <Box component="code" sx={{
                                                    backgroundColor: "#ECE5F1"
                                                }}>
                                                    <sup>{value}</sup>
                                                </Box>    
                                            );
                                        }
                                    },
                                },
                                renderMark: {
                                    [MARKS.CODE]: (text) => {
                                        return (
                                            <Box component="code" sx={{
                                                backgroundColor: "#ECE5F1"
                                            }}>
                                                {text}
                                            </Box>
                                        );
                                    }
                                }
                            }
                        )}
                    </Box>
                </Container>
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
                    id: blog.fields.url,
                }
            }
        ));
        return {
            paths: paths,
            fallback: false,
        }
    } catch(e: any) {
        console.log(`error retrieving blogs ids from contentful: ${e.message}`);
        throw e;
    }
}

export const getStaticProps: GetStaticProps = async context => {
    const client = getContentfulClient();
    try {
        const getBlogResponse = await client.getEntries({
            content_type: "blogPost",
            "fields.url": context.params.id,
            limit: 1,
        });
        const blog = getBlogResponse.items[0].fields as any;
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
                contentPreview: blog.contentPreview,
                url: blog.url
            }
        }
    } catch(e: any) {
        console.log(`error retrieving blogs from contentful: ${e.message}`);
        throw e;
    }
}