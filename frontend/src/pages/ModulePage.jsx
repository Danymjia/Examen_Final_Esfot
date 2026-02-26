import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getAll, create, remove } from "../services/entityService";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

export default function ModulePage() {
  const { entity } = useParams();
  const [data, setData] = useState([]);
  const [nombre, setNombre] = useState("");
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);

  const isNombreValid = nombre.trim().length >= 3;

  const loadData = async () => {
    try {
      const res = await getAll(entity);
      setData(res.data);
    } catch (error) {
      toast.error("Error al cargar datos");
    }
  };

  useEffect(() => {
    loadData();
    setNombre("");
    setIsSubmitAttempted(false);
  }, [entity]);

  const handleCreate = async () => {
    setIsSubmitAttempted(true);
    if (!isNombreValid) {
      toast.warning(
        `Ingrese un nombre válido para ${entity} (mínimo 3 letras).`,
      );
      return;
    }
    await create(entity, { nombre: nombre.trim() });
    toast.success("Registro agregado!");
    setNombre("");
    setIsSubmitAttempted(false);
    loadData();
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este registro?")) {
      await remove(entity, id);
      toast.info("Registro eliminado");
      loadData();
    }
  };

  return (
    <div className="bg-light min-vh-100">
      <Navbar />

      <div className="container pb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="text-capitalize fw-bold text-secondary mb-0">
              Gestión de {entity}
            </h2>
            <p className="text-muted">Agrega o remueve registros del sistema</p>
          </div>
          <Link to="/dashboard" className="btn btn-outline-secondary">
            &larr; Volver
          </Link>
        </div>

        <div className="row">
          <div className="col-lg-4 mb-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h5 className="card-title text-primary mb-3 fw-bold">
                  Nuevo Registro
                </h5>
                <div className="mb-3">
                  <label className="form-label text-muted">
                    Nombre del {entity}
                  </label>
                  <input
                    type="text"
                    className={`form-control mb-3 ${
                      isSubmitAttempted
                        ? isNombreValid
                          ? "is-valid"
                          : "is-invalid"
                        : ""
                    }`}
                    placeholder={`Ej: Matemáticas...`}
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    onKeyUp={(e) => e.key === "Enter" && handleCreate()}
                  />
                  {isSubmitAttempted && !isNombreValid && (
                    <div className="invalid-feedback d-block mb-3 mt-0">
                      El nombre debe tener al menos 3 caracteres.
                    </div>
                  )}
                  <button
                    className="btn btn-primary w-100 text-uppercase fw-bold transition-hover"
                    onClick={handleCreate}
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover table-striped mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="px-4 py-3 text-secondary"># ID</th>
                        <th className="px-4 py-3 text-secondary">
                          Nombre / Descripción
                        </th>
                        <th className="px-4 py-3 text-end text-secondary">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length === 0 ? (
                        <tr>
                          <td
                            colSpan="3"
                            className="text-center py-5 text-muted"
                          >
                            No hay datos registrados aún.
                          </td>
                        </tr>
                      ) : (
                        data.map((item) => (
                          <tr key={item.id} className="align-middle">
                            <td className="px-4 fw-bold text-muted">
                              {item.id}
                            </td>
                            <td className="px-4 fw-semibold text-dark">
                              {item.nombre}
                            </td>
                            <td className="px-4 text-end">
                              <button
                                className="btn btn-outline-danger btn-sm transition-hover"
                                onClick={() => handleDelete(item.id)}
                              >
                                Eliminar
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
