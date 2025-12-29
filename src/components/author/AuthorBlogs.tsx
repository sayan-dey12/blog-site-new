import { BlogCard } from "../blog/blog-card";
import type { BlogType } from "@/types/blog";

type Props = {
    blogs : BlogType[];
}

export default function AuthorBlogs({blogs}:Props){
    return(
        <section className="space-y-4">
            <h2 className="text-lg font-semibold">Blogs</h2>
            {blogs.length === 0 ? 
                (<p className="text-sm text-muted-foreground">No blogs published yet.</p>
                ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {blogs.map((blog,i)=>(
                        <BlogCard key={blog.id} blog={blog} index={i}/>
                    ))}
                </div>
                )
            }
        </section>
    );
}