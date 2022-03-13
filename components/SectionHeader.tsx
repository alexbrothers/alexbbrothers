import { Typography } from "@mui/material";

interface SectionHeaderProps {
    name: string,
    gutterBottom?: boolean,
}

export default function SectionHeader(props: SectionHeaderProps) {
    const styles = {
        paddingTop: "30px", 
        paddingBottom: props.gutterBottom ? "15px" : "50px", 
    };
    return (
        <Typography 
            variant="h4" 
            sx={styles}
            component="header"
        >
            {props.name}
        </Typography>
    )
}