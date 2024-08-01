import React from "react";

const Photograph_intro = () => {

  const gameIntro = "<한 줄 자기소개>"

  const currentDate = new Date()
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}/${month}/${day}`

  return (
    <div>
      <p className="mb-[15px]">{`${formattedDate} ${gameIntro}`}</p>
      <p>아직 어색한 우리,</p>
      <p>함께 추억을 남기며 더 알아가봐요!</p>
    </div>
  )
}

export default Photograph_intro