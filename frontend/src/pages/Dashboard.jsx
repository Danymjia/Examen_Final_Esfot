import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const modulos = [
    {
      path: "/module/estudiantes",
      nombre: "Estudiantes",
      color: "primary",
      desc: "Gestión de los alumnos",
    },
    {
      path: "/module/materias",
      nombre: "Materias",
      color: "success",
      desc: "Asignaturas disponibles",
    },
    {
      path: "/module/matriculas",
      nombre: "Matrículas",
      color: "warning",
      desc: "Asignación materia-alumno",
    },
  ];

  return (
    <div>
      <Navbar />
      <h1>Dashboard</h1>
      {modulos.map((modulo) => (
        <Link key={modulo.path} to={modulo.path}>
          {modulo.nombre}
        </Link>
      ))}
    </div>
  );
}
