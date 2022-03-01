import { Box } from "@mui/material";
import SectionContainer from "./SectionContainer";
import SectionHeader from "./SectionHeader";
import BlogCard from "./BlogCard";

interface BlogPost {
    id: string,
    title: string,
    createdAt: string,
    lastUpdated: string,
    content: any,
    author: Author,
    tags: string[],
}

interface Author {
    firstName: string,
    lastName: string,
    avatarPhotoLink: string,
}

interface RecentBlogsSectionProps {
    header: string,
    blogs?: BlogPost[],
}

export default function RecentBlogsSection(props: RecentBlogsSectionProps) {
  return (
    <SectionContainer>
        <SectionHeader name={props.header} />
        <Box sx={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            rowGap: "40px",
        }}>
            {
                props.blogs.map(blog => (
                    <BlogCard
                        key={blog.id}
                        id={blog.id}
                        title={blog.title}
                        createdAt={blog.createdAt}
                        content={blog.content}
                        tags={blog.tags}
                        author={blog.author}
                        lastUpdated={blog.lastUpdated}
                    />
                ))
            }
        </Box>
    </SectionContainer>
  )
}
