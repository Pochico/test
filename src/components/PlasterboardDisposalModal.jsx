"use client"

import { useState } from "react"
import { AlertTriangle, Info, Package } from "lucide-react"
import "../styles/PlasterboardDisposalModal.css"

export const PlasterboardDisposalModal = ({ onClose, onContinue }) => {
    const [selectedOption, setSelectedOption] = useState(null)

    const plasterboardOptions = [
        { id: "none", label: "No plasterboard waste", price: 0 },
        { id: "small", label: "Small amount (up to 5%)", description: "Includes 1 Tonne Bag (£30)", price: 30 },
        { id: "moderate", label: "Moderate amount (5-20%)", description: "Includes 1 Tonne Bag (£30)", price: 30 },
        { id: "large", label: "Large amount (more than 20%)", price: 60 },
        { id: "self", label: "I will dispose of it myself", price: 0 },
    ]

    const handleOptionSelect = (optionId) => {
        setSelectedOption(optionId)
    }

    const handleContinue = () => {
        const selectedOptionData = plasterboardOptions.find((option) => option.id === selectedOption)
        onContinue(selectedOptionData || { id: "none", price: 0 })
    }

    // Render the appropriate info box based on the selected option
    const renderInfoBox = () => {
        if (!selectedOption || selectedOption === "none" || selectedOption === "self") {
            return null
        }

        if (selectedOption === "small") {
            return (
                <div className="plasterboard-info-box">
                    <Info size={24} color="#3B82F6" />
                    <div>
                        <h3>1 Tonne Bag Required</h3>
                        <p>For small amounts of plasterboard (up to 5%)</p>
                        <div className="bag-included">
                            <Package size={18} color="#3B82F6" />
                            <span>1 Tonne Bag included for proper waste segregation</span>
                        </div>
                    </div>
                </div>
            )
        }

        if (selectedOption === "moderate") {
            return (
                <div className="plasterboard-info-box">
                    <Info size={24} color="#3B82F6" />
                    <div>
                        <h3>1 Tonne Bag Required</h3>
                        <p>For moderate amounts of plasterboard (5-20%)</p>
                        <div className="bag-included">
                            <Package size={18} color="#3B82F6" />
                            <span>1 Tonne Bag included for proper waste segregation</span>
                        </div>
                    </div>
                </div>
            )
        }

        if (selectedOption === "large") {
            return (
                <div className="plasterboard-info-box">
                    <Info size={24} color="#3B82F6" />
                    <div>
                        <h3>Plasterboard-Only Skip Required</h3>
                        <p>For large amounts of plasterboard (more than 20%)</p>
                    </div>
                </div>
            )
        }

        return null
    }

    return (
        <div className="modal-overlay">
            <div className="modal-container plasterboard-modal">
                <h2>Plasterboard Disposal</h2>

                <div className="plasterboard-notice">
                    <AlertTriangle size={24} color="#FFB800" />
                    <div>
                        <h3>Important Notice</h3>
                        <p>
                            Plasterboard must be disposed of separately from general waste due to environmental regulations. Please
                            indicate the approximate percentage of plasterboard in your waste.
                        </p>
                    </div>
                </div>

                <div className="plasterboard-options">
                    {plasterboardOptions.map((option) => (
                        <div
                            key={option.id}
                            className={`plasterboard-option ${selectedOption === option.id ? "selected" : ""}`}
                            onClick={() => handleOptionSelect(option.id)}
                        >
                            <div className="option-radio">
                                <input
                                    type="radio"
                                    id={option.id}
                                    name="plasterboardOption"
                                    checked={selectedOption === option.id}
                                    onChange={() => handleOptionSelect(option.id)}
                                />
                            </div>
                            <div className="option-content">
                                <div className="option-label">{option.label}</div>
                                {option.description && <div className="option-description">{option.description}</div>}
                            </div>
                        </div>
                    ))}
                </div>

                {renderInfoBox()}

                <div className="modal-footer">
                    <button className="cancel-button" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="continue-button" onClick={handleContinue} disabled={!selectedOption}>
                        Continue
                    </button>
                </div>
            </div>
        </div>
    )
}

