

import { useState, useEffect } from "react"
import { Breadcrumbs } from "../components/Breadcrumbs"
import { WasteTypeCard } from "../components/WasteTypeCard"
import { Info } from "lucide-react"
import { HeavyWasteModal } from "../components/HeavyWasteModal"
import { useAppState } from "../context/AppStateContext"

export const WasteTypeStep = ({ onBackClick, onContinue, initialData = { general: [], heavy: [] } }) => {
    const { actions } = useAppState()
    const [selectedTypes, setSelectedTypes] = useState(initialData.general || [])
    const [showModal, setShowModal] = useState(false)
    const [selectedHeavyWastes, setSelectedHeavyWastes] = useState(initialData.heavy || [])

    useEffect(() => {
        setSelectedTypes(initialData.general || [])
        setSelectedHeavyWastes(initialData.heavy || [])
    }, [initialData])

    const toggleWasteType = (type) => {
        if (selectedTypes.includes(type)) {
            setSelectedTypes(selectedTypes.filter((t) => t !== type))
        } else {
            setSelectedTypes([...selectedTypes, type])
        }
    }

    const isSelected = (type) => selectedTypes.includes(type)

    const handleHeavyWasteModalClose = () => {
        setShowModal(false)
    }

    const handleHeavyWasteModalContinue = (selectedOptions) => {
        setSelectedHeavyWastes(selectedOptions)
        setShowModal(false)

        const allWasteTypes = {
            general: selectedTypes,
            heavy: selectedOptions,
        }

        actions.setWasteTypes(allWasteTypes)
        onContinue(allWasteTypes)
    }

    const handleContinueClick = () => {
        if (selectedTypes.includes("garden") || selectedTypes.includes("construction")) {
            setShowModal(true)
        } else {
            const allWasteTypes = {
                general: selectedTypes,
                heavy: selectedHeavyWastes,
            }

            actions.setWasteTypes(allWasteTypes)
            onContinue(allWasteTypes)
        }
    }

    return (
        <div className="waste-type-step">

            {showModal && <HeavyWasteModal onClose={handleHeavyWasteModalClose} onContinue={handleHeavyWasteModalContinue} />}

            <h1 className="title">Which type of waste best describes what you are disposing of?</h1>

            <div className="info-box">
                <Info size={20} />
                <div>
                    <p>You can select multiple waste types. Some items may require special handling:</p>
                    <ul className="text-sm">
                        <li>Plasterboard and drywall materials</li>
                        <li>Heavy construction materials (soil, concrete, etc.)</li>
                    </ul>
                </div>
            </div>

            <div className="waste-types-grid">
                <WasteTypeCard type="household" isSelected={isSelected} toggleWasteType={toggleWasteType} />
                <WasteTypeCard type="construction" isSelected={isSelected} toggleWasteType={toggleWasteType} />
                <WasteTypeCard type="garden" isSelected={isSelected} toggleWasteType={toggleWasteType} />
                <WasteTypeCard type="commercial" isSelected={isSelected} toggleWasteType={toggleWasteType} />
            </div>

            <div className="buttons-container">
                <button className="back-button" onClick={onBackClick}>
                    Back
                </button>
                <button className="continue-button" disabled={selectedTypes.length === 0} onClick={handleContinueClick}>
                    Continue <span className="arrow">→</span>
                </button>
            </div>
        </div>
    )
}

