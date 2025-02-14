import { Divider } from 'antd';
import Image from 'next/image';

export default function AuctionCard({ item }) {
  return (
    <div className="bg-[#F3F3F3F2] p-2 rounded-xl">
      <Image src={item.image} alt="image1" className="w-full" />
      <Divider />
      <p className='poppins_regular text_darkprimary text-[11px]'>Time left {item.time}</p>
      <p className='poppins_mediumtext_darkprimary text-[21px]'>{item.product}</p>
      <div className="flex items-center justify-start gap-2">
        <p className='mb-0 text_darkprimary text-lg'>{item.price}</p>
        <p className='mb-0 text_seccondary text-sm'>{item.bids}</p>
      </div>
    </div>
  );
}
