# Mediflash PokeApi

Mediflash PokeApi bridge created using [Nest](https://github.com/nestjs/nest).

## Installation

**You should use Node 18.16.0.**

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Situation

On cherche à refactoriser notre back-end avec les principes du Domain Driven Hexagon.

## Plan d'action

Reprendre le repo fourni dans la partie "ressources" point par point et déterminer quels sont les patterns pertinents pour notre situation.

Une fois ce premier travail terminé, implémenter les patterns sur notre back-end.

### Modules

_TL:DR => Création d'un dossier queries au sein du module Pokemon_

Le projet doit être découpé en module, chaque module représente un concept important du domaine, dans notre cas : les pokemons. Le module doit contenir également toute la logique business que l'on pourrait appliquer sur ce concept. Dans notre situation, nous voulons simplement récupérer les pokemons sans leur appliquer de traitement.

Explorons plus en détail un module, il contient :

- un dossier commands
- un dossier database
- un dossier domain
- un dossier dtos
- un dossier queries/find

L'un des principes de notre architecture est de séparer les commandes et les queries. Les commandes représentent les opérations de création, modification et suppression. Les queries représentent les opérations de lecture.

Dans notre cas, nous souhations simplement récupérer des données, nous allons donc nous créer un dossier queries dans notre module.

**Le dossier database**

Il contient le reposiory permettant l'accès à la base de données, dans notre situation nous interagissons avec une API externe, nous n'avons donc pas besoin de ce dossier. C'est le layer Infrastructure qui se chargera de l'accès à l'API.

**Le dossier dtos**
Les dtos (data transfer object) sont des objets qui encapsulent la data. Ce dossier est déja présent.

**Le dossier domain**
_TL:DR Création d'un dossier domain, création d'un sous-dossier events, déplacement du fichier pokemon.types, création d'un fichier pokemon.errors.ts._

Il contient :

- un dossier event
- un dossier value objects
- 3 fichiers représentants l'entité user, les types liés aux users et les erreurs liées aux users.

Dans notre situation nous remarquons plusieurs choses :

- la présence d'un logger dans le contrôleur pokemon, on peut analyser ce logger comme un event représentant le fait qu'un utilisateur fetch un pokemon. On pourrait donc refactoriser ce logger pour l'inclure dans un dossier event
- Nous possédons un fichier pokemon.types, ce fichier doit être déplacé dans le dossier domain.
- Nous pourrions créer un fichier pokemon.errors.ts afin de centraliser la gestion d'erreurs liées aux pokemons.

### Application Layer

Ce layer se décompose en 3 parties :

- Application services : contient la logique métier qui permettra à une commande d'être exécutée. Dans notre situation nous n'avons pas de logique métier.

- Commands and queries : Cette distinction a été expliquée plus haut.

- Ports : Les ports sont des interfaces qui définissent des contrats qui seront implémentés par des adapdateurs. Les ports sont des abstractions pour interagir avec des technos qui n'intéressent pas la logique métier.

### Domain Layer

Ce layer contient toute la logique métier de notre application. C'est le layer le plus complexe, on y trouve :

- les entités : elles encapsulent de la logique métier et des attributs sous la forme d'objets.
- les aggrégats : rassemblent plusieurs entités sous une seule abstraction
- les events
- les services
- les value objects
- les domain invariants
- les domain errors

### Interface Adapters

Ce sont des interfaces chargées de récupérer de la data depuis l'utilisateur et de la repackager d'une manière convenable pour le service. Notre but est de refactoriser le back-end donc nous n'avons pas besoin de ce layer.

### Infrastructure layer

Ce layer encapsule la logique liée à l'infra, c'est à dire l'accès à une database, à des ressources extérieures ou à un message broker.

**les repositories**

Ils sont chargées de centraliser les functionnalités permettant d'accéder à de la data et la logique requise pour l'accès à cette data.

### Actions supplémentaires entreprises

- création d'un fichier .env à la racine avec l'URL de l'API.
