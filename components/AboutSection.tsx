import { Avatar, Box, Typography } from "@mui/material";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import SectionContainer from "./SectionContainer";

interface AboutContent {
  header: string,
  content: any,
  portraitPhotoLink: string,
}

export default function AboutSection(props: AboutContent) {
  return (
    <SectionContainer>
      <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        columnGap: "50px"
      }}>
        <Avatar alt="Alex Brothers" src={props.portraitPhotoLink} sx={{width: "450px", height: "450px"}}/>
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
      </Box>
    </SectionContainer>
  )
}
