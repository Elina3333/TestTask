import React from "react";
import { ErrorImage, StyledErrorMessage } from "./ErrorMessageStyles";

const ErrorMessage = (props) => {
    return (
        <StyledErrorMessage>
            <ErrorImage src="https://img.icons8.com/color/344/high-priority.png" />{" "}
            {props.children}
        </StyledErrorMessage>
    );
};

export default ErrorMessage;