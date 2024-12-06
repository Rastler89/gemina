import { Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { AuthLocal } from "../Services/AuthLocal";

interface LoginProps<T> {
    setLogged: (token: T) => void;
}

const Login: React.FC<LoginProps<string>> = ({setLogged}) => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if(email==="Gemina" && password === "test") {
            AuthLocal.setToken("123456");
            setLogged('yes');
        }
    }

    return (
        <Container maxWidth="sm">
            <Typography variant="h5" gutterBottom>
                Iniciar Sesión
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="email"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Contraseña"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Iniciar sesión
                </Button>
            </form>
        </Container>
    )
}

export default Login;