import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useUser } from "../hooks/useUser";

function VideoModal({ card }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { editor } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!['',null].includes(card.video_link)) {
            setLoading(true);
            setError(null);
        }
    }, [card]);

    const handleVideoLoad = () => {
        setLoading(false);
        setError(null);
    };

    const handleVideoError = (e) => {
        setLoading(false);
        setError('Failed to load video. It might be missing.');
    }

    return (
        <div className="modal modal-lg fade" id="mainModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-info">
                    <div className="modal-title py-2 text-center flex-column rounded">
                        <h5 className="py-1 my-0">{card.variant_name !== card.artist_name && card.variant_name} {card.card_name}</h5>
                        {card.tags && (
                            <h5 className="py-1 my-0 fst-italic">{card.tags.replaceAll(',', ' ')}</h5>
                        )}
                        <h5 className="py-1 my-0"><i className="bi bi-brush"></i> {card.artist_name}</h5>
                    </div>
                    <div className="modal-body bg-darkerer rounded">
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}

                        {loading &&
                            <svg xmlns="http://www.w3.org/2000/svg" width="48rem" height="59rem" className="img-fluid rounded placeholder-wave">
                                <rect width="100%" height="100%" fill="#868e96"></rect>
                            </svg>
                        }

                        {card && !(['',null].includes(card.video_link)) && (<video
                            src={card.video_link}
                            loop={true}
                            autoPlay={true}
                            className='img-fluid rounded mx-auto'
                            style={{ display: loading || error ? 'none' : 'block', maxWidth: '100%', height: 'auto' }}
                            onCanPlayThrough={handleVideoLoad}
                            onError={handleVideoError}
                            alt="Variant Video"
                            data-bs-toggle="modal" data-bs-target="#mainModal"
                        />)}

                        {card && ['',null].includes(card.video_link) && (<>
                            <h2 className="text-center fst">No video!</h2>
                            <img className="rounded-top card-img-top" src={`https://snaptracker.me/collection/images/${card.image_link}`} />
                        </>)}
                    </div>
                    {editor === "1" && (
                        <div className="modal-footer justify-content-center">
                            <a href="#" onClick={() => navigate(`/collection/edit/${card.id}`)} data-bs-toggle="modal" data-bs-target="#mainModal">Edit</a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default VideoModal;
