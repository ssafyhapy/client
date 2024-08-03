const History = ({memberHistoryList}) => {
  return (
    <div className="w-[400px] h-[200px] bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] border-[10px] border-[rgba(255,255,255,0.2)] flex items-start p-5 gap-5 relative">
      <div className="flex flex-col justify-center gap-2">
        <h1 className="text-2xl">History</h1>
        <p>{memberHistoryList?.memberHistoryList}memberHistoryList</p>
      </div>
    </div>
  );
};
export default History;
