/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";

const SectionGrid = ({ imageUrl, title, showBtn = false, width, height, background }) => {
  return (
    <div
      style={{
        background: background
      }}
      className={`relative flex justify-end group overflow-hidden rounded-lg`}>
      {" "}
      <img
        src={imageUrl}
        alt={title}
        className="object-cover transition-transform duration-500 group-hover"
        width={width}
        height={height}
      />{" "}
      <div className="absolute inset-0 bg-opacity-30 group-hover:bg-opacity-50 transition-opacity duration-300"></div>{" "}
      <div className="absolute bottom-4 left-4">
        {" "}
        <h2 className="text-sm md:text-3xl popins_semibold">{title}</h2>{" "}
        {showBtn && (
          <Link href={"/product"} className="text-lg popins_medium hidden md:block">
            Shop Now &rarr;
          </Link>
        )}
      </div>
    </div>
  );
};
export default SectionGrid;
