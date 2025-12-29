import type { BlogType } from "./blog";

export type PublicAuthorType = {
    id:string;
    name: string | null;
    image: string | null;
    bio: string | null;      
    about: string | null;  
    joinedAt: string;      
    blogs: BlogType[];
}