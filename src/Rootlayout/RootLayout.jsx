import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Nav from "../Navbar/Nav"

export default function RootLayout (){
    return(<>
    <Nav/>
    <main>
        <Outlet/>
    </main>
    <Footer/>
    </>);
}