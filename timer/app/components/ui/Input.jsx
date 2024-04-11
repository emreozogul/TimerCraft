
import { forwardRef, useState, useEffect, useRef } from "react";

const Input = forwardRef((props, ref) => {
    const [value, setValue] = useState(props.value);
    const inputRef = useRef();

    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    const handleChange = (e) => {
        setValue(e.target.value);
        if (props.onChange) props.onChange(e);
    };

    return (
        <input
            className="outline-none focus:ring-0 px-3 py-2 text-black rounded-md w-64 border border-[#E5E6E4]"
            ref={inputRef}
            value={value}
            placeholder={props.placeholder}
            onChange={handleChange}
        />
    );
});

export default Input;



export const InputNumber = forwardRef((props, ref) => {
    const [value, setValue] = useState(props.value);
    const inputRef = useRef();

    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    const handleChange = (e) => {
        setValue(e.target.value);
        if (props.onChange) props.onChange(e);
    }

    return (
        <input type="number" className="outline-none w-24 focus:ring-0 px-2 py-2 text-black rounded-md border border-[#E5E6E4]" ref={inputRef} value={value} onChange={handleChange} />
    )
}
)

Input.displayName = 'Input';
InputNumber.displayName = 'InputNumber';