import mysql from "mysql2";
import connection from "./db";

const executeSqlCommands = async (
  connection: mysql.Connection
): Promise<void> => {
  const sqlCommands = [
    `CREATE DATABASE IF NOT EXISTS taxi_app;`,
    `USE taxi_app;`,
    `DROP TABLE IF EXISTS drivers;`,
    `CREATE TABLE IF NOT EXISTS drivers (
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(64) NOT NULL DEFAULT '',
      description TEXT NOT NULL,
      vehicle VARCHAR(128) NOT NULL DEFAULT '',
      rating TEXT NOT NULL,
      fee INT NOT NULL DEFAULT 0,
      min_quilometers INT NOT NULL DEFAULT 0,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,
    `INSERT INTO drivers (name, description, vehicle, rating, fee, min_quilometers)
      VALUES
      ('Homer Simpson', 
       'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).', 
       'Plymouth Valiant 1973 rosa e enferrujado', 
       '2/5 Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.', 
       2.50, 
       1), 
      ('Dominic Toretto', 
       'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.', 
       'Dodge Charger R/T 1970 modificado', 
       '4/5 Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!', 
       5, 
       5),
      ('James Bond', 
       'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.', 
       'Aston Martin DB5 clássico', 
       '5/5 Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.', 
       10, 
       10);`,
  ];

  for (let i = 0; i < sqlCommands.length; i++) {
    try {
      await new Promise<void>((resolve, reject) => {
        connection.query(sqlCommands[i], (error, results) => {
          if (error) {
            console.error(
              `Erro ao executar o comando SQL número ${i + 1}:`,
              error
            );
            reject(error);
          } else {
            console.log(
              `Comando SQL número ${i + 1} executado com sucesso`,
              results
            );
            resolve();
          }
        });
      });
    } catch (error) {
      throw new Error(`Erro ao executar o comando ${i + 1}: ${error}`);
    }
  }
};

const runSeeder = async () => {
  try {
    console.log("Conectado ao banco de dados MySQL!");

    await executeSqlCommands(connection);
  } catch (error) {
    throw error;
  }
};

runSeeder();
