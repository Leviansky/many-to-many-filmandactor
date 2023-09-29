```bash
    npx sequelize-cli model:generate --name actor --attributes name:string,image:string,country:string,birthYear:integer,height:integer,filmId:integer

    npx sequelize-cli model:generate --name film --attributes name:string,poster:string,director:string,releaseYear:integer,company:string,actorId:integer

    npx sequelize-cli model:generate --name filmActors --attributes filmId:integer,actorId:integer
```