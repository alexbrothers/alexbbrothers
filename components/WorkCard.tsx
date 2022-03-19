import { Box, Button, Paper, Typography, Avatar, Chip } from "@mui/material";
import React, { useEffect, useRef } from "react";

interface WorkCardProps {
    title: string,
    company: string,
    companyLogoLink: string,
    startDate: string,
    endDate: string,
    description: string,
    technologies: string[],
}

export default function WorkCard(props: WorkCardProps) {
    const [isClamped, setIsClamped] = React.useState<boolean>(false);
    const [hasLimitedLines, setHasLimitedLines] = React.useState<boolean>(true);
    const clampedEl = useRef(null);

    const isTextClamped = (element): boolean => {
        return element.scrollHeight > element.clientHeight;
    }

    const onClampedClick = () => {
        setIsClamped(false);
        setHasLimitedLines(false);
    }

    const onUnclampedClick = () => {
        setIsClamped(true);
        setHasLimitedLines(true);
    }

    useEffect(() => {
        const clamped = clampedEl.current;
        if (isTextClamped(clamped)) {
            setIsClamped(true);
        }
    }, []);
    

    return (
        <Paper elevation={6} sx={{
            width: "100%",
            padding: {
                xs: "10px",
                md: "20px",
            },
            marginBottom: "20px"
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
                    justifyContent: "flex-start",
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
                    <Typography paragraph fontWeight={300} sx={{
                        marginBottom: "16px",
                    }}>
                        {props.startDate} - {props.endDate}
                    </Typography>
                    <Typography paragraph gutterBottom ref={clampedEl} sx={
                        hasLimitedLines ?
                        {
                            display: "-webkit-box",
                            WebkitLineClamp: 4,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            padding: 0,
                        } :
                        {}
                    }>
                        {props.description}
                    </Typography>
                    {isClamped && (
                        <Button 
                            variant="text"
                            size="small"
                            sx={{
                                padding: 0,
                                justifyContent: "flex-start",
                                display: "flex",
                            }}
                            onClick={onClampedClick}
                        >
                            See more
                        </Button>
                    )}
                    {!isClamped && !hasLimitedLines && (
                        <Button 
                            variant="text"
                            size="small"
                            sx={{
                                padding: 0,
                                justifyContent: "flex-start",
                                display: "flex",
                            }}
                            onClick={onUnclampedClick}
                        >
                            See less
                        </Button>
                    )}
                    <Box sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        columnGap: "10px",
                        rowGap: "10px",
                        flexWrap: "wrap",
                        marginTop: "16px",
                        marginBottom: "8px",
                    }}>
                        {props.technologies.map(tech => (
                            <Chip key={tech} label={tech} />
                        ))}
                    </Box>
                </Box>
            </Box>
        </Paper>
    )
}