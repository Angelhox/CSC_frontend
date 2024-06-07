/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import "../../scss/commons/forms.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { TfiSaveAlt } from "react-icons/tfi";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { contratoSchema } from "../../validations/contrato-schema";
import { GrServices } from "react-icons/gr";
import { IoLocationOutline } from "react-icons/io5";
type Inputs = {
  codigo: string;
  fecha: string;
  estado: string;
  medidorSn: string;
  barrio: string;
  callePrincipal: string;
  calleSecundaria: string;
  numeroCasa: string;
  referencia: string;
  principalSn: string;
  // serviciosCompartidos:string;
};
export function Form() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(contratoSchema) });
  console.log(errors);
  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
      className="Formulario"
    >
      <div className="content">
        {/* Primer nombre */}
        <div className="input-group type-google">
          <input type="date" placeholder="" id="fecha" {...register("fecha")} />
          <label htmlFor="fecha">Fecha del contrato</label>
          {errors.fecha?.message && <p>{errors.fecha.message}</p>}
        </div>
        <div className="input-group type-google">
          <input
            type="text"
            placeholder=""
            id="codigo"
            required
            {...register("codigo")}
          />
          <label htmlFor="codigo">Código del contrato</label>
          {errors.codigo?.message && <p>{errors.codigo?.message}</p>}
        </div>

        <div className="input-group type-google">
          <input
            type="text"
            placeholder=""
            id="principalSn"
            required
            {...register("principalSn")}
          />
          <label htmlFor="principalSn">Número de contrato</label>
          {errors.principalSn?.message && <p>{errors.principalSn.message}</p>}
        </div>
        <div className="input-group type-google">
          <input
            type="text"
            placeholder=""
            id="estado"
            required
            {...register("estado")}
          />
          <label htmlFor="estado">Estado del contrato</label>
          {errors.estado?.message && <p>{errors.estado.message}</p>}
        </div>
        <div className="input-group type-google">
          <input
            type="text"
            placeholder=""
            id="medidorSn"
            required
            {...register("medidorSn")}
          />
          <label htmlFor="medidorSn">Contrato con medidor</label>
          {errors.medidorSn?.message && <p>{errors.medidorSn.message}</p>}
        </div>
        <div className="input-group type-google">
          <input
            type="text"
            placeholder=""
            id="barrio"
            required
            {...register("barrio")}
          />
          <label htmlFor="barrio">Barrio</label>
          {errors.barrio?.message && <p>{errors.barrio.message}</p>}
        </div>
        <div className="divider">
          <p>Ubicación</p>
          <IoLocationOutline />
        </div>
        <div className="input-group type-google">
          <input
            type="text"
            placeholder=""
            id="callePrincipal"
            {...register("callePrincipal")}
          />
          <label htmlFor="callePrincipal">Calle principal</label>
          {errors.callePrincipal?.message && (
            <p>{errors.callePrincipal.message}</p>
          )}
        </div>
        <div className="input-group type-google">
          <input
            type="text"
            placeholder=""
            id="calleSecundaria"
            {...register("calleSecundaria")}
          />
          <label htmlFor="calleSecundaria">Calle secundaria</label>
          {errors.calleSecundaria?.message && (
            <p>{errors.calleSecundaria.message}</p>
          )}
        </div>
        <div className="input-group type-google">
          <input
            type="text"
            placeholder=""
            id="numeroCasa"
            {...register("numeroCasa")}
          />
          <label htmlFor="numeroCasa">Número de casa</label>
          {errors.numeroCasa?.message && <p>{errors.numeroCasa.message}</p>}
        </div>
        <div className="input-group type-google">
          <input
            type="text"
            placeholder=""
            id="referencia"
            required
            {...register("referencia")}
          />
          <label htmlFor="referencia">Referencia</label>
          {errors.referencia?.message && <p>{errors.referencia.message}</p>}
        </div>
        <div className="divider">
          <p>Servicios disponnibles</p>
          <GrServices />
        </div>
      </div>
      <div className="buttons">
        <button type="submit">
          {" "}
          <TfiSaveAlt />
          Guardar
        </button>
        <button className="cancel">
          <MdOutlineCancelPresentation />
          Cancelar
        </button>
      </div>
    </form>
  );
}
