export const obtUsuarioStorage = () => {
    try {
        return JSON.parse(localStorage.getItem('perfil'));
    } catch (error) {
        return null;
    }
}

export const almacenarUsuarioStorage = (profile) => {
    return localStorage.setItem('perfil', JSON.stringify(profile));
}