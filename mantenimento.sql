-- Crear la base de datos
CREATE DATABASE mantenimiento;
-- Usar la base de datos
USE mantenimiento;
-- Crear las tablas
-- descripcion_maquinas
CREATE TABLE descripcion_maquina(
    id CHAR(36) NOT NULL DEFAULT (UUID()) PRIMARY KEY UNIQUE,
    descripcion VARCHAR(50)
);

CREATE TABLE rutina_trabajo(
    id CHAR(36) NOT NULL DEFAULT (UUID()) PRIMARY KEY UNIQUE,
    descripcion VARCHAR(50)
);

CREATE TABLE reportero(
    id CHAR(36) NOT NULL DEFAULT (UUID()) PRIMARY KEY UNIQUE,
    nombre VARCHAR(50)
);

CREATE TABLE asignado(
    id CHAR(36) NOT NULL DEFAULT (UUID()) PRIMARY KEY UNIQUE,
    nombre VARCHAR(50)
);

CREATE TABLE reporte(
    id CHAR(36) NOT NULL DEFAULT (UUID()) PRIMARY KEY,
    numero_orden INT NOT NULL AUTO_INCREMENT UNIQUE,
    id_descripcion_maquina CHAR(36) NOT NULL,
    id_rutina_trabajo CHAR(36) NOT NULL,
    id_reportero CHAR(36) NOT NULL,
    id_asignado CHAR(36) NOT NULL,
    fecha_aviso DATE,
    fecha_ejecucion DATE,
    reporte_falla VARCHAR(255),
    trabajo_efectuar VARCHAR(255),
    comentarios VARCHAR(255),
    FOREIGN KEY(id_descripcion_maquina) REFERENCES descripcion_maquina(id),
    FOREIGN KEY(id_rutina_trabajo) REFERENCES rutina_trabajo(id),
    FOREIGN KEY(id_reportero) REFERENCES reportero(id),
    FOREIGN KEY(id_asignado) REFERENCES asignado(id)
);

ALTER TABLE reporte AUTO_INCREMENT = 100;

-- Para ingresar datos en descripcion_maquina
INSERT INTO descripcion_maquina( descripcion ) VALUE ("Aglomeradora");
-- Para ingresar datos en rutina_trabajo
INSERT INTO rutina_trabajo( descripcion ) VALUE ("Mantenimiento preventivo");
-- Para ingresar datos en reportero
INSERT INTO reportero( nombre ) VALUE (" henry IMPRESOR ");
-- Para ingresar datos en asignado
INSERT INTO asignado( nombre ) VALUE ( "Hector ELECTRICISTA" );

INSERT INTO reporte( id_descripcion_maquina,id_rutina_trabajo,id_reportero,id_asignado,fecha_aviso,fecha_ejecucion,reporte_falla,trabajo_efectuar,comentarios)
VALUES ("07424478-e7b5-11ee-a395-24fd527c6f15","e2981afc-e7b8-11ee-a395-24fd527c6f15",
        "87a6c02b-e7b9-11ee-a395-24fd527c6f15","3617c93e-e7ba-11ee-a395-24fd527c6f15",
        "2022-06-02","2022-06-02","falla de velocidad principal",
        "Se coloca potenciometro al variador del motor principal , para setear una velocidad ya que la tarjeta que manda la señal que recibe del plc se encuentra dañada",
        "Sin comentarios");