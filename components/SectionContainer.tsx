import { Box } from "@mui/material";

export default function SectionContainer({children}) {
  return (
    <Box sx={{
        paddingTop: "50px",
        paddingBottom: "50px"
    }}>
        {children}
    </Box>
  )
}
