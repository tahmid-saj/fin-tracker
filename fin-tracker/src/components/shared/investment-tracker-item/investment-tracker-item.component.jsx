import React, { Fragment, useState, Component } from "react";

import "./investment-tracker-item.styles.scss";

import FormView from "../../signed-out/form-view/form-view.component";

export let activeFormView = {
  label: "",
  investmentInfo: {}
}

// export const InvestmentTrackerItem = ({ label, investmentInfo, ...otherProps }) => {
//   const [closeAccount, setCloseAccount] = useState(false);

//   const closeAccountHandler = () => {
//     setCloseAccount(true);

//     console.log("closing account");
//   }

//   const handleDisplayInvestmentTrackerItemForm = (event) => {
//     console.log(label, investmentInfo);

//     activeFormView = {
//       label: label,
//       investmentInfo: investmentInfo
//     };

//     console.log(activeFormView);
//   }

//   return (
//     <div>
//       {
//         !closeAccount && investmentInfo !== null && (
//           <Fragment>
//             <button className={`button-container investment-tracker-item-button`} 
//                     { ...otherProps } style={{borderRadius: 1.5 + 'rem'}}
//                     onClick={ e => handleDisplayInvestmentTrackerItemForm(e) }>
//               { `${investmentInfo.investmentName}` }
//             </button>

//             <FormView financeItemLabel={ label } financeItemInfo={ investmentInfo }
//                       closeAccountHandler={ closeAccountHandler }></FormView>
                      
//             <div className="form-view-separator-container">
//               <hr className="rounded"/>
//             </div>

//             {/* {
//               label !== "Savings Accounts" && (
//               )
//             } */}
//           </Fragment>
//         )
//       }
//     </div>
//   );
// };

export class InvestmentTrackerItem extends Component {
  constructor({ label, investmentInfo, ...otherProps }) {
    super();

    this.state = {
      label: label,
      investmentInfo: investmentInfo,
      otherProps: otherProps,
      closeAccount: false,
      activeFormView: activeFormView
    }
  };

  closeAccountHandler = () => {
    this.setState({ closeAccount: true });

    console.log("closing account");
  };

  handleDisplayInvestmentTrackerItemForm = (event) => {
    console.log(this.state.label, this.state.investmentInfo);

    this.setState({activeFormView: {
      label: this.state.label,
      investmentInfo: this.state.investmentInfo
    }});

    console.log(this.state.activeFormView);
  };

  handleTrackerItemNameChange = (updatedName) => {
    this.setState({investmentInfo: {
      ...this.state.investmentInfo,
      investmentName: updatedName
    }});

    console.log(this.state.investmentInfo);
    console.log('updated tracker item name');
  }

  render() {
    return (
      <div>
        {
          !this.state.closeAccount && this.state.investmentInfo !== null && (
            <Fragment>
              <button className={`button-container investment-tracker-item-button`} 
                      { ...this.state.otherProps } style={{borderRadius: 1.5 + 'rem'}}
                      onClick={ e => this.handleDisplayInvestmentTrackerItemForm(e) }>
                { `${this.state.investmentInfo.investmentName}` }
              </button>

              <FormView financeItemLabel={ this.state.label } financeItemInfo={ this.state.investmentInfo }
                        closeAccountHandler={ this.closeAccountHandler }
                        handleTrackerItemNameChange={ this.handleTrackerItemNameChange }></FormView>
                        
              <div className="form-view-separator-container">
                <hr className="rounded"/>
              </div>

              {/* {
                label !== "Savings Accounts" && (
                )
              } */}
            </Fragment>
          )
        }
      </div>
    )
  };
}
