import { Box } from "@mui/material";
import Image from 'next/image';
import React from "react";

interface BlogImageProps {
    src: string,
    alt: string,
    width: number,
    height: number,
}

export default function BlogImage(props: BlogImageProps) {
    return (
        <>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "20px",
                paddingBottom: "20px",
                height: {
                    xs: "30vh",
                    md: "50vh"
                },
                width: "100%"
            }}>
                    <Box 
                        component="div" 
                        sx={{
                            width: "100%",
                            height: "auto",
                            position: "relative",
                            ":hover": {
                                cursor: "pointer",
                            }
                        }}
                        onClick={e => window.open(`${props.src}`, "_blank")}
                    >
                        <Image
                            src={props.src}
                            alt={props.alt}
                            layout="responsive"
                            objectFit="contain"
                            width={props.width}
                            height={props.height}
                            quality={100}
                        />
                    </Box>
            </Box>
        </>
    )
}