export type ForgotPasswordRequestStatus =
    | "initial"
    | "request-sending"
    | "request-accepted"
    | "code-sending"
    | "code-correct"
    | "code-incorrect"
    | "new-password-sending"
    | "new-password-accepted"
    | "new-password-rejected";
