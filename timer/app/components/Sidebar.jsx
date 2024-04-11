"use client"
import Dropdown from "./ui/Dropdown";
import { useTimerSettings } from "./Timer";
import Input, { InputNumber } from "./ui/Input";
import RadioboxGroup from "./ui/Radiobox";
import Switch from "./ui/ToggleSwitch";
import CheckboxGroup from "./ui/Checkbox";


export default function Sidebar() {
    const { timerSettings, updateSettings } = useTimerSettings();

    const handleUpdateSettings = (key, value) => {
        console.log(key, value);
        updateSettings(key, value);
    }

    const handleDisplayCountIn = (value) => {
        updateSettings('displayCountIn', value);
        console.log(timerSettings.displayCountIn);
    }





    return (
        <aside className="min-w-[420px] h-screen py-4 pl-6  overflow-y-auto flex flex-col gap-4">
            <div className="flex flex-col gap-4">
                <p className="text-xl font-bold">Timer Settings</p>
                <div>
                    <label className="block mb-1">Timer Style </label>
                    <Dropdown default={timerSettings.theme} options={["Light", "Dark", "Colorful"]} onChange={(value) => handleUpdateSettings('theme', value)} />
                </div>
                <div >
                    <label className="block">Close Button</label>
                    <Switch checked={timerSettings.closeButton} onChange={(value) => handleUpdateSettings('closeButton', value)} />
                </div>
                <div >
                    <label className="block">Timer Title</label>
                    <Input value={timerSettings.timerTitle || ""} onChange={(e) => { handleUpdateSettings('title', e.target.value) }} placeholder="Black Friday Sale" />
                </div>
                <div >
                    <label className="block">Set the time in </label>
                    <RadioboxGroup
                        options={["Days", "Hours", "Minutes", "Seconds"]}
                        name="radioGroup"
                        selected={timerSettings.timeIn}
                        onSelectionChange={(value) => handleUpdateSettings('timeIn', value)}
                    />
                </div>
                <div >
                    <label className="block mt-1">Remaining Time Period </label>
                    <InputNumber value={timerSettings.remainingTimePeriod || 0} onChange={(e) => handleUpdateSettings('remainingTimePeriod', e.target.value)} />
                </div>
                <div >
                    <label className="block">Positioning</label>
                    <RadioboxGroup options={["Top Sticky", "Top Static", "Bottom Static"]} name="position" selected={timerSettings.position} onSelectionChange={(value) => handleUpdateSettings('position', value)} />

                </div>
            </div>
            <div className="flex flex-col gap-4 ">
                <p className="text-xl font-bold">Counters and Labels</p>
                <div className="flex flex-col gap-1">
                    <label className="block">Display the count in </label>
                    <CheckboxGroup options={["Days", "Hours", "Minutes", "Seconds"]} selected={timerSettings.displayCountIn} onSelectionChange={(value) => handleDisplayCountIn(value)} />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="block">Days Label</label>
                    <Input value={timerSettings.daysLabel || ""} onChange={(e) => handleUpdateSettings('daysLabel', e.target.value)} placeholder="Days" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="block">Hours Label</label>
                    <Input value={timerSettings.hoursLabel || ""} onChange={(e) => handleUpdateSettings('hoursLabel', e.target.value)} placeholder="Hours" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="block">Minutes Label</label>
                    <Input value={timerSettings.minutesLabel || ""} onChange={(e) => handleUpdateSettings('minutesLabel', e.target.value)} placeholder="Minutes" />
                </div >
                <div className="flex flex-col gap-1">
                    <label className="block">Seconds Label</label>
                    <Input value={timerSettings.secondsLabel || ""} onChange={(e) => handleUpdateSettings('secondsLabel', e.target.value)} placeholder="Seconds" />
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <p className="text-xl font-bold">Button Settings</p>
                <div className="flex flex-col gap-1">
                    <label className="block">Button Text</label>
                    <Input value={timerSettings.buttonText || ""} onChange={(e) => handleUpdateSettings('buttonText', e.target.value)} placeholder="Shop Now!" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="block">Button Link</label>
                    <Input value={timerSettings.buttonLink || ""} onChange={(e) => handleUpdateSettings('buttonLink', e.target.value)} placeholder="www.stripe.com" />
                </div>
            </div>
        </aside>
    );
}