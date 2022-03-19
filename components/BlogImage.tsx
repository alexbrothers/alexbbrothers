import { Box } from "@mui/material";
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
            <Box 
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                    ":hover": {
                        cursor: "pointer",
                    }
                }}
                onClick={e => window.open(`${props.src}`, "_blank")}
            >
                    <img src={props.src} alt={props.alt} width={"100%"} />
            </Box>
        </>
    )
}