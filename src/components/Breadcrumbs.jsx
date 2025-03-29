import React from "react"
import { MapPin, Trash2, Truck, FileCheck, Calendar, CreditCard } from "lucide-react"

export const Breadcrumbs = ({ currentStep, onStepClick }) => {
    const steps = [
        { id: 1, name: "Postcode", icon: <MapPin size={18} /> },
        { id: 2, name: "Waste Type", icon: <Trash2 size={18} /> },
        { id: 3, name: "Select Skip", icon: <Truck size={18} /> },
        { id: 4, name: "Permit Check", icon: <FileCheck size={18} /> },
        { id: 5, name: "Choose Date", icon: <Calendar size={18} /> },
        { id: 6, name: "Payment", icon: <CreditCard size={18} /> },
    ]

    const handleStepClick = (stepId) => {
        if (stepId <= currentStep && onStepClick) {
            onStepClick(stepId)
        }
    }

    return (
        <div className="breadcrumbs">
            {steps.map((step, index) => {
                const isActive = step.id === currentStep
                const isCompleted = step.id < currentStep
                const isLast = index === steps.length - 1

                return (
                    <React.Fragment key={step.id}>
                        <div className={`breadcrumb-item ${isActive ? "active" : ""} ${isCompleted ? "completed" : ""}`} onClick={() => handleStepClick(step.id)}>
                            <div className="breadcrumb-icon">{step.icon}</div>
                            <span className="breadcrumb-text">{step.name}</span>
                        </div>

                        {!isLast && <div className={`breadcrumb-connector ${isCompleted ? "completed" : ""}`}></div>}
                    </React.Fragment>
                )
            })}
        </div>
    )
}
