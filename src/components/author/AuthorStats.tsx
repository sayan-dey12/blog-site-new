import type { BlogType } from "@/types/blog";
import { RedirectType } from "next/navigation";

type Props = {
    blogs : BlogType[];
}


export default function AuthorStats({blogs}:Props){
    const totalBlogs = blogs.length;
    const totalViews = blogs.reduce((acc,b)=>acc + b.views, 0);
    
    return(
        <section className="flex justify-center sm:justify-start gap-6 text-sm text-muted-foreground">
        <span>
            <strong className="text-foreground">{totalBlogs}</strong> Blogs
        </span>
        <span>
            <strong className="text-foreground">{totalViews}</strong> Views
        </span>
        </section>
    );
}