import { Box, Card, Paper, Typography, Avatar, Grid } from "@mui/material";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

interface WorkCardProps {
    title: string,
    company: string,
    companyLogoLink: string,
    startDate: string,
    endDate: string,
    description: any,
    technologies: string[],
}

export default function WorkCard(props: WorkCardProps) {
    return (
        <Paper elevation={24} sx={{
            width: "100%",
            padding: "20px"
        }}>
            <Box sx={{
                display: "flex",
                columnGap: "15px"
            }}>
                <Box sx={{
                    padding: "20px"
                }}>
                    <Avatar 
                        alt={props.company} 
                        src={props.companyLogoLink} 
                        variant="square"
                        sx={{
                            height: 75,
                            width: 75,
                        }}
                    />
                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                }}>
                    <Typography paragraph>
                        {props.title}
                    </Typography>
                    <Typography paragraph>
                        {props.company}
                    </Typography>
                    <Box>
                        {documentToReactComponents(
                            props.description,
                            {
                                renderNode: {
                                    [BLOCKS.PARAGRAPH]: (_node, children) => <Typography paragraph>{children}</Typography>
                                }
                            }
                        )}
                    </Box>
                </Box>
            </Box>
        </Paper>
    )
}