import "./account-info.styles.scss";

const AccountInfo = () => {
  return (
    <div className="account-info-container">
      <h5>{`Savings account name ${"Bob"}`}</h5>
      <h5>{`Monthly contribution of $${100} over a period of $${3} ${"years"}`}</h5>
      <h5>{`APY ${1.12}%`}</h5>
      <h6>{`Start date - ${"2023-08-26"}`}</h6>
      <h6>{`End date - ${"2023-09-26"}`}</h6>
    </div>
  );
};

export default AccountInfo;