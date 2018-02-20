# siga

Install yarn:

`https://yarnpkg.com/pt-BR/docs/install`

Install Packages

```
yarn
```

Run project

```
yarn start
```
The application is running at `localhost:4200`


Build project

```
yarn build
```
Build Docker Container

```
docker build -t siga-app:1.0.0  . 
```
Run Docker Container

```
docker run -it -p 8080:4200 siga-app:1.0.0
```









