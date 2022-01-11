import { FunctionComponent } from "react";
import DatePicker, {ReactDatePickerProps} from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface DatePickerWrapperProps extends ReactDatePickerProps {
  text: string;
}

export const DatePickerWrapper: FunctionComponent<DatePickerWrapperProps> = ({
  text,
  ...reactDatePickerProps
}: DatePickerWrapperProps) => {
  return (
    <span>
      <span>{text}:</span>
      <DatePicker
        {...reactDatePickerProps}
        maxDate={new Date()}
      />
    </span>
  );
};
