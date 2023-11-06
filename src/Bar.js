import React from "react";
import { Box, Button, Flex, Image, Link, Spacer} from '@chakra-ui/react';

const NavBar = ({accounts, setAccounts}) => {
    const isConnected = Boolean(accounts[0])

    async function connectAccount(){
        if (window.ethereum){
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            })
            setAccounts(accounts)
        }
    }

    return (
        <Flex
  justify="center"
  align="center"
  padding="30px"
>

    {isConnected ? (
      <Box margin="0 15px">Connected</Box>
    ) : (
      <Button
        backgroundColor="#32a852"
        borderRadius="5px"
        boxShadow="0px 2px 2px 1px #32a852"
        color="white"
        cursor="pointer"
        fontFamily="inherit"
        padding="15px"
        margin="auto"
        onClick={connectAccount}
      >
        Connect
      </Button>
    )}
</Flex>

    )
}

export default NavBar;