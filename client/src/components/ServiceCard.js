import "./ServiceCard.sass"

function ServiceCard({ service }) {
    return (
        <div className="service-card">
            <h3>{service.name}</h3>
            <p>Описание: {service.description}</p>
            <p>Примеры работ: {service.examples}</p>
            <p>Отделка: {service.finishing}</p>
            <p>Цена: {service.price} руб.</p>
        </div>
    )
}

export default ServiceCard