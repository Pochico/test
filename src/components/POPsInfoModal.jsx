"use client"

import { AlertTriangle, ArrowLeft, Recycle } from "lucide-react"
import "../styles/POPsInfoModal.css"

export const POPsInfoModal = ({ onClose, onUnderstand }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-container pops-modal">
                <div className="modal-header">
                    <AlertTriangle size={24} color="#FFB800" />
                    <h2>Important Information About POPs</h2>
                </div>

                <div className="modal-content">
                    <div className="warning-box">
                        <h3>POPs Cannot Be Mixed With General Waste</h3>
                        <p>
                            Due to environmental regulations, Persistent Organic Pollutants (POPs) found in upholstered furniture
                            manufactured between 1950-2015 cannot be disposed of in general waste skips.
                        </p>
                    </div>

                    <div className="info-section">
                        <h4>Did you choose best fit skip size?</h4>
                        <p>
                            If you selected this skip size only because of your POPs, consider changing skip size, as your other items
                            may fit on the smaller size and you will save money by selecting smaller skip.
                        </p>
                        <button className="change-size-button">
                            <ArrowLeft size={16} />
                            Change Skip Size
                        </button>
                    </div>

                    <div className="alternative-section">
                        <Recycle size={24} color="#10B981" />
                        <h3>Alternative Disposal Options</h3>
                        <p>Please use one of these approved methods to dispose of POPs items:</p>
                        <ul>
                            <li>Contact your local council's bulky waste collection service</li>
                            <li>Take items to your local household waste recycling center</li>
                            <li>Use a specialist POPs waste collection service</li>
                            <li>Contact furniture recycling charities that accept POPs items</li>
                        </ul>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="secondary-button" onClick={onClose}>
                        Back
                    </button>
                    <button className="primary-button" onClick={onUnderstand}>
                        I Understand, Continue
                    </button>
                </div>
            </div>
        </div>
    )
}

