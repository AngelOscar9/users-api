
#  🚀 Prueba Practica - Devsu

## 🧾 Descripción General

Este proyecto automatiza por completo el ciclo de vida de una API desarrollada en **Node.js**, desde la construcción y pruebas automáticas, hasta el análisis de seguridad y el despliegue en producción dentro de un entorno en la nube.

Todo el flujo se apoya en herramientas modernas y prácticas recomendadas: integración y entrega continua **(CI/CD) con GitLab**, contenerización con **Docker**, despliegue en Kubernetes gestionado por **Amazon EKS**, base de datos en **Amazon RDS**, análisis de vulnerabilidades, e infraestructura definida como código (IaC) para garantizar un entorno reproducible y escalable.

---

## 📦Tecnologías y Servicios Utilizados

- **Node.js** + Express
- **GitLab CI/CD** para la automatización del pipeline
- **Docker** para la contenerización de la aplicación
- **Amazon EKS** para orquestación de contenedores con Kubernetes
- **Amazon RDS** como base de datos relacional
- **Cloudflare** para gestión DNS y seguridad
- **Trivy** para análisis de vulnerabilidades
- **EC2** para despliegue de reportes y artefactos
- **Swagger** para documentación de API

---

## 🔁 Flujo de CI/CD

El pipeline está dividido en las siguientes etapas:

| Etapa      | Descripción                                                                   |
|------------|-------------------------------------------------------------------------------|
| `build`    | Instalación de dependencias                                                   |
| `test`     | Ejecución de pruebas unitarias y generación de cobertura                      |
| `analyze`  | Análisis estático del código con ESLint                                       |
| `coverage` | Generación del reporte de cobertura en formato `lcov`                         |
| `docker`   | Construcción y push de imagen Docker al GitLab Container Registry             |
| `scan`     | Escaneo de vulnerabilidades con Trivy (imagen y sistema de archivos)          |
| `deploy`   | Despliegue automatizado en Amazon EKS y publicación de artefactos en EC2      |


**CI/CD:** Automatizado mediante GitLab, disparado en cada `push` a la rama `main`.

---

## ☸️ Despliegue en Kubernetes (EKS)

La infraestructura fue provisionada con **IaC utilizando `eksctl`**, garantizando reproducibilidad y escalabilidad.

```bash
eksctl create cluster \
  --name dev-cluster \
  --region us-east-1 \
  --nodegroup-name dev-nodes \
  --node-type t3.medium \
  --nodes 2 \
  --nodes-min 1 \
  --nodes-max 3 \
  --managed
```

- Se desplegaron **2 réplicas** de la aplicación
- Uso de `envsubst` para parametrizar manifiestos de Kubernetes (variables de entorno)
- Balanceo de carga externo mediante `LoadBalancer` e `Ingress`
- Los manifiestos están organizados en `k8s/*.yaml`

---

## 🗄️ Base de Datos

- **Amazon RDS** (PostgreSQL)
- Configurada como base de datos gestionada y de alta disponibilidad
- Conexión segura mediante variables de entorno
- Los datos persisten fuera del contenedor

---

## 🌐 Servicios Públicos Disponibles

- 📘 **Swagger Documentation:**  
  https://devsu.aogonzalez.com/api/docs/

- ✅ **Resultado del pipeline (CI/CD):**  
  https://gitlab.com/angelosacar9/users-api/-/pipelines/1830345634

- 📊 **Reporte de cobertura de código:**  
  http://devsu-docs.aogonzalez.com/coverage/lcov-report/

---

## 🔐 Seguridad

- Variables sensibles (tokens, claves, contraseñas) gestionadas como `secrets` en GitLab CI
- Usuario sin privilegios `root` en ejecución de contenedor
- Escaneo de vulnerabilidades en:
  - Imagen Docker
  - Sistema de archivos del proyecto
- Acceso restringido a servicios con autenticación (Swagger, API, EC2)

---

## 📁 Infraestructura como Código (IaC)

- Cluster EKS configurado con `eksctl`
- Despliegue en Kubernetes mediante archivos `.yaml` parametrizados
- Pipelines de CI/CD definidos en `.gitlab-ci.yml`
- Zero-touch deployment desde GitLab al entorno productivo

---

## 📌 Conclusión

Este proyecto demuestra la capacidad de construir, analizar, asegurar, contenerizar y desplegar una aplicación backend moderna en un entorno completamente automatizado y escalable usando herramientas estándar de la industria.

Todo el entorno está disponible **públicamente**, desplegado y respaldado por evidencias funcionales.

---

## 📫 Contacto

**Angel O. Gonzalez**  
💼 Software Developer  
📧 ao.gonzalez.nolasco@gmail.com
🔗 [LinkedIn](https://www.linkedin.com/in/aogonzalezn)