import React from "react";

const FileInput = ({label ,handelField}) => {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{label}</legend>
      <input type="file" className="file-input"  {...handelField} />
    </fieldset>
  );
};

export default FileInput;
