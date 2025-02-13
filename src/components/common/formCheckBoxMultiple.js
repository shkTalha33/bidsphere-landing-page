'use client';
import { Controller } from "react-hook-form";
import { Label, Input } from "reactstrap";

const FormCheckboxMultiple = ({ name, control, errors, label, classes, data = [] }) => {
    return (
        <div className="">
            {label &&
                <Label>{label}</Label>}
            {data.map((item, index) => (
                <div className={classes} key={index}>
                    <Controller
                        name={name}
                        control={control}
                        defaultValue={[]} // Ensure initial value is an array
                        render={({ field: { onChange, value: selectedValues = [] } }) => {
                            const isChecked = selectedValues.includes(item._id); // Use item._id instead of value

                            const handleChange = (e) => {
                                if (e.target.checked) {
                                    onChange([...selectedValues, item._id]); // Add item ID
                                } else {
                                    onChange(selectedValues.filter((v) => v !== item._id)); // Remove item ID
                                }
                            };

                            return (
                                <div className="flex items-center">
                                    <Input
                                        type="checkbox"
                                        id={`${name}-${item._id}`}
                                        name={name}
                                        checked={isChecked}
                                        onChange={handleChange}
                                        className="mr-2 h-5 w-5 mt-0 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <Label htmlFor={`${name}-${item._id}`} check className="text-sm mb-0 font-medium text-gray-700">
                                        {item.name} {/* Display the item's name */}
                                    </Label>
                                </div>
                            );
                        }}
                    />
                </div>
            ))}
            {errors[name]?.message && (
                <p className="text-xs text-danger">
                    {errors[name]?.message}
                </p>
            )}
        </div>
    );
};

export default FormCheckboxMultiple;
