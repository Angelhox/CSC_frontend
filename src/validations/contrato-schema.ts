import { z } from "zod";
const estadoContrato = ["Activo", "Innactivo"] as const;
const estadoMedidor = ["Si", "No"] as const;
export const contratoSchema =  z.object({
  socioId: z.preprocess((val) => {
    if (typeof val === "string") {
      return parseFloat(val);
    }
    return val;
  }, z.number({ invalid_type_error: "Ingresa un número válido" }).positive({ message: "Ingresa un número válido" }).min(1, { message: "Ingresa un número válido" }).int("Ingresa un número entero")),
  codigo: z
    .string()
    .min(6, { message: "Debes ingresar mínimo 6 caracteres" })
    .max(6, { message: "Debes ingresar un máximo de 6 caracteres" }),
  fecha: z
    .string()
    .refine((dob) => new Date(dob).toString() !== "Invalid Date", {
      message: "Debes ingresar una fecha válida",
    }),
  estado: z.enum(estadoContrato, {
    errorMap: () => ({ message: "Debes ingresar un estado válido" }),
  }),
  medidorSn: z.enum(estadoMedidor, {
    errorMap: () => ({ message: "Ingresa un estado de medidor válido" }),
  }),
  barrio: z
    .string()
    .min(3, { message: "Debes ingresar un mínimo de 3 caracteres" })
    .max(45, { message: "Ingresa un m+aximo de 45 caracteres" }),
  callePrincipal: z.optional(
    z.string().max(45, { message: "Debes ingresar un máximo de 45 caracteres" })
  ),
  calleSecundaria: z.optional(
    z.string().max(45, { message: "Debes ingresar un máximo de 45 caracteres" })
  ),
  numeroCasa: z.optional(
    z
      .string()

      .max(10, { message: "Ingresa un máximo de 10 caracteres" })
  ),
  referencia: z
    .string()
    .min(2, { message: "Ingresa un mínimo de 2 caracteres" })
    .max(45, { message: "Ingresa un máximo de 45 caracteres" }),
});
