'use client';
import { Controller } from "react-hook-form";
import { Label, Input, FormFeedback } from "reactstrap";

const FormCheckbox = ({ name, label, control, errors,directlyError }) => {
    return (
        <div className="col-span-6">
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <div className="flex items-center">
                        <Input
                            {...field}
                            id={name}
                            name={name}
                            type="checkbox"
                            checked={field.value}
                            className="mr-2 h-5 w-5 mt-0 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                        />
                        <Label for={name} check className="text-sm mb-0 font-medium text-gray-700">
                            {label}
                        </Label>
                    </div>
                )}
            />
            {(directlyError || errors[name]?.message) && (
                <p className="text-xs text-danger">
                    {directlyError || errors[name]?.message}
                </p>
            )}
        </div>
    );
};

export default FormCheckbox;
