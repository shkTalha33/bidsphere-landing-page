'use client';
import { FormFeedback, Input, Label, Button } from "reactstrap";
import { Controller, useFieldArray } from "react-hook-form";
import FormInput from "./formInput";
import { Trash2 } from "react-feather";

const FormArrayInput = ({ name, label, isMulti = false, control, errors, fields, btnLabel }) => {
    const { fields: fieldArray, append, remove } = useFieldArray({
        control,
        name,
    });
    return (
        <div className="col-span-6">
            {label && <Label>{label}</Label>}
            {fieldArray.map((item, index) => (
                <div key={item.id} className={`mb-3 relative ${isMulti ? ' grid gap-2 border p-3 rounded-lg' : ''}`}>
                    {fields.map((field) => {
                        return (
                            <FormInput
                                key={field.value}
                                control={control}
                                label={field?.label !== '' ? field?.label : label}
                                errors={errors}
                                type={field?.type || 'text'}
                                directlyError={field?.value ? errors?.[name]?.[index]?.[field?.value]?.message : ''} // Correctly referencing the error message dynamically
                                name={!field?.value ? `${name}[${index}]` : `${name}[${index}].${field?.value}`} // Correctly reference the field with the index
                                placeholder={field?.label !== '' ? field?.label : label}
                            />
                        )
                    })}
                    <div className="absolute -top-3 left-auto -right-2">
                        <Button
                            type="button"
                            color="danger"
                            className="p-1 rounded-circle"
                            onClick={() => remove(index)}
                        >
                            <Trash2 size={16} />
                        </Button>
                    </div>
                </div>
            ))}
            <button type="button" className="btn1 primary small-btn-2" onClick={() => append({})}>
                Add More {btnLabel}
            </button>
        </div>
    );
};

export default FormArrayInput;
