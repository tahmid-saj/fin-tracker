import FinanceTrackerItem from "../finance-tracker-item/finance-tracker-item.component";
import "./finance-tracker-items.styles.scss";

const FinanceTrackerItems = ({ children, label }) => {
  return (
    <div className="finance-tracker-item-container">
      <h2>{ label }</h2>
      <FinanceTrackerItem>TD Account</FinanceTrackerItem>
    </div>
  );
};

export default FinanceTrackerItems;