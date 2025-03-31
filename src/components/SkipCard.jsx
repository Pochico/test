
export const SkipCard = ({ skip, selected, onSelect, disabled }) => {
    return (
        <div className={`skip-card ${selected ? "selected" : ""} ${disabled ? 'disabled' : ''}`} onClick={() => onSelect(skip)}>
            <div className="skip-image-container">
                <img src={skip.imageUrl || "src/assets/skip.jpg"} alt={`${skip.size} Yard Skip`} className="skip-image" />
            </div>

            <div className="skip-card skip-details">
                <div className="skip-details-row">

                    <div>
                        <h3 className="skip-title">{skip.size} Yards skip</h3>
                        <p className="skip-period">{skip.hire_period_days} day hire period</p>
                        <p className="skip-description">{skip.description}</p>
                    </div>

                    <p className="skip-price">
                        <span className="price-amount">£{skip.price_before_vat}</span>
                        per week
                    </p>
                </div>

                <button className="select-skip-button">{selected ? 'Selected' : 'Select This Skip'} <span className="arrow">{selected || '→'}</span></button>
            </div>
        </div>
    )
}