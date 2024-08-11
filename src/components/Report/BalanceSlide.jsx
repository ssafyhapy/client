const BalanceSlide = ({ slide }) => (
  <div>
    <p>Option 1: {slide.balanceQuestionOptionFirst}</p>
    <p>Option 2: {slide.balanceQuestionOptionSecond}</p>
    {slide.balanceResultResponseDtos.map((response, index) => (
      <p key={index}>
        {response.memberName} chose {response.balanceResultSelectedOption}
      </p>
    ))}
  </div>
);

export default BalanceSlide;
