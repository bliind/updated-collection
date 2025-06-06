function PlaceholderCard() {
    return (
        <div className="m-2 align-self-start">
            <div className="card text-center position-relative variant-card">
                <svg xmlns="http://www.w3.org/2000/svg" width="90%" height="100%" className="mx-auto rounded-top placeholder-wave">
                        <rect width="100%" height="100%" fill="#868e96"></rect>
                    </svg>
                <div className="card-body py-2 bg-darker rounded-bottom">
                    <h6 className="card-title my-0 py-0 fw-bold">
                        <span className={`placeholder col-${Math.floor(Math.random() * 6) + 6}`}></span>
                    </h6>
                    <p className="card-text my-0 py-0">
                        <span className={`placeholder col-${Math.floor(Math.random() * 6) + 6}`}></span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PlaceholderCard;
