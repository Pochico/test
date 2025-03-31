import { useState } from "react"
import { Mail, Phone } from "lucide-react"
import "../styles/createAccountModal.css"

export const CreateAccountModal = ({ onClose, onContinue }) => {
    const [formData, setFormData] = useState({
        email: "",
        confirmEmail: "",
        phone: "",
    })

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.email) {
            newErrors.email = "Completa este campo"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email inválido"
        }

        if (!formData.confirmEmail) {
            newErrors.confirmEmail = "Completa este campo"
        } else if (formData.email !== formData.confirmEmail) {
            newErrors.confirmEmail = "Los emails no coinciden"
        }

        if (!formData.phone) {
            newErrors.phone = "Completa este campo"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (validateForm()) {
            onContinue(formData)
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal-container account-modal">
                <h2>Create Account</h2>

                <p className="account-description">
                    To help you track your order and manage your skip hire, we'll create an account for you.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <div className="input-with-icon">
                            <Mail className="input-icon" size={20} />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.email && <div className="error-message">{errors.email}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmEmail">Confirm Email Address</label>
                        <div className="input-with-icon">
                            <Mail className="input-icon" size={20} />
                            <input
                                type="email"
                                id="confirmEmail"
                                name="confirmEmail"
                                placeholder="Confirm your email"
                                value={formData.confirmEmail}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.confirmEmail && <div className="error-message">{errors.confirmEmail}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <div className="input-with-icon">
                            <Phone className="input-icon" size={20} />
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="Phone number for order updates"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.phone && <div className="error-message">{errors.phone}</div>}
                    </div>

                    <button type="submit" className="continue-button">
                        Continue
                    </button>

                    <button type="button" className="back-button" onClick={onClose}>
                        Go Back To Payment
                    </button>
                </form>
            </div>
        </div>
    )
}
