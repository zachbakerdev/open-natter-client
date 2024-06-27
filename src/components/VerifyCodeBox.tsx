import { Box, TextField } from "@mui/material";
import React, {
    FC,
    KeyboardEventHandler,
    useEffect,
    useRef,
    useState
} from "react";

const inputBoxStyle = {
    width: "40px",
    textAlign: "center"
};

type VerifyCodeBoxProps = {
    setCode: React.Dispatch<React.SetStateAction<string>>;
};

const VerifyCodeBox: FC<VerifyCodeBoxProps> = ({ setCode }) => {
    const [digit1, setDigit1] = useState<string>("");
    const [digit2, setDigit2] = useState<string>("");
    const [digit3, setDigit3] = useState<string>("");
    const [digit4, setDigit4] = useState<string>("");
    const [digit5, setDigit5] = useState<string>("");
    const [digit6, setDigit6] = useState<string>("");

    const digit1Ref = useRef<HTMLInputElement>(null);
    const digit2Ref = useRef<HTMLInputElement>(null);
    const digit3Ref = useRef<HTMLInputElement>(null);
    const digit4Ref = useRef<HTMLInputElement>(null);
    const digit5Ref = useRef<HTMLInputElement>(null);
    const digit6Ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setCode(digit1 + digit2 + digit3 + digit4 + digit5 + digit6);
    }, [digit1, digit2, digit3, digit4, digit5, digit6]);

    const handleAdd = (digit: number, value: string): void => {
        if (!/^\d$/.test(value)) return;

        switch (digit) {
            case 1:
                if (digit1.length === 0) setDigit1(value);
                digit2Ref.current!.focus();
                break;
            case 2:
                if (digit2.length === 0) setDigit2(value);
                digit3Ref.current!.focus();
                break;
            case 3:
                if (digit3.length === 0) setDigit3(value);
                digit4Ref.current!.focus();
                break;
            case 4:
                if (digit4.length === 0) setDigit4(value);
                digit5Ref.current!.focus();
                break;
            case 5:
                if (digit5.length === 0) setDigit5(value);
                digit6Ref.current!.focus();
                break;
            case 6:
                if (digit6.length === 0) setDigit6(value);
                break;
            default:
                break;
        }
    };

    const handleSubtract = (digit: number): void => {
        switch (digit) {
            case 1:
                setDigit1("");
                break;
            case 2:
                setDigit2("");
                break;
            case 3:
                setDigit3("");
                break;
            case 4:
                setDigit4("");
                break;
            case 5:
                setDigit5("");
                break;
            case 6:
                setDigit6("");
                break;
            default:
                break;
        }
    };

    const getFocusedElement = (): number | null => {
        if (digit1Ref.current === document.activeElement) return 1;
        if (digit2Ref.current === document.activeElement) return 2;
        if (digit3Ref.current === document.activeElement) return 3;
        if (digit4Ref.current === document.activeElement) return 4;
        if (digit5Ref.current === document.activeElement) return 5;
        if (digit6Ref.current === document.activeElement) return 6;
        return null;
    };

    const handleUpdate = (digit: number, value: string): void => {
        if (value.length > 1) return;

        if (value.length === 1) handleAdd(digit, value);
        else if (value.length === 0) handleSubtract(digit);
    };

    const backIfEmpty = (focused: number): void => {
        switch (focused) {
            case 2:
                if (digit2 === "") {
                    setDigit1("");
                    digit1Ref.current!.focus();
                }
                break;
            case 3:
                if (digit3 === "") {
                    setDigit2("");
                    digit2Ref.current!.focus();
                }
                break;
            case 4:
                if (digit4 === "") {
                    setDigit3("");
                    digit3Ref.current!.focus();
                }
                break;
            case 5:
                if (digit5 === "") {
                    setDigit4("");
                    digit4Ref.current!.focus();
                }
                break;
            case 6:
                if (digit6 === "") {
                    setDigit5("");
                    digit5Ref.current!.focus();
                }
                break;
            default:
                break;
        }
    };

    const handleKeydown: KeyboardEventHandler = (event) => {
        if (event.key === "Backspace") {
            const focused: number | null = getFocusedElement();
            if (focused === null) return;
            backIfEmpty(focused);
        }
    };

    return (
        <Box display="flex" gap={1} onKeyDown={handleKeydown}>
            <TextField
                sx={inputBoxStyle}
                inputProps={{ style: { textAlign: "center" } }}
                inputRef={digit1Ref}
                value={digit1}
                onChange={(e) => handleUpdate(1, e.target.value)}
                autoFocus
                autoComplete="off"
            />
            <TextField
                sx={inputBoxStyle}
                inputProps={{ style: { textAlign: "center" } }}
                inputRef={digit2Ref}
                value={digit2}
                onChange={(e) => handleUpdate(2, e.target.value)}
                autoComplete="off"
            />
            <TextField
                sx={inputBoxStyle}
                inputProps={{ style: { textAlign: "center" } }}
                inputRef={digit3Ref}
                value={digit3}
                onChange={(e) => handleUpdate(3, e.target.value)}
                autoComplete="off"
            />
            <TextField
                sx={inputBoxStyle}
                inputProps={{ style: { textAlign: "center" } }}
                inputRef={digit4Ref}
                value={digit4}
                onChange={(e) => handleUpdate(4, e.target.value)}
                autoComplete="off"
            />
            <TextField
                sx={inputBoxStyle}
                inputProps={{ style: { textAlign: "center" } }}
                inputRef={digit5Ref}
                value={digit5}
                onChange={(e) => handleUpdate(5, e.target.value)}
                autoComplete="off"
            />
            <TextField
                sx={inputBoxStyle}
                inputProps={{ style: { textAlign: "center" } }}
                inputRef={digit6Ref}
                value={digit6}
                onChange={(e) => handleUpdate(6, e.target.value)}
                autoComplete="off"
            />
        </Box>
    );
};

export default VerifyCodeBox;
