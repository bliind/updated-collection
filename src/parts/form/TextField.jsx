function TextField({ name, label, value, onChange, fieldErrors }) {
    return (
        <div className="form-group py-3">
            <label className="form-label">{label}</label>
            <input type="text"
                className={`form-control ${fieldErrors.includes(name) && 'border-danger'}`}
                name={name}
                id={name}
                value={value}
                onChange={onChange} />
        </div>
    )
}

export default TextField;
