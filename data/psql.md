# ligne de commande

ligne de commande :
psql -U postgres

postgres=# CREATE ROLE otuyo WITH LOGIN PASSWORD 'otuyo';
CREATE ROLE
postgres=# CREATE DATABASE otuyo OWNER otuyo;
CREATE DATABASE
postgres=# \q // on quitte pour se connecter à la bdd

ligne de commande :
psql -U otuyo

ligne de commande
psql -U otuyo -f ./data/create_data.sql
BEGIN
psql:./data/create_data.sql:6: NOTICE:  la table « member » n'existe pas, poursuite du traitement
DROP TABLE
psql:./data/create_data.sql:7: NOTICE:  la table « category » n'existe pas, poursuite du traitement
DROP TABLE
psql:./data/create_data.sql:8: NOTICE:  la table « post » n'existe pas, poursuite du traitement
DROP TABLE
CREATE TABLE
CREATE TABLE
CREATE TABLE
CREATE TABLE
INSERT 0 1
INSERT 0 4
INSERT 0 1
COMMIT

ligne de commande :
psql -U otuyo
