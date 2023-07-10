import React from "react";
interface Props {
  name?: string;
  checked: any;
  handleChangeCheckBox: any;
  rowData?: {};
}
const Checkbox: React.FC<Props> = ({
  name,
  checked,
  rowData,
  handleChangeCheckBox,
}) => {
  return (
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={(e) => handleChangeCheckBox(e, rowData)}
    />
  );
};

export default Checkbox;
