import Link from 'next/link';
import { coveravatar } from '../assets/icons/icon';
import { useRouter, useSearchParams } from 'next/navigation';
import { encryptData } from '../redux/localStorageSecure';
import { setActiveUser } from '../redux/chat-message';
import { useDispatch } from 'react-redux';

const BrandCard = ({ data }) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const dispatch = useDispatch();

  const handleNavigate = () => {
    console.log('click');

    dispatch(setActiveUser(data))
    const params = new URLSearchParams(searchParams)
    const formData = {
      user: data,
    }
    params.set('detail-user', encryptData(formData))
    router.push(`/vender/chat?${params.toString()}`)
  }

  const imageUrl = data?.brand?.cover_image || coveravatar;

  const formatTitleForURL = (title) => {
    return title?.toLowerCase().replace(/ /g, '-');
  };

  return (
    <Link
      href={`/vender/brand/${data?._id}?name=${formatTitleForURL(data?.brand?.name)}`}
      className={`
        relative 
        w-full 
        h-48 
        overflow-hidden 
        rounded-lg 
        cursor-pointer 
        transition-all 
        duration-300 
        hover:shadow-lg
        bg-cover 
        bg-center
      `}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/10 z-10" />
      <div className="absolute inset-x-0 flex items-center justify-between bottom-0 z-20 p-4">
        <h3 className="text-white text-xl line-clamp-1 font-semibold">
          {data?.brand?.name || 'Not found'}
        </h3>
        <Link href='/vender/chat' onClick={handleNavigate} className="bg_primary h-fit text-xs text_white rounded-2 px-3 popins_regular py-[6px]">Message</Link>
      </div>
    </Link>
  );
};

export default BrandCard;