import { Box } from "@mui/material"
import TextField from "@mui/material/TextField"

const LeftContent = () => {
    const inputStyle = "bg-white border border-light-on-secondary-container"
    return (
        <Box className="mr-8">
            <Box className="flex">
                <h2>Question Title</h2>
                <h2>Est. Time</h2>
                <TextField sx={{bgcolor: "white"}} variant="outlined"/>
                {/* dropdown for min/sec */}
            </Box>
            <TextField variant="outlined"/>
            <h2>Tags</h2>
            <TextField variant="outlined"/>
            <h2>Question Description</h2>
            <TextField variant="outlined" />
        </Box>
    )
}

export default LeftContent