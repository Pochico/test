"use client"

import { useState, useEffect } from "react"
import { Breadcrumbs } from "../components/Breadcrumbs.jsx"
import { fetchSkipsByLocation } from "../services/skip_service.js"
import "./SkipSelectionStep.css"

const SkipCard = ({ skip, selected, onSelect }) => {
    return (
        <div className={`skip-card ${selected ? "selected" : ""}`}>
            <div className="skip-image-container">
                <img
                    src={
                        skip.imageUrl ||
                        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20pantalla%202025-03-29%20a%20las%2014.19.58-rnG6ozM3VsCrZITJsSRvg8aSz2kUFn.png"
                    }
                    alt={`${skip.size} Yard Skip`}
                    className="skip-image"
                />
                <div className="skip-size-badge">{skip.size} Yards</div>
            </div>

            <div className="skip-details">
                <h3 className="skip-title">{skip.name}</h3>
                <p className="skip-period">{skip.period} day hire period</p>

                <div className="skip-price">
                    <span className="price-amount">£{skip.price}</span>
                    <span className="price-period">per week</span>
                </div>

                <button className="select-skip-button" onClick={() => onSelect(skip.id)}>
                    Select This Skip <span className="arrow">→</span>
                </button>
            </div>
        </div>
    )
}

export const SkipSelectionStep = ({ onBackClick, onContinue, formData }) => {
    const [skips, setSkips] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedSkipId, setSelectedSkipId] = useState(null)

    useEffect(() => {
        const loadSkips = async () => {
            try {
                setLoading(true)
                // Usar el código postal del formData o uno predeterminado
                const postcode = formData?.postcode?.split(" ")[0] || "NR32"
                const area = formData?.city || "Lowestoft"

                const data = await fetchSkipsByLocation(postcode, area)
                setSkips(data.skips || [])
                setError(null)
            } catch (err) {
                setError("Failed to load skip options. Please try again.")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        loadSkips()
    }, [formData])

    const handleSkipSelect = (skipId) => {
        setSelectedSkipId(skipId)
    }

    const handleContinue = () => {
        if (selectedSkipId) {
            const selectedSkip = skips.find((skip) => skip.id === selectedSkipId)
            onContinue(selectedSkip)
        }
    }

    const handleStepClick = (stepId) => {
        if (stepId === 1 || stepId === 2) {
            onBackClick(stepId)
        }
    }

    if (loading) {
        return (
            <div className="skip-selection-step">
                <Breadcrumbs currentStep={3} onStepClick={handleStepClick} />
                <div className="loading">Loading skip options...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="skip-selection-step">
                <Breadcrumbs currentStep={3} onStepClick={handleStepClick} />
                <div className="error-message">{error}</div>
                <button className="retry-button" onClick={() => window.location.reload()}>
                    Retry
                </button>
            </div>
        )
    }

    return (
        <div className="skip-selection-step">
            <Breadcrumbs currentStep={3} onStepClick={handleStepClick} />

            <h1 className="title">Choose Your Skip Size</h1>
            <p className="subtitle">Select the skip size that best suits your needs</p>

            <div className="skips-grid">
                {skips.map((skip) => (
                    <SkipCard key={skip.id} skip={skip} selected={skip.id === selectedSkipId} onSelect={handleSkipSelect} />
                ))}
            </div>

            <div className="buttons-container">
                <button className="back-button" onClick={() => onBackClick(2)}>
                    Back
                </button>
                <button className="continue-button" disabled={!selectedSkipId} onClick={handleContinue}>
                    Continue <span className="arrow">→</span>
                </button>
            </div>
        </div>
    )
}
