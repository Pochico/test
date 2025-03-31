"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useAppState } from "../context/AppStateContext"
import "../styles/ChooseDateStep.css"

export const ChooseDateStep = ({ onBackClick, onContinue, initialDate = null, requiresPermit = false }) => {
    const { actions } = useAppState()
    const [selectedDate, setSelectedDate] = useState(initialDate || null)
    const [currentMonth, setCurrentMonth] = useState(new Date())

    const today = new Date()
    const minDate = requiresPermit ? new Date(today.setDate(today.getDate() + 5)) : new Date()

    useEffect(() => {
        if (initialDate) {
            setSelectedDate(initialDate)
        }
    }, [initialDate])

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate()
    }

    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay()
    }

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
    }

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
    }

    const handleDateSelect = (day) => {
        const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
        setSelectedDate(newDate)
    }

    const handleContinue = () => {
        actions.setDeliveryDate(selectedDate)
        onContinue(selectedDate)
    }

    const handleStepClick = (stepId) => {
        if (stepId < 5) {
            onBackClick(stepId)
        }
    }

    // Generar el calendario
    const renderCalendar = () => {
        const year = currentMonth.getFullYear()
        const month = currentMonth.getMonth()
        const daysInMonth = getDaysInMonth(year, month)
        const firstDay = getFirstDayOfMonth(year, month)

        const monthNames = [
            "enero",
            "febrero",
            "marzo",
            "abril",
            "mayo",
            "junio",
            "julio",
            "agosto",
            "septiembre",
            "octubre",
            "noviembre",
            "diciembre",
        ]

        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

        // Crear array de días para el mes actual
        const days = []
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(year, month, i)
            const isWeekend = date.getDay() === 0 || date.getDay() === 6 // 0 es domingo, 6 es sábado
            const isDisabled = date < minDate || isWeekend
            const isSelected =
                selectedDate &&
                date.getDate() === selectedDate.getDate() &&
                date.getMonth() === selectedDate.getMonth() &&
                date.getFullYear() === selectedDate.getFullYear()

            days.push({ day: i, disabled: isDisabled, selected: isSelected, isWeekend })
        }

        const blanks = []
        for (let i = 0; i < firstDay; i++) {
            blanks.push({ day: null, disabled: true })
        }

        const totalSlots = [...blanks, ...days]

        return (
            <div className="calendar">
                <div className="calendar-header">
                    <button className="month-nav" onClick={handlePrevMonth}>
                        <ChevronLeft size={20} />
                    </button>
                    <h3>
                        {monthNames[month]} de {year}
                    </h3>
                    <button className="month-nav" onClick={handleNextMonth}>
                        <ChevronRight size={20} />
                    </button>
                </div>

                <div className="calendar-days">
                    {dayNames.map((day) => (
                        <div key={day} className="day-name">
                            {day}
                        </div>
                    ))}

                    {totalSlots.map((slot, index) => (
                        <div
                            key={index}
                            className={`day-slot ${!slot.day ? "empty" : ""} ${slot.disabled ? "disabled" : ""} ${slot.selected ? "selected" : ""} ${slot.isWeekend ? "weekend" : ""}`}
                            onClick={() => slot.day && !slot.disabled && handleDateSelect(slot.day)}
                        >
                            {slot.day}
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="choose-date-step max-width-container">
            <h1 className="title">Choose Your Delivery Date</h1>
            <p className="subtitle">
                Select your preferred skip delivery date. We'll aim to deliver between 7am and 6pm on your chosen day.
            </p>

            {renderCalendar()}

            <div className="buttons-container">
                <button className="back-button" onClick={() => onBackClick(4)}>
                    Back
                </button>
                <button className="continue-button" disabled={!selectedDate} onClick={handleContinue}>
                    Continue to Payment
                </button>
            </div>
        </div>
    )
}

