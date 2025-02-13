/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'

const MainLayout = ({ children }) => {
    const pathname = usePathname()
    const lang = useSelector((state) => state.auth.lang);
    const { i18n } = useTranslation();
    const pubRoute = [
        '/auth/',
        '/account-created'
    ];
    const mobilePath = [
        '/', '/profile', '/live', '/shop', '/product'
    ]
    const isMobileRoute = mobilePath.includes(pathname);
    const isPublicRoute = pubRoute.some(item => pathname.startsWith(item));
    useEffect(() => {
        if (lang?.code) {
            i18n.changeLanguage(lang.code);
        }
    }, []);
    return (
        <>
            {!isPublicRoute && <Header />}
            {children}
            {!isPublicRoute ? <Footer /> : null}
        </>
    )
}

export default MainLayout