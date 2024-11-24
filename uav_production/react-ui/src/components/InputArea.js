import React from "react";

function InputArea({className, defaultValue, placeholder, onChange, onClick, disabled = false, onBlur,
                       onKeyPress, ref, type, text, children, required=false, id, name, maxLength, step,
                       max, min, frontText=null, value, frontClass}) {
    const validateMaxLength = (element) => {
        let value = element.target.value;
        if (value.length > maxLength) {
            element.target.value = value.slice(0, maxLength);
        }
    }

    return (
        <div className={`input-area ${className || ''}`}>
            {frontText && <span className={`front-prefix ${frontClass}`}>{frontText}</span>}
            <input inputvalue={defaultValue || ''}
                   defaultValue={defaultValue || ''}
                   // value={defaultValue || ''}
                   className={frontText ? ` front-text ${className}` : className}
                   placeholder={placeholder || ''}
                   step={step || ''}
                   max={max || ''}
                   min={min || ''}
                   id={id}
                   onClick={onClick}
                   name={name}
                   disabled={disabled}
                   required={required}
                   onBlur={onBlur ? onBlur : null}
                   onKeyPress={onKeyPress ? onKeyPress : null}
                   ref={ref}
                   maxLength={maxLength ? maxLength : ''}
                   onInput={maxLength ? validateMaxLength : null}
                   type={type || 'text'}
                   onChange={(event) => {
                       event.target.setAttribute('input-value',
                           event.target.value.replace(/./g, '*'));
                       typeof onChange == 'function' && onChange(event);
                   }}/>
            <span>{text}{required && <p className="required">*</p>}</span>
            {children}
        </div>
    );
}

export default InputArea;