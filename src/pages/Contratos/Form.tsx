/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import "../../scss/commons/forms.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { TfiSaveAlt } from "react-icons/tfi";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { contratoSchema } from "../../validations/contrato-schema";
import { GrServices } from "react-icons/gr";
import { IoLocationOutline } from "react-icons/io5";
import { IoManOutline } from "react-icons/io5";
import { LiaFileContractSolid } from "react-icons/lia";
import {
  IContrato,
  IContratoSocio,
  dataContratosTable,
} from "../../Interfaces/Contratos/contratos.interface";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { UseContratosContext } from "../../context/contratos.context";
import { createContrato } from "../../api/Contratos/contratos.service";
import useSubmitForm from "../../api/commons/useSubmitForm";
import {
  SearchBar,
  optionSearchBar,
} from "../../components/SearchBar/SearchBar";
import { UseSocios } from "../../context/socios.context";
import { fechaActual } from "../../functions/commons/fechas";
type Inputs = {
  socioId: number | string;
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
interface IFormProps {
  data?: dataContratosTable | null;
  returnForm?: () => void;
}
export function Form({ data, returnForm }: IFormProps) {
  const { socios } = UseSocios();
  const { reloadRecords } = UseContratosContext();
  const [options, setOptions] = useState<optionSearchBar[]>();
  useEffect(() => {
    if (socios) {
      setOptions(
        socios.map((socio) => ({
          value: socio.id,
          label: `${socio.primerApellido} ${socio.segundoApellido} ${socio.primerNombre} ${socio.segundoNombre} ${socio.cedulaPasaporte}`,
          header: `${socio.primerApellido} ${socio.segundoApellido} ${socio.primerNombre} (${socio.barrio})`,
          subtitle: socio.cedulaPasaporte,
          text: socio.correo,
          data: socio,
        }))
      );
    }
  }, [socios]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(contratoSchema) });
  console.log(errors);
  useEffect(() => {
    if (data !== null) {
      console.log("Data isnt null");
      Object.keys(new Object(data)).forEach((key) => {
        setValue(key as keyof Inputs, (data as any)[key]);
      });
    } else {
      console.log("Resetting values");
      reset(undefined, { keepDefaultValues: false });
      setValue("fecha", fechaActual());
    }
  }, [data, reset, setValue]);
  const {
    handleSubmit: handleSubmitWithSubmit,
    error,
    isSubmitting,
  } = useSubmitForm<IContrato>({
    onSubmit: async (values) => {
      const action = data ? createContrato : createContrato;
      await action(values)
        .then(() => {
          const message = data ? "Actualizaste" : "Creaste";
          toast.success(`¡${message} un socio con éxito!`, {
            className: "notify-success",
          });
          reloadRecords();
          returnForm
            ? returnForm()
            : reset(undefined, { keepDefaultValues: false });
          setValue("fecha", fechaActual());
        })
        .catch((error) => {
          toast.error(error.message, { className: "notify-error" });
        });
    },
  });
  const onSubmit = (formData: Inputs) => {
    handleSubmitWithSubmit(formData);
  };
  const handleCancel = () => {
    console.log("Handle cancel");
    reset(undefined, { keepDefaultValues: false });
    setValue("fecha", fechaActual());
  };
  const handleChange = (option: any) => {
    setValue("socioId", option.value);
    console.log("Select option: ", option);
    return option.value;
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="Formulario">
      <div className="content">
        <div className="divider">
          <p>Socio</p>
          <IoManOutline />
        </div>
        {/*Selector de socios*/}
        <div className="input-group search-bar">
          <SearchBar
            options={options}
            placeholder="Selecciona un socio"
            // handleChange={handleChange}
            control={control}
            name="socioId"
          />
          {errors.socioId?.message && <p>{errors.socioId.message}</p>}
        </div>
        <div className="divider">
          <p>Contrato</p>
          <LiaFileContractSolid />
        </div>
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
