import React from "react";

const Photograph_final = () => {
  const currentDate = new Date()
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}/${month}/${day}`

  return (
    <div>
      <p className="mb-[15px]">{formattedDate}</p>
      <p>모든 게임 완료!🎉</p>
      <p>조금 더 친밀해진 느낌😚</p>
    </div>
  )
}

export default Photograph_final