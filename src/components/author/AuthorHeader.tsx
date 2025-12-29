import { Pick } from "@prisma/client/runtime/library";
import Image from "next/image";
import type { PublicAuthorType } from "@/types/author";

type Props = {
    author : Pick<PublicAuthorType , "name" | "image" | "bio" | "createdAt">;
}

export default function AuthorHeader({author}:Props){
    return (
        <section className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        <Image
            src={author.image || "/avatar-placeholder.png"}
            alt={author.name || "Author avatar"}
            width={96}
            height={96}
            className="rounded-full object-cover"
        />

        <div className="space-y-1">
            <h1 className="text-2xl font-bold">
            {author.name ?? "Anonymous Author"}
            </h1>

            {author.bio && (
            <p className="text-sm text-muted-foreground max-w-md">
                {author.bio}
            </p>
            )}

            <p className="text-xs text-muted-foreground">
            Writing since{" "}
            {new Date(author.createdAt).toLocaleDateString()}
            </p>
        </div>
        </section>
    );
}