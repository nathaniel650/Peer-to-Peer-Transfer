import { useEffect, useState, createContext } from 'react';
import { ethers } from 'ethers';
import { settings } from '../settings';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
TimeAgo.addLocale(en);

const timeAgo = new TimeAgo('en-Us')
const { ethereum } = window;

const createEthereumContract = () =>{
     const provider = new ethers.providers.Web3Provider(ethereum)
     const signer = provider.getSigner()
     const transactionsContract = new ethers.Contract(
       settings.contractAddress,
       settings.contractAbi,
        signer
     )
     return transactionsContract;
}
export const TransactionContext = createContext()

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('');
    const [addressFrom, setAddressFrom] = useState('');
    const [to, setAddressTo] = useState('');
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState('');
    const [isloading, setIsLoading] = useState(false);
    const [getPeerToPeerTransactions, setPeerToPeertransactions] = useState([]);
    const [transactionCount, setTransactionCount] = useState(
        localStorage.getItem('transactionCount'),
    );

    useEffect(() => {
        checkIfWalletIsConnected()
        checkIfTransactionsExists()
    }, [transactionCount]);

    const checkIfWalletIsConnected = async () =>{
        try{
            if(!ethereum){
                return alert("Please Install Metamask and connect your wallet address");
            }
            const accounts = await ethereum.request({method: "eth_requestAccounts"});

            if(accounts && accounts.length){
                setCurrentAccount(accounts[0]);
                getAllTransactions();
            }else{
                console.log('Cant find accounts');
            }
        }catch(error){
            console.log(error)
        }
        // const provider = ethers.getDefaultProvider('goerli');
        // const accounts = await provider.listAccounts()
        // setCurrentAccount(accounts[0]);
    }

    const connectWallet = async () => {
        try{
            if(!ethereum){
                return alert("Please Install Metamask and connect your wallet address");
            }
            const accounts = await ethereum.request({method: "eth_requestAccounts"});
            setCurrentAccount(accounts[0]);
            window.location.reload()
        }catch(error){
            console.log(error);
            throw new Error('No ethereum Object')
        }
    }

    const checkIfTransactionsExists = async () => {
        try{
            if(ethereum){
                const transactionCount = createEthereumContract();
                const currentTransactionCount = await transactionCount.getTransactionCount();
                console.log("currentTransaction:  ",currentTransactionCount.toNumber())
                localStorage.setItem("transactionCount", currentTransactionCount.toNumber());
            }
        }catch(error){
            console.log(error)
        }
    }

    const PeerToPeerTransaction = async() =>{
        try{
            if(ethereum){
                const transactionsContract = createEthereumContract()
                const parsedAmount = ethers.utils.parseEther(amount)

                await ethereum.request({
                    method: 'eth_sendTransaction',
                    params: [
                        {
                            from: currentAccount,
                            to: to,
                            gas: "0x5208",
                            value: parsedAmount._hex
                        }
                       
                    ]
                })
                const transactionHash = await transactionsContract.makeTransaction(
                    to,
                    parsedAmount,
                    message
                )
                setIsLoading(true)
                console.log(`Loading:::: ${transactionHash.hash}`)
                await transactionHash.wait()
                console.log(`Success:::: ${transactionHash.hash}`)
                setIsLoading(false);
                const currentTransactionCount = await transactionsContract.getTransactionCount();
                console.log("currentTransaction:  ",currentTransactionCount.toNumber())
                setTransactionCount(currentTransactionCount.toNumber())
                window.location.reload()
            }else{
                console.log('no ethereum object');
            }
        }catch(error){
            console.error(error);
            console.log(error)
        }
    }

    const getAllTransactions = async () =>{
        try{
            if(ethereum){
                const transactions = createEthereumContract();
                const allTransactions = await transactions.getAllTransactions();
                console.log("allTransactions:  ",allTransactions);
                const constructTransactions = allTransactions.map((transactions) =>({
                    addressTo:  transactions.receiver,
                    addressFrom:  transactions.from,
                    amount: parseInt(transactions.amount._hex) / 10 ** 18 ,
                    message: transactions.message,
                    timestamp: timeAgo.format(new Date(transactions.timestamp.toNumber() * 1000), 'mini')
                }));
                console.log(constructTransactions);
                setPeerToPeertransactions(constructTransactions);
            }else{
                alert('No ethereum object')
            }
        }catch(error){
            console.log(error)
        }
    }
    
    return (
        <TransactionContext.Provider value={{ 
            connectWallet,
            currentAccount, 
            PeerToPeerTransaction,
            setAddressTo, 
            to, 
            setAmount, 
            amount, 
            setMessage, 
            message,
            getPeerToPeerTransactions
            }}>
            {children}
        </TransactionContext.Provider>
    )
}