

import { useState } from "react"
import { Camera, Upload, X } from "lucide-react"
import "../styles/skipPlacementPhotoModal.css"

export const SkipPlacementPhotoModal = ({ onClose, onContinue, initialPhoto = null }) => {
    const [photo, setPhoto] = useState(initialPhoto)
    const [isUploading, setIsUploading] = useState(false)

    const handleTakePhoto = () => {
        // this would open the device camera on the final product
        setIsUploading(true)
        setTimeout(() => {
            setPhoto("src/assets/skip.jpg")
            setIsUploading(false)
        }, 1000)
    }

    const handleUploadPhoto = (e) => {
        // this would be a file input on the final product
        setIsUploading(true)
        setTimeout(() => {
            setPhoto("src/assets/skip.jpg")
            setIsUploading(false)
        }, 1000)
    }

    const handleRemovePhoto = () => {
        setPhoto(null)
    }

    const handleContinue = () => {
        onContinue(photo)
    }

    return (
        <div className="modal-overlay">
            <div className="modal-container photo-modal">
                <div className="modal-header">
                    <h2>Skip Placement Photo</h2>
                    <button className="close-button" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className="modal-content">
                    <p className="photo-instruction">
                        Please provide a photo of where you plan to place the skip. This helps us ensure proper placement and
                        identify any potential access issues.
                    </p>

                    {photo ? (
                        <div className="photo-preview">
                            <img src={photo || "/placeholder.svg"} alt="Skip placement location" />
                            <button className="remove-photo-button" onClick={handleRemovePhoto}>
                                <X size={20} /> Remove
                            </button>
                        </div>
                    ) : (
                        <div className="photo-options">
                            <button className="photo-option" onClick={handleTakePhoto} disabled={isUploading}>
                                <Camera size={32} />
                                <span>Take Photo</span>
                            </button>

                            <button className="photo-option" onClick={handleUploadPhoto} disabled={isUploading}>
                                <Upload size={32} />
                                <span>Upload Photo</span>
                            </button>
                        </div>
                    )}

                    {isUploading && <p className="uploading-message">Uploading photo...</p>}

                    <div className="modal-footer">
                        <button className="cancel-button" onClick={onClose}>
                            Cancel
                        </button>
                        <button className="continue-button" onClick={handleContinue} disabled={!photo}>
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

