import React, { useState, useContext } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import WalletContext from 'context/wallet/WalletContext';
import toast, { Toaster } from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';

const ShareModal = ({ setShareModal, activeId }: any) => {
	const [userAddress, setAddress] = useState('');
	const walletContext = useContext(WalletContext);
	const [loading, setLoading] = useState(false);

	const { contract, shareFile, address } = walletContext;
	const handleShare = async () => {
		if (userAddress === '') {
			return toast.error('Address is required');
		}
		setLoading(true);
		try {
			await shareFile(contract, activeId, address, userAddress);
			setLoading(false);
			setShareModal(false);
			toast.success('File shared');
		} catch (error) {
			toast.error((error as Error).message);
		}
	};
	return (
		<>
			<div className='text-white bg-zinc-600 rounded-lg p-10'>
				<Toaster position='top-right' />
				<div className='flex justify-end items-center cursor-pointer'>
					<AiOutlineClose onClick={() => setShareModal(false)} />
				</div>
				<div>
					<label className='block font-bold text-base mb-2' htmlFor=''>
						Wallet address
					</label>
					<input
						type='text'
						className='bg-zinc-900 text-white rounded-lg p-5 border border-stone-400'
						placeholder='address of the wallet'
						value={userAddress}
						onChange={e => setAddress(e.target.value)}
					/>
				</div>
				<button
					onClick={() => handleShare()}
					className='flex justify-center items-center mt-10 bg-sky-500 w-48 px-5 py-3 text-base rounded-lg hover:bg-sky-900'
				>
					{loading ? (
						<>
							<FaSpinner className='animate-spin h-5 w-5 mr-3' />
							Sharing
						</>
					) : (
						'Share'
					)}
				</button>
			</div>
		</>
	);
};

export default ShareModal;
