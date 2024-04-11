"use client"
import { useContext, createContext, useState, useEffect, useReducer, useMemo, useCallback } from "react";

export const TimerSettingsContext = createContext();

export function TimerSettingsProvider({ children }) {
    const [timerSettings, setTimerSettings] = useState({
        theme: 'Colorful',
        closeButton: false,
        title: 'Black Friday Sale',
        timeIn: 'Days',
        remainingTimePeriod: 0,
        position: 'Bottom Static',
        displayCountIn: ['Days', 'Hours', 'Minutes', 'Seconds'],
        daysLabel: 'Days',
        hoursLabel: 'Hours',
        minutesLabel: 'Minutes',
        secondsLabel: 'Seconds',
        buttonText: 'Shop Now',
        buttonLink: 'https://www.stripe.com',
    });


    function updateSettings(key, value) {
        setTimerSettings((prev) => ({
            ...prev,
            [key]: value,
        }));
    }


    return (
        <TimerSettingsContext.Provider value={{ timerSettings, updateSettings }}>
            {children}
        </TimerSettingsContext.Provider>
    );
};


export const useTimerSettings = () => {
    const context = useContext(TimerSettingsContext);
    if (!context) {
        throw new Error('useTimerSettings must be used within a TimerSettingsProvider');
    }
    return context;
};

export default function Timer() {
    const [closed, setClosed] = useState(false);
    const { timerSettings } = useTimerSettings();
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });


    const theme = {
        Light: { bg: 'bg-white text-black', card: 'bg-[#9FCFCA] rounded-md px-3 py-3', text: 'text-black', button: 'bg-[#9FCFCA] text-black', closeButton: "black" },
        Dark: { bg: 'bg-[#0A0908] text-white', card: 'bg-[#248277] rounded-md px-3 py-3 text-white', text: 'text-white', button: 'bg-[#248277]  text-white', closeButton: "white" },
        Colorful: { bg: 'bg-[#248277] text-black', card: 'bg-[#9FCFCA] rounded-md px-3 py-3', text: 'text-black', button: 'bg-[#9FCFCA] text-black', closeButton: "black" },
    };

    const position = {
        "Top Sticky": 'sticky top-0  right-0 ',
        "Bottom Static": 'mt-auto ',
        "Top Static": 'static top-0  right-0 ',
    };


    useEffect(() => {
        const interval = setInterval(() => {
            let days = 0, hours = 0, minutes = 0, seconds = 0;
            let totalTime = timerSettings.remainingTimePeriod * handlRemainingTimePeriod(timerSettings.timeIn);
            timerSettings.displayCountIn.forEach((unit) => {
                switch (unit) {
                    case 'Days':
                        days = Math.floor(totalTime / handlRemainingTimePeriod(unit));
                        totalTime = totalTime % handlRemainingTimePeriod(unit);
                        break;
                    case 'Hours':
                        hours = Math.floor(totalTime / handlRemainingTimePeriod(unit));
                        totalTime = totalTime % handlRemainingTimePeriod(unit);
                        break;
                    case 'Minutes':
                        minutes = Math.floor(totalTime / handlRemainingTimePeriod(unit));
                        totalTime = totalTime % handlRemainingTimePeriod(unit);
                        break;
                    case 'Seconds':
                        seconds = Math.floor(totalTime / handlRemainingTimePeriod(unit));
                        totalTime = totalTime % handlRemainingTimePeriod(unit);
                        break;
                    default:
                        break;
                }
            });

            setTimeLeft({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(interval);

    }, [timerSettings.remainingTimePeriod, timerSettings.timeIn, timerSettings.displayCountIn]);

    const handlRemainingTimePeriod = (unit) => {

        switch (unit) {
            case 'Days':
                return 60 * 60 * 24;
            case 'Hours':
                return 60 * 60;
            case 'Minutes':
                return 60;
            case 'Seconds':
                return 1;
            default:
                return 1;
        }
    };

    const splitDigits = (num) => {
        const strNum = String(num).padStart(2, '0');
        return strNum.split('');
    };

    const labelUnit = (unit) => {
        switch (unit) {
            case 'Days':
                return timerSettings.daysLabel;
            case 'Hours':
                return timerSettings.hoursLabel;
            case 'Minutes':
                return timerSettings.minutesLabel;
            case 'Seconds':
                return timerSettings.secondsLabel;
            default:
                return unit;
        }
    }

    const timeCard = useCallback((unit) => {
        const lowerUnit = unit.toLowerCase();
        const digits = splitDigits(timeLeft[lowerUnit]);

        return (
            <div className="flex gap-1 text-2xl">
                {digits.map((digit, index) => (
                    <div key={index} className={`${theme[timerSettings.theme].card} `}>
                        <div className="number">{digit}</div>
                    </div>
                ))}
            </div>
        );
    }, [timeLeft, timerSettings.theme]);


    return (
        <>
            {!closed && <div className={`w-full h-32 flex items-center justify-center px-10 ${theme[timerSettings.theme].bg} ${position[timerSettings.position]}`}>

                <div className="flex items-center gap-6 flex-1 w-full justify-center ">
                    <label className={`text-2xl font-bold ${theme[timerSettings.theme].text}`}>{timerSettings.title}</label>
                    <div className="flex items-center gap-4 mt-3">
                        {timerSettings.displayCountIn.map((unit) => (
                            <div key={unit} className="flex flex-col items-center gap-2">
                                <div className="flex flex-col items-center justify-center gap-2">
                                    {timeCard(unit, labelUnit(unit))}
                                    <p className={`text-sm ${theme[timerSettings.theme].text}`}>{labelUnit(unit)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className={`px-6 py-2 text-2xl rounded-md ${theme[timerSettings.theme].button}`}>
                        <a href={timerSettings.buttonLink}>{timerSettings.buttonText}</a>
                    </button>

                </div>
                <div >
                    {timerSettings.closeButton && (
                        <button className={`text-2xl ${theme[timerSettings.theme].closeButton}`} onClick={() => setClosed(true)}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 9.00002L9 15M8.99997 9L14.9999 15" stroke={`${theme[timerSettings.theme].closeButton}`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="12" cy="12" r="9" stroke={`${theme[timerSettings.theme].closeButton}`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>}
        </>
    );
}

Timer.displayName = 'Timer';