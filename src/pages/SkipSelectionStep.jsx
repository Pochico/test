import { useState, useEffect } from "react"
import { Breadcrumbs } from "../components/Breadcrumbs.jsx"
import { fetchSkipsByLocation } from "../services/skip_service.js"
import { useAppState } from "../context/AppStateContext.jsx"
import { SkipCard } from "../components/SkipCard.jsx"
import "../styles/SkipSelectionStep.css"

export const SkipSelectionStep = ({ onBackClick, onContinue, formData }) => {
    const { actions } = useAppState()
    const [skips, setSkips] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedSkip, setSelectedSkip] = useState(null)

    useEffect(() => {
        const loadSkips = async () => {
            try {
                setLoading(true)
                const postcode = formData?.postcode?.split(" ")[0] || "NR32"
                const area = formData?.city || "Lowestoft"

                const data = await fetchSkipsByLocation(area)
                setSkips(data || [])
                setError(null)
                console.log(data)
            } catch (err) {
                setError("Failed to load skip options. Please try again.")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        loadSkips()
    }, [])

    const handleSkipSelect = (skip) => {
        setSelectedSkip(skip)
    }

    const handleContinue = () => {
        if (selectedSkip) {
            actions.setSelectedSkip(selectedSkip)
            onContinue()
        }
    }

    if (loading) {
        return (
            <div className="skip-selection-step">
                <div className="loading">Loading skip options...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="skip-selection-step">
                <div className="error-message">{error}</div>
                <button className="retry-button" onClick={() => window.location.reload()}>
                    Retry
                </button>
            </div>
        )
    }

    return (
        <div className="skip-selection-step">
            <h1 className="title">Choose Your Skip Size</h1>
            <p className="subtitle">Select the skip size that best suits your needs</p>

            <div className="skips-grid">
                {skips.map((skip) => (
                    <SkipCard
                        key={skip.id}
                        skip={skip}
                        selected={selectedSkip?.id === skip.id}
                        onSelect={handleSkipSelect}
                        disabled={skip.allows_heavy_waste && !formData?.allows_heavy_waste}
                    />
                ))}
            </div>

            <div className={`floating-buttons-container ${selectedSkip ? "show" : ""}`}>
                <button className="back-button" onClick={() => onBackClick(2)}>
                    Back
                </button>
                <button className="continue-button" disabled={!selectedSkip} onClick={handleContinue}>
                    Continue <span className="arrow">→</span>
                </button>

                {
                    selectedSkip ?
                        <div className="selected-skip-info">
                            <p className="text-sm">{selectedSkip.size} yards skip</p>
                            <p>£{selectedSkip.price_before_vat}</p>
                        </div>
                        : <p></p>
                }
            </div>
        </div>
    )
}