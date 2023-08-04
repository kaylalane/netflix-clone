import { useEffect, useState } from "react";
import Item from "./Item";
import getRandomTitles from "./GetRandomItem";
import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const itemWidth = 250;
const itemHeight = 150;

export default function Row({ currentTitles, rowTitle, isRandomTitles }) {
  const [currentTitlesPosition, setCurrentTitlesPosition] = useState(0);
  const [titles, setTitles] = useState(currentTitles);
  let [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  var currentlyShowing = useMemo(() => {
    titles.slice(currentTitlesPosition, currentTitlesPosition + 5);
  }, [currentTitlesPosition, titles]);

  useEffect(() => {
    if (isRandomTitles) {
      setTitles(getRandomTitles(currentTitles, 10));
    }
  }, [currentTitles, isRandomTitles, currentTitlesPosition]);

  if (titles) {
    currentlyShowing = titles.slice(
      currentTitlesPosition,
      currentTitlesPosition + 5
    );
  }

  function prev() {
    if (titles[currentTitlesPosition - 1] != null) {
      setCurrentTitlesPosition(currentTitlesPosition - 1);
    }
  }

  function next() {
    if (
      titles[currentTitlesPosition + 1] != null &&
      currentTitlesPosition != 7
    ) {
      setCurrentTitlesPosition(currentTitlesPosition + 1);
    }
  }

  return (
    <div className="slider-container">
      <h2>{rowTitle}</h2>
      <div className="relative">
        <div className="relative h-fit overflow-x-clip">
          <div className="flex flex-2 gap-2 m-0 h-[150px] overflow-visible">
            {currentlyShowing.map((title) => (
              <Item
                title={title}
                key={title.title}
                onShow={() => setIsOpen(true)}
              />
            ))}
          </div>

          <AnimatePresence>
            {selectedId && (
              <motion.div layoutId={selectedId}>
                <motion.h5>{title.subtitle}</motion.h5>
                <motion.h2>{title.title}</motion.h2>
                <motion.button onClick={() => setSelectedId(null)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {currentTitlesPosition != 0 && (
          <button
            aria-label="Previous"
            className="absolute top-0 z-50 w-[50px] h-[150px] text-2xl"
            onClick={prev}
          >
            &#10094;
          </button>
        )}

        {currentTitlesPosition != 6 && (
          <button
            aria-label="Next"
            className="absolute top-0 right-0 z-50 w-[50px] h-[150px] text-2xl"
            onClick={next}
          >
            &#10095;
          </button>
        )}
      </div>
    </div>
  );
}
