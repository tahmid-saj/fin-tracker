import "./summary.styles.scss";

const date = new Date();
let currentDay= String(date.getDate()).padStart(2, '0');
let currentMonth = String(date.getMonth()+1).padStart(2,"0");
let currentYear = date.getFullYear();
let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

const Summary = () => {
  return (
    <div className="bank-account-summary">
      <h4>{`Current balance   `}<strong>{`$${3840}`}</strong></h4>
      <h5>{`As of ${currentDate}`}</h5>

      <h4>{`IN $${5020}  -  OUT $${1180}`}</h4>
    </div>
  );
};

export default Summary;