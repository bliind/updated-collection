import { Modal } from "react-bootstrap";

function CreditsModal({ open, close }) {
    const contributors = ["SiX1SE7EN","SuperTechGod","iDabBandito","Exrian","Loser","TheChibiOne","PsykozZ","Twilight_Gap","Double","Savai","Firefox19","Lazernerd","H8TRED","Knight Blader","MasterWalks","NobleRoar","Jodie","Lopata","bfz"];

    return (
        <Modal centered size="lg" contentClassName="border-warning" show={open} onHide={close} onClick={close}>
            <Modal.Title className="bg-darker py-2 text-center rounded">
                <h5 className="py-1 my-0">Credits</h5>
            </Modal.Title>
            <Modal.Body className="bg-darker rounded justify-content-center text-center rounded">
                <h3>Creator of <span className="fst-italic">The Collection</span> Spreadsheet</h3>
                <h3 className="fw-bold">Plixie</h3>

                <h3 className="pt-3">Website Conversion / Maintainer</h3>
                <h3 className="fw-bold">./swn</h3>

                <p className="pt-3 mb-0 fw-bold">Huge thank you to major contributors:</p>
                <div className="pt-0 d-flex flex-wrap justify-content-center">
                    {contributors.map((contributor) => (
                        <div key={contributor} className="p-2">{contributor}</div>
                    ))}
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default CreditsModal;
