## Plantilla de Documentación de Soporte y Uso de herramientas digitales - README.md


<h1 align="center">Prueba Laravel y Angular js</h1>
<p align="center"> Logo e imagen o gif de la interfaz principal de la herramienta</p>
<p align="center"><img src="![alt text](image.png)"/></p> 

## Tabla de contenidos:
---

- [Herramientas](#Herramientas)
- [Descripción y contexto](#Descripción-y-contexto)
- [Guía de usuario y instalación](#Guía-de-usuario-y-instalación)
- [Información adicional](#Información-adicional)


## Herramientas
---Backend
-laravel 11.
-php 8.2
--Frintend
-Angular js
-typeScript
-scss

## Descripción y contexto
---
La aplicación, desarrollada con Laravel y Angular, es un administrador de usuarios que cuenta con cargos y departamentos, ofreciendo un CRUD completo de usuarios. La parte del backend está implementada con Laravel, mientras que Angular se utiliza para el frontend.
## Guía de usuario y instalación Backend
---
1. **Ejecutar Migraciones y Sembrar la Base de Datos**:
```bash
   php artisan migrate --seed
```
2. **Configurar el Proyecto en un Servidor:**:

- Se recomienda usar XAMPP, ya que al utilizar php artisan serve, la página se queda estática y no puede ejecutar múltiples servicios.
- Una vez configurado el servidor, establece el dominio para que las APIs puedan ser accedidas.

3. **Configurar la Variable `APP_URL`:**:
- Modifica el archivo .env.example para configurar la variable APP_URL con el dominio deseado.

4. **Ejecutar el Servidor de Desarrollo:**:
```bash
    npm run dev
```

- Puedes verificar que la aplicación se ejecuta correctamente accediendo a la URL configurada.

## Guía de usuario y instalación Frontend
---
1. **Descargar los packetes**:
```bash
   npm install
```
4. **Ejecutar el Servidor de Desarrollo:**:
```bash
    ng serve
```

