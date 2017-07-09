import "reflect-metadata";

import { Container } from "typedi";

import { ExampleApp } from "./example-app";

const exampleApp = Container.get(ExampleApp);
exampleApp.start();