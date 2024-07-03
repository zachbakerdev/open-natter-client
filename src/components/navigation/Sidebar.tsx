import HomeIcon from "@mui/icons-material/HomeRounded";
import { Box, Paper } from "@mui/material";
import { FC } from "react";

const Sidebar: FC = () => {
    return (
        <Paper
            variant="outlined"
            style={{
                width: "80px",
                height: "100vh",
                padding: "15px",
                alignItems: "center"
            }}
        >
            <Box
                display="flex"
                alignItems="center"
                alignContent="center"
                width="50px"
                height="50px"
                style={{
                    backgroundColor: "#303030",
                    borderRadius: "10px"
                }}
            >
                <HomeIcon
                    style={{
                        margin: "auto"
                    }}
                />
            </Box>
        </Paper>
    );
};

export default Sidebar;
