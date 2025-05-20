const SelectInput = ({ label, value , options = [], handelField }) => {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{label}</legend>
      <select value={value}  className="select" {...handelField}>
        <option  disabled value=''>Please Select --</option>
        {options &&
          options.map((option, idx) => (
            <option key={idx} value={option?.value || option?._id }>
              {option?.title || option?.name }
            </option>
          ))}
      </select>
    </fieldset>
  );
};

export default SelectInput;
