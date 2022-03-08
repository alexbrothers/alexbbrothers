import { Box, Paper, Typography, Chip } from "@mui/material";
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
    contentPreview: string,
    url: string,
}

export default function BlogCard(props: BlogCardProps) {
    return (
        <Link href={`/blogs/${props.url}`}>
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
                    <Typography paragraph gutterBottom sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                        marginBottom: "8px",
                        overflow: "hidden",
                    }}>
                        {props.contentPreview}
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