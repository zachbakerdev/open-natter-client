import { Link, TypographyOwnProps } from "@mui/material";
import React, { FC, PropsWithChildren } from "react";
import { Link as RouterLink } from "react-router-dom";

type InternalLinkProps = PropsWithChildren & {
    to: string;
    variant?: TypographyOwnProps["variant"];
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

const InternalLink: FC<InternalLinkProps> = ({
    onClick,
    variant,
    to,
    children
}) => {
    return (
        <Link
            to={to}
            component={RouterLink}
            variant={variant ?? undefined}
            onClick={onClick ?? undefined}
        >
            {children}
        </Link>
    );
};

export default InternalLink;
