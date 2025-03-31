export const WasteOption = ({ id, title, description, selected, onChange }) => {
    return (
        <div className={`waste-option ${selected ? "selected" : ""}`} onClick={() => onChange(id)}>
            <div className="waste-option-checkbox">
                <input type="checkbox" id={id} checked={selected} onChange={() => onChange(id)} />
            </div>
            <div className="waste-option-content">
                <h3 className="waste-option-title">{title}</h3>
                <p className="waste-option-description">{description}</p>
            </div>
        </div>
    )
}