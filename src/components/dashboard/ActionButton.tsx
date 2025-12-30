
export default function ActionButton({label}:{label:string}){

    return(
        <button className="px-3 py-2 rounded-md border bg-muted hover:bg-muted/70 text-sm">
            {label}
        </button>
    );

}