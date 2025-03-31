import { useState, useEffect } from "react"
import { Breadcrumbs } from "../components/Breadcrumbs"
import { Home, Truck, AlertTriangle, Clock } from "lucide-react"
import { SkipPlacementPhotoModal } from "../components/SkipPlacementPhotoModal"
import { useAppState } from "../context/AppStateContext"
import "../styles/PermitCheckStep.css"

export const PermitCheckStep = ({ onBackClick, onContinue, initialData = {} }) => {
    const { actions } = useAppState()
    const [locationType, setLocationType] = useState(initialData.locationType || "")
    const [showPhotoModal, setShowPhotoModal] = useState(false)
    const [photo, setPhoto] = useState(initialData.photo || null)

    useEffect(() => {
        if (initialData.locationType) {
            setLocationType(initialData.locationType)
        }
        if (initialData.photo) {
            setPhoto(initialData.photo)
        }
    }, [initialData])

    const handleLocationSelect = (type) => {
        setLocationType(type)
    }

    const handlePhotoModalClose = () => {
        setShowPhotoModal(false)
    }

    const handlePhotoModalContinue = (photoData) => {
        setPhoto(photoData)
        setShowPhotoModal(false)
        const requiresPermit = locationType === "public"
        const permitCost = requiresPermit ? 84.0 : 0

        const placementData = {
            locationType,
            requiresPermit,
            permitCost,
            photo,
        }

        actions.setSkipPlacement(placementData)
        onContinue(placementData)
    }

    const handleContinue = () => {
        setShowPhotoModal(true)
    }

    const handleStepClick = (stepId) => {
        if (stepId < 4) {
            onBackClick(stepId)
        }
    }

    return (
        <div className="permit-check-step">

            {showPhotoModal && (
                <SkipPlacementPhotoModal
                    onClose={handlePhotoModalClose}
                    onContinue={handlePhotoModalContinue}
                    initialPhoto={photo}
                />
            )}

            <h1 className="title">Where will the skip be placed?</h1>
            <p className="subtitle">This helps us determine if you need a permit for your skip</p>

            <div className="location-options">
                <div
                    className={`location-option ${locationType === "private" ? "selected" : ""}`}
                    onClick={() => handleLocationSelect("private")}
                >
                    <div className="location-icon">
                        <Home size={32} />
                    </div>
                    <div className="location-content">
                        <h3>Private Property</h3>
                        <p className="location-description">Driveway or private land</p>
                        <p className="location-note">No permit required when placed on your private property</p>
                    </div>
                </div>

                <div
                    className={`location-option ${locationType === "public" ? "selected" : ""}`}
                    onClick={() => handleLocationSelect("public")}
                >
                    <div className="location-icon">
                        <Truck size={32} />
                    </div>
                    <div className="location-content">
                        <h3>Public Road</h3>
                        <p className="location-description">Street or public highway</p>
                        <p className="location-note">Permit required for placement on public roads</p>
                    </div>
                </div>
            </div>

            {locationType === "public" && (
                <>
                    <div className="permit-notice">
                        <AlertTriangle size={24} color="#FFB800" />
                        <div className="notice-content">
                            <h4>Permit Required</h4>
                            <p className="text-sm">
                                A permit is required when placing a skip on a public road. We'll handle the permit application process
                                for you. An additional fee of £84.00 will be added to your order.
                            </p>
                        </div>
                    </div>

                    <div className="processing-notice">
                        <Clock size={24} color="#3B82F6" />
                        <div className="notice-content">
                            <h4>Processing Time</h4>
                            <p className="text-sm">
                                The council requires 5 working days notice to process permit applications. Please plan your delivery
                                date accordingly.
                            </p>
                        </div>
                    </div>
                </>
            )}

            <div className="buttons-container">
                <button className="back-button" onClick={() => onBackClick(3)}>
                    Back
                </button>
                <button className="continue-button" disabled={!locationType} onClick={handleContinue}>
                    Continue <span className="arrow">→</span>
                </button>
            </div>
        </div>
    )
}

