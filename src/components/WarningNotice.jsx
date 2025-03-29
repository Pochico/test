import { AlertTriangle } from "lucide-react"

export const WarningNotice = ({ title, body }) => {
    return (
        <div className="warning-notice">
            <div className="notice-icon">
                <AlertTriangle size={24} color="#FFB800" />
            </div>
            <div className="notice-content">
                <h3>{title}</h3>
                <p>{body}</p>
            </div>
        </div>
    )
}