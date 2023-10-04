import "./summary.styles.scss";

const Summary = () => {
  return (
    <div className="summary-container">
      <h5>{`End balance $${1000}`}</h5>
      <h5>{`Starting amount $${100}`}</h5>
      <h5>{`Total contribution $${600}`}</h5>
      <h5>{`Total interest $${10}`}</h5>
    </div>
  );
};

export default Summary;