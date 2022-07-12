USE `aragon-isabelle-bisoni`

SET SQL_SAFE_UPDATES = 0;

-- Exercício 1
CREATE TABLE `Projects`(
	id VARCHAR(3) PRIMARY KEY UNIQUE,
  	name VARCHAR(255) NOT NULL UNIQUE,
  	title VARCHAR(255) NOT NULL,
  	deadline DATE NOT NULL
);

-- Exercício 2
INSERT INTO `Projects`(id, name, title, deadline)
VALUES ("001", "Labesky", "LSy", "2023/10/05") 

INSERT INTO `Projects`(id, name, title, deadline)
VALUES ("002", "Labefy", "Lfy", "2024/01/06"), ("003", "Astrozoom","AZm","2022/12/20")

SELECT * FROM `Projects`

-- Exercício 3
-- (a)
ALTER TABLE `Projects`
DROP COLUMN title
DESCRIBE `Projects`

-- (b)
ALTER TABLE `Projects`
CHANGE deadline dueDate DATE NOT NULL;
DESCRIBE `Projects`

-- (c)
ALTER TABLE `Colaborators`
MODIFY email VARCHAR(255) UNIQUE NOT NULL
SELECT * FROM `Colaborators`
DESCRIBE `Colaborators`

-- Exercício 4
-- (a)
ALTER TABLE `Projects`
ADD description VARCHAR(255) NOT NULL
DESCRIBE `Projects`

-- (b)
SELECT * FROM `Projects`
UPDATE `Projects`
SET description = "Projeto de sistema em nuvem da Labenu."
WHERE id = 001

UPDATE `Projects`
SET description = "Projeto de sistema de gerenciamento de músicas da Labenu."
WHERE id = 002

UPDATE `Projects`
SET description = "Projeto de rede de comunicação da Labenu."
WHERE id = 003

DESCRIBE `Projects`
SELECT * FROM Projects

-- Exercício 5
-- (a)
SELECT *
FROM `Projects`
ORDER BY dueDate DESC

-- (b)
SELECT name, dueDate
FROM `Projects`
ORDER BY dueDate ASC
LIMIT 2