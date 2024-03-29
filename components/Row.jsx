import { useEffect, useState } from "react";
import Item from "./Item";
import getRandomTitles from "./GetRandomItem";
import { useMemo } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Row({ currentTitles, rowTitle, isRandomTitles }) {
  const [currentTitlesPosition, setCurrentTitlesPosition] = useState(0);
  const [titles, setTitles] = useState(currentTitles);
  let [isOpen, setIsOpen] = useState(false);

  var currentlyShowing = useMemo(() => {
    titles.slice(currentTitlesPosition, currentTitlesPosition + 5);
  }, [currentTitlesPosition, titles]);

  useEffect(() => {
    if (isRandomTitles) {
      setTitles(getRandomTitles(currentTitles, 10));
    }
  }, [currentTitles, isRandomTitles, currentTitlesPosition]);

  return (
    <div className="slider-container">
      <h2 className=" text-red-600">{rowTitle}</h2>
      <div className="relative">
        <div className=" ove ">
          <Swiper spaceBetween={10} slidesPerView={4}>
            {titles.map((title) => (
              <SwiperSlide key={title.title}>
                <Item
                  title={title}
                  key={title.title}
                  onShow={() => setIsOpen(true)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
