const IntroSlide = ({ slide }) => (
  <div className="flex flex-col items-center gap-4">
    <p className="text-base white-space: nowrap;">{slide.memberName}</p>
    <p className="text-xl white-space: nowrap;">한 줄 자기소개 : {slide.content}</p>
  </div>
);

export default IntroSlide;
