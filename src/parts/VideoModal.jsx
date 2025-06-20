import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../hooks/useUser";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaintBrush } from "@fortawesome/free-solid-svg-icons";

function VideoModal({ card, open, close }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { editor } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!['',null].includes(card.video_link)) {
            setLoading(true);
            setError(null);
        }

        // i don't know why but it still sets loading to true so we
        // can just set it to false again if we don't have a video
        if (['',null].includes(card.video_link)) {
            setLoading(false);
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
        <Modal show={open} centered size="lg" onHide={close} onClick={close}>
            <Modal.Title className="py-2 text-center flex-column rounded">
                <h5 className="py-1 my-0">{card.variant_name !== card.artist_name && card.variant_name} {card.card_name}</h5>
                {card.tags && (
                    <h5 className="py-1 my-0 fst-italic">{card.tags.replaceAll(',', ' ')}</h5>
                )}
                <h5 className="py-1 my-0"><FontAwesomeIcon icon={faPaintBrush} /> {card.artist_name}</h5>
            </Modal.Title>
            <Modal.Body className="bg-darkerer rounded">
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
                />)}

                {card && ['',null].includes(card.video_link) && (<>
                    <h2 className="text-center fst">No video!</h2>
                    <img className="rounded-top card-img-top" src={`https://snaptracker.me/collection/images/${card.image_link}`} />
                </>)}
            </Modal.Body>
            {editor === "1" && (
                <Modal.Footer className="justify-content-center">
                    <a href="#" onClick={() => navigate(`/collection/edit/${card.id}`)} data-bs-toggle="modal" data-bs-target="#mainModal">Edit</a>
                </Modal.Footer>
            )}
        </Modal>
    );
}

export default VideoModal;
