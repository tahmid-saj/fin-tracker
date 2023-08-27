import "./finance-tracker-item.styles.scss";

const FinanceTrackerItem = ({ children, ...otherProps }) => {
  return (
    <button className={`button-container finance-tracker-item-button`} { ...otherProps }>
      { children }
    </button>
  );
};

export default FinanceTrackerItem;