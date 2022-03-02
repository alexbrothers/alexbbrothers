import { Box, Card, Paper, Typography, Avatar, Grid, Chip } from "@mui/material";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import Link from "next/link";

interface Author {
    firstName: string,
    lastName: string,
    avatarPhotoLink: string,
  }

interface BlogCardProps {
    id: string,
    title: string,
    createdAt: string,
    content: any,
    tags: string[],
    author: Author,
    lastUpdated: string,
}

export default function BlogCard(props: BlogCardProps) {
    return (
        <Link href={`/blogs/${props.id}`}>
            <Paper elevation={6} sx={{
                width: "100%",
                padding: "30px",
                marginBotton: "20px",
                ":hover": {
                    cursor: "pointer",
                }
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <Typography paragraph fontWeight={600} variant="h6" sx={{
                        marginBottom: "8px",
                    }}>
                        {props.title}
                    </Typography>
                    <Typography paragraph fontWeight={300}>
                        {new Date(props.createdAt).toLocaleDateString()}
                    </Typography>
                    <Typography component="div" noWrap gutterBottom sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                        marginBottom: "8px",
                        overflow: "hidden",
                    }}>
                        <Box>
                            {documentToReactComponents(
                                props.content,
                                {
                                    renderNode: {
                                        [BLOCKS.PARAGRAPH]: (_node, children) => <Typography paragraph sx={{
                                            whiteSpace: "normal",
                                        }}>{children}</Typography>
                                    }
                                }
                            )}
                        </Box>
                    </Typography>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        columnGap: "10px",
                        rowGap: "10px",
                        flexWrap: "wrap",
                        paddingTop: "8px",
                    }}>
                        {props.tags.map(tech => (
                            <Chip label={tech} />
                        ))}
                    </Box>
                </Box>
            </Paper>
        </Link>
    )
}