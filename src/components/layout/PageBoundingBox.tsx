import { Box } from "@mui/material";
import { FC, PropsWithChildren } from "react";

const PageBoundingBox: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Box
            style={{
                padding: "15px"
            }}
        >
            {children}
        </Box>
    );
};

export default PageBoundingBox;
