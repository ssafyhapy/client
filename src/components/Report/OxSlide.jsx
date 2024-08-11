const OxSlide = ({ slide }) => (
  <div>
    <p>Member Name: {slide.memberName}</p>
    {slide.oxResponseDtos.map((response, index) => (
      <div key={index}>
        <p>{response.content}</p>
        <p>Answer: {response.answer ? "True" : "False"}</p>
      </div>
    ))}
  </div>
);

export default OxSlide;