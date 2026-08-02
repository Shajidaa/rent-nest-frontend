import Navbar from "@/components/ui/shared/Navbar"
import { getMe } from "@/service/getMe";


export default async function Layout
({children}:{children:React.ReactNode}){
     const user= await getMe();

    
    return (
        <>
        <Navbar {...user} />
        {children}
        </>
    )
}
