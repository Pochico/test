
import { useState, useEffect } from "react"
import { Breadcrumbs } from "../components/Breadcrumbs"
import { Info } from "lucide-react"
import { HeavyWasteModal } from "../components/HeavyWasteModal.jsx"
import { useAppState } from "../context/AppStateContext.jsx"

export const WasteTypeStep = ({ onBackClick, onContinue, initialData = { general: [], heavy: [] } }) => {
    const { actions } = useAppState()
    const [selectedTypes, setSelectedTypes] = useState(initialData.general || [])
    const [showHeavyWasteModal, setShowHeavyWasteModal] = useState(false)
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

            if (type === "construction") {
                setShowHeavyWasteModal(true)
            }
        }
    }

    const isSelected = (type) => selectedTypes.includes(type)

    const handleStepClick = (stepId) => {
        if (stepId === 1) {
            onBackClick()
        }
    }

    const handleHeavyWasteModalClose = () => {
        setShowHeavyWasteModal(false)
    }

    const handleHeavyWasteModalContinue = (selectedOptions) => {
        setSelectedHeavyWastes(selectedOptions)
        setShowHeavyWasteModal(false)

        actions.setWasteTypes({
            general: selectedTypes,
            heavy: selectedOptions,
        })
    }

    const handleContinue = () => {
        const allWasteTypes = {
            general: selectedTypes,
            heavy: selectedHeavyWastes,
        }
        actions.setWasteTypes(allWasteTypes)
        onContinue(allWasteTypes)
    }

    return (
        <div className="waste-type-step">
            <Breadcrumbs currentStep={2} />

            {showModal ? <HeavyWasteModal onClose={() => setShowModal(false)} onContinue={console.log('continue')} /> : null}

            <h1 className="title">Which type of waste best describes what you are disposing of?</h1>

            <div className="info-box">
                <Info size={20} />
                <div>
                    <p>You can select multiple waste types. Some items may require special handling:</p>
                    <ul>
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
                    Continue
                </button>
            </div>
        </div>
    )
}
