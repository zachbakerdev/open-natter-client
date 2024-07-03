import { Box } from "@mui/material";
import { FC, PropsWithChildren } from "react";

const PageBoundingBox: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Box
            sx={{
                padding: "15px",
                height: "100%",
                width: "100%"
            }}
        >
            {children}
        </Box>
    );
};

export default PageBoundingBox;
