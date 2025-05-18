import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Nav from "../Navbar/Nav"
import AIChat from "../Component/AIChat";

export default function RootLayout (){
    return(<>
    <Nav/>
    <main>
        <Outlet/>
    </main>
    <AIChat/>
    <Footer/>
    </>);
}