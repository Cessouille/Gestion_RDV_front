interface Disponibilite {
    date: string,
    debut: number,
    fin: number,
}

interface User {
    id: number,
    name: string,
    metier: string,
    description: string,
    rating: number,
    domainePrincipale: string,
    prixConsultation: number,
    phone: string,
    avatar: string,
    subscribers: number,
    subscribed: boolean,
    disponibilites: Disponibilite[]
}

export { Disponibilite, User };