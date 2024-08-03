const Memory = ({children, memberMemoryboxList}) => {
  return (
    <div className="w-[820px] h-[300px] bg-[rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(66,72,81,0.3)] border-[10px] border-[rgba(255,255,255,0.2)] flex flex-col p-5 gap-5 relative">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl">추억 상자</h1>
      </div>
      {children}
    </div>
  );
};
export default Memory;
