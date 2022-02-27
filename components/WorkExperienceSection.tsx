import { Box } from "@mui/material";
import SectionContainer from "./SectionContainer";
import SectionHeader from "./SectionHeader";
import WorkCard from "./WorkCard";

interface WorkExperience {
    title: string,
    company: string,
    companyLogoLink: string,
    startDate: string,
    endDate: string,
    description: any,
    technologies: string[],
}

interface WorkExperienceSectionProps {
    header: string,
    workExperience?: WorkExperience[],
}

export default function WorkExperienceSection(props: WorkExperienceSectionProps) {
    console.log("PROPS: ", JSON.stringify(props, null, 2))
  return (
    <SectionContainer>
        <SectionHeader name={props.header} />
        <Box sx={{
            display: "flex",
            width: "100%"
        }}>
            {
                props.workExperience.map(item => (
                    <WorkCard
                        title={item.title}
                        company={item.company}
                        companyLogoLink={item.companyLogoLink}
                        startDate={item.startDate}
                        endDate={item.endDate}
                        description={item.description}
                        technologies={item.technologies}
                    />
                ))
            }
        </Box>
    </SectionContainer>
  )
}
