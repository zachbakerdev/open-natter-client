import HomeIcon from "@mui/icons-material/HomeRounded";
import { Box, Paper } from "@mui/material";
import { FC } from "react";

const Sidebar: FC = () => {
    return (
        <Paper
            variant="outlined"
            style={{
                width: "20%",
                height: "100vh",
                minWidth: "80px",
                maxWidth: "80px",
                padding: "15px",
                alignItems: "center"
            }}
        >
            <Box
                display="flex"
                alignItems="center"
                alignContent="center"
                width="48px"
                height="48px"
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
