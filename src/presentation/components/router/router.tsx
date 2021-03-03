import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { SignUp } from "@/presentation/pages";

type Props = {
    makeLogin: React.FC;
};

const Router: React.FC<Props> = ({ makeLogin }: Props) => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/login" component={makeLogin} />
                <Route exact path="/signup" component={SignUp} />
            </Switch>
        </BrowserRouter>
    );
};

export default Router;
