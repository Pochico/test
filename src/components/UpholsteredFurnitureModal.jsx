"use client"
import { AlertTriangle, Info } from "lucide-react"
import "../styles/UpholsteredFurnitureModal.css"

export const UpholsteredFurnitureModal = ({ onClose, onYes, onNo }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-container furniture-modal">
                <div className="modal-header">
                    <AlertTriangle size={24} color="#FFB800" />
                    <h2>Do you have any upholstered furniture?</h2>
                </div>

                <div className="modal-content">
                    <div className="info-box">
                        <Info size={20} color="#3B82F6" />
                        <h3>What items contain POPs?</h3>
                    </div>

                    <div className="pops-info">
                        <p>
                            Persistent Organic Pollutants (POPs) are found in upholstered furniture manufactured between 1950-2015,
                            including:
                        </p>
                        <ul>
                            <li>Sofas and armchairs</li>
                            <li>Dining chairs with padding</li>
                            <li>Office chairs</li>
                            <li>Padded headboards</li>
                            <li>Car seats and cushions</li>
                        </ul>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="secondary-button" onClick={onNo}>
                        No, I don't
                    </button>
                    <button className="primary-button" onClick={onYes}>
                        Yes, I do
                    </button>
                </div>
            </div>
        </div>
    )
}

