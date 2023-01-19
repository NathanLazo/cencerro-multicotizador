import Image from "next/image";
import LogoImage from '@images/logo.png'
import Link from "next/link";

const Logo: React.FC = () => {
    return (
        <>
            <Link href="/" className="-m-1.5 p-1.5">
                <div className="w-16 h-14">
                    <span className="sr-only">Your Company</span>
                    <Image src={LogoImage} alt="Logo Grupo Arce" />
                </div>
            </Link>
        </>
    )
}

export default Logo;