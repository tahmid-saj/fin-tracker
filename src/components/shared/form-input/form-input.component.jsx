import "./form-input.styles.jsx";
import { FormInputLabel, Input, Group } from "./form-input.styles.jsx";

const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input { ...otherProps }/>

      {
        label && (
          <FormInputLabel>
            { label }
          </FormInputLabel>
        )
      }
    </Group>
  );
};

export default FormInput;