import { FunctionComponent } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface DatePickerWrapperProps {
  text: string;
  selected: Date | null;
  onChange: (date: Date) => void;
}

export const DatePickerWrapper: FunctionComponent<DatePickerWrapperProps> = ({
  text,
  selected,
  onChange,
}: DatePickerWrapperProps) => {
  return (
    <span>
      <span>{text}:</span>
      <DatePicker
        selected={selected}
        onChange={onChange}
        maxDate={new Date()}
      />
    </span>
  );
};
