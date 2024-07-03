import { useEffect } from "react";
import strings from "strings";

const useTitle = (title: string) => {
    useEffect(() => {
        document.title = `${title} | ${strings.title}`;
    }, [title]);
};

export default useTitle;
