export const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,50}$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/;
export const codiceFiscaleRegex = /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/i;
export const dataNascitaregex =
  /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
export const numeroTelefonoRegex = /^[0-9]{10}$/;
export const fotoRegex = /\.(png|jpg|jpeg|bmp|tif|tiff)$/i;
export const indirizzoRegex = /^[A-zÀ-ù ‘-]{2,30}$/;
export const indirizzoStudioRegex = /^[A-zÀ-ù ‘-]{2,30}$/;
export const numeroTelefonoStudioRegex = /^\d{10}$/;
