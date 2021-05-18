This is an Ethereum crawler app that can go though the blockchain and pull transaction data but also look up historic balance.
It's conneted to Alchemy node implementation service, which provides full access to the mainnet.
Most of the code is in vanilla JS but there is also the Spring-boot backend which enables you to store your wallets. It is configured to drop the db on server reboot.

The app has several functionalities. It pulls hisotrical balance by connecting to mainnet and comparing the block time stamp with the input date.
The informations regarding transactions is taken from Etherscan blockchain explorer API. This is true for token tx also.
The CRUD operations on db is done with fetch js functions. It uses the basic server that comes with spring boot so to test that, app needs to be run in java IDE.
Otherwise, the rest of the functionalities can be run with a live server plugin for VSC.
