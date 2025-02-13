'use client'
import FormInput from '@/components/common/formInput'
import TabHeader from '@/components/common/tabHeader'
import PageHeader from '@/components/Header/page-header'
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { Container } from 'react-bootstrap'
import { useForm } from "react-hook-form"
import { useSelector } from 'react-redux'
import { BeatLoader } from "react-spinners"
import { Form } from 'reactstrap'
import * as Yup from "yup"
const AddAddress = () => {
    const [loading, setloading] = useState(false)
    const userData = useSelector((state) => state?.auth?.userData)


    const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        address: Yup.string().required("Address is required"),
        state: Yup.string().required("State is required"),
        city: Yup.string().required("City is required"),
        zipcode: Yup.string().required("Zip code is required"),
        country: Yup.string().required("Country is required"),
    });

    const {
        handleSubmit,
        control,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });


    const onSubmit = async (values) => {

    };

    return (
        <>
            {userData?.role === 'customer' && <PageHeader head={'Add Address'} mainTitle={'Profile'} />}
            <Container fluid='sm' className='pb-5'>
                <TabHeader />
                <div className='pt-4 pb-3'>
                    <h1 className='popins_medium md:text-2xl text-xl mb-0' >Add Address</h1>
                </div>
                <Form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-2 grid gap-3 auth-form"
                >
                    <div className="col-span-12">
                        <FormInput
                            name="name"
                            label="Enter Name"
                            control={control}
                            errors={errors}
                            placeholder="Enter Name"
                        />
                    </div>
                    <div className="sm:col-span-6 col-span-12">
                        <FormInput
                            name="adress"
                            label="Address"
                            control={control}
                            errors={errors}
                            placeholder="Address"
                        />
                    </div>
                    <div className="sm:col-span-6 col-span-12">
                        <FormInput
                            name="state"
                            label="State/Province"
                            control={control}
                            errors={errors}
                            placeholder="State/Province"
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInput
                            name="city"
                            label="City"
                            control={control}
                            errors={errors}
                            placeholder="City"
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInput
                            name="zipcode"
                            label="Zip Code"
                            control={control}
                            errors={errors}
                            placeholder="Zip Code"
                        />
                    </div>
                    <div className="col-span-12">
                        <FormInput
                            name="country"
                            label="Country"
                            control={control}
                            errors={errors}
                            placeholder="Country"
                        />
                    </div>

                    <div className="col-span-12 ">
                        <div className="flex justify-end">
                            <button disabled={loading} type="submit" className="btn1 primary px-5 max-sm:w-full">
                                {loading ? <BeatLoader color="#fff" size={10} /> : 'Save Address'}
                            </button>
                        </div>
                    </div>

                </Form>
            </Container>
        </>
    )
}

export default AddAddress