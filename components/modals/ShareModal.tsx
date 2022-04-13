import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const ShareModal = ({ setShareModal }: any) => {
	const [userAddress, setAddress] = useState('');
	return (
		<>
			<div className='text-white bg-zinc-600 rounded-lg p-10'>
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
				<button className='flex justify-center items-center mt-10 bg-sky-500 w-48 px-5 py-3 text-base rounded-lg hover:bg-sky-900'>
					Share
				</button>
			</div>
		</>
	);
};

export default ShareModal;
