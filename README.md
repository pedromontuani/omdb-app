# Herois da Marvel

Aplicativo para avaliação pelo processo seletivo da DTI.

## Bibliotecas usadas

- React Navigation 6 (e suas dependências): utilizado para performar a navegação
  entre as diferentes telas do aplicativo
- Axios: utilizado para gerenciar as requisições à API fornecida
- React Redux: utilizado para gerenciar os estados globais da aplicação
- Redux Saga: utilizado para gerenciar os side-effects da aplicação
- React Native Flipper: utilizado para debug
- Jest, Testing Library e React Test Renderer: testes unitários

## Instalação

Primeiramente, siga o tutorial de configuração oficial do React Native. Depois,
instale o node na versão LTS e o yarn. Após isso, vá para a pasta do projeto e
execute os comandos:

```bash
yarn
```

## Execução

Ative o modo de USB debug no seu celular ou emulador, e após isso:

### Android

```bash
yarn android --variant=release
```

### Ios

```bash
cd ios
pod install
yarn ios
```
