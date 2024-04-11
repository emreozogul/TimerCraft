
import React from 'react';

const RadioboxGroup = ({ options, name, selected, onSelectionChange }) => {
    return (
        <div className="flex items-center gap-4">
            {options.map((option) => (
                <label key={option} className="flex items-center cursor-pointer gap-2">
                    <input
                        type="radio"
                        className="hidden peer"
                        name={name}
                        value={option}
                        checked={selected === option}
                        onChange={(e) => onSelectionChange(e.target.value)}
                    />
                    <span className="flex items-center justify-center w-5 h-5 border-2 rounded-full border-gray-300 peer-focus:ring-2 peer-focus:ring-blue-300">
                        <span className={`w-3 h-3 rounded-full ${selected === option ? 'bg-black' : 'bg-transparent'}`}></span>
                    </span>
                    {option}
                </label>
            ))}
        </div>
    );
}

export default RadioboxGroup;

RadioboxGroup.displayName = 'RadioboxGroup';
