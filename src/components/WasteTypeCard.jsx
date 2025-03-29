import React from 'react'
import { Home, Building2, Leaf, Building } from "lucide-react";

export const WasteTypeCard = ({ type, isSelected, toggleWasteType }) => {
    return (
        <div className={`waste-type-card ${isSelected(type) ? "selected" : ""}`} onClick={() => toggleWasteType(type)}>
            <div className="card-icon">
                {type === "household" && <Home size={24} />}
                {type === "construction" && <Building2 size={24} />}
                {type === "garden" && <Leaf size={24} />}
                {type === "commercial" && <Building size={24} />}
            </div>
            <div className="card-body">
                <h2>Household Waste</h2>
                <p className="card-description text-sm">General household items and furniture</p>

                <div className="examples-section">
                    <p className="examples-title">Examples:</p>
                    <ul className="examples-list">
                        <li className="example-item text-sm">Furniture</li>
                        <li className="example-item text-sm">Appliances</li>
                        <li className="example-item text-sm">Garden waste</li>
                        <li className="example-item text-sm">General household items</li>
                    </ul>
                </div>
                <div className="checkbox">
                    <input type="checkbox" checked={isSelected(type)} onChange={() => { }} />
                </div>
            </div>
        </div>
    )
}
