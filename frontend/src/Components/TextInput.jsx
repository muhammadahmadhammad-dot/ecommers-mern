import React from "react";

const TextInput = ({ label, type, placeholder, handelField }) => {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend ">{label}</legend>
      <input
        type={type}
        className="input"
        placeholder={placeholder}
        {...handelField}
      />
    </fieldset>
  );
};

export default TextInput;
