
import { FaLinkedin, FaGithub } from "react-icons/fa";
import Link from "next/link";


export function Footer() {
    return (
        <nav>
            <div className='flex mt-16'>
                <Link href='https://www.linkedin.com/in/oliver-ramirez04/' target="_blank" className='px-6'>
                    <FaLinkedin className = 'scale-150'/> 
                </Link>
                <Link href='https://github.com/oliverRamirez4' target="_blank"  className='px-6 flex'>
                    <FaGithub className = 'scale-150' /> 
                </Link>

            </div>

        </nav>
    )
}