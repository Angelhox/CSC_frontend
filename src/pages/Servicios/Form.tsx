/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import "../../scss/commons/forms.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { TfiSaveAlt } from "react-icons/tfi";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { servicioSchema } from "../../validations/servicio-schema";
import { useEffect, useState } from "react";
import { UseServiciosContext } from "../../context/servicios.context";
import useSubmitForm from "../../api/commons/useSubmitForm";
import { IServicios } from "../../Interfaces/Servicios/servicios.interface";
import {
  createServicio,
  deleteServicio,
  updateServicio,
} from "../../api/Servicios/servicio.service";
import { toast } from "sonner";
import { ConfirmDialog } from "../../components/Shared/Dialogs/ConfirmDialog/ConfirmDialog";
import { BiMessageSquareAdd } from "react-icons/bi";
import { fechaActual } from "../../functions/commons/fechas";

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
interface IFormProps {
  data?: IServicios | null;
  returnForm?: () => void;
}
export function Form({ data, returnForm }: IFormProps) {
  const { reloadRecords } = UseServiciosContext();
  const [aplazableState, setAplazableState] = useState(false);
  const [fijoState, setFijoState] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
    watch,
  } = useForm<Inputs>({ resolver: zodResolver(servicioSchema) });
  useEffect(() => {
    if (data !== null) {
      console.log("Data isnt null: ", data);
      if (data?.tipo === "Servicio fijo") {
        setFijoState(true);
      } else {
        setFijoState(false);
      }
      Object.keys(new Object(data)).forEach((key) => {
        setValue(key as keyof Inputs, (data as any)[key]);
      });
    } else {
      console.log("Resetting values");
      reset(undefined, { keepDefaultValues: false });
      setValue("fechaCreacion", fechaActual());
    }
  }, [data, reset, setValue]);

  console.log(errors);

  const {
    handleSubmit: handleSubmitWithSubmit,
    error,
    isSubmitting,
  } = useSubmitForm<IServicios>({
    onSubmit: async (values) => {
      const action = data ? updateServicio : createServicio;
      await action(values, data?.id || "")
        .then(() => {
          const message = data ? "Actualizaste" : "Creaste";
          toast.success(`¡${message} un servicio con éxito!`, {
            className: "notify-success",
          });
          reloadRecords();
          returnForm
            ? returnForm()
            : reset(undefined, { keepDefaultValues: false });
          setValue("fechaCreacion", fechaActual());
        })
        .catch((error) => {
          toast.error(error.message, {
            className: "notify-error",
          });
        });
    },
  });
  const {
    handleSubmit: handleDelete,
    error: deleteError,
    isSubmitting: isDeleting,
  } = useSubmitForm<void>({
    onSubmit: async () => {
      if (data) {
        await deleteServicio(data?.id || "")
          .then(() => {
            toast.success("¡Eliminaste un servicio con éxito!", {
              className: "notify-success",
            });
            reloadRecords();
            returnForm
              ? returnForm()
              : reset(undefined, { keepDefaultValues: false });
            setValue("fechaCreacion", fechaActual());
          })
          .catch((error) => {
            toast.error(error.message, { className: "notify-error" });
          });
      }
    },
  });
  const valoresDistintosOptions = [
    { value: "Si", label: "Valores Distintos" },
    { value: "No", label: "Valores Generales" },
  ];
  const aplazableOptions = [
    { value: "No", label: "No aplazable" },
    { value: "Si", label: "Aplazable" },
  ];

  const individualOptions = [
    { value: "Si", label: "Por Socio" },
    { value: "No", label: "Por Contrato" },
  ];
  const onSubmit = (data: Inputs) => {
    handleSubmitWithSubmit(data);
  };
  // function handleSwitchChange() {
  //   setAplazableState(!aplazableState);
  // }
  const handleChangeTipo = (state: boolean) => {
    if (state) {
      setAplazableState(!state);
      setValue("aplazableSn", "No");
    }
    setFijoState(state);
  };
  const selectAplazable = () => {
    if (getValues("aplazableSn") === "Si") {
      setAplazableState(true);
    } else {
      setAplazableState(false);
    }
  };
  const handleNumeroPagos = () => {
    switch (fijoState) {
      case true:
        setValue("numeroPagos", 1);
        changeNumeroPagosValor();
        console.log("Case 1");
        return true;
      case false:
        console.log("Case 2");
        if (!aplazableState) {
          setValue("numeroPagos", 1);
          changeNumeroPagosValor();
          return true;
        }
        return false;
      default:
        console.log("Case 3");
        return false;
    }
  };
  const handleCancel = () => {
    reset(undefined, { keepDefaultValues: false });
    setValue("fechaCreacion", fechaActual());
  };
  const handleDeleteClick = () => {
    const confirmProps = {
      title: "¿Quieres eliminar este registro?",
      text: "No podras revertir esta acción",
      onConfirm: handleDelete,
      beforeConfirmTitle: "¡Eliminado!",
      beforeConfirmText: "El registro se ha eliminado",
    };
    ConfirmDialog(confirmProps);
  };
  const changeNumeroPagosValor = () => {
    const numeroPagos: number = getValues("numeroPagos");
    const valorTotal: number = getValues("valor");
    console.log("Numero de pagos: ", numeroPagos, valorTotal);
    const valorPagos = valorTotal / numeroPagos;
    setValue("valorPagos", valorPagos);
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
            onClick={() => handleChangeTipo(true)}
            {...register("tipo")}
          />
          <label htmlFor="Fijo">Servicio fijo</label>
          <input
            type="radio"
            id="Cuota"
            value={"Cuota"}
            onClick={() => handleChangeTipo(false)}
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
        <div className="input-group type-google">
          <input
            type="number"
            step="any"
            placeholder=""
            id="valor"
            required
            {...register("valor", { onChange: changeNumeroPagosValor })}
          />
          <label htmlFor="valor">Valor</label>
          {errors.valor?.message && <p>{errors.valor.message}</p>}
        </div>
        <div className="input-group type-google">
          <label htmlFor="valoresDistintosSn" className="select">
            Edición
          </label>
          <select
            id="valoresDistintosSn"
            required
            {...register("valoresDistintosSn")}
          >
            {valoresDistintosOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.valoresDistintosSn?.message && (
            <p>{errors.valoresDistintosSn.message}</p>
          )}
        </div>
        <div className="input-group  type-google ">
          <label htmlFor="individualSn" className="select">
            Aplicación
          </label>
          <select id="individualSn" required {...register("individualSn")}>
            {individualOptions.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.individualSn?.message && <p>{errors.individualSn.message}</p>}
        </div>
        <div className="input-group  type-google ">
          <label htmlFor="aplazableSn" className="select">
            Plazo
          </label>
          <select
            id="aplazableSn"
            required
            {...register("aplazableSn", { onChange: selectAplazable })}
          >
            {aplazableOptions.map((option) => (
              <option
                value={option.value}
                key={option.value}
                disabled={option.value === "Si" && fijoState ? true : false}
              >
                {option.label}
              </option>
            ))}
          </select>
          {errors.aplazableSn?.message && <p>{errors.aplazableSn.message}</p>}
        </div>
        {/* <div className="label-switch">
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
              disabled={fijoState}

            />
            <div className="slider"></div>
          </label>
          {errors.aplazableSn?.message && <p>{errors.aplazableSn.message}</p>}
        </div> */}

        <div className="divider">
          <p>Adicionales</p>
          <BiMessageSquareAdd />
        </div>
        <div className="input-group type-google">
          <input
            type="number"
            placeholder=""
            id="numeroPagos"
            readOnly={handleNumeroPagos()}
            required
            {...register("numeroPagos", {
              onChange: changeNumeroPagosValor,
            })}
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
            readOnly={true}
            {...register("valorPagos")}
          />
          <label htmlFor="valorPagos">Valor de los pagos</label>
          {errors.valorPagos?.message && <p>{errors.valorPagos.message}</p>}
        </div>
      </div>
      <div className="buttons">
        <button type="submit" disabled={isDeleting || isSubmitting}>
          {" "}
          <TfiSaveAlt />
          {data ? "Actualizar" : "Guardar"}
        </button>
        {data && (
          <button
            type="button"
            disabled={isDeleting || isSubmitting}
            onClick={handleDeleteClick}
          >
            Eliminar
          </button>
        )}
        <button
          className="cancel"
          type="button"
          onClick={returnForm || handleCancel}
          disabled={isDeleting || isSubmitting}
        >
          <MdOutlineCancelPresentation />
          Cancelar
        </button>
      </div>
    </form>
  );
}
