import React, { useEffect, useState } from "react";

const VariantCard = React.memo(({ card, setModalCard }) => {
    const imgSrc = `https://snaptracker.me/collection/images/${card.image_link}`
    const badgeStyle = 'position-absolute badge rounded-pill border card-text p-2';

    const [loading, setLoading] = useState(true);
    const [style, setStyle] = useState({opacity: 1});

    useEffect(() => {
        if (loading) {
            setStyle({opacity: 0});
        } else {
            setStyle({opacity: 1});
        }
    }, [loading])

    return (
        <div className="m-2 align-self-start">
            <div
                className="card text-center position-relative variant-card"
                onClick={() => setModalCard(card)}
                data-bs-toggle="modal"
                data-bs-target="#mainModal"
            >
                {loading && (
                    <div className="spinner-border my-5 mx-auto" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                )}
                <img loading="lazy" src={imgSrc}
                    className="rounded-top card-img-top"
                    style={style}
                    onLoad={() => setLoading(false)} onError={() => setLoading(false)} />

                <div className="card-body py-2 bg-darker rounded-bottom">
                    <h6 className="card-title my-0 py-0 fw-bold">{card.card_name}</h6>
                    <p className="card-text my-0 py-0">{card.variant_name ? card.variant_name : card.artist_name }</p>
                    {card.tags && (
                        <span
                            className={`${badgeStyle} bg-info text-dark fst-italic`}
                            style={{ top: '-0.5em', right: '-0.5em' }}
                        >{card.tags.replaceAll(',', ' ')}</span>
                    )}
                    {card.video_link ? '' : (
                        <span
                            className={`${badgeStyle} bg-warning text-dark fw-bold`}
                            style={{ top: '-0.5em', left: '-0.5em' }}
                        >NEEDED</span>
                    )}
                </div>
            </div>
        </div>
    )
});

export default VariantCard;
