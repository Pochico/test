"use client"

import { useState, useEffect } from "react"
import { Breadcrumbs } from "../components/Breadcrumbs"
import { CreditCard, Calendar, MapPin } from "lucide-react"
import { useAppState } from "../context/AppStateContext"
import { UpholsteredFurnitureModal } from "../components/UpholsteredFurnitureModal"
import { POPsInfoModal } from "../components/POPsInfoModal"
import { CreateAccountModal } from "../components/CreateAccountModal"
import "../styles/PaymentStep.css"

export const PaymentStep = ({ onBackClick, onContinue, skipData, permitData, deliveryDate }) => {
  const { state, actions } = useAppState()
  const [isProcessing, setIsProcessing] = useState(false)
  const [showFurnitureModal, setShowFurnitureModal] = useState(false)
  const [showPOPsModal, setShowPOPsModal] = useState(false)
  const [showAccountModal, setShowAccountModal] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")

  const hasHouseholdOrCommercial = state.wasteTypes.general.some(
    (type) => type === "household" || type === "commercial",
  )

  useEffect(() => {
    if (hasHouseholdOrCommercial) {
      setShowFurnitureModal(true)
    }
  }, [hasHouseholdOrCommercial])

  const skipPrice = 260.0
  const skipVat = 52.0
  const subtotal = skipPrice
  const vatAmount = skipVat
  const total = subtotal + vatAmount

  const formatDate = (date) => {
    if (!date) return "Monday 31 March 2025"
    const dateObj = new Date(date)
    return dateObj.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const getCollectionDate = (date) => {
    if (!date) return "Monday 14 April 2025"
    const deliveryDate = new Date(date)
    const collectionDate = new Date(deliveryDate)
    collectionDate.setDate(deliveryDate.getDate() + 14)
    return collectionDate.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const handleFurnitureModalNo = () => {
    setShowFurnitureModal(false)
  }

  const handleFurnitureModalYes = () => {
    setShowFurnitureModal(false)
    setShowPOPsModal(true)
  }

  const handlePOPsModalClose = () => {
    setShowPOPsModal(false)
    setShowFurnitureModal(true)
  }

  const handlePOPsModalUnderstand = () => {
    setShowPOPsModal(false)
  }

  const handleAccountModalClose = () => {
    setShowAccountModal(false)
  }

  const handleAccountModalContinue = (accountData) => {
    setShowAccountModal(false)

    const paymentData = {
      total,
      completed: true,
      accountData,
    }

    actions.updatePayment(paymentData)
    onContinue(paymentData)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsProcessing(true)

    setTimeout(() => {
      setIsProcessing(false)
      setShowAccountModal(true)
    }, 1000)
  }

  const handleStepClick = (stepId) => {
    if (stepId < 6) {
      onBackClick(stepId)
    }
  }

  return (
    <div className="payment-step">

      {showFurnitureModal && (
        <UpholsteredFurnitureModal onNo={handleFurnitureModalNo} onYes={handleFurnitureModalYes} />
      )}

      {showPOPsModal && <POPsInfoModal onClose={handlePOPsModalClose} onUnderstand={handlePOPsModalUnderstand} />}

      {showAccountModal && (
        <CreateAccountModal onClose={handleAccountModalClose} onContinue={handleAccountModalContinue} />
      )}

      <div className="payment-container">
        <div className="order-summary-container">
          <h2>Order Summary</h2>

          <div className="summary-section">
            <div className="section-header">
              <MapPin size={20} color="#3B82F6" />
              <h3>Delivery Address</h3>
            </div>
            <div className="section-content">
              <p>197 Ashby Road, Hinckley</p>
              <p>LE10 1SH</p>
            </div>
          </div>

          <div className="summary-section">
            <div className="section-header">
              <Calendar size={20} color="#3B82F6" />
              <h3>Delivery & Collection</h3>
            </div>
            <div className="section-content">
              <div className="date-row">
                <span>Delivery:</span>
                <span>{formatDate(deliveryDate)}</span>
              </div>
              <div className="date-row">
                <span>Collection:</span>
                <span>{getCollectionDate(deliveryDate)}</span>
              </div>
            </div>
          </div>

          <div className="skip-details">
            <div className="skip-name">5 Yard Skip</div>
            <div className="skip-period">14 day hire period</div>
            <div className="skip-price">
              <span>£260.00</span>
              <span className="vat-note">+ VAT £52.00</span>
            </div>
          </div>

          <div className="order-totals">
            <div className="total-row">
              <span>Subtotal (excl. VAT)</span>
              <span>£260.00</span>
            </div>
            <div className="total-row">
              <span>VAT (20%)</span>
              <span>£52.00</span>
            </div>
            <div className="total-row grand-total">
              <span>Total</span>
              <span>£312.00</span>
            </div>
          </div>
        </div>

        <div className="payment-column">
          <div className="payment-details-container">
            <h2>
              <CreditCard size={20} color="#3B82F6" />
              Payment Details
            </h2>

            <div className="payment-methods">
              <button
                className={`payment-method-button ${paymentMethod === "card" ? "active" : ""}`}
                onClick={() => setPaymentMethod("card")}
              >
                <CreditCard size={20} />
                <span>Tarjeta</span>
              </button>
              <button
                className={`payment-method-button ${paymentMethod === "googlepay" ? "active" : ""}`}
                onClick={() => setPaymentMethod("googlepay")}
              >
                <div className="google-pay-logo">
                  <span className="google-pay-icon">G Pay</span>
                  <span>Google Pay</span>
                </div>
              </button>
            </div>

            {paymentMethod === "card" ? (
              <form className="payment-form">
                <div className="form-group">
                  <label>Número de tarjeta</label>
                  <div className="card-input">
                    <input
                      type="text"
                      placeholder="1234 1234 1234 1234"
                      required
                      pattern="[0-9\s]{13,19}"
                      maxLength={19}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Fecha de caducidad</label>
                    <input
                      type="text"
                      placeholder="MM / AA"
                      required
                      pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                      maxLength={5}
                    />
                  </div>

                  <div className="form-group">
                    <label>Código de seguridad</label>
                    <div className="cvc-input">
                      <input type="text" placeholder="CVC" required pattern="[0-9]{3,4}" maxLength={4} />

                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>País</label>
                  <div className="select-wrapper">
                    <select defaultValue="ES">
                      <option value="ES">España</option>
                      <option value="UK">United Kingdom</option>
                      <option value="FR">France</option>
                      <option value="DE">Germany</option>
                    </select>
                  </div>
                </div>
              </form>
            ) : (
              <div className="google-pay-content">
                <div className="google-pay-header">
                  <p>Se ha seleccionado Google Pay.</p>
                </div>
                <div className="google-pay-info">
                  <p>Aparecerá otro paso para enviar tus datos de pago de forma segura.</p>
                </div>
              </div>
            )}

            <div className="save-card-option">
              <input type="checkbox" id="save-card" checked />
              <label htmlFor="save-card">Save this card as default payment method</label>
            </div>
          </div>

          <div className="payment-buttons">
            <button type="button" className="complete-payment-button" onClick={handleSubmit} disabled={isProcessing}>
              {isProcessing ? "Processing..." : "Complete Payment"}
            </button>

            <button type="button" className="back-button" onClick={() => onBackClick(5)}>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

