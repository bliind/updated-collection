function FormControls({loading, label, resetForm, handleSubmit}) {
    return (
        <div className="form-group py-3">
            <button type="submit" className={`btn btn-success me-3 ${loading && 'disabled'}`} onClick={handleSubmit}>
                {loading ? (<>
                    <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                    <span className="visually-hidden" role="status">Loading...</span>
                </>) : label}
            </button>
            <button type="reset" className="btn btn-danger" onClick={resetForm}>Reset Form</button>
        </div>
    )
}

export default FormControls;
