import Link from "next/link";

export default function LinkButton({ href, children, className } : { href:string; children:React.ReactNode; className?: string}){
    return (
        <Link href={href} className={`block w-full p-[10px] rounded-[10px] bg-primary text-white text-[16px] text-center ${className ?? ""}`}>
            {children}
        </Link>
    )
}