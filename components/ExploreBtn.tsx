"use client";

const ExploreBtn = () => {
    return (
        <button type="button" id="explore-btn" className="mt-7 mx-auto">
            <a href="#events">Explore Events</a>
            <img
                src="/icons/arrow-down.svg"
                alt="Arrow down"
                width={24}
                height={24}
                className="h-6 w-6"
            />
        </button>
    );
};

export default ExploreBtn;
