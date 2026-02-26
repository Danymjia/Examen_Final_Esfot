import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };
    return (

   <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm mb-4">
     <div className="container">
       <Link
         className="navbar-brand fw-bold d-flex align-items-center gap-2"
         to="/dashboard"
       >Sistema de Matrículas
       </Link>
       <div className="d-flex">
         <button
           className="btn btn-light text-primary fw-bold shadow-sm transition-hover"
           onClick={handleLogout}
         >Cerrar Sesión
         </button>
       </div>
     </div>
   </nav>
);
}