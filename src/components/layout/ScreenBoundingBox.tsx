import { Box } from "@mui/material";
import { FC, PropsWithChildren } from "react";

const ScreenBoundingBox: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Box
            sx={{
                display: "flex",
                width: "100%",
                height: "100vh"
            }}
        >
            {children}
        </Box>
    );
};

export default ScreenBoundingBox;
