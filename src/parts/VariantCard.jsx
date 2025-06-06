function VariantCard({ card, setModalCard }) {
    const imgSrc = `https://snaptracker.me/collection/images/${card.image_link}`
    const badgeStyle = 'position-absolute badge rounded-pill border card-text p-2';

    return (
        <div className="m-2 align-self-start">
            <div className="card text-center position-relative" style={{ width: '16rem' }}>
                <img
                    loading="lazy"
                    className="rounded-top card-img-top"
                    src={imgSrc}
                    onClick={() => setModalCard(card)}
                    data-bs-toggle="modal"
                    data-bs-target="#mainModal" />

                <div className="card-body py-2 bg-darker rounded-bottom">
                    <h6 className="card-title my-0 py-0 fw-bold">{card.card_name}</h6>
                    <p className="card-text my-0 py-0">{card.variant_name ? card.variant_name : card.artist_name }</p>
                    {card.tags && (
                        // <p className="card-text my-0 py-0 fst-italic">{card.tags.replaceAll(',', ' ')}</p>
                        <span
                            className={`${badgeStyle} bg-info text-dark fst-italic`}
                            style={{ top: '-0.5em', right: '-0.5em' }}
                            >{card.tags.replaceAll(',', ' ')}</span>
                    )}
                    {card.video_link ? '' : (
                        <span
                            className={`${badgeStyle} bg-warning text-dark fw-bold`}
                            style={{ top: '-0.5em', left: '-0.5em' }}>NEEDED</span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default VariantCard;
