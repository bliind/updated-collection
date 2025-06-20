import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

function VariantFilter({ searchTerm, setSearchTerm, filterCount }) {
    return (
        <div className="container py-3">
            <div className="row">
                <div className="col">
                    <div className="input-group">
                        <input
                            className="form-control"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            placeholder="Filter variants..."
                        />
                        <span className="input-group-text">{filterCount}</span>
                        <button className="input-group-text" aria-label="Close" onClick={() => setSearchTerm('')}>
                            <FontAwesomeIcon icon={faX} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VariantFilter;
