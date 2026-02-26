import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { toast } from "react-toastify";
import LightPillar from "../components/LightPillar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);
  const navigate = useNavigate();

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 4;

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitAttempted(true);

    if (!isEmailValid || !isPasswordValid) {
      toast.warning("Por favor, corrige los errores en el formulario.");
      return;
    }

    try {
      const res = await login(email, password);
      localStorage.setItem("token", res.token);
      toast.success("Inicio de sesión exitoso");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Credenciales incorrectas");
    }
  };

  const getValidationClass = (isValid) => {
    if (!isSubmitAttempted) return "";
    return isValid ? "is-valid" : "is-invalid";
  };

  return (
    <div className="login-bg d-flex justify-content-center align-items-center min-vh-100 position-relative overflow-hidden">
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <LightPillar
          topColor="#5227FF"
          bottomColor="#FF9FFC"
          intensity={1}
          rotationSpeed={0.3}
          glowAmount={0.002}
          pillarWidth={3}
          pillarHeight={0.4}
          noiseIntensity={0.5}
          pillarRotation={25}
          interactive={false}
          mixBlendMode="screen"
          quality="high"
        />
      </div>
      <div
        className="card shadow-lg border-0 glass-effect p-4 p-md-5 w-100 mx-3 position-relative"
        style={{
          maxWidth: "450px",
          zIndex: 1,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="text-center mb-4">
          <h3 className="fw-bold text-dark">Login</h3>
          <p className="text-muted">Ingresa tus credenciales para continuar</p>
        </div>

        <form onSubmit={handleLogin} noValidate>
          <div className="form-floating mb-3">
            <input
              type="email"
              className={`form-control ${getValidationClass(isEmailValid)}`}
              id="floatingEmail"
              placeholder="nombre@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="floatingEmail">Correo Electrónico</label>
            <div className="invalid-feedback">
              Ingresa un correo con formato válido (ej. juan@gmail.com).
            </div>
          </div>

          <div className="form-floating mb-4">
            <input
              type="password"
              className={`form-control ${getValidationClass(isPasswordValid)}`}
              id="floatingPassword"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="floatingPassword">Contraseña</label>
            <div className="invalid-feedback">
              La contraseña debe tener al menos 4 caracteres.
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fs-5 fw-bold shadow-sm transition-hover"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}
