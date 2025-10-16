import { useContext, useState } from "react";
import { ThemeContext } from "../Contrext/ThemeContext";

function Search() {
    const [proTitle, setProTitle] = useState('');
    const { searchTitle } = useContext(ThemeContext);

    const onSubmitHandler = (event) => {
        event.preventDefault();
        searchTitle(proTitle);
    };

    const onChangeHandler = (event) => {
        setProTitle(event.target.value);
    };

    return (
        <form 
            onSubmit={onSubmitHandler} 
            className="d-flex justify-content-end w-100"
        >
            <input
                type="text"
                name="proTitle"
                value={proTitle}
                onChange={onChangeHandler}
                className="form-control me-2"
                placeholder="🔍 Search products by title..."
                style={{ maxWidth: "400px" }}
            />
            <button type="submit" className="btn btn-primary">
                Search
            </button>
        </form>
    );
}

export default Search;
