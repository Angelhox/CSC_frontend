/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import "../../scss/commons/forms.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { TfiSaveAlt } from "react-icons/tfi";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { BiMessageSquareAdd } from "react-icons/bi";
import { servicioSchema } from "../../validations/servicio-schema";
import { useState } from "react";
import { UseServiciosContext } from "../../context/servicios.context";
import { useSubmit } from "react-router-dom";
import useSubmitForm from "../../api/commons/useSubmitForm";
import { IServicios } from "../../Interfaces/Servicios/servicios.interface";
import { createServicio } from "../../api/Servicios/servicio.service";
type Inputs = {
  nombre: string;
  descripcion: string;
  tipo: string;
  aplazableSn: string;
  valoresDistintosSn: string;
  individualSn: string;
  fechaCreacion: string;
  valor: number;
  numeroPagos: number;
  valorPagos: number;
  // serviciosCompartidos:string;
};
export function Form() {
  const { reloadRecords } = UseServiciosContext();
  const [aplazableState, setAplazableState] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(servicioSchema) });
  console.log(errors);
  function handleSwitchChange() {
    setAplazableState(!aplazableState);
  }
  const {
    handleSubmit: handleSubmitWithSubmit,
    error,
    isSubmitting,
  } = useSubmitForm<IServicios>({
    onSubmit: async (values) => {
      await createServicio(values);
      alert("Servicio created successfully");
      reloadRecords();
    },
  });
  const onSubmit = (data: Inputs) => {
    handleSubmitWithSubmit(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="Formulario">
      <div className="content">
        {/* Primer nombre */}
        <div className="input-group type-google">
          <input
            type="date"
            placeholder=""
            id="fechaCreacion"
            required
            {...register("fechaCreacion")}
          />
          <label htmlFor="fechaCreacion">Fecha de creación</label>
          {errors.fechaCreacion?.message && (
            <p>{errors.fechaCreacion.message}</p>
          )}
        </div>
        <div className="label_radio">
          <input
            type="radio"
            id="Fijo"
            value={"Servicio fijo"}
            {...register("tipo")}
          />
          <label htmlFor="Fijo">Servicio fijo</label>
          <input
            type="radio"
            id="Cuota"
            value={"Cuota"}
            {...register("tipo")}
          />
          <label htmlFor="Cuota">Cuota</label>
          {errors.tipo?.message && <p>{errors.tipo.message}</p>}
        </div>
        <div className="input-group type-google w-100">
          <input
            type="text"
            placeholder=""
            id="nombre"
            required
            {...register("nombre")}
          />
          <label htmlFor="nombre">Nombre</label>
          {errors.nombre?.message && <p>{errors.nombre.message}</p>}
        </div>
        <div className="input-group type-google w-100">
          <input
            type="text"
            placeholder=""
            id="descripcion"
            required
            {...register("descripcion")}
          />
          <label htmlFor="descripcion">Descripción</label>
          {errors.descripcion?.message && <p>{errors.descripcion?.message}</p>}
        </div>

        {/* <div className="input-group type-google">
          <input
            type="text"
            placeholder=""
            id="tipo"
            required
            {...register("tipo")}
          />
          <label htmlFor="tipo">Tipo</label>
          {errors.tipo?.message && <p>{errors.tipo.message}</p>}
        </div> */}

        <div className="input-group type-google">
          <input
            type="number"
            step="any"
            placeholder=""
            id="valor"
            required
            {...register("valor")}
          />
          <label htmlFor="valor">Valor</label>
          {errors.valor?.message && <p>{errors.valor.message}</p>}
        </div>
        {/* <label htmlFor="switch" >
          <input type="checkbox" id="switch" />
          <div className="slider"></div>
        </label> */}
        <div className="input-group type-google">
          <label htmlFor="valoresDistintosSn" className="select">
            Edición
          </label>
          <select
            id="valoresDistintosSn"
            required
            {...register("valoresDistintosSn")}
          >
            <option value="Si">Valores Distintos</option>
            <option value="No">Valores Generales</option>
          </select>
          {errors.valoresDistintosSn?.message && (
            <p>{errors.valoresDistintosSn.message}</p>
          )}
        </div>
        {/* <div className="input-group type-google">
          <input
            type="text"
            placeholder=""
            id="valoresDistintosSn"
            required
            {...register("valoresDistintosSn")}
          />
          <label htmlFor="valoresDistintosSn">Valores distintos</label>
          {errors.valoresDistintosSn?.message && (
            <p>{errors.valoresDistintosSn.message}</p>
          )}
        </div> */}
        {/* <div className="input-group type-google">
          <input
            type="text"
            placeholder=""
            id="individualSn"
            required
            {...register("individualSn")}
          />
          <label htmlFor="individualSn">Aplicación</label>
          {errors.individualSn?.message && <p>{errors.individualSn.message}</p>}
        </div> */}
        <div className="input-group  type-google ">
          <label htmlFor="individualSn" className="select">
            Aplicación
          </label>
          <select id="individualSn" required {...register("individualSn")}>
            <option value="Si">Por Socio</option>
            <option value="No"> Por Contrato</option>
          </select>
          {errors.individualSn?.message && <p>{errors.individualSn.message}</p>}
        </div>
        {/* <div className="input-group type-google">
          <input
            type="text"
            placeholder=""
            id="aplazableSn"
            required
            {...register("aplazableSn")}
          />
          <label htmlFor="aplazableSn">Aplazable</label>
          {errors.aplazableSn?.message && <p>{errors.aplazableSn.message}</p>}
        </div> */}
        <div className="label-switch">
          <label htmlFor="aplazableSn" className="switch">
            {aplazableState ? "Aplazable" : "No aplazable"}
          </label>

          <label htmlFor="switch">
            <input
              type="checkbox"
              id="switch"
              {...register("aplazableSn")}
              checked={aplazableState}
              onClick={handleSwitchChange}
            />
            <div className="slider"></div>
          </label>
          {errors.aplazableSn?.message && <p>{errors.aplazableSn.message}</p>}
        </div>

        <div className="divider">
          <p>Adicionales</p>
          <BiMessageSquareAdd />
        </div>
        <div className="input-group type-google">
          <input
            type="number"
            placeholder=""
            id="numeroPagos"
            required
            {...register("numeroPagos")}
          />
          <label htmlFor="numeroPagos">Número de pagos</label>
          {errors.numeroPagos?.message && <p>{errors.numeroPagos.message}</p>}
        </div>
        <div className="input-group type-google">
          <input
            type="number"
            step="any"
            placeholder=""
            id="valorPagos"
            required
            {...register("valorPagos")}
          />
          <label htmlFor="valorPagos">Valor de los pagos</label>
          {errors.valorPagos?.message && <p>{errors.valorPagos.message}</p>}
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
