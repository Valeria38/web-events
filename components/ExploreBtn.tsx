'use client';

import Image from 'next/image';

const ExploreBtn = () => {
  return (
    <a href="#events" className="mt-7 mx-auto" id="explore-btn">
      <span>Explore Events</span>
      <Image
        src="/icons/arrow-down.svg"
        alt="Arrow down"
        width={24}
        height={24}
        className="h-6 w-6"
      />
    </a>
  );
};

export default ExploreBtn;
