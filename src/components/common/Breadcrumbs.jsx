import Link from 'next/link'
import React from 'react'

export default function Breadcrumbs({pageTitle}) {
  return (
    <>
        <p className='poppins_regular text-lg sm:text-xl text_primary mb-1 sm:mb-3'><Link href={"/"}>Home </Link> / {pageTitle} </p>
    </>
  )
}
