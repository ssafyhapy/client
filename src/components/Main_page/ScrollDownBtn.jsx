import React from "react";
import { motion } from "framer-motion";

const ScrollDownBtn = ({text, color="#4D98F7"}) => {
  const scrollDown = (e) => {
    e.stopPropagation();
    const sections = document.querySelectorAll(".snap-start");
    const currentSection = Array.from(sections).find((section) => {
      const rect = section.getBoundingClientRect();
      return rect.top <= 5 && rect.bottom > 5;
    });

    if (currentSection) {
      const nextSection = currentSection.nextElementSibling;
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  return (
    <motion.div
      onClick={scrollDown}
      className={`flex flex-col items-center cursor-pointer text-[${color}]`}
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.p
        className="text-2xl"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {text}
      </motion.p>
      <motion.svg
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        xmlns="http://www.w3.org/2000/svg"
        width="60"
        height="41"
        viewBox="0 0 60 41"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M33.1275 30.853C32.2978 31.5693 31.1731 31.9717 30.0005 31.9717C28.8279 31.9717 27.7032 31.5693 26.8735 30.853L10.1824 16.4302C9.35266 15.7127 8.88669 14.7396 8.88696 13.7251C8.88724 12.7105 9.35375 11.7376 10.1839 11.0204C11.014 10.3032 12.1397 9.9004 13.3134 9.90063C14.4871 9.90087 15.6126 10.3041 16.4423 11.0217L30.0005 22.7415L43.5587 11.0217C44.3929 10.3246 45.5104 9.93858 46.6707 9.94682C47.8309 9.95506 48.941 10.3569 49.7618 11.0657C50.5826 11.7746 51.0485 12.7338 51.0591 13.7367C51.0698 14.7396 50.6243 15.706 49.8186 16.4277L33.1304 30.8556L33.1275 30.853Z"
          fill={`${color}`}
        />
      </motion.svg>
    </motion.div>
  );
};

export default ScrollDownBtn;
