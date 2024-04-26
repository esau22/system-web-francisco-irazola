export interface Usuario {
  id: number;
  user: string;
  email: string;
  password: string;
  confirmPassword: string;
  rol: string;
}

export function validateUsuario(data: Usuario): string | null {
  if (data.id <= 0) {
    return "El Id no puede estar vacío";
  }
  if (!data.user.trim()) {
    return "El Usuario no puede estar vacío";
  }
  if (!data.email.trim()) {
    return "El Email no puede estar vacío";
  }
  if (data.password.length < 3) {
    return "La contraseña debe tener al menos 3 caracteres";
  }
  if (data.password !== data.confirmPassword) {
    return "Las contraseñas no coinciden";
  }
  if (!data.confirmPassword.trim()) {
    return "La confirmación de la contraseña no puede estar vacía";
  }
  if (!data.rol.trim()) {
    return "El Rol no puede estar vacío";
  }
  return null; // Retorna null si no hay errores de validación
}
