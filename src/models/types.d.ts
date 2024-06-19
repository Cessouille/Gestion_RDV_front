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
    domainePrincipal: string,
    prixConsultation: number,
    telephone: string,
    avatar: string
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

interface Doctor {
    id: number;
    name: string;
    metier: string;
    domainePrincipal: string;
    description: string;
    avatar: string;
    rating: string;
}

interface Doctors {
    name: string;
    doctors: Doctor[];
}

export { Disponibilite, User, Reply, Profile, Post, Doctor, Doctors };