import Link from 'next/link';
import { BsArrowRightShort } from 'react-icons/bs';

const HomeCategory = () => {
  const categories = [
    { title: 'Men', href: '/product?query=men'},
    { title: 'Women', href: '/product?query=women' },
    { title: 'Kid', href: '/product?query=kid' }
  ];

  return (
    <div className={'grid-container'}>
      {categories.map((category, index) => (
        <Link key={index} href={category.href} className={`gridItem text-black ${index === 1 && 'sm:items-end'} ${category.className}`}>
          <h3 className={`popins_semibold `}>{category.title}</h3>
          <span className='flex gap-2 items-center max-sm-hidden ' >Shop Now <BsArrowRightShort /> </span>
        </Link>
      ))}
    </div>
  );
};

export default HomeCategory;
