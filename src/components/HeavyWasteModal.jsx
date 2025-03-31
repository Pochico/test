"use client"

import { useState } from "react"
import "../styles/heavyWasteModal.css"
import { InfoNotice } from "./InfoNotice"
import { WarningNotice } from "./WarningNotice"
import { useAppState } from "../context/AppStateContext"
import { PlasterboardDisposalModal } from "../components/PlasterboardDisposalModal"
import { WasteOption } from "./WasteOption"

export const HeavyWasteModal = ({ onClose, onContinue }) => {
    const { state, actions } = useAppState()
    const [selectedOptions, setSelectedOptions] = useState(state.wasteTypes.heavy || [])
    const [showPlasterboardModal, setShowPlasterboardModal] = useState(false)
    const [plasterboardOption, setPlasterboardOption] = useState(null)

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

    const handleHeavyWasteContinue = () => {
        if (selectedOptions.length > 0) {
            setShowPlasterboardModal(true)
        } else {
            onContinue(selectedOptions)
        }
    }

    const handlePlasterboardModalClose = () => {
        setShowPlasterboardModal(false)
    }

    const handlePlasterboardModalContinue = (option) => {
        setPlasterboardOption(option)
        setShowPlasterboardModal(false)

        // Update the payment with the plasterboard disposal fee
        if (option.price > 0) {
            actions.updatePayment({
                plasterboardFee: option.price,
            })
        }

        // Continue with the selected heavy waste options
        onContinue(selectedOptions)
    }

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h2>Heavy Waste Types</h2>
                </div>

                <div className="modal-content">
                    <WarningNotice
                        title="Important Notice"
                        body="Heavy waste types have specific requirements and restrictions. Some skip sizes may not be available for heavy waste disposal."
                    />

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

                    <InfoNotice
                        title="Skip Size Restrictions"
                        body="For safety reasons, heavy waste can only be disposed of in skips up to 8 yards. Larger skips will not be available if heavy waste is selected."
                    />
                </div>

                <div className="modal-footer">
                    <button className="cancel-button" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="continue-button" onClick={handleHeavyWasteContinue}>
                        Continue
                    </button>
                </div>
            </div>

            {showPlasterboardModal && (
                <PlasterboardDisposalModal
                    onClose={handlePlasterboardModalClose}
                    onContinue={handlePlasterboardModalContinue}
                />
            )}
        </div>
    )
}

