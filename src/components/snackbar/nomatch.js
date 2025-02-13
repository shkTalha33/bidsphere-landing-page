import { Result } from 'antd'
import Link from 'next/link'
import React from 'react'

const NoMatch = () => {
  return (
    <div className='w-100  d-grid justify-content-center align-items-center' style={{ height: 'calc(100vh - 120px)' }} >
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Link href={'/'} replace className='btn1 primary'>Back Home</Link>}
      />
    </div>
  )
}

export default NoMatch
