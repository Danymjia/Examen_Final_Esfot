import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { toast } from "react-toastify";

export default function Login() {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();

const handleLogin = async (e) => {
e.preventDefault();
if (!email || !password) {
     toast.warning("Todos los campos son obligatorios");
     return;
}

    try {
        const data = await login(email, password);
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
    } catch (error) {
        toast.error("Credenciales incorrectas");
    }
}


    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

