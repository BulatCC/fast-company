interface SaerchStatusProps {
    length: number;
    text: string;
    errorText: string;
};

const SaerchStatus = ({ length, text, errorText }: SaerchStatusProps): JSX.Element => {
    const renderPhrase = (): JSX.Element => {
        if (length) {
            return <span className="badge bg-primary">{text}</span>;
        }
        return <span className="badge bg-danger">{errorText}</span>;
    };

    return renderPhrase();
};

export { SaerchStatus };
