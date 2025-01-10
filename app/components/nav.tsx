import Link from "next/link"

export function NavBar() {
    return (
        <nav className="">
            <div className = 'mb-16'>
                <Link href='/' className = 'px-2'> Home </Link>
                <Link href='/experience' className = 'px-2'> Experience </Link>
                <Link href='/projects' className = 'px-2'> Projects </Link>
                <Link href='/blog' className = 'px-2' > Blog </Link>
            </div>
        </nav>
    )
}