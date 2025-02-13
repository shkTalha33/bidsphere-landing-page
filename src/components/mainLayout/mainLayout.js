/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { usePathname } from 'next/navigation'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import MobileNav from '../Header/MobileNav'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react'

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
            {/* {isMobileRoute && <MobileNav />} */}
            {!isPublicRoute ? <Footer /> : null}
        </>
    )
}

export default MainLayout