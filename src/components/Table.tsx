interface TableProps {
    children: JSX.Element | JSX.Element[];
};

const Table = ({ children }: TableProps): JSX.Element => {
    return (
        <table className="table">
            {children}
        </table>
    );
};

export { Table };
