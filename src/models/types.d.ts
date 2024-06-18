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

interface Reply {
    id: number,
    name: string,
    description: string
}

interface Profile {
    name: string;
    profilePicture: string;
}

interface Post {
    id?: number;
    name: string;
    datePubli: Date;
    content: string;
    nbLike: number;
    liked: boolean;
    thumbed: boolean | null;
}

export { Disponibilite, User, Reply, Profile, Post };