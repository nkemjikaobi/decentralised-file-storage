import React from 'react';

const UploadFileModal = ({ setUploadFile }: any) => {

	return (
		<>
			<div className='text-white bg-zinc-600 rounded-lg p-10'>
				<div className='mb-4'>
					<label className='block font-bold text-base mb-2' htmlFor=''>
						Name
					</label>
					<input
						type='text'
						className='bg-zinc-900 text-white rounded-lg p-5 border border-stone-400'
						placeholder='address of the wallet'
						// value={userAddress}
						// onChange={e => setAddress(e.target.value)}
					/>
				</div>
			</div>
			<div className='mt-8 flex  flex-col items-center justify-between'>
				<button className='bg-blue-700 text-white flex items-center justify-center rounded-lg p-5 mt-4 w-full mb-4'>
					Add
				</button>
				<button
					className='bg-black flex items-center justify-center rounded-lg p-5 w-full'
					onClick={() => setUploadFile(false)}
				>
					Back
				</button>
			</div>
		</>
	);
};

export default UploadFileModal;
