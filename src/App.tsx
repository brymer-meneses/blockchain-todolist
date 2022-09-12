import "./App.css";
import Backdrop from "./components/Backdrop";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";

import '@rainbow-me/rainbowkit/styles.css';
import merge from 'lodash.merge';

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  Theme,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [chain.rinkeby],
  [
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

const myTheme = merge(darkTheme(), {
  colors: {
    accentColor: '#BED7EE',
    accentColorForeground: '#030B10',
    modalBackground: '#041422',
    connectButtonInnerBackground: '#071E34',
    connectButtonBackground: '#010405'
  },
} as Theme);

function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider 
        theme={myTheme}
        chains={chains}>

        {/* Main app */}
        <div className="App">
          <Header/>
          <Dashboard/>
          <Backdrop />
        </div>

      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
