import { useEffect, useState } from "react";
import { Label } from "../../components/Label";
import { Input } from "../../components/Input";
import { useAuthStore, useForm } from "../../hooks";
import Swal from "sweetalert2";

const loginFormField = {
    loginEmail: '',
    loginPassword: ''
}

const registerFormField = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerConfirmPassword: ''
}

export const AuthPage = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const { startLogin, errorMessage } = useAuthStore();
    const { loginPassword, loginEmail, onInputChange: onLoginInputChange } = useForm(loginFormField);
    const { registerName, registerEmail, registerPassword, registerConfirmPassword, onInputChange: onRegisterInputChange } = useForm(registerFormField);

    const onLoginSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        startLogin({ email: loginEmail, password: loginPassword });
    }

    const onRegisterSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
    }
    useEffect(() => {
        if (errorMessage != null || errorMessage !== undefined) {
            Swal.fire('Error en la autenticacion', errorMessage, "error")
        }
    }, [errorMessage])
    return (
        <main className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="relative w-full max-w-4xl h-[500px] bg-white rounded-xl overflow-hidden shadow-2xl">
                <div className="relative w-full h-full flex">
                    <div
                        className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out transform ${isLogin
                            ? "translate-x-0 opacity-100"
                            : "-translate-x-full opacity-0"
                            }`}
                    >
                        <article className="flex flex-col justify-center h-full p-8 md:p-14">
                            <h1 className="font-semibold text-2xl mb-3">Inicio de sesión</h1>
                            <span className="font-medium text-sm text-gray-500">
                                Inicia sesión para acceder a tus actividades
                            </span>
                            <form onSubmit={onLoginSubmit} className="py-4">
                                <div className="flex flex-col space-y-3">
                                    <Label htmlFor="email">Correo Electrónico</Label>
                                    <Input
                                        type="email"
                                        id="email"
                                        placeholder="correo electrónico"
                                        name="loginEmail"
                                        value={loginEmail}
                                        onChange={onLoginInputChange}
                                    />
                                    <Label htmlFor="password">Contraseña</Label>
                                    <Input
                                        type="password"
                                        id="password"
                                        placeholder="contraseña"
                                        name="loginPassword"
                                        value={loginPassword}
                                        onChange={onLoginInputChange}
                                    />
                                    <button
                                        type="submit"
                                        className="w-full px-4 py-4 mt-4 text-white bg-gray-900 rounded-md hover:bg-gray-700 transition-colors"
                                    >
                                        Iniciar Sesión
                                    </button>
                                </div>
                            </form>
                            <span
                                onClick={() => setIsLogin(false)}
                                className="text-gray-600 text-xs cursor-pointer hover:underline"
                            >
                                ¿No tienes una cuenta? Regístrate aquí!
                            </span>
                        </article>
                    </div>

                    <div
                        className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out transform ${isLogin
                            ? "translate-x-full opacity-0"
                            : "translate-x-0 opacity-100"
                            }`}
                    >
                        <article className="flex flex-col justify-center h-full p-8 md:p-14">
                            <h1 className="font-semibold text-2xl mb-3">Registro</h1>
                            <span className="font-medium text-sm text-gray-500">
                                Crea tu cuenta para comenzar
                            </span>
                            <form onSubmit={onRegisterSubmit} className="py-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                        <Label htmlFor="name">Nombre de usuario</Label>
                                        <Input
                                            type="text"
                                            id="name"
                                            placeholder="nombre de usuario"
                                            name="registerName"
                                            value={registerName}
                                            onChange={onRegisterInputChange}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="email">Correo Electrónico</Label>
                                        <Input
                                            type="email"
                                            id="email"
                                            placeholder="correo electrónico"
                                            name="registerEmail"
                                            value={registerEmail}
                                            onChange={onRegisterInputChange}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="password">Contraseña</Label>
                                        <Input
                                            type="password"
                                            id="password"
                                            placeholder="contraseña"
                                            name="registerPassword"
                                            value={registerPassword}
                                            onChange={onRegisterInputChange}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="passwordConfirm">
                                            Confirmar contraseña
                                        </Label>
                                        <Input
                                            type="password"
                                            id="passwordConfirm"
                                            placeholder="confirmar contraseña"
                                            name="registerConfirmPassword"
                                            value={registerConfirmPassword}
                                            onChange={onRegisterInputChange}
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full px-4 py-4 mt-4 text-white bg-gray-900 rounded-md hover:bg-gray-700 transition-colors"
                                >
                                    Registrar
                                </button>
                            </form>
                            <span
                                onClick={() => setIsLogin(true)}
                                className="text-gray-600 text-xs cursor-pointer hover:underline"
                            >
                                ¿Ya tienes una cuenta? Inicia sesión aquí!
                            </span>
                        </article>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AuthPage;
