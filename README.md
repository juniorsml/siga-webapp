# siga

Install yarn:

`https://yarnpkg.com/pt-BR/docs/install`

Install Packages

```
λ yarn
```

Run project

```
λ yarn start
```
The application is running at `localhost:4200`

Test project

```
λ yarn test
```

Build project

```
λ yarn build
```
Build Docker Container

```
λ docker build -t siga-app:1.0.0  . 
```
COWABUNGA! 😎

Run Docker Container

```
λ docker run -p 3000:80 siga-app:1.0.0
```

The application is running at `localhost:3000`
