# Motion Hub API 🎬
 
<div align=center>
  <img src="https://github.com/rodrigomolter/MotionHub-API/assets/57466763/4be77745-14d9-4716-952e-0822c229b576">

  It's a simple API where you can store the details of your videos, like title, description and duration.<br>
  It uses `in-memory database`. It means it will only store data while running and when you stop the application **all data will be lost**.
</div>


## Docs 📋
You can check the API Documentation while running the application on<br>

**http://localhost:3333/documentation**

Or enter the [swagger.yaml](./src/swagger.yaml) in the [SwaggerEditor](https://editor-next.swagger.io/)


## Test Plan 👨‍🔬
The avaiable **Test Plans** for the application are located here: <br>
**[🎬 Motion Hub API Testing Plans](https://dynamic-keeper-66c.notion.site/Motion-Hub-fe69d08e0e23419baf06ceeb23e669c9)**

Postman Collection: <br>
[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://god.gw.postman.com/run-collection/29423847-32dbbd61-03d0-4847-b921-d91967c92396?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D29423847-32dbbd61-03d0-4847-b921-d91967c92396%26entityType%3Dcollection%26workspaceId%3D72d946be-8169-4862-9d2d-4817608871b6)


## Installation 🏗️
To run this project you will need

- [Node.js](https://nodejs.org/en/) (I've used version `v18.17.1` while writing this doc)

**Note:** When installing Node.js, npm is automatically installed. 🚀

Run to install the dev dependencies
```bash
npm install
```


Start the API with the command
```bash
npm run start
```

## Running the tests ✔️

In this project, you can run tests in interactive and headless mode

### Headless mode </>

Run `npm test` (or `npm t` for short) to run all tests in headless mode.
```bash
npm test
```

### Interactive mode 🕹️

Run `npm run cy:open` to open the __Cypress App__ to run tests in interactive mode.
```bash
npm run cy:open
```

## Support this project 🙌

If you want to support this project, leave a ⭐.

___

Made with love 🧡 by [Rodrigo Molter](https://www.linkedin.com/in/rodrigo-molter/)
