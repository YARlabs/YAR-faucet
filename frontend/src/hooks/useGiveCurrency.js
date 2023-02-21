import { useCallback } from "react"; 
import { toast } from "react-toastify";
const { Wallet } = require("@ethersproject/wallet");
const { JsonRpcProvider } = require("@ethersproject/providers");
const API_URL = process.env.REACT_APP_API_URL;
const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY;
const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY;
const contractFaucet = "0xe02a33c999571d9Ef01E329058bd4E4f5c7216c0";

export const useGiveCurrency = () => {

    return useCallback(
        async (address) => {
            const provider = new JsonRpcProvider(API_URL);
            const wallet = new Wallet(PRIVATE_KEY, provider);
            // const gasPrice = provider.getGasPrice();
            const nonce = provider.getTransactionCount(wallet.address, 'latest');
            const transaction = {
                from: PUBLIC_KEY,
                to: contractFaucet,
                gasPrice: 150000000000,
                nonce,
                data: `0x036a9d65000000000000000000000000${address}`
            }
            try {
                await wallet.sendTransaction(transaction);
                toast.success('Success!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                return true;
            } catch(error) {
                toast.error('Error!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                const errorMessage =
                    error?.error?.message ||
                    error?.message ||
                    "Check console logs for error";
                console.error(error);
                console.error(errorMessage);
                return false;
            }
        },[]
    )
}