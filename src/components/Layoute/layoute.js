import {NavLink, Outlet} from "react-router-dom";


const Layoute = () => {

    return (
        <>
            <header>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/lecture"> Lecture </NavLink>
                <NavLink to="/student"> Student </NavLink>
                <NavLink to="/admin"> Admin </NavLink>
            </header>
            <main>
                <Outlet/>
            </main>
        </>
    )
}
export {Layoute}

