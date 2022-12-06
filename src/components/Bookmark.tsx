interface BookmarkProps {
    bookmark: boolean;
};

const Bookmark = ({ bookmark }: BookmarkProps): JSX.Element => {
    return (
        <button className="btn btn-light">
            <i className={`bi bi-bookmark${bookmark ? '-fill' : ''}`}></i>
        </button>
    );
};

export { Bookmark };
