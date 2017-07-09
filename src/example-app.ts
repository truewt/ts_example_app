import { createKoaServer, useContainer as useContainerApp } from "routing-controllers";
import * as Koa from "koa";
import * as logger from "koa-logger";
import { createConnection, useContainer as useContainerDb } from "typeorm";
import { useContainer as useContainerVal } from "class-validator";
import { Container, Service } from "typedi";

@Service()
export class ExampleApp {

  private prepareValidator() {
    useContainerVal(Container);
  }

  private async prepareDatabase() {
    useContainerDb(Container);
    return createConnection({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "ts_exampleapp",
      autoSchemaSync: true,
      logging: {
        logOnlyFailedQueries: true,
        logFailedQueryError: true
      },
      entities: [__dirname + "/entities/index.{ts,js}"],
      dropSchemaOnConnection: true
    });
  }

  private async prepareApp() {
    useContainerApp(Container);
    const app: Koa = createKoaServer({
      controllers: [__dirname + "/controllers/index.{ts,js}"],
      routePrefix: "/restapi",
      validation: {
        validationError: {
          target: false,
          value: false
        }
      }
    });
    app.use(logger());

    return Promise.resolve(app);
  }

  async start() {
    try {
      this.prepareValidator();
      await this.prepareDatabase();
      const app = await this.prepareApp();
      app.listen(3000, () => console.log("Example App ready."));
    } catch (e) {
      console.error(e);
    }
  }

}