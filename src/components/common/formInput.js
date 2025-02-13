'use client'
import { FormFeedback, Input, Label } from "reactstrap";
import { Controller } from "react-hook-form";
const FormInput = ({ name, label, control, errors, directlyError, placeholder, type = "text", rows }) => {
    return (
        <div className="col-span-6">
            <Label
                for={name}
                className="relative block overflow-hidden rounded-lg border border-gray-400 px-3 pt-3 mb-0"
            >
                <Controller
                    id={name}
                    name={name}
                    defaultValue=""
                    control={control}
                    render={({ field }) => {
                        return (
                            <Input
                                {...field}
                                id={name}
                                name={name}
                                type={type}
                                value={typeof field.value === 'object' && field.value !== null ? JSON.stringify(field.value) === '{}' && '' : field.value || ''}
                                placeholder={placeholder}
                                rows={rows}
                                invalid={!!directlyError}
                                className={`peer ${rows ? '' : 'h-8'} resize-none w-full popins_regular border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm ${directlyError || (errors?.[name]?.message ? "border-red-500 ring-red-500 focus:ring-red-500" : "")}`}
                            />
                        )
                    }}
                />
                <span className={`absolute start-3 top-2 popins_regular -translate-y-1/2 text-xs text_secondary2 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs`}>
                    {label}
                </span>
            </Label>
            {(directlyError || errors && errors[name]?.message) && (
                <p className="text-xs text-danger">
                    {directlyError || errors[name]?.message || ''}
                </p>
            )}
        </div>
    );
};
export default FormInput