# "Color" NFT, smart contract and client monorepo

This monorepo gathers all the code needed to launch a simple NFT project.

## Stack

The main programming language is TypeScript, the contracts' types are generated using `typechain`. The project is based on the Truffle development suite and the Ganache local blockchain. You'll need to have an Ethereum wallet installed (Metamask).

The backend contains only the contract, written in Solidity. They are tested using TypeScript, Mocha, and Chai. The frontend folder has been initiated using Create React App (CRA). The styling is done using Tailwind.

## Starting the project

Install the dependencies:

```sh
npm i
```

Deploy the smart contracts:

```sh
cd backend/
npm run migrate
```

Test the smart contracts:

```sh
cd backend/
npm test
```

Start the client:

```sh
cd frontend/
npm start
```

Build the client:

```sh
cd frontend/
npm run build
```
