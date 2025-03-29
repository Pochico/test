import { Info } from "lucide-react"

export const InfoNotice = ({ title, body }) => {
    return (
        <div className="info-notice">
            <div className="info-icon">
                <Info size={24} color="#3B82F6" />
            </div>
            <div className="info-content">
                <h3>{title}</h3>
                <p>{body}</p>
            </div>
        </div>
    )
}