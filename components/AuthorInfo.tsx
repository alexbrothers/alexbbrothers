import { Box, Typography, Avatar } from "@mui/material";

interface Author {
    firstName: string,
    lastName: string,
    avatarPhotoLink: string,
}

export default function AuthorInfo(props: Author) {
    return (
        <Box sx={{
            display: "flex",
            columnGap: "20px",
            alignItems: "center",
            paddingBottom: "15px",
        }}>
            <Avatar alt={`${props.firstName} ${props.lastName}`} src={props.avatarPhotoLink} sx={{
                width: 75,
                height: 75,
            }}/>
            <Typography component="div">
                {`${props.firstName} ${props.lastName}`}
            </Typography>
        </Box>
    )
}