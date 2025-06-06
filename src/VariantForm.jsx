import { useEffect, useState } from "react";
import { useUser } from "./hooks/useUser";
import { Link, useNavigate, useParams } from "react-router";
import TextField from "./parts/form/TextField";
import FormControls from "./parts/form/FormControls";

function VariantForm() {
    const [cardName, setCardName] = useState('');
    const [variantName, setVariantName] = useState('');
    const [artistName, setArtistName] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [image, setImage] = useState(null);
    const [videoLink, setVideoLink] = useState('');
    const [tags, setTags] = useState('');

    const [loading, setLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState([]);

    const {id} = useParams();
    const {editor, token} = useUser();
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const cn = cardName?.replaceAll(' ', '');
            const vn = variantName?.replaceAll(' ', '');
            const an = artistName?.replaceAll(' ', '');
            const ex = event.target.value.split('.').reverse()[0];

            const image_file_name = `${cn}${vn ? vn : an}.${ex}`;
            setImageLink(image_file_name);
            setImage(file);
        } else {
            setImage(null)
        }
    };

    const resetForm = () => {
        setCardName('');
        setVariantName('');
        setArtistName('');
        setImageLink('');
        setImage(null);
        setVideoLink('');
        setTags('');
        setFieldErrors((prev) => [])
    };

    const handleSubmit = () => {
        setLoading(true);
        setFieldErrors((prev) => [])

        const formData = new FormData();
        // token for auth
        formData.append('token', token);
        // form fields
        formData.append('card_name', cardName);
        formData.append('variant_name', variantName);
        formData.append('artist_name', artistName);
        formData.append('video_link', videoLink);
        formData.append('tags', tags);
        formData.append('image_file', image);
        formData.append('image_file_name', imageLink);
        // legacy fields
        formData.append('release_status', 'RELEASED');
        formData.append('video_status', 'RECORDED');

        // check if we have a card ID to edit or we add a new variant
        let url = 'https://snaptracker.me/collection/api/insert';
        if (id) {
            url = `https://snaptracker.me/collection/api/update/${id}`;
        }

        fetch(url, {
            'method': 'POST',
            'body': formData
        })
        .then(res => res.json())
        .then(data => {
            if (typeof data['error'] !== 'undefined') {
                const match = /(\w+) is required/.exec(data['error']);
                if (match) {
                    setFieldErrors(prevFields => [...prevFields, match[1]])
                }
            } else {
                // success
                navigate('/')
            }
        })
        .finally(() => setLoading(false));
    };

    useEffect(() => {
        if (editor !== "1") {
            navigate('/')
            return;
        }
    }, []);

    useEffect(() => {
        if (!id) return;
        const formData = new FormData();
        formData.append('token', token);
        fetch(`https://snaptracker.me/collection/api/get/${id}`, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            try {
                setCardName(() => data.card_name);
                setVariantName(() => data.variant_name);
                setArtistName(() => data.artist_name);
                setImageLink(() => data.image_link);
                setVideoLink(() => data.video_link);
                setTags(() => data.tags);
            } catch (error) {
                console.error('Error fetching variant data:', error);
            }
        })
    }, [id]);

    return (<>
        <div className="container-fluid pt-1">
            <Link to="/" className="link-light link-underline link-underline-opacity-0 link-underline-opacity-75-hover">Back</Link>
        </div>
        <div className="container py-3">
            <div className="row">
                <div className="col-6 offset-3">
                    <h3 className="text-center">{id ? 'Edit' : 'Add'} Card</h3>

                    <TextField name="card_name" label="Card Name" value={cardName} fieldErrors={fieldErrors}
                        onChange={(event) => setCardName(event.target.value)} />
                    <TextField name="variant_name" label="Variant Name" value={variantName} fieldErrors={fieldErrors}
                        onChange={(event) => setVariantName(event.target.value)} />
                    <TextField name="artist_name" label="Artist Name" value={artistName} fieldErrors={fieldErrors}
                        onChange={(event) => setArtistName(event.target.value)} />

                    <div className="form-group pt-3">
                        <label className="form-label">Card Image</label>
                        <input type="file"
                            className="form-control"
                            name="upload_image"
                            id="upload_image"
                            onChange={handleFileChange} />
                        {image && (
                            <div className="text-center py-1">
                                <img src={URL.createObjectURL(image)} style={{ width: '12rem' }} />
                            </div>
                        )}
                    </div>

                    <TextField name="image_link" label="Image Filename" value={imageLink} fieldErrors={fieldErrors}
                        onChange={(event) => setImageLink(event.target.value)} />
                    <TextField name="video_link" label="Video Link" value={videoLink} fieldErrors={fieldErrors}
                        onChange={(event) => setVideoLink(event.target.value)} />
                    <TextField name="tags" label="Tags" value={tags} fieldErrors={fieldErrors}
                        onChange={(event) => setTags(event.target.value)} />

                    <FormControls loading={loading} resetForm={resetForm} handleSubmit={handleSubmit}
                        label={(id ? 'Edit' : 'Add') + ' Variant'} />
                </div>
            </div>
        </div>
    </>)
}

export default VariantForm;
