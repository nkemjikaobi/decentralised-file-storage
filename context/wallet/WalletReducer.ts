import {
	CONNECT_WALLET,
	ERROR,
	CLEAR_ERROR,
	CLEAR_MESSAGE,
	DISCONNECT_WALLET,
	MONITOR_ACCOUNT_CHANGED,
	MONITOR_DISCONNECT,
	LOAD_CONTRACT,
	FETCH_FILES,
	UPLOAD_FILE,
	PUBLICIZE_FILE,
	PRIVATIZE_FILE,
	CLEAR_SEARCH,
	SEARCH,
} from '../types';

const contactReducer = (state: any, action: any) => {
	switch (action.type) {
		case CONNECT_WALLET:
			return {
				...state,
				address: action.payload.accounts[0],
				isConnected: true,
				balance: action.payload.balance,
				web3: action.payload.web3,
				web3Modal: action.payload.web3Modal,
				providerOptions: action.payload.providerOptions,
				provider: action.payload.provider,
			};
		case LOAD_CONTRACT:
			return {
				...state,
				contract: action.payload,
			};
		case FETCH_FILES:
			return {
				...state,
				files: action.payload,
			};
		case PUBLICIZE_FILE:
			return {
				...state,
				files: action.payload,
			};
		case PRIVATIZE_FILE:
			return {
				...state,
				files: action.payload,
			};
		case UPLOAD_FILE:
			return {
				...state,
				files: action.payload,
			};
		case SEARCH:
			return {
				...state,
				searchedFiles:
					state.files &&
					state.files.filter((file: any) => {
						//Ignore white spaces
						const newString = action.payload.replace(/\s/g, '');
						const regex = new RegExp(`${newString}`, 'gi');

						return file.fileName.match(regex) || file.CID.match(regex);
					}),
			};

		case DISCONNECT_WALLET:
			return {
				...state,
				address: null,
				isConnected: false,
				balance: '',
				web3: null,
				web3Modal: null,
				providerOptions: null,
				provider: null,
			};
		case MONITOR_DISCONNECT:
			return {
				...state,
				error: action.payload,
				isConnected: false,
				balance: '',
				address: null,
			};
		case MONITOR_ACCOUNT_CHANGED:
			return {
				...state,
				address: null,
				isConnected: false,
				balance: '',
			};
		case ERROR:
			return {
				...state,
				error: action.payload,
			};
		case CLEAR_ERROR:
			return {
				...state,
				error: null,
			};
		case CLEAR_MESSAGE:
			return {
				...state,
				message: null,
			};
		case CLEAR_SEARCH:
			return {
				...state,
				searchedFiles: [],
			};
		default:
			return state;
	}
};
export default contactReducer;
