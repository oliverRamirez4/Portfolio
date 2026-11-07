'use client'
import Link from "next/link"

export function NavBar() {
    return (
        <nav className="">
            <div className = 'mb-16 flex flex-row'>
                <div className = "font-black text-3xl">
                    OLIVER RAMIREZ
                </div>
                <Link href='/' className = 'px-2'> Home </Link>
                <Link href='/resume' className = 'px-2'> Resume </Link>
                <Link href='/projects' className = 'px-2'> Projects </Link>
            </div>
        </nav>
    )
}
