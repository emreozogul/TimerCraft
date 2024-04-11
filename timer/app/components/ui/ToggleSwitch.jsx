import React, { useState } from 'react'

const Switch = ({ checked, onChange }) => {
    const [isChecked, setIsChecked] = useState(checked);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        onChange(!isChecked);
    }

    return (
        <>
            <label className='themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center'>
                <input
                    type='checkbox'
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className='sr-only'
                />
                <span
                    className={`slider mx-4 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 ${isChecked ? 'bg-[#212b36]' : 'bg-[#E5E6E4]'
                        }`}
                >
                    <span
                        className={`dot h-6 w-6 rounded-full bg-white duration-200 ${isChecked ? 'translate-x-[28px]' : ''
                            }`}
                    ></span>
                </span>
                <span className='label flex items-center text-sm font-medium text-black'>
                    Turn on close button
                </span>
            </label>
        </>
    )
}

export default Switch
