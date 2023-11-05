import { useState } from "react";
import stakingABI from "./Staking.json"
import { Box, Button, Flex, Input, Image} from '@chakra-ui/react';
import Restart from "./img/restart.png"
const { ethers } = require("ethers");

const contractAddress = "0x6AADa5BC3E480Ea388e213BDDEC52b15a4435097";

const Staking = ({accounts, setAccounts}) =>{
    const isConnected = Boolean(accounts[0])
    const [amount, setAmount] = useState('')
    const [balance, setBalance] = useState('')
    const [time, setTime] = useState('')

    async function handleStake(){

    
        if (window.ethereum){
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()
            const contract = new ethers.Contract(
                contractAddress,
                stakingABI.abi,
                signer,
            )

            try {
                let _amount ={ amount }
                console.log(_amount.amount)
                setAmount('')
                const options = {value: ethers.parseUnits(String(_amount.amount), "ether")}
                const response = await contract.stake(options)
                console.log("response: ", response)
                
            } catch (error) {
                console.log("error: ", error)
            }
        }
    }

    async function handleBalance(){

    
        if (window.ethereum){
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()
            const contract = new ethers.Contract(
                contractAddress,
                stakingABI.abi,
                signer,
            )

            try {
                const balance= ethers.formatEther(await contract.getBalance())
                let res = Math.round(balance * 1e4) / 1e4;
                console.log(res);
                setBalance(res)
                
            } catch (error) {
                console.log("error: ", error)
            }
        }
    }

    async function handleWithdraw(){
        if (window.ethereum){
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()
            const contract = new ethers.Contract(
                contractAddress,
                stakingABI.abi,
                signer,
            )

            try {
                const tx= await contract.withdraw()
                console.log(tx);
            } catch (error) {
                console.log("error: ", error)
            }
        }
    }


    async function handleTimeLeft(){
        if (window.ethereum){
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()
            const contract = new ethers.Contract(
                contractAddress,
                stakingABI.abi,
                signer,
            )

            try {
                const timeLeft = await contract.timeLeft()
                setTime(String(timeLeft))
                console.log(String(timeLeft))
            } catch (error) {
                console.log("error: ", error)
            }
        }
    }

    window.onload = handleBalance

    return (
        

        <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
            <Box width="540px">
            {isConnected ? (
                <Flex className="create" align="center" justify="center">
                    
                    <div 
                    display='flex'
                    gap='20px'>
        <div 
            width="250px"
            border="1px solid #ddd"
            padding="20px"
            border-radius="8px"
            background-color="#ffffff">
            <h3>Stake</h3>
            <Input
                        fontFamily="inherit"
                        width="200px"
                        height="40px"
                        textAlign="center"
                        type="text" 
                        required 
                        value={amount} 
                        onChange={(e)=> setAmount(e.target.value)}/>
            <p>Balance: <span>{balance} ETH</span></p>
            <p>Lockup duration: <span >{ time } seconds</span> 
            <br></br>
                <a href="#" onClick={handleTimeLeft}><Image src={Restart} boxSize="18px"/></a>
            </p>
            <Button 
                     backgroundColor="#32a852" 
                     borderRadius="5px"
                     boxShadow="0px 2px 2px 1px #32a852"
                     color="white"
                     cursor="pointer"
                     fontFamily="inherit"
                     padding="15px"
                     marginTop="10px"
                     onClick={handleStake}>Stake</Button>
        </div>

        <div>
            <h3>Withdraw</h3>
            <p>In a single day, you will receive twice your balance.</p>
            <Button 
                     backgroundColor="#32a852" 
                     borderRadius="5px"
                     boxShadow="0px 2px 2px 1px #32a852"
                     color="white"
                     cursor="pointer"
                     fontFamily="inherit"
                     padding="15px"
                     marginTop="10px"
                     onClick={handleWithdraw}>Withdraw</Button>
        </div>
    </div>
                
                </Flex>
                
            ):(
                <p>You must be connected to the Metamask.</p>
            )}
            
            </Box>
        </Flex>
    )

}

export default Staking;