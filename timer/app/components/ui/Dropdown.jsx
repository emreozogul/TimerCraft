"use client"
import { useState, useRef, forwardRef, useEffect, useImperativeHandle } from "react";

const Dropdown = forwardRef((props, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(props.default);

    const dropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    }

    const handleSelect = (option) => {
        setSelected(option);
        setIsOpen(false);
        if (props.onChange) props.onChange(option);
    }

    useImperativeHandle(ref, () => ({
        close: () => {
            setIsOpen(false);
        }
    }));



    return (
        <div className="relative" ref={dropdownRef}>
            <div className="w-48 bg-[#FAF9F9] text-black px-4 py-2 rounded-md flex justify-between items-center" onClick={handleToggle}>
                {selected}
                <div className={isOpen ? "rotate-180 transition ease-in" : "rotate-0 transition ease-in"}>
                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 9L12 15L18 9" stroke="#000000" strokeWidth="0.624" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                </div>
            </div>
            {isOpen && (
                <div className="absolute top-full z-10 mt-2 left-0 w-48 bg-[#FAF9F9] text-black rounded-md flex flex-col shadow-md">
                    {props.options.map((option) => (
                        <div key={option} className="w-full px-4 py-2 cursor-pointer" onClick={() => handleSelect(option)}>
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
);

export default Dropdown;