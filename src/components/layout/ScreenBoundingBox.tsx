import { Box } from "@mui/material";
import { FC, PropsWithChildren } from "react";

const ScreenBoundingBox: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Box
            style={{
                display: "flex"
            }}
        >
            {children}
        </Box>
    );
};

export default ScreenBoundingBox;
