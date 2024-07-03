import { FC } from "react";

export interface ServerIconParams {
    source: string;
    alt?: string;
}

const ServerIcon: FC<ServerIconParams> = ({ source, alt }) => {
    return <img src={source} alt={alt ?? ""} height="50px" width="50px" />;
};

export default ServerIcon;
