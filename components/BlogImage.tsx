import { Box, Modal } from "@mui/material";
import Image from 'next/image';
import React from "react";

interface BlogImageProps {
    src: string,
    alt: string,
    width: number,
    height: number,
}

export default function BlogImage(props: BlogImageProps) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                        height: "100%",
                        position: "relative",
                        ":hover": {
                            cursor: "pointer",
                        }
                    }}
                    onClick={handleOpen}
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
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "90vh",
                    width: "90vw",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    outline: "none",
                }}>
                    <Box 
                        component="div" 
                        sx={{
                            width: "100%",
                            height: "100%",
                            position: "relative",
                        }}
                    >
                        <Image
                            src={props.src}
                            alt={props.alt}
                            layout="fill"
                            objectFit="contain"
                            quality={100}
                        />
                    </Box>
                </Box>
            </Modal>
        </>
    )
}