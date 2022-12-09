interface BookmarkProps {
    bookmark: boolean;
    handleToggleBookMark: () => void;
};

const Bookmark = ({ bookmark, handleToggleBookMark }: BookmarkProps): JSX.Element => {
    return (
        <button className="btn btn-light" onClick={() => handleToggleBookMark()}>
            <i className={`bi bi-bookmark${bookmark ? '-fill' : ''}`}></i>
        </button>
    );
};

export { Bookmark };
