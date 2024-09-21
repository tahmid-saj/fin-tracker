import { DropButton } from "../drop-button/drop-button.styles.js";
import { ButtonsContainer } from "../button/button.styles.js";
import {
  SavingsGoalCalculatorContainer,
  SavingsGoalCalculatorForm,
  SavingsGoalResultContainer,
  SavingsGoalGraphContainer,
  SavingsGoalTableContainer,
} from "./savings-goal-calculator.styles.jsx";

import { Fragment, useState, useEffect } from "react";
import FormInput from "../form-input/form-input.component.js";
import Button from "../button/button.component.js";
import SavingsGoalResult from "./savings-goal-calculator-result/savings-goal-result.component.js";
// import { SavingsGoalCalculatorContext } from "../../../contexts/shared/savings-goal-calculator/savings-goal-calculator.context"
import { useDispatch, useSelector } from "react-redux";
import {
  selectSavingsGoalResult,
  selectSavingsGoalScheduleResult,
} from "../../../store/shared/savings-goal-calculator/savings-goal-calculator.selector.js";
import {
  calculateSavingsGoal,
  calculateSavingsGoalSchedule,
} from "../../../store/shared/savings-goal-calculator/savings-goal-calculator.action.js";

import SavingsGoalGraph from "./savings-goal-calculator-result/savings-goal-graph.component.js";
import SavingsGoalTable from "./savings-goal-calculator-result/savings-goal-table.component.js";
import { SAVINGS_GOAL_COMPOUNDED } from "../../../utils/constants/savings.constants.js";
import { Divider, Typography } from "@mui/material";
import { COLOR_CODES } from "../../../utils/constants/shared.constants.js";
import SimplePaper from "../mui/paper/paper.component.js";

interface FormFieldsType {
  savingsGoal: string;
  yearsToReachGoal: string;
  interestRatePerYear: string;
  compounded: string;
  amountFirstDeposit: string;
  dateFirstDeposit: string;
}

const defaultFormFields: FormFieldsType = {
  savingsGoal: "",
  yearsToReachGoal: "",
  interestRatePerYear: "",
  compounded: SAVINGS_GOAL_COMPOUNDED.daily,
  amountFirstDeposit: "",
  dateFirstDeposit: "",
};

const paperStyles = {
  backgroundColor: COLOR_CODES.general["6"],
};

const SavingsGoalCalculator = () => {
  const [formFields, setFormFields] = useState<FormFieldsType>(defaultFormFields);
  const dispatch = useDispatch();
  const savingsGoalResult = useSelector(selectSavingsGoalResult);
  const savingsGoalScheduleResult = useSelector(selectSavingsGoalScheduleResult);

  useEffect(() => {
    if (savingsGoalResult) {
      dispatch(calculateSavingsGoalSchedule(savingsGoalResult));
    }
  }, [savingsGoalResult, dispatch]);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (savingsGoalResult && formFields) {
      dispatch(
        calculateSavingsGoal(savingsGoalResult, {
          savingsGoal: Number(formFields.savingsGoal),
          yearsToReachGoal: Number(formFields.yearsToReachGoal),
          interestRatePerYear: Number(formFields.interestRatePerYear),
          compounded: String(formFields.compounded),
          amountFirstDeposit: Number(formFields.amountFirstDeposit),
          dateFirstDeposit: String(formFields.dateFirstDeposit),
        })
      );
      resetFormFields();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <Fragment>
      <SavingsGoalCalculatorContainer>
        <SimplePaper styles={paperStyles}>
          <SavingsGoalCalculatorForm onSubmit={handleSubmit}>
            <Typography variant="h6" sx={{ paddingBottom: "2%" }}>
              Calculate a savings goal
            </Typography>

            <FormInput
              label="Savings goal"
              type="text"
              required
              onChange={handleChange}
              name="savingsGoal"
              value={formFields.savingsGoal}
            />
            <FormInput
              label="Years to reach goal"
              type="text"
              required
              onChange={handleChange}
              name="yearsToReachGoal"
              value={formFields.yearsToReachGoal}
            />
            <FormInput
              label="Interest rate per year"
              type="text"
              required
              onChange={handleChange}
              name="interestRatePerYear"
              value={formFields.interestRatePerYear}
            />

            <Typography
              sx={{ display: "inline-block", position: "relative", marginRight: "2%" }}
              paragraph
            >
              Compounded
            </Typography>
            <DropButton
              required
              name="compounded"
              id="compounded"
              onChange={handleChange}
              value={formFields.compounded}
              aria-label="Compounded Frequency"
            >
              <option value={SAVINGS_GOAL_COMPOUNDED.daily}>Daily</option>
              <option value={SAVINGS_GOAL_COMPOUNDED.monthly}>Monthly</option>
            </DropButton>

            <FormInput
              label="Amount of first deposit"
              type="text"
              required
              onChange={handleChange}
              name="amountFirstDeposit"
              value={formFields.amountFirstDeposit}
            />

            <Typography sx={{ marginTop: "2%" }} variant="subtitle2">
              Date of first deposit
            </Typography>
            <FormInput
              type="date"
              onChange={(e) => handleChange(e)}
              required
              name="dateFirstDeposit"
              value={formFields.dateFirstDeposit}
            />

            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="btn-group flex-wrap">
                    <Button type="submit">Calculate</Button>
                    <Button type="button" onClick={resetFormFields}>
                      Clear
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SavingsGoalCalculatorForm>
        </SimplePaper>
      </SavingsGoalCalculatorContainer>

      <Divider />

      <SavingsGoalResultContainer>
        {savingsGoalResult && <SavingsGoalResult></SavingsGoalResult>}
      </SavingsGoalResultContainer>

      <SavingsGoalGraphContainer>
        {savingsGoalScheduleResult && <SavingsGoalGraph></SavingsGoalGraph>}
      </SavingsGoalGraphContainer>

      <SavingsGoalTableContainer>
        {savingsGoalScheduleResult && <SavingsGoalTable></SavingsGoalTable>}
      </SavingsGoalTableContainer>
    </Fragment>
  );
};

export default SavingsGoalCalculator;
