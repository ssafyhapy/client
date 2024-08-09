import React from "react";

const SelectEmoji = ({ handleCloseModal }) => {
  return (
    <>
      <div className="bg-[rgba(255,255,255,0.8)] shadow-[0_0_30px_rgba(66,72,81,0.2)] flex justify-center items-center flex-col w-[20rem] h-[20rem] z-10 rounded-[20px] relative">
        <button
          onClick={handleCloseModal}
          className="absolute top-2 right-2 bg-[rgba(255,86,117,0.8)] rounded-[6px] p-1 w-[1.5rem] h-[1.5rem] flex justify-center items-center"
        >
          X
        </button>
        <p className="text-center"> 이모지</p>
        <div className="bg-custom-gradient-game bg-opacity-10 w-[80%] h-[80%] rounded-[20px]">
          <div className="grid grid-cols-3 gap-4 bg-[rgba(255,255,255,0.4)] w-[100%] h-[100%] p-2 rounded-[20px]">
            <div><button>이모지1</button></div>
            <div><button>이모지2</button></div>
            <div><button>이모지3</button></div>
            <div><button>이모지4</button></div>
            <div><button>이모지5</button></div>
            <div><button>이모지6</button></div>
            <div><button>이모지7</button></div>
            <div><button>이모지8</button></div>
            <div><button>이모지9</button></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectEmoji;
