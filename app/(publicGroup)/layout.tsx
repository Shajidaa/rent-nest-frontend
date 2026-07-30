import Navbar from "@/components/ui/shared/Navbar"
import { getMe } from "@/service/getMe";


export default async function Layout
({children}:{children:React.ReactNode}){
     const user= await getMe();
    // console.log(user);
// const {name,email}=user?.data?.profile;
// console.log(name,email);

    
    return (
        <>
        <Navbar {...user} />
        {children}
        </>
    )
}
