import React from 'react';
import { AiOutlineClose, AiFillFileAdd } from 'react-icons/ai';

const UploadFileModal = ({ setUploadFileModal }: any) => {
	return (
		<>
			<div className='text-white bg-zinc-600 rounded-lg p-10'>
				<div className='flex justify-end items-center cursor-pointer'>
					<AiOutlineClose onClick={() => setUploadFileModal(false)} />
				</div>
				<div>
					<div className='flex items-center justify-center mt-8'>
						<AiFillFileAdd className='text-6xl text-center mb-4' />
					</div>
					<h3>Select a file to upload</h3>
					<label className='h-full cursor-pointer mt-8 bg-sky-500 flex text-white justify-center items-center  w-48   px-5 py-3 text-base rounded-lg hover:bg-sky-900'>
						<input
							className='bg-gray-200 hidden p-5 border border-gray-300 rounded-md w-2/3 focus:border-black focus:outline-black'
							type='file'
							//onChange={e => handleImage(e)}
						/>
						Select file
					</label>
					<p className='text-center mt-4'>5.png</p>
				</div>
			</div>
		</>
	);
};

export default UploadFileModal;
