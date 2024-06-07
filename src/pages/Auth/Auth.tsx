/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid, GridColumn, GridRow, Image } from "semantic-ui-react";
import "./Auth.scss";
import {
  logoNameWhite,
  siluetComunity,
  siluetGoals,
  siluetPiggy,
  siluetServidor,
} from "../../assets";
import { useState } from "react";
import { LoginForm } from "../../components/Auth/LoginForm/LoginForm";
import { AuthOptions } from "../../components/Auth/AuthOptions/AuthOptions";

export function Auth() {
  const [typeForm, setTypeForm] = useState<string>("");
  const openLogin = (): void => {
    setTypeForm("login");
  };
  const goBack = (): void => {
    setTypeForm("");
  };
  const renderForm = (): JSX.Element => {
    if (typeForm === "login") {
      return <LoginForm goBack={goBack} />;
    }
    return <AuthOptions openLogin={openLogin} />;
  };
  return (
    <div className="Auth">
      <Grid columns={3} stackable divided>
        <GridRow>
          <GridColumn width={5} className="images-space">
            <Image
              src={siluetServidor}
              className="solutions"
              size="huge"
              verticalAlign="bottom"
            />
            <div>
              <Image
                src={siluetGoals}
                className="solutions"
                size="medium"
                verticalAlign="bottom"
                floated="left"
              />
              <h2>Seguridad</h2>
            </div>
            <div>
              <Image
                src={siluetPiggy}
                className="solutions"
                size="medium"
                verticalAlign="top"
                floated="right"
              />
              <h2>Confianza</h2>
            </div>
          </GridColumn>
          <GridColumn width={6} className="content-space">
            <div className="content">
              <Image src={logoNameWhite} alt="CSC" className="content-logo" />
              {renderForm()}
            </div>
          </GridColumn>
          <GridColumn width={5} className="slogan-space">
            <Image src={siluetComunity} className="solutions" size="massive" />
          </GridColumn>
        </GridRow>
      </Grid>
    </div>
  );
}
