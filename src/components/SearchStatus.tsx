interface SearchStatusProps {
    length: number;
    text: string;
    errorText: string;
};

const SearchStatus = ({ length, text, errorText }: SearchStatusProps): JSX.Element => {
    const renderPhrase = (): JSX.Element => {
        if (length) {
            return <span className="badge bg-primary">{text}</span>;
        }
        return <span className="badge bg-danger">{errorText}</span>;
    };

    return renderPhrase();
};

export { SearchStatus };
