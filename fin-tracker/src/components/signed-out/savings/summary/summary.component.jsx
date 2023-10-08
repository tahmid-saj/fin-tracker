import "./summary.styles.scss";

export const Summary = ({ financeItemInfo }) => {
  return (
    <div className="summary-container">
      <h5>{`Total savings $${1000}`}</h5>
      <h5>{`Initial deposit $${financeItemInfo.initialDeposit}`}</h5>
      <h5>{`Total contribution $${600}`}</h5>
      <h5>{`Total interest $${10}`}</h5>
    </div>
  );
};

// export default Summary;