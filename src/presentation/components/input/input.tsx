import React, { useCallback, useContext } from "react";

import { FaExclamationCircle } from "react-icons/fa";

import Context from "@/presentation/contexts/form/form-context";

import Styles from "./input-styles.scss";
import { IconBaseProps } from "react-icons";

type Props = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;

const Input: React.FC<Props> = (props: Props) => {
    const { state, setState } = useContext(Context);
    const error = state[`${props.name}Error`];
    const enableInput = (e: React.FocusEvent<HTMLInputElement>): void => {
        e.target.readOnly = false;
    };

    const getStatus = (): IconBaseProps => (
        <FaExclamationCircle
            data-testid={`${props.name}-error-icon`}
            size={16}
        />
    );

    const getTitle = (): string => {
        return error;
    };

    // const handleChange = (e: React.FocusEvent<HTMLInputElement>): void => {

    // };
    const handleChange = useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            setState({
                ...state,
                [e.target.name]: e.target.value,
            });
        },
        [],
    );

    return (
        <div className={Styles.inputWrap}>
            <input
                {...props}
                data-testid={props.name}
                readOnly
                onFocus={enableInput}
                onChange={handleChange}
            />
            <span
                data-testid={`${props.name}-status`}
                title={getTitle()}
                className={Styles.status}
            >
                {getStatus()}
            </span>
        </div>
    );
};

export default Input;
