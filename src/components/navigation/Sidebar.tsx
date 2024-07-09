import AddIcon from "@mui/icons-material/Add";
import ChatIcon from "@mui/icons-material/Chat";
import { Paper } from "@mui/material";
import IconWrapper from "components/icons/IconWrapper";
import { FC } from "react";

const Sidebar: FC = () => {
    return (
        <Paper
            variant="outlined"
            style={{
                width: "80px",
                height: "100vh"
            }}
        >
            <IconWrapper Icon={ChatIcon} backgroundColor="#303030" />
            <IconWrapper Icon={AddIcon} backgroundColor="#303030" />
        </Paper>
    );
};

export default Sidebar;
