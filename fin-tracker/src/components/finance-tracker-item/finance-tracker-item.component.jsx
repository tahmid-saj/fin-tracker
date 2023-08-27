import "./finance-tracker-item.styles.scss";

const FinanceTrackerItem = ({ name, ...otherProps }) => {
  return (
    <button className={`button-container finance-tracker-item-button`} { ...otherProps } style={{borderRadius: 1.5 + 'rem'}}>
      { name }
    </button>
  );
};

export default FinanceTrackerItem;