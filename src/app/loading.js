'use client'
import Image from "next/image";
import { Spinner } from "react-bootstrap";

export default function Loading() {
  return (
    <div className='' style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className='flex-col text-center' style={{ textAlign: 'center', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Image height={100} width={100} src={'/assets/auctionlogo2.png'} alt='logo' style={{ objectFit: 'contain', display: 'inline-block' }} />
        <Spinner animation='grow' className="text_primary mx-auto" />
      </div>
    </div>
  );
}