import Navbar from "@/components/ui/shared/Navbar"
import NavTopBar from "@/components/ui/shared/NavTopBar";
import Footer from "@/components/ui/shared/Footer";
import { getMe } from "@/service/getMe";


export default async function Layout
    ({ children, modal }: { children: React.ReactNode, modal: React.ReactNode; }) {
    //  const user= await getMe();


    return (
        <>
            {/* <Navbar {...user} /> */}
            <NavTopBar />
            {children}
            {modal}
            <Footer />
        </>
    )
}
