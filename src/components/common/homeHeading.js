import React from 'react'

const HomeHeading = ({ head, center = true }) => {
    return (
        <>
            <h1 className={`sm:text-2xl md:text-3xl lg:text-4xl text-base ${center && 'sm:text-center'}   popins_semibold`}>{head}</h1>
        </>
    )
}

export default HomeHeading