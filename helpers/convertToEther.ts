import Web3 from "web3";

const convertToEther = (web3: Web3, price: string) => {
	if (web3) {
		return web3.utils.fromWei(price, 'ether');
	}
};

export default convertToEther;
