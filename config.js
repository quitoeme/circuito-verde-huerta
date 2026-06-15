/* Configuración del login con Google (Google Identity Services).
   Usa el MISMO Client ID web que la app de Inventario de Circuito Verde.

   Para que el login funcione en un dominio, ese origen debe estar agregado
   en "Orígenes autorizados de JavaScript" de este Client ID, en
   Google Cloud Console → APIs y servicios → Credenciales. Ej:
     https://planificador-huerta.vercel.app
     http://localhost:5180

   Si googleClientId queda vacío, la app funciona SIN login (abierta). */
window.CV_CONFIG = {
  googleClientId: "459782859327-vgdrimfru185gk9sil491rfdbdofaqqp.apps.googleusercontent.com",
};
