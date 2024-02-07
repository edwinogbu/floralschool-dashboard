import React from 'react';
import { Form } from 'react-bootstrap';

const CustomGroupSubtitlePicker = ({ options, selectedValue, onValueChange, placeholder }) => {
  // Extracting unique groups (subtitles) from the options
  const groups = Array.from(new Set(options.map((option) => option.group)));

  return (
    <Form.Group controlId="formSchoolLevelFilter">
      <Form.Control
        as="select"
        className="custom-select custom-select-lg"
        value={selectedValue}
        onChange={(e) => onValueChange(e.target.value)}
      >
        <option value="">{placeholder}</option>
        {groups.map((group) => (
          <optgroup key={group} label={group}>
            {options
              .filter((option) => option.group === group)
              .map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
          </optgroup>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

export default CustomGroupSubtitlePicker;
