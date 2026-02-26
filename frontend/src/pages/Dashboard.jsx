import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const modulos = [
    {
      path: "/module/estudiante",
      nombre: "Estudiantes",
      colorClass: "gradient-primary",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
        </svg>
      ),
      desc: "Gestión de estudiantes",
    },
    {
      path: "/module/materia",
      nombre: "Materias",
      colorClass: "gradient-success",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.8158 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
        </svg>
      ),
      desc: "Materias",
    },
    {
      path: "/module/matricula",
      nombre: "Matrículas",
      colorClass: "gradient-warning",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
          <path d="M4.5 3a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 3a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 3a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3z" />
        </svg>
      ),
      desc: "Matriculas",
    },
  ];

  return (
    <div
      className="min-vh-100"
      style={{ backgroundColor: "var(--background)" }}
    >
      <Navbar />

      <div className="container py-5">
        <div className="mb-5 text-center">
          <h1 className="fw-bolder mb-3">Administración</h1>
          <p
            className="text-muted fs-5"
            style={{ maxWidth: "600px", margin: "0 auto" }}
          >
            Selecciona el módulo al que deseas ingresar.
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          {modulos.map((modulo) => (
            <div className="col-md-6 col-lg-4" key={modulo.path}>
              <Link
                to={modulo.path}
                className="text-decoration-none h-100 d-block"
              >
                <div className="premium-card p-4 h-100 d-flex flex-column position-relative">
                  <div className={`icon-box-lg ${modulo.colorClass}`}>
                    {modulo.icon}
                  </div>

                  <h3 className="fs-4 mb-2 text-dark">{modulo.nombre}</h3>
                  <p className="text-muted mb-4 flex-grow-1">{modulo.desc}</p>

                  <div
                    className="d-flex align-items-center mt-auto"
                    style={{ color: "var(--primary)", fontWeight: 600 }}
                  >
                    <span>Ingresar al módulo</span>
                    <svg
                      className="ms-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      style={{ transition: "transform 0.2s ease" }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
