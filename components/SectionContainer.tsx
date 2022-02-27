import { Box } from "@mui/material";

export default function SectionContainer({children}) {
  return (
    <Box sx={{
        paddingTop: "75px",
        paddingBottom: "75px"
    }}>
        {children}
    </Box>
  )
}
