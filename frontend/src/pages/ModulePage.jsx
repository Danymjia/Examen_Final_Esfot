import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getAll, create, remove, update } from "../services/entityService";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

export default function ModulePage() {
  const { entity } = useParams();
  const [data, setData] = useState([]);
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [materiasList, setMateriasList] = useState([]);
  const [estudiantesList, setEstudiantesList] = useState([]);

  const getEntityFields = (ent) => {
    switch (ent) {
      case "materia":
        return [
          { name: "nombre", label: "Nombre", type: "text" },
          { name: "codigo", label: "Código", type: "text" },
          { name: "descripcion", label: "Descripción", type: "text" },
          { name: "creditos", label: "Créditos", type: "number" },
        ];
      case "estudiante":
        return [
          { name: "nombre", label: "Nombre", type: "text" },
          { name: "apellido", label: "Apellido", type: "text" },
          { name: "cedula", label: "Cédula", type: "text" },
          { name: "fecha_nacimiento", label: "Fecha Nacimiento", type: "date" },
          { name: "ciudad", label: "Ciudad", type: "text" },
          { name: "direccion", label: "Dirección", type: "text" },
          { name: "telefono", label: "Teléfono", type: "tel" },
          { name: "email", label: "Email", type: "email" },
        ];
      case "matricula":
        return [
          { name: "codigo", label: "Código", type: "text" },
          { name: "descripcion", label: "Descripción", type: "text" },
          { name: "creditos", label: "Créditos", type: "number" },
          {
            name: "materia",
            label: "Materia",
            type: "select",
            options: materiasList,
          },
          {
            name: "estudiante",
            label: "Estudiante",
            type: "select",
            options: estudiantesList,
          },
        ];
      default:
        return [{ name: "nombre", label: "Nombre", type: "text" }];
    }
  };

  const fields = getEntityFields(entity);

  const [formData, setFormData] = useState(() => {
    const initial = {};
    fields.forEach((f) => (initial[f.name] = ""));
    return initial;
  });

  const loadData = async () => {
    try {
      const res = await getAll(entity);
      const dataArray = Array.isArray(res)
        ? res
        : res?.data || Object.values(res).find(Array.isArray) || [];
      setData(dataArray);

      if (entity === "matricula") {
        try {
          const matRes = await getAll("materia");
          setMateriasList(
            Array.isArray(matRes)
              ? matRes
              : matRes?.data || Object.values(matRes).find(Array.isArray) || [],
          );
        } catch (e) {
          console.error(e);
        }

        try {
          const estRes = await getAll("estudiante");
          setEstudiantesList(
            Array.isArray(estRes)
              ? estRes
              : estRes?.data || Object.values(estRes).find(Array.isArray) || [],
          );
        } catch (e) {
          console.error(e);
        }
      }
    } catch (error) {
      toast.error("Error al cargar datos");
    }
  };

  useEffect(() => {
    loadData();
    resetForm();
  }, [entity]);

  const resetForm = () => {
    const initial = {};
    getEntityFields(entity).forEach((f) => (initial[f.name] = ""));
    setFormData(initial);
    setIsSubmitAttempted(false);
    setEditingId(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsSubmitAttempted(true);

    const isEmpty = fields.some(
      (f) => !formData[f.name] || formData[f.name].toString().trim() === "",
    );
    if (isEmpty) {
      toast.warning("Todos los campos son obligatorios.");
      return;
    }

    try {
      if (editingId) {
        await update(entity, editingId, formData);
        toast.success("Registro actualizado!");
      } else {
        await create(entity, formData);
        toast.success("Registro agregado!");
      }

      resetForm();
      loadData();
    } catch (error) {
      toast.error(
        editingId ? "Error al actualizar" : "Error al guardar el registro",
      );
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id || item._id);
    const itemData = {};
    fields.forEach((f) => {
      if (f.type === "date" && item[f.name]) {
        itemData[f.name] = item[f.name].split("T")[0];
      } else if (
        f.type === "select" &&
        item[f.name] &&
        typeof item[f.name] === "object"
      ) {
        itemData[f.name] = item[f.name]._id || item[f.name].id || "";
      } else {
        itemData[f.name] = item[f.name] || "";
      }
    });
    setFormData(itemData);
    setIsSubmitAttempted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este registro?")) {
      try {
        await remove(entity, id);
        toast.info("Registro eliminado");
        if (editingId === id) resetForm();
        loadData();
      } catch (error) {
        toast.error("Error al eliminar");
      }
    }
  };

  const getEntityIconSVG = (entityStr) => {
    switch (entityStr) {
      case "estudiante":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="var(--primary)"
            viewBox="0 0 16 16"
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          </svg>
        );
      case "materia":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="var(--success)"
            viewBox="0 0 16 16"
          >
            <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.8158 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
          </svg>
        );
      case "matricula":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="var(--warning)"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M4.5 3a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 3a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 3a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3z" />
          </svg>
        );
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="var(--secondary)"
            viewBox="0 0 16 16"
          >
            <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" />
          </svg>
        );
    }
  };

  return (
    <div
      className="min-vh-100"
      style={{ backgroundColor: "var(--background)" }}
    >
      <Navbar />

      <div className="container pb-5 pt-3">
        <div className="glass-panel p-4 mb-5 d-flex flex-wrap justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <div
              className="bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm"
              style={{ width: "56px", height: "56px" }}
            >
              {getEntityIconSVG(entity)}
            </div>
            <div>
              <h2 className="text-capitalize fw-bold mb-0">
                Gestión de {entity}s
              </h2>
              <p className="text-muted mb-0 mt-1">
                Administra los registros y asignaciones en tiempo real
              </p>
            </div>
          </div>
          <Link
            to="/dashboard"
            className="btn btn-glass mt-3 mt-md-0 text-dark"
            style={{ border: "1px solid rgba(0,0,0,0.1)" }}
          >
            <span className="me-2">&larr;</span> Volver al inicio
          </Link>
        </div>

        <div className="row g-4">
          <div className="col-lg-4">
            <div className="premium-card p-4 h-100">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0 d-flex align-items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill={editingId ? "var(--warning)" : "var(--primary)"}
                    viewBox="0 0 16 16"
                  >
                    {editingId ? (
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    ) : (
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    )}
                  </svg>
                  {editingId ? `Editar Registro` : `Nuevo Registro`}
                </h5>
                {editingId && (
                  <button
                    className="btn btn-sm btn-light text-muted"
                    onClick={resetForm}
                  >
                    Cancelar
                  </button>
                )}
              </div>
              <div className="d-flex flex-column gap-3 mb-4">
                {fields.map((f) => (
                  <div key={f.name}>
                    <label
                      className="form-label text-muted fw-semibold small text-uppercase"
                      style={{ letterSpacing: "0.05em" }}
                    >
                      {f.label}
                    </label>
                    {f.type === "select" ? (
                      <select
                        name={f.name}
                        className={`form-select form-control-premium ${
                          isSubmitAttempted
                            ? formData[f.name] &&
                              formData[f.name].toString().trim() !== ""
                              ? "border-success"
                              : "border-danger"
                            : ""
                        }`}
                        value={formData[f.name] || ""}
                        onChange={handleChange}
                      >
                        <option value="">Seleccione una opción...</option>
                        {f.options &&
                          f.options.map((opt) => (
                            <option
                              key={opt.id || opt._id}
                              value={opt.id || opt._id}
                            >
                              {`${opt.nombre || opt.descripcion || opt.codigo || ""} ${opt.apellido || ""}`.trim() ||
                                opt._id}
                            </option>
                          ))}
                      </select>
                    ) : (
                      <input
                        type={f.type}
                        name={f.name}
                        className={`form-control-premium ${
                          isSubmitAttempted
                            ? formData[f.name] &&
                              formData[f.name].toString().trim() !== ""
                              ? "border-success"
                              : "border-danger"
                            : ""
                        }`}
                        placeholder={`Ej: ${f.label}...`}
                        value={formData[f.name] || ""}
                        onChange={handleChange}
                        onKeyUp={(e) => e.key === "Enter" && handleSubmit()}
                      />
                    )}
                  </div>
                ))}

                {isSubmitAttempted &&
                  fields.some(
                    (f) =>
                      !formData[f.name] ||
                      formData[f.name].toString().trim() === "",
                  ) && (
                    <div className="text-danger small d-flex align-items-center gap-1 mt-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
                      </svg>
                      Todos los campos son obligatorios.
                    </div>
                  )}
              </div>

              <button
                className={`btn-premium w-100 mt-2 ${editingId ? "bg-warning text-dark" : ""}`}
                onClick={handleSubmit}
                style={
                  editingId
                    ? {
                        border: "none",
                        boxShadow: "0 4px 12px rgba(245, 158, 11, 0.25)",
                      }
                    : {}
                }
              >
                {editingId ? "Actualizar" : "Guardar"}
              </button>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="premium-card p-0 h-100 overflow-hidden">
              <div
                className="p-4 border-bottom d-flex align-items-center justify-content-between"
                style={{ backgroundColor: "rgba(244, 246, 250, 0.5)" }}
              >
                <h5 className="fw-bold mb-0 text-dark">Registros Actuales</h5>
                <span className="badge-soft-primary">{data.length} ítems</span>
              </div>

              <div className="table-responsive">
                <table className="table-premium">
                  <thead>
                    <tr>
                      <th># ID</th>
                      {fields.map((f) => (
                        <th key={f.name}>{f.label}</th>
                      ))}
                      <th className="text-end" style={{ minWidth: "100px" }}>
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length === 0 ? (
                      <tr>
                        <td
                          colSpan={fields.length + 2}
                          className="text-center py-5 text-muted"
                        >
                          <div className="d-flex flex-column align-items-center justify-content-center py-4">
                            <svg
                              className="mb-3 opacity-50"
                              xmlns="http://www.w3.org/2000/svg"
                              width="48"
                              height="48"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M4.53 1.056c.71-1.42 2.766-1.42 3.477 0l2.42 4.842h-8.85l2.422-4.842zM.5 7v7.5A1.5 1.5 0 0 0 2 16h12a1.5 1.5 0 0 0 1.5-1.5V7H.5zm3.5 3a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1zm0 2a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1zM6 10a.5.5 0 1 1 0 1h4a.5.5 0 1 1 0-1H6zm0 2a.5.5 0 1 1 0 1h4a.5.5 0 1 1 0-1H6z" />
                            </svg>
                            <p className="mb-0 fw-medium">
                              No hay datos registrados aún.
                            </p>
                            <small className="opacity-75 mt-1">
                              Usa el formulario lateral para comenzar a agregar
                              items.
                            </small>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      data.map((item, index) => (
                        <tr
                          key={item.id || item._id || index}
                          style={
                            editingId === (item.id || item._id)
                              ? { backgroundColor: "rgba(245, 158, 11, 0.05)" }
                              : {}
                          }
                        >
                          <td>
                            <span className="font-monospace text-muted small bg-light px-2 py-1 rounded border">
                              {String(item.id || item._id).substring(0, 8) ||
                                "N/A"}
                            </span>
                          </td>
                          {fields.map((f) => {
                            let val = item[f.name];
                            if (val && typeof val === "object") {
                              val =
                                val.nombre ||
                                val.codigo ||
                                val.descripcion ||
                                val._id ||
                                val.id ||
                                "Ref Obj";
                            }
                            return (
                              <td
                                key={f.name}
                                className="fw-semibold text-dark text-nowrap"
                              >
                                {val}
                              </td>
                            );
                          })}
                          <td className="text-end text-nowrap">
                            <button
                              className="btn btn-sm btn-outline-warning me-2"
                              style={{ borderRadius: "6px" }}
                              onClick={() => handleEdit(item)}
                              title="Editar"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                              >
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                              </svg>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              style={{ borderRadius: "6px" }}
                              onClick={() => handleDelete(item.id || item._id)}
                              title="Eliminar"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                              >
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                <path
                                  fillRule="evenodd"
                                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                />
                              </svg>
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
  );
}
