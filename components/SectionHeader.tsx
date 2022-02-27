import { Typography } from "@mui/material";

interface SectionHeaderProps {
    name: string,
}

export default function SectionHeader(props: SectionHeaderProps) {
    return (
        <Typography variant="h4" sx={{paddingBottom: "50px", paddingTop: "50px"}}>
            {props.name}
        </Typography>
    )
}