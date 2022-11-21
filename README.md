# Integrantes

| Nombre | email |
| --------- | --------- |
| Haiber Humberto Galindo Sanchez | h.galindos@uniandes.edu.co |
| Jhon Fredy Guzmán Caicedo | Jf.guzmanc1@uniandes.edu.co |
| Jorge Mario Carrillo Riveros | jm.carrillo@uniandes.edu.co |
| Edgar Ariel Salamanca Camargo | ea.salamanca@uniandes.edu.co |

# Pruebas Automatizadas De Extremo A Extremo Con Cypress - Aplicación Ghost (Version 5.22.10)
Este proyecto permite realizar pruebas automatizadas de extremo a extremo de la aplicación Ghost, haciendo uso del API de Automatización [Cypress](https://www.cypress.io/). A continuación se explica el detalle: 

## Escenarios de prueba 
El proyecto cuenta con una suite de pruebas principal que tiene 20 escenarios de prueba automatizadas, los cuales se detallan a continuación:

### Funcionalidades 

| Funcionalidades a probar | 
| ----- |
| Members |
| Pages |
| Posts |
| Staff |
| Login |

### Escenarios 

| Identificador | Escenario | Descripción |
| ----- | ----------- | ----------- |
| PA_01 |  Crear nueva cuenta  |  Escenario que realiza la creación de una cuenta nueva con información aleatoria.  |
| PA_02   |  Crear nuevo miembro  |   Escenario que realiza la creación de un miembro con información aleatoria.   |
| PA_03    |  Editar miembro|   Escenario que realiza la modificación del primer miembro que se encuentre en el listado de miembros con información aleatoria.    |
| PA_04 |  Eliminar miembro|  Escenario que realiza el borrado del primer miembro que se encuentre en el listado de miembros.   |
| PA_05 |  Cambiar password|  Escenario que realiza el cambio de password del usuario administrador de la aplicación.|
| PA_06 |  Iniciar sesión |  Escenario que realiza el login a la aplicación.   |
| PA_07 |  Crear nuevo post   |   Escenario que realiza la creación de un nuevo post con información aleatoria y lo deja en estado borrador.   |
| PA_08 |  Publicar post |   Escenario que realiza la publicación de un post que se encuentre en estado borrador.     |
| PA_09 |  Modificar post |  Escenario que realiza la modificación de un post existente con información aleatoria.   |
| PA_10 |  Búsqueda  de post|  Escenario que realiza la búsqueda de un post.      |
| PA_11 |  Eliminar post|  Escenario que realiza el borrado del primer post que se encuentre en el listado de posts.    |
| PA_12 |  Listar todos los posts|  Escenario que lista todos los posts que se encuentren creados.       |
| PA_13 |  Crear nuevo tag | Escenario que realiza la creación de un nuevo tag con información aleatoria.   |
| PA_14 |  Crear nueva página |   Escenario que realiza la creación de una página con información aleatoria.   |
| PA_15 |  Modificar página |  Escenario que realiza la modificación de una página existente con información aleatoria.     |
| PA_16 |  Listar todas las páginas |  Escenario que lista todas los paginas que se encuentren creados.       |
| PA_17 |  Eliminar primera página|   Escenario que realiza el borrado de la primera página que se encuentre en el listado de páginas.      |
| PA_18 |  Invitar gente con un correo aleatorio|   Escenario que realiza el envió de la invitación a unirse a un correo aleatorio. |
| PA_19 |  Editar información de mi perfil|  Escenario que realiza la modificación de información del perfil con que se ingrese. Esta información se genera de forma aleatoria.   |
| PA_20 |  Editar Twitter card|  Escenario que realiza la modificación de información del Twittercard de la aplicación.       |

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
- Instalar los módulos requeridos: Usando [Node Package Manager](https://www.npmjs.com/), run `npm install` en la carpeta raíz; esto instalara los módulos de Cypress CLI y otras dependencias necesarias para el correcto funcionamiento del proyecto, como lo es el módulo de [faker](https://www.npmjs.com/package/faker). En caso de que ya tenga instalado Cypress, es mejor evitar instalarlo nuevamente en esta carpeta; puede realizar la instalación de dependencias de forma independiente, para esto ejecuta los comandos: `npm install faker`.
- Configure las propiedades de la aplicación: La carpeta support contiene el archivo `utils.js`, el cual brinda los siguientes parámetros que se pueden modificar: 
![configuracion](https://user-images.githubusercontent.com/111403006/202923217-749b4cb7-9a46-4934-babe-0a0621aa0309.png)
<br>* Modifique los puertos en los parametros **siteUrl**, **Url**, **dashboardPage**, **staffPage** y **memberPage**, de acuerdo al puerto que Ghost esta usando en su maquina.
<br>* Modifique los parametros **emaiLogin**, **passwordLogin** de acuerdo a los valores que establecio para crear su cuenta de Ghost.
<br>* Modifique el parametro **newwordLogin** con una contrasena valida que cumpla los requirimientos de Ghost, para que la contrasena actual pueda ser actualizada por la nueva contrasena. Para este ejercicio puede establecer el parametro **newwordLogin** igual que su actual contrasena (**passwordLogin**) 



## Ejecución
- Una vez realizada la configuración del archivo `utils.js` para lanzar la ejecucón de las pruebas, a través de la terminal ejecute el siguiente comando: `./node_modules/.bin/cypress run`. 
- Si requiere lanzar la ejecucion de una prueba en particular ejecute el siguiente comando:
`./node_modules/.bin/cypress run --spec "ruta<step>"`, por ejemplo: ./node_modules/.bin/cypress run --spec "cypress/integration/step-definitions/13_modifyPage.spec.js"

## Resultados
Cuando finalice la ejecución de la prueba, se generará en la carpeta `videos` un video de la ejecución en un navegador y adicional a esto se genera en la carpeta `screenshots` los pantallazos tomados durante la ejecución de la prueba.

## Ventajas de utilizar esta herramienta

Con base a la experiencia en el uso de la herramienta para la automatización de los diferentes escenarios de prueba mencionados en la parte superior de este documento, se concluye que la herramienta tiene las siguientes ventajas:

- Cuenta con una amplia documentación y tutoriales disponibles en línea que facilita la búsqueda de información.
- Su ejecución es rápida.
- La interfaz gráfica es simple e intuitiva.
- Permite diseñar y probar de manera sencilla diferentes tipos de test.
- Se pueden ver de forma interactiva los pasos y acciones ejecutadas durante la prueba
- Esta basado en Javascript que es un lenguaje ampliamente conocido y por ende facilita su aprendizaje para personas nuevas en el campo de pruebas de software.
- Compatible con las versiones más actualizadas de nodejs.
- Se puede extender sus funcionalidades con plugins.
- Permite realizar la captura de pantalla y vídeos de forma automática.


## Desventajas de utilizar esta herramienta

Con base a la experiencia en el uso de la herramienta para la automatización de los diferentes escenarios de prueba mencionados en la parte superior de este documento, se concluye que la herramienta tiene las siguientes desventajas:

- Los test a veces fallan aleatoriamente sin una razón aparente.
- No soporta pruebas en la que se requieren dos browsers al mismo tiempo, como por ejemplo pruebas en una aplicación de chat.
- Solo soporta Javascript para crear escenarios y/o casos de prueba.
- No soportará test con múltiples navegadores al mismo tiempo.
- Solo permite interactuar con una pestaña del navegador.
