# Blockchain TodoList

This project is my first dive at learning how to make beautiful dApps using React and Web3 libraries.
I wrote the smart-contract from scratch and [deployed](https://rinkeby.etherscan.io/address/0xCA2ca507FdcdD212bDB3eECda2C1C10373524aF9#code) 
it on the Rinkeby Ethereum Test Net.

![screenshot](assets/dapp_screenshot.png)

## Deployment

### Deploying the smart contract

This project leverages Truffle to easily deploy and migrate the smart contracts. 
To do so, you need to do:

```bash
npm run dashboard
```

And on a **separate** terminal, do
```bash
npm run deploy
```

### Running the Frontend locally

I picked [Vite](https://vitejs.dev/) as the build tool for this project for its speed. To run the application locally, do
```bash
npm run dev
```

