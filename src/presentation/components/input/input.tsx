import React from "react";

import { FaExclamationCircle } from "react-icons/fa";

import Styles from "./input-styles.scss";

type Props = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;

const Input: React.FC<Props> = (props: Props) => {
    const enableInput = (e: React.FocusEvent<HTMLInputElement>): void => {
        e.target.readOnly = false;
    };

    return (
        <div className={Styles.inputWrap}>
            <input {...props} readOnly onFocus={enableInput} />
            <span className={Styles.status}>
                <FaExclamationCircle size={16} />
            </span>
        </div>
    );
};

export default Input;
