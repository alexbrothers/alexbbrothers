import { Typography } from "@mui/material";

type Component = "h1" | "h2" | "h3" | "h4"

interface SectionHeaderProps {
    name: string,
    gutterBottom?: boolean,
    component: Component,
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
            component={props.component}
        >
            {props.name}
        </Typography>
    )
}