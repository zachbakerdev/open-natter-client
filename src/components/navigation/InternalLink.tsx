import { Link } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import { Link as RouterLink } from "react-router-dom";

type InternalLinkProps = PropsWithChildren & {
    to: string;
};

const InternalLink: FC<InternalLinkProps> = ({ to, children }) => {
    return (
        <Link to={to} component={RouterLink}>
            {children}
        </Link>
    );
};

export default InternalLink;
