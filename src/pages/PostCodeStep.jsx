import { useState } from "react"
import { TitleGroup } from "../components/TitleGroup"

export const PostcodeStep = ({ onSubmit, initialData }) => {
    const [isExpanded, setIsExpanded] = useState(!!initialData.postcode)
    const [formData, setFormData] = useState({
        postcode: initialData.postcode || "",
        city: initialData.city || "",
        streetName: initialData.streetName || "",
        houseNumber: initialData.houseNumber || "",
    })
    const [suggestions, setSuggestions] = useState([])

    const allSuggestions = ["LE10 1SH"]

    const handlePostcodeChange = (e) => {
        const value = e.target.value
        setFormData({
            ...formData,
            postcode: value,
        })

        if (value) {
            const filteredSuggestions = allSuggestions.filter((s) =>
                s.toLowerCase().startsWith(value.toLowerCase())
            )
            setSuggestions(filteredSuggestions)
        } else {
            setSuggestions([])
        }

        if (value.toUpperCase() === "LE10 1SH") {
            setFormData({
                postcode: value,
                city: "Hinckley",
                streetName: "Ashby Road",
                houseNumber: "197",
            })
            setIsExpanded(true)
        }
    }

    const handleSuggestionClick = (suggestion) => {
        setFormData({
            ...formData,
            postcode: suggestion,
        })
        setSuggestions([])

        if (suggestion.toUpperCase() === "LE10 1SH") {
            setFormData({
                postcode: suggestion,
                city: "Hinckley",
                streetName: "Ashby Road",
                houseNumber: "197",
            })
            setIsExpanded(true)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
    }

    const handlePostcodeKeyDown = (e) => {
        if (e.key === "Enter" && !isExpanded) {
            e.preventDefault()
            if (formData.postcode.toUpperCase() === "LE10 1SH") {
                setFormData({
                    postcode: formData.postcode,
                    city: "Hinckley",
                    streetName: "Ashby Road",
                    houseNumber: "197",
                })
                setIsExpanded(true)
            } else if (formData.postcode) {
                setIsExpanded(true)
            }
        }
    }

    return (
        <div className="postcode-step">
            <TitleGroup />

            <form onSubmit={handleSubmit} className="address-form">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Enter your postcode or address"
                        value={formData.postcode}
                        onChange={handlePostcodeChange}
                        onKeyDown={handlePostcodeKeyDown}
                        className="postcode-input"
                    />
                    {formData.postcode && (
                        <button
                            type="button"
                            className="clear-button"
                            onClick={() => {
                                setFormData({
                                    postcode: "",
                                    city: "",
                                    streetName: "",
                                    houseNumber: "",
                                })
                                setSuggestions([])
                                setIsExpanded(false)
                            }}
                        >
                            ×
                        </button>
                    )}
                </div>

                {suggestions.length > 0 && (
                    <ul className="suggestions-dropdown">
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="suggestion-item"
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}

                {isExpanded && (
                    <>
                        <div className="form-group">
                            <label>City</label>
                            <input type="text" name="city" value={formData.city} onChange={handleInputChange} />
                        </div>

                        <div className="form-group">
                            <label>Street Name</label>
                            <input type="text" name="streetName" value={formData.streetName} onChange={handleInputChange} />
                        </div>

                        <div className="form-group">
                            <label>House/Flat Number</label>
                            <input type="text" name="houseNumber" value={formData.houseNumber} onChange={handleInputChange} />
                        </div>

                        <button type="submit" className="continue-button">
                            Continue <span className="arrow">→</span>
                        </button>
                    </>
                )}
            </form>

            <div className="version">Version 1.0.32</div>
        </div>
    )
}
