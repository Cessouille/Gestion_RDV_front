interface Disponibilite {
    date: string,
    debut: number,
    fin: number,
}

interface User {
    id: number;
    name: string;
    metier: string;
    description: string;
    rating: number;
    domainePrincipal: string;
    prixConsultation: number;
    telephone: string;
    avatar: string;
    subscribed: boolean;
}

interface Reply {
    id: number,
    name: string,
    content: string,
    datePubli: Date,
}

interface Profile {
    firstname: string;
    lastname: string;
    fullname: string;
    profilePicture: string;
}

interface Post {
    id?: number;
    name: string;
    datePubli: Date;
    content: string;
    nbLike: number;
    liked: boolean;
    nbReplies: number;
    replies: Reply[];
}

interface Review {
    id?: number;
    name: string;
    datePubli: Date;
    content: string;
    rate: number;
    thumbed: boolean | null;
}

interface Doctor {
    id: number;
    name: string;
    metier: string;
    description: string;
    rating: number;
    domainePrincipal: string;
    prixConsultation?: number;
    telephone?: string;
    avatar: string;
    subscribed?: boolean;
}

interface Doctors {
    name: string;
    doctors: Doctor[];
}

export { Disponibilite, User, Reply, Profile, Post, Review, Doctor, Doctors };