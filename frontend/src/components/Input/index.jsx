import { forwardRef } from "react";
import PropTypes from "prop-types";
import style from "./style.module.scss";

export const Input = forwardRef(({ label, error, ...rest }, ref) => {
    return (
        <div className={style.inputContainer}>
            <label>{label}</label>
            <input ref={ref} {...rest} />
            {error ? <span className={style.err}>{error.message}</span> : null}
        </div>
    );
});

Input.displayName = 'Input';
Input.propTypes = {
    label: PropTypes.string.isRequired,
    error: PropTypes.shape({
        message: PropTypes.string
    }),
    rest: PropTypes.any
};
