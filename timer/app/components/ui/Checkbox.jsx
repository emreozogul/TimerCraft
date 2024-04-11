import React, { useState, useEffect } from 'react';

const ORDER = ['Days', 'Hours', 'Minutes', 'Seconds'];

const CheckboxGroup = ({ options, selected, onSelectionChange }) => {
    const [selectedOptions, setSelectedOptions] = useState(
        selected.filter(option => ORDER.includes(option)).sort((a, b) => ORDER.indexOf(a) - ORDER.indexOf(b))
    );

    useEffect(() => {
        const sortedSelected = selected.filter(option => ORDER.includes(option)).sort((a, b) => ORDER.indexOf(a) - ORDER.indexOf(b));
        setSelectedOptions(sortedSelected);
    }, [selected]);

    const handleSelectionChange = (option) => {
        let updatedOptions;
        if (selectedOptions.includes(option)) {
            updatedOptions = selectedOptions.filter((selectedOption) => selectedOption !== option);
        } else {
            updatedOptions = [...selectedOptions, option];
            updatedOptions = updatedOptions.filter(option => ORDER.includes(option)).sort((a, b) => ORDER.indexOf(a) - ORDER.indexOf(b));
        }

        onSelectionChange(updatedOptions);
    };

    return (
        <div className="flex flex-row gap-1">
            {ORDER.filter(option => options.includes(option)).map((option) => (
                <Checkbox
                    key={option}
                    label={option}
                    isChecked={selectedOptions.includes(option)}
                    onChange={() => handleSelectionChange(option)}
                />
            ))}
        </div>
    );
};

export default CheckboxGroup;

CheckboxGroup.displayName = 'CheckboxGroup';



const Checkbox = ({ label, onChange, isChecked }) => {
    const handleChange = () => {
        onChange(label);
    };

    return (
        <div className="flex items-center">
            <div className="inline-flex items-center">
                <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor={label}>
                    <input
                        type="checkbox"
                        id={label}
                        className="peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-black transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-black checked:bg-black checked:before:bg-slate-400 hover:before:opacity-10"
                        checked={isChecked}
                        onChange={handleChange}
                    />
                    <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                            <path fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"></path>
                        </svg>
                    </span>
                </label>
            </div>
            <label htmlFor={label} className="text-sm text-gray-500">{label}</label>
        </div>
    );
};

Checkbox.displayName = 'Checkbox';