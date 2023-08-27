import "./account-info.styles.scss";

const AccountInfo = () => {
  return (
    <div className="account-info-container">
      <h5>{`Savings account name ${"Bob"}`}</h5>
      <h5>{`Monthly contribution of $${100} over a period of $${3} ${"years"}`}</h5>
      <h5>{`APY ${1.12}%`}</h5>
    </div>
  );
};

export default AccountInfo;