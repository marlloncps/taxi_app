import mysql from "mysql2/promise";
import connection from "./db";

const executeSqlCommands = async (connection: mysql.Pool): Promise<void> => {
  const sqlCommands = [
    `CREATE DATABASE IF NOT EXISTS taxi_app;`,
    `USE taxi_app;`,
    `DROP TABLE IF EXISTS drivers;`,
    `CREATE TABLE IF NOT EXISTS drivers (
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(64) NOT NULL DEFAULT '',
      description TEXT NOT NULL,
      vehicle VARCHAR(128) NOT NULL DEFAULT '',
      review JSON NULL DEFAULT NULL,
      value INT NOT NULL DEFAULT 0,
      min_quilometers INT NOT NULL DEFAULT 0,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,
    `INSERT INTO drivers (name, description, vehicle, review, value, min_quilometers)
    VALUES
    ('Homer Simpson', 
    'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).', 
    'Plymouth Valiant 1973 rosa e enferrujado', 
    '{"rating": 2, "comment": "Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts."}', 
    2.50, 
    1), 
    ('Dominic Toretto', 
    'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.', 
    'Dodge Charger R/T 1970 modificado', 
    '{"rating": 4, "comment": "Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!"}', 
    5, 
    5),
    ('James Bond', 
    'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.', 
    'Aston Martin DB5 clássico', 
    '{"rating": 5, "comment": "Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto."}', 
    10, 
    10)
    ;`,
  ];

  for (let i = 0; i < sqlCommands.length; i++) {
    try {
      await connection.query(sqlCommands[i]);
      console.log(`Comando SQL número ${i + 1} executado com sucesso`);
    } catch (error) {
      console.error(`Erro ao executar o comando SQL número ${i + 1}:`, error);
      throw new Error(`Erro ao executar o comando ${i + 1}: ${error}`);
    }
  }
};

const runSeeder = async () => {
  try {
    console.log("Conectado ao banco de dados MySQL!");

    await executeSqlCommands(connection);
  } catch (error) {
    console.error("Erro ao rodar o seeder:", error);
  }
};

runSeeder();
