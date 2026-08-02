import AuthNavbar from "./_component/AuthNavbar";



export default async function Layout
({children}:{children:React.ReactNode}){
 

    
    return (
        <>
        <AuthNavbar />
        {children}
        </>
    )
}
