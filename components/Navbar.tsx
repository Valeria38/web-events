import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
    return (
        <header>
            <nav>
                <Link href={"/"} className="logo">
                    <Image
                        src="/icons/logo.png"
                        alt="Logo"
                        width={24}
                        height={24}
                        className="h-auto w-auto"
                    />
                    <p>DevEvent</p>
                </Link>
                <ul>
                    <Link href={"/"}>Home</Link>
                    <Link href={"/events"}>Events</Link>
                    <Link href={"/create"}>Create event</Link>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
