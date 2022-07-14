USE `aragon-isabelle-bisoni`;

SET SQL_SAFE_UPDATES = 0;

-- Exercício 1
CREATE TABLE `Colaborators`(
	id VARCHAR(3) PRIMARY KEY UNIQUE,
  	name VARCHAR(255) NOT NULL,
  	email VARCHAR(255) NOT NULL UNIQUE
);


-- Exercício 2
INSERT INTO `Colaborators`(id, name, email)
VALUES ("001", "Luana", "lua@lbn.com"), ("002","Vinicius", "vini@lbn.com"), ("003", "Laura", "lau@lbn.com")

-- Exercício 3
-- (a)
SELECT * FROM `Colaborators`

-- (b)
SELECT id AS identifier, name AS name from `Colaborators`

-- (c)
SELECT * FROM `Colaborators`
WHERE id = "003"

-- (d)
SELECT * FROM `Colaborators`
WHERE name LIKE "%a%"

-- (e)
SELECT * FROM `Colaborators`
WHERE name NOT LIKE "%r%" and email LIKE "%u%"

-- Exercício 4
INSERT INTO `Colaborators`(id, name, email)
VALUES("004", "Yuzo", "yuzo@lbn.com")

SELECT * FROM `Colaborators`

DELETE FROM `Colaborators`
WHERE id = "004"