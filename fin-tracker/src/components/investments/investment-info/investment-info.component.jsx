import "./investment-info.styles.scss";

const InvestmentInfo = () => {
  return (
    <div className="investment-info-container">
      <h5>{`Investment name ${"Bob"}`}</h5>
      <h5>{`Investment type ${"GIC"}`}</h5>
      <h5>{`Return rate ${5.1}%`}</h5>
      <h5>{`Compounded ${"Monthly"}`}</h5>
      <h5>{`Additional contribution of ${100} at the ${"beginning"} of each ${"month"}`}</h5>
    </div>
  );
};

export default InvestmentInfo;