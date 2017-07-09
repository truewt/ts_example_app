# TypeScript Example Application

Error debug procedure:
- `git clone https://github.com/truewt/ts_example_app.git`
- `cd ts_example_app && npm install`
- open project in vscode
- change mysql settings in `src/example-app.ts` in `createConnection`
- start debug session
- send the following request via curl ...
```
curl -X POST \
  http://localhost:3000/restapi/user \
  -H 'content-type: application/json' \
  -d '{
	"name": "Testing User",
	"username": "test",
	"password": "testinguser",
	"email": "test@domain.tld"
}'
```
- you should get back this error:
```
{
    "name": "CustomRepositoryCannotInheritRepositoryError",
    "message": "Custom entity repository UserRepository  cannot inherit Repository class without entity being set in the @EntityRepository decorator.",
    "stack": "
      CustomRepositoryCannotInheritRepositoryError: Custom entity repository UserRepository  cannot inherit Repository class without entity being set in the @EntityRepository decorator.
        at new CustomRepositoryCannotInheritRepositoryError (/path/to/ts-example-app/src/error/CustomRepositoryCannotInheritRepositoryError.ts:8:9)
        at EntityManager.getCustomRepository (/path/to/ts-example-app/src/entity-manager/EntityManager.ts:849:23)
        at Connection.getCustomRepository (/path/to/ts-example-app/src/connection/Connection.ts:296:29)
        at Object.value (/path/to/src/decorators/OrmCustomRepository.ts:18:31)
        at /path/to/ts-example-app/src/Container.ts:214:37
        at Array.map (native)
        at Function.Container.initializeParams (/path/to/ts-example-app/src/Container.ts:211:27)
        at Function.Container.get (/path/to/ts-example-app/src/Container.ts:94:47)
        at /path/to/ts-example-app/src/Container.ts:217:34
        at Array.map (native)
    "
}
```
