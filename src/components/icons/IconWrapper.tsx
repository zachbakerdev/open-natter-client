import { Box, SxProps, Theme } from "@mui/material";
import { ElementType, FC } from "react";

const outerStyle: SxProps<Theme> = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "55px",
    height: "55px",
    marginX: "auto",
    marginY: 1
};
const innerStyle: SxProps<Theme> = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "50px",
    height: "50px",
    borderRadius: "10px",
    transition: "0.25s",
    "&:hover": {
        width: "55px",
        height: "55px",
        transition: "0.25s"
    }
};

const iconStyle: SxProps<Theme> = {
    width: "30px",
    height: "30px",
    transition: "0.25s",
    "&:hover": {
        width: "35px",
        height: "35px",
        transition: "0.25s"
    }
};

export type IconWrapperProps = {
    Icon: ElementType;
    backgroundColor: string;
};

const IconWrapper: FC<IconWrapperProps> = ({ Icon, backgroundColor }) => {
    return (
        <Box sx={outerStyle}>
            <Box sx={{ ...innerStyle, backgroundColor }}>
                <Icon sx={iconStyle} />
            </Box>
        </Box>
    );
};

export default IconWrapper;
