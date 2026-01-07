import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { arbitrum, mainnet } from "@reown/appkit/networks";

export const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID as string;

if (!projectId) {
    throw new Error("Missing NEXT_PUBLIC_REOWN_PROJECT_ID");
}

export const wagmiAdapter = new WagmiAdapter({
    projectId,
    networks: [mainnet, arbitrum],
});
