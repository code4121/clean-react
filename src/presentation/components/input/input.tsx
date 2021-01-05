import React from "react";

import { FaExclamationCircle } from "react-icons/fa";

import Styles from "./input-styles.scss";

type Props = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;

const Input: React.FC<Props> = (props: Props) => {
    return (
        <div className={Styles.inputWrap}>
            <input {...props} />
            <span className={Styles.status}>
                <FaExclamationCircle size={16} />
            </span>
        </div>
    );
};

export default Input;
