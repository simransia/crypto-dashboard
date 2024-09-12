import React from "react";

type HeaderProps = {
  currentPrice: number;
  priceChange: number;
};

const Header = ({ currentPrice, priceChange }: HeaderProps) => {
  return (
    <div className="mb-8 p-5">
      <h1 className="text-[70px] h-max w-max font-medium relative">
        ${currentPrice?.toFixed(2)}{" "}
        <span className="text-2xl top-0 right-0 text-[#BDBEBF]">USD</span>
      </h1>
      <p
        className={`text-ld font-medium mt-2 ${
          priceChange >= 0 ? "text-[#67BF6B]" : "text-red-500"
        }`}
      >
        {priceChange >= 0 ? "+" : "-"}
        {Math.abs(priceChange).toFixed(2)} (
        {((priceChange / currentPrice) * 100).toFixed(2)}%)
      </p>
    </div>
  );
};

export default Header;
