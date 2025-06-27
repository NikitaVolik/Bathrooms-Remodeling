import ServiceCard from "./ServiceCard"
import "./ServiceList.sass"

function ServiceList({ services }) {
    return (
        <div className="service-list">
            {services.map(service => (
                <ServiceCard key={service._id} service={service} />
            ))}
        </div>
    )
}

export default ServiceList