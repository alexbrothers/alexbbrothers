import { Box, Card, Paper, Typography, Avatar, Grid, Chip } from "@mui/material";
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
        <Paper elevation={6} sx={{
            width: "100%",
            padding: {
                xs: "10px",
                md: "20px",
            },
            marginBotton: "20px"
        }}>
            <Box sx={{
                display: "flex",
                columnGap: "15px"
            }}>
                <Box sx={{
                    padding: {
                        xs: "10px",
                        md: "20px"
                    }
                }}>
                    <Avatar 
                        alt={props.company} 
                        src={props.companyLogoLink} 
                        variant="square"
                        sx={{
                            height: {
                                xs: 50,
                                md: 75,
                            },
                            width: {
                                xs: 50,
                                md: 75,
                            }
                        }}
                    />
                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                }}>
                    <Typography paragraph variant="h6" sx={{
                        marginTop: "8px",
                        marginBottom: "8px",
                    }}>
                        {props.title}
                    </Typography>
                    <Typography paragraph sx={{
                        marginBottom: "8px",
                    }}>
                        {props.company}
                    </Typography>
                    <Typography paragraph fontWeight={300}>
                        {props.startDate} - {props.endDate}
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
                    <Box sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        columnGap: "10px",
                        rowGap: "10px",
                        flexWrap: "wrap",
                    }}>
                        {props.technologies.map(tech => (
                            <Chip label={tech} />
                        ))}
                    </Box>
                </Box>
            </Box>
        </Paper>
    )
}