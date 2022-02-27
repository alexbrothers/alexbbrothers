import { Avatar, Box, Typography } from "@mui/material";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import SectionContainer from "./SectionContainer";
import SectionHeader from "./SectionHeader";
import WorkExperienceSection from "./WorkExperienceSection";

interface WorkExperience {
    title: string,
    company: string,
    companyLogoLink: string,
    startDate: string,
    endDate: string,
    description: any,
    technologies: string[],
}

interface AboutContent {
  header: string,
  content: any,
  portraitPhotoLink: string,
  workExperience?: WorkExperience[],
}

export default function AboutSection(props: AboutContent) {
  return (
      <>
    <SectionContainer>
      <SectionHeader name={props.header} />
      <Box sx={{
        display: "flex",
        flexDirection: {
            xs: "column",
            md: "row",
        },
        alignItems: "center",
        justifyContent: "space-between",
        columnGap: {
            xs: 0,
            md: "50px"
        },
        rowGap: {
            xs: "50px",
            md: 0,
        }
      }}>
        <Avatar alt="Alex Brothers" src={props.portraitPhotoLink} sx={{
            width: {
                xs: "300px",
                md: "450px",
            }, 
            height: {
                xs: "300px",
                md: "450px",
            }
        }}/>
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
    <WorkExperienceSection header="Work Experience" workExperience={props.workExperience} />
    </>
  )
}
