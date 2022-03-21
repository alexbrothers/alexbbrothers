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
        <Box component="article" sx={{
            "a": {
                color: "#0070f3",
                textDecoration: "none",
            },
            "a:hover": {
                textDecoration: "underline",
            },
            height: "100%"
        }}>
            <Paper elevation={6} sx={{
                width: "100%",
                padding: "30px",
                marginBotton: "20px",
                height: "100%",
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%"
                }}>
                    <Typography component="h3" fontWeight={600} variant="h6" sx={{
                        marginBottom: "8px",
                    }}>
                        <Link href={`/blogs/${props.url}`}>
                            <a>{props.title}</a>
                        </Link>
                    </Typography>
                    <Typography paragraph fontWeight={300}>
                        {new Date(props.createdAt).toLocaleDateString()}
                    </Typography>
                    <Typography paragraph gutterBottom sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
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
                            <Chip key={tech} label={tech} />
                        ))}
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}