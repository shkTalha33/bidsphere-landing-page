'use client'
import TabHeader from '@/components/common/tabHeader'
import PageHeader from '@/components/Header/page-header'
import { setLang } from '@/components/redux/loginForm'
import { useState } from 'react'
import { Container } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Input, Label } from 'reactstrap'
const LangaugeCard = ({ name, code }) => {
    return (
        <div className="flex items-center justify-between w-100">
            <div className="ml-3 flex justify-center items-center gap-2">
                <span className='text-xs'>{code} </span>
                <span className="text-sm popins_medium text-[#222222]">{name}</span>
            </div>
        </div>
    );
};

const RadioAddress = ({ children, name, index, checked, onChange }) => {
    return (
        <div className="w-full mx-auto flex mb-1 custom-form bg-white rounded-lg sm:border max-sm:border border-[#F1F1F1] p-3">
            <Input
                type='radio'
                id={`${name}_${index}`}
                name={name}
                checked={checked}
                onChange={onChange}
            />
            <Label check htmlFor={`${name}_${index}`} className='w-100 mt-1'>
                {children}
            </Label>
        </div>
    );
};

const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' }
];

const ChangeLanguage = () => {
    const [loading, setLoading] = useState(false);
    const { i18n } = useTranslation();
    const userData = useSelector((state) => state?.auth?.userData)
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.auth.lang) || 'en'; // Default to English

    const handleLanguageChange = (selectedLang) => {
        const nData = languages.find(item => item.code === selectedLang)
        dispatch(setLang(nData));
        i18n.changeLanguage(selectedLang);
    };

    return (
        <>
            {userData?.role === 'customer' && <PageHeader head={'Select Language'} mainTitle={'Profile'} />}
            <Container fluid='sm' className='pb-5'>
                <TabHeader />
                <div className='pt-4 pb-2'>
                    <h1 className='popins_medium md:text-2xl text-xl mb-0'>Select Language</h1>
                </div>
                <Form className="mt-2 grid gap-2 auth-form">
                    {languages.map((item, index) => (
                        <div className="col-span-12" key={item.code}>
                            <RadioAddress
                                name={'language'}
                                index={index}
                                checked={lang?.code === item.code}
                                onChange={() => handleLanguageChange(item.code)}
                            >
                                <LangaugeCard code={item.flag} name={item.name} />
                            </RadioAddress>
                        </div>
                    ))}
                    {/* <div className="col-span-12">
                        <div className="flex justify-end">
                            <button disabled={loading} type="submit" className="btn1 primary px-5 max-sm:w-full">
                                {loading ? <BeatLoader color="#fff" size={10} /> : 'Update'}
                            </button>
                        </div>
                    </div> */}
                </Form>
            </Container>
        </>
    );
};

export default ChangeLanguage;