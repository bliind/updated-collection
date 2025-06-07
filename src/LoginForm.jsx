import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import PasswordField from "./parts/form/PasswordField";
import { useUser } from "./hooks/useUser";
import TextField from "./parts/form/TextField";
import FormControls from "./parts/form/FormControls";

function LoginForm() {
    const [formUsername, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fieldErrors, setFieldErrors] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const {username, login} = useUser();

    const navigate = useNavigate();

    const resetForm = () => {
        setUsername('');
        setPassword('');
        setFieldErrors((prev) => []);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setLoading(true);
        setError(null);
        const formData = new FormData();
        formData.append('username', formUsername);
        formData.append('password', password);

        fetch('https://snaptracker.me/collection/api/login', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if (typeof data['username'] !== 'undefined') {
                login(data);
            } else {
                setError('Failed to login');
            }
        })
        .finally(() => setLoading(false));
    };

    useEffect(() => {
        if (username) {
            navigate('/collection/');
            return;
        }
    }, [username]);

    return (<>
        <div className="container-fluid pt-1">
            <Link to="/collection/" className="link-light link-underline link-underline-opacity-0 link-underline-opacity-75-hover">Back</Link>
        </div>
        <div className="container py-3">
            <div className="row">
                <div className="col-6 offset-3">
                    <h3 className="text-center">Login</h3>
                    {error && (
                        <div className="alert alert-danger mt-4 mb-2">{error}</div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <TextField name="username" label="Username" value={formUsername} fieldErrors={fieldErrors}
                            onChange={(event) => setUsername(event.target.value)} />
                        <PasswordField name="password" label="Password" value={password} fieldErrors={fieldErrors}
                            onChange={(event) => setPassword(event.target.value)} />
                        <FormControls loading={loading} resetForm={resetForm} handleSubmit={handleSubmit} label="Login" />
                    </form>
                </div>
            </div>
        </div>
    </>)
}

export default LoginForm;
