import Select from 'react-select';
import React from 'react';
import PropTypes from 'prop-types';

const CustomSelect = ({
  id, title, value, onChange, onBlur, options, errors, touched
}) => {
  const handleChange = (selectedValue) => {
    // this is going to call setFieldValue and manually update values.
    onChange(`${id}`, selectedValue)
  }

  const handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.
    onBlur(`${id}`, true)
  }

  return (
    <div style={{ margin: '1rem 0' }}>
      <label htmlFor="color">{title}</label>
      <Select
        className="basic-single"
        classNamePrefix="select"
        isDisabled={false}
        isLoading={false}
        isClearable
        isRtl={false}
        id={id}
        options={options}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
      />
      {!!errors && touched && (
        <div style={{ color: 'red', marginTop: '.5rem' }}>{errors}</div>
      )}
    </div>
  )
}

CustomSelect.propTypes = {
  errors: PropTypes.string,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
}

export default CustomSelect
