import React from "react";

const TextareaInput = ({ label, placeholder, handelField }) => {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{label}</legend>
      <textarea
        className="textarea h-24"
        placeholder={placeholder}
        {...handelField}
      ></textarea>
    </fieldset>
  );
};

export default TextareaInput;
