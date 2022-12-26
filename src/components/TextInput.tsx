interface TextInputProps {
    name: string;
    value: string;
    type: string;
    placeholder: string;
    onChange: () => void;
    label?: string;
}

const TextInput = ({ name, value, placeholder, type, onChange, label }: TextInputProps) => {
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
