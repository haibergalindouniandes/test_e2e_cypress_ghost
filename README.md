# Integrantes

| Nombre | email |
| --------- | --------- |
| Haiber Humberto Galindo Sanchez | h.galindos@uniandes.edu.co |
| Jhon Fredy Guzmán Caicedo | Jf.guzmanc1@uniandes.edu.co |
| Jorge Mario Carrillo Riveros | jm.carrillo@uniandes.edu.co |
| Edgar Ariel Salamanca Camargo | ea.salamanca@uniandes.edu.co |

# Pruebas Automatizadas E2E Implementando Estrategias De Generación Datos 
## Aplicación Ghost (Version 5.22.10)
Este proyecto permite realizar pruebas automatizadas de extremo a extremo de la aplicación Ghost, haciendo uso del API de Automatización Cypress (https://www.cypress.io/) y para la generación de datos se implementan las estrategias de Pool de datos a-priori, Pool de datos (pseudo) aleatorio dinámico y Escenario aleatorio.

## Escenarios de prueba 
El proyecto cuenta con una suite de pruebas principal que tiene 8 escenarios de prueba automatizadas y cada uno cuenta con sus sub-escenarios de pruebas implementando las diferentes estrategias de generación de datos mencionadas anteriormente. A continuación, se detalla la información de las pruebas a realizar:

### Funcionalidades 

| Funcionalidades a probar | 
| ----- |
| Members |
| Pages |
| Posts |
| Staff |
| Login |

### Escenarios 

| **ID** | **Escenario** | **Descripción** |
| --- | --- | --- |
| 01 | Invitar personas| Escenario que realiza el envió de la invitación a unirse a un correo aleatorio.  |
| 02 | Crear nuevo miembro | Escenario que realiza la creación de un miembro con información aleatoria. |
| 03 | Editar miembro| Escenario que realiza la modificación del primer miembro que se encuentre en el listado de miembros con información aleatoria. |
| 04 | Cambiar password | Escenario que realiza el cambio de password del usuario administrador de la aplicación. |
| 05 | Crear Post | Escenario que realiza la creación de un nuevo post con información aleatoria y lo deja en estado borrador. |
| 06 | Modificar post | Escenario que realiza la modificación de un post existente con información aleatoria. |
| 07 | Crear página | Escenario que realiza la creación de una página con información aleatoria. |
| 08 | Modificar página | Escenario que realiza la modificación de una página existente con información aleatoria. |

### Estrategias de generación de datos
- **Pool de datos a-priori:** el proyecto cuenta con un archivo llamado `index.js` que le permitirá generar los archivos `Accounts.json`, `schemaCreatePage.json` y `Pages.json`, los cuales contienen datos aleatorios y que serán utilizados para la realización de las pruebas. Estos archivos seran geneados en la carpeta `./cypress/fixtures/`.
- **Pool de datos (pseudo) aleatorio dinámico:** para esta estrategia se hará uso del API de generación de datos aleatorios Mockaroo (https://mockaroo.com/), y se lanzará cada vez que se ejecute un escenario de prueba.
- **Escenario aleatorio:** para la generación de datos online se hará uso de la librería Faker (https://fakerjs.dev/) que permitirá ir generando datos aleatorios a medida que sean solicitados.


En el siguiente documento podrá encontrar la información más detallada acerca de las pruebas realizadas, su objetivo, resultado esperado y estrategia de generación de datos utilizada. 

[EscenariosDePruebasAutomatizacionGhost.xlsx](https://github.com/haibergalindouniandes/test_e2e_cypress_ghost/files/10100519/EscenariosDePruebasAutomatizacionGhost.xlsx)


## Estructura de carpetas
La estructura interna de la aplicación a nivel de carpetas y su finalidad es la siguiente:

![estructura_cypress](https://user-images.githubusercontent.com/111403006/202925080-6934f77b-ef1a-4c76-af9b-6cddbe4651e7.png)

**cypress:** Carpeta contenedora de las funcionalidades de Cypress.
-	**fixtures:** Donde se guarda los archivos que se usaran en los mocks, pueden ser imágenes, videos, txt etc.
-	**integration:** Donde se guarda los archivos que se usaran en los mocks, pueden ser imágenes, videos, txt etc.
<br>* **PageObjects**:  Carpeta que contiene las clases necesarias para hacer la abstracción de los elementos a utilizar de una página. Ej: `login.js`
<br>* **step-definitions**:  Carpeta que contiene los test de pruebas automatizados. Ej: `createPage.spec.js`
-	**screenshots**: Carpeta que contiene el registro de screenshots generados por la ejecución de las pruebas.

**support:** Carpeta que contiene todos los archivos JS con las funcionalidades utilitarias que necesita el proyecto. Ej: `utils.js`
 

## Instalación y configuración
Para utilizar hacer uso del test de pruebas de la aplicación Ghost, se deben seguir los siguientes pasos:
- Obtenga el código fuente del repositorio: haga clic en Descargar como Zip y descomprima la carpeta en su máquina o clone el repositorio en su ambiente local.
- Instalar los módulos requeridos: Usando Node Package Manager (https://www.npmjs.com/), run `npm install` en la carpeta raíz; esto instalara los módulos de Cypress CLI y otras dependencias necesarias para el correcto funcionamiento del proyecto, como lo es el módulo de faker (https://www.npmjs.com/package/faker) y node-fetch (https://www.npmjs.com/package/node-fetch). En caso de que ya tenga instalado Cypress, es mejor evitar instalarlo nuevamente en esta carpeta; puede realizar la instalación de dependencias de forma independiente, para esto ejecuta los comandos: `npm install faker`, `npm install node-fetch`.
- Configure las propiedades de la aplicación: La carpeta support contiene el archivo `utils.js`, el cual brinda los siguientes parámetros que se pueden modificar: 
![configuracion](https://user-images.githubusercontent.com/111403006/202923217-749b4cb7-9a46-4934-babe-0a0621aa0309.png)
<br>* Modifique los puertos en los parámetros **siteUrl**, **Url**, **dashboardPage**, **staffPage** y **memberPage**, de acuerdo al puerto que Ghost está usando en su máquina.
<br>* Modifique los parámetros **emaiLogin**, **passwordLogin** de acuerdo a los valores que estableció para crear su cuenta de Ghost.
<br>* Modifique el parámetro **newPassword** con una contraseña valida que cumpla los requerimientos de Ghost, para que la contraseña actual pueda ser actualizada por la nueva contraseña. Para este ejercicio puede establecer el parámetro **newPassword** igual que su actual contraseña (**passwordLogin**) 

## Ejecución
- Una vez realizada la configuración del archivo `utils.js` se debe en primera instancia generar los Datapools a priori `Accounts.json`, `schemaCreatePage.json` y `Pages.json`, para lo cual a través de la terminal y estando en la raíz del proyecto, debe ejecutar el siguiente comando `node index.js`, esto generara los archivos en la carpeta `./cypress/fixtures/`. 
- Ya teniendo los archivos creados con datos aleatorios en la terminal ejecute el siguiente comando: `./node_modules/.bin/cypress run`, que lanzara la ejecucion de las diferentes pruebas de extremo a extremo que se encuentren en la carpeta `./cypress/integration/step-definitions`.
- Si requiere lanzar la ejecución de una prueba en particular ejecute el siguiente comando:
`./node_modules/.bin/cypress run --spec "ruta<step>"`, por ejemplo: ./node_modules/.bin/cypress run --spec "cypress/integration/step-definitions/01_invitePeople.spec.js"

## Resultados
Cuando finalice la ejecución de la prueba, se generará en la carpeta `videos` un video de la ejecución de las diferentes pruebas ejecutadas y adicional a esto se genera en la carpeta `./cypress/screenshots` los pantallazos tomados durante este proceso de pruebas automatizadas.
