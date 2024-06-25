import { Link, TypographyOwnProps } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import { Link as RouterLink } from "react-router-dom";

type InternalLinkProps = PropsWithChildren & {
    to: string;
    variant?: TypographyOwnProps["variant"];
};

const InternalLink: FC<InternalLinkProps> = ({ variant, to, children }) => {
    return (
        <Link to={to} component={RouterLink} variant={variant ?? undefined}>
            {children}
        </Link>
    );
};

export default InternalLink;
