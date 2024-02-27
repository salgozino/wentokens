import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createClient } from 'wagmi';
import {
  foundry,
  goerli,
  sepolia,
  mainnet,
  arbitrum,
  arbitrumGoerli,
  avalanche,
  avalancheFuji,
  polygon,
  polygonMumbai,
  bsc,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const arbitrumSepolia = {
  id: 421614,
  name: "Arbitrum Sepolia",
  network: "arbitrum-sepolia",
  nativeCurrency: {
      name: "Arbitrum Sepolia Ether",
      symbol: "ETH",
      decimals: 18,
  },
  rpcUrls: {
      default: {
          http:  ["https://sepolia-rollup.arbitrum.io/rpc"],
      },
      public: {
          http:  ["https://sepolia-rollup.arbitrum.io/rpc"],
      },
  },
  blockExplorers: {
      etherscan: {
          name: "Arbiscan",
          url: "https://sepolia.arbiscan.io/",
      },
      default: {
          name: "Arbiscan",
          url: "https://sepolia.arbiscan.io/",
      },
  },
  testnet: true,
};

const { chains, provider, webSocketProvider } = configureChains(
  [
    sepolia,
    mainnet,
    goerli,
    arbitrum,
    arbitrumGoerli,
    avalanche,
    avalancheFuji,
    polygon,
    polygonMumbai,
    bsc,
    arbitrumSepolia,
    ...(import.meta.env?.MODE === 'development' ? [goerli, foundry] : []),
  ],
  [publicProvider()],
);

const { connectors } = getDefaultWallets({
  appName: 'wentokens',
  chains,
});

export const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

export { chains };
