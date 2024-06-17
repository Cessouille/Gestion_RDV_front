interface Disponibilite {
    date: string,
    debut: number,
    fin: number,
}

interface Profile {
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

interface Reply {
    id: number,
    name: string,
    description: string
}

interface BubbleMessageParam {
    name: string;
    datePubli: Date;
    content: string;
    nbLike: number;
    nbComments: number;
    liked: boolean;
    thumbed: boolean | null;
}

interface User {
    name: string;
}

export { Disponibilite, Profile, Reply, BubbleMessageParam, User };