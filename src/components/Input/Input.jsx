import { forwardRef } from 'react';
import styles from './Input.module.scss';

function Input({ value, onChange, ...anotherProps }, ref) {
    return (
        <input
        ref={ref}
            value={value}
            onChange={onChange}
            {...anotherProps}
            className={styles.input}
        />
    )
}

export default forwardRef(Input);