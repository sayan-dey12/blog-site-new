export default function StatsCard({title , value}:{title:string, value:number}){
    return(
        <div className="p-4 rounded-lg border bg-background">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-xl font-bold">{value}</p>
        </div>
    );
}