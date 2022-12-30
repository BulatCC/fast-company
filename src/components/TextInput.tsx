import { ChangeEvent } from 'react';

interface TextInputProps {
    placeholder: string;
    name?: string;
    value?: string;
    type?: string;
    onChange?: (evt: ChangeEvent<HTMLInputElement>) => void;
    label?: string;
}

const TextInput = ({ name, value, placeholder, type = 'text', onChange, label }: TextInputProps): JSX.Element => {
    return (
        <div className='input-group'>
            {label && <label htmlFor={name}>{label}</label>}
            <input
                className='form-control'
                value={value}
                onChange={onChange}
                id={name}
                type={type}
                name={name}
                placeholder={placeholder}
            />
        </div>
    );
};

export { TextInput };
