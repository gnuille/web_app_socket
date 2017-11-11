CREATE TABLE users(
	id integer NOT NULL AUTO_INCREMENT,
	name varchar(30),
	session_token varchar(200),
	PRIMARY KEY(id)
);

CREATE TABLE tables(
	id integer NOT NULL AUTO_INCREMENT,
	name varchar(30),
	PRIMARY KEY(id)
);

CREATE TABLE tablesUser(
	idUser integer,
	idTables integer,
	FOREIGN KEY (idUser)
      REFERENCES users(id)
      ON UPDATE CASCADE ON DELETE RESTRICT,
    FOREIGN KEY (idTable)
      REFERENCES tables(id)
      ON UPDATE CASCADE ON DELETE RESTRICT,
    PRIMARY KEY (idUser, idTable)
);

CREATE TABLE questionSet(
	id integer NOT NULL AUTO_INCREMENT,
	name varchar(30),
	PRIMARY KEY(id)
);

CREATE TABLE questions(
	id  integer NOT NULL AUTO_INCREMENT,
	name varchar(30),
	questionSetId integer,
	FOREIGN KEY (questionSetId)
      REFERENCES questionSet(id)
      ON UPDATE CASCADE ON DELETE RESTRICT,
	PRIMARY KEY(id)
);

CREATE TABLE games(
	id integer NOT NULL AUTO_INCREMENT,
	nom varchar(30),
	questionSetId integer,
	FOREIGN KEY (questionSetId)
      REFERENCES questionSet(id)
      ON UPDATE CASCADE ON DELETE RESTRICT,
    PRIMARY KEY(id)
);

CREATE TABLE gamesTable(
	idTable integer,
	idGame integer,
	FOREIGN KEY (idGame)
      REFERENCES games(id)
      ON UPDATE CASCADE ON DELETE RESTRICT,
    FOREIGN KEY (idTable)
      REFERENCES tables(id)
      ON UPDATE CASCADE ON DELETE RESTRICT,
    PRIMARY KEY (idGame, idTable)
);



