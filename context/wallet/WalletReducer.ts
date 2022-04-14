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
	FETCH_SHARED_FILES,
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
		case FETCH_SHARED_FILES:
			return {
				...state,
				sharedFiles: action.payload,
			};
		case UPLOAD_FILE:
			return {
				...state,
				files: [action.payload, ...state.files],
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
		default:
			return state;
	}
};
export default contactReducer;
