function TextField({ name, label, value, onChange, fieldErrors, loading }) {
    return (
        <div className="form-group py-3">
            <label className="form-label">{label}</label>
            <input type="text"
                className={`form-control ${fieldErrors.includes(name) && 'border-danger'}`}
                name={name}
                id={name}
                value={value === null ? '' : value}
                onChange={onChange}
                disabled={loading}
                autoComplete="off"
                list={`${name}_suggestions`} />
        </div>
    )
}

export default TextField;
