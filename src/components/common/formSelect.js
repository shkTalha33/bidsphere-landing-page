'use client'
import { FormFeedback, Input, Label } from "reactstrap";
import { Controller } from "react-hook-form";

const SelectInput = ({ name, label, control, errors, placeholder, options }) => (
    <div className="col-span-6">
        <Label
            htmlFor={name}
            className="relative block overflow-hidden rounded-lg border border-gray-400 px-3 pt-3 mb-0"
        >
            <Controller
                id={name}
                name={name}
                defaultValue=""
                control={control}
                render={({ field }) => (
                    <Input
                        {...field}
                        id={name}
                        name={name}
                        type="select"
                        className={`peer h-8 w-full poppins_regular border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm ${errors[name] ? "border-red-500 ring-red-500 focus:ring-red-500" : ""
                            }`}
                    >
                        <option value="" disabled className="text-gray-400">
                            {placeholder}
                        </option>
                        {options.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                                className="text-black bg-gray-100 hover:bg-gray-200"
                            >
                                {option.label}
                            </option>
                        ))}
                    </Input>
                )}
            />
            <span className="absolute start-3 top-2 poppins_regular -translate-y-1/2 text-xs text_secondary2 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                {label}
            </span>
        </Label>
        {errors[name] && (
            <p className="text-xs text-danger">{errors[name]?.message}</p>
        )}
    </div>
);

export default SelectInput;
