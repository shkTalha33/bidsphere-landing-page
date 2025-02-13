/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect } from 'react'
import SidebarMenu from '../sidebar/sidebar'
// import InfluencerHeader from '../Header/influencerHeader'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const SidebarLayout = ({ children }) => {
    const lang = useSelector((state) => state.auth.lang);
    const { i18n } = useTranslation();
    useEffect(() => {
        if (lang?.code) {
            i18n.changeLanguage(lang.code);
        }
    }, []);
    return (
        <section className='flex h-screen overflow-hidden w-100'>
            <div>
                <SidebarMenu />
            </div>
            <div className="w-100 bg-[#fdfdff]">
                {/* <InfluencerHeader /> */}
                <Container fluid='xxl' className='h-[93vh] overflow-auto'>
                    {children}
                </Container>
            </div>
        </section>
    )
}

export default SidebarLayout