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

const ChangePassword = () => {
    const [loading, setloading] = useState(false)
    const userData = useSelector((state) => state?.auth?.userData)

    const schema = Yup.object().shape({
        oldPassword: Yup.string()
            .required('Old Password is required')
            .min(8, 'Password must be at least 8 characters'),
        password: Yup.string()
            .required('New Password is required')
            .min(8, 'Password must be at least 8 characters')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
            ),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
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
            {userData?.role === 'customer' && <PageHeader head={'Change Password'} mainTitle={'Profile'} />}
            <Container fluid='sm' className='pb-5'>
                <TabHeader />
                <div className='pt-4 pb-3'>
                    <h1 className='popins_medium md:text-2xl text-xl mb-0' >Change Password</h1>
                </div>
                <Form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-2 grid gap-3 auth-form"
                >
                    <div className="col-span-12">
                        <FormInput
                            name="oldPassword"
                            label="Old Password"
                            type='password'
                            control={control}
                            errors={errors}
                            placeholder={'**********'}
                        />
                    </div>
                    <div className="sm:col-span-6 col-span-12">
                        <FormInput
                            name="password"
                            label="New Password"
                            type='password'
                            control={control}
                            errors={errors}
                            placeholder={'**********'}
                        />
                    </div>
                    <div className="sm:col-span-6 col-span-12">
                        <FormInput
                            name="confirmPassword"
                            label="Confirm Password"
                            type='password'
                            control={control}
                            errors={errors}
                            placeholder={'**********'}
                        />
                    </div>


                    <div className="col-span-12 ">
                        <div className="flex justify-end">
                            <button disabled={loading} type="submit" className="btn1 primary px-5 max-sm:w-full">
                                {loading ? <BeatLoader color="#fff" size={10} /> : 'Update'}
                            </button>
                        </div>
                    </div>

                </Form>
            </Container>
        </>
    )
}

export default ChangePassword