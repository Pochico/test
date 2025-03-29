"use client"

import { useState } from "react"
import "./heavyWasteModal.css"
import { InfoNotice } from "./InfoNotice"
import { WarningNotice } from "./WarningNotice"

const WasteOption = ({ id, title, description, selected, onChange }) => {
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

export const HeavyWasteModal = ({ onClose, onContinue }) => {
    const [selectedOptions, setSelectedOptions] = useState([])

    const wasteOptions = [
        { id: "soil", title: "Soil", description: "Including topsoil and subsoil" },
        { id: "concrete", title: "Concrete", description: "Blocks, slabs, and foundations" },
        { id: "bricks", title: "Bricks", description: "Whole or broken bricks" },
        { id: "tiles", title: "Tiles", description: "Ceramic, porcelain, or stone tiles" },
        { id: "sand", title: "Sand", description: "Building or garden sand" },
        { id: "gravel", title: "Gravel", description: "Stone and aggregate" },
        { id: "rubble", title: "Rubble", description: "Mixed construction debris" },
    ]

    const handleOptionChange = (id) => {
        if (selectedOptions.includes(id)) {
            setSelectedOptions(selectedOptions.filter((option) => option !== id))
        } else {
            setSelectedOptions([...selectedOptions, id])
        }
    }

    const handleContinue = () => {
        onContinue(selectedOptions)
    }

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h2>Heavy Waste Types</h2>
                </div>

                <div className="modal-content">
                    <WarningNotice title='Important Notice' body='Heavy waste types have specific requirements and restrictions. Some skip sizes may not be available for heavy waste disposal.' />

                    <p className="selection-instruction">Please select any heavy waste types you need to dispose of:</p>

                    <div className="waste-options-grid">
                        {wasteOptions.map((option) => (
                            <WasteOption
                                key={option.id}
                                id={option.id}
                                title={option.title}
                                description={option.description}
                                selected={selectedOptions.includes(option.id)}
                                onChange={handleOptionChange}
                            />
                        ))}
                    </div>

                    <InfoNotice title='Skip Size Restrictions' body='For safety reasons, heavy waste can only be disposed of in skips up to 8 yards. Larger skips will not be available if heavy waste is selected.' />
                </div>

                <div className="modal-footer">
                    <button className="cancel-button" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="continue-button" onClick={handleContinue}>
                        Continue
                    </button>
                </div>
            </div>
        </div>
    )
}
