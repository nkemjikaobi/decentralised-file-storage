import React, { useState, useContext, useEffect } from 'react';
import { AiOutlineClose, AiFillFileAdd } from 'react-icons/ai';
import * as ipfsClient from 'ipfs-http-client';
import toast, { Toaster } from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';
import WalletContext from 'context/wallet/WalletContext';

const UploadFileModal = ({ setUploadFileModal }: any) => {
	const [path, setPath] = useState<string>('');
	const [imageLoading, setImageLoading] = useState<boolean>(false);
	const [image, setImage] = useState<any>(null);
	const [isPrivate, setIsPrivate] = useState<any>(false);
	const [nameOfFile, setNameOfFile] = useState<string>('');
	const create: any = ipfsClient.create;
	const client = create(`${process.env.NEXT_PUBLIC_IPFS_URL}`);

	const walletContext = useContext(WalletContext);

	const { contract, address, uploadFile } = walletContext;

	const handleUpload = async () => {
		if (image === null) {
			return toast.error('Please upload an image');
		}
		setImageLoading(true);
		const file = image[0];
		try {
			const res = await client.add(file, {
				progress: (prog: any) => console.log(`received: ${prog}`),
			});
			setPath(res.path);
			const date = new Date();
			const formattedDate = date.toString();
			await uploadFile(
				contract,
				res.path,
				nameOfFile,
				formattedDate,
				address,
				isPrivate
			);
			setImageLoading(false);
			toast.success('File Uploaded');
			setUploadFileModal(false);
		} catch (error) {
			toast.error((error as Error).message);
		}
	};
	return (
		<>
			<div className='text-white bg-zinc-600 rounded-lg p-10'>
				<Toaster position='top-right' />
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
							onChange={(e: any) => {
								setImage(e.target.files);
								setNameOfFile(e.target.files[0].name);
							}}
						/>
						{image !== null ? 'Select another file' : 'Select file'}
					</label>
					{image !== null && (
						<div>
							<input
								className='mt-7 h-8 rounded-lg text-black px-2 py-5 block'
								type='text'
								value={nameOfFile}
								onChange={e => setNameOfFile(e.target.value)}
							/>
							<div className='flex items-baseline justify-center'>
								<label htmlFor='' className='mr-4'>
									Upload as Private
								</label>
								<input
									type='checkbox'
									className='mt-8'
									onChange={e => setIsPrivate(e.target.checked)}
								/>
							</div>
							<button
								className='flex justify-center items-center mt-10 bg-sky-500 w-48 px-5 py-3 text-base rounded-lg hover:bg-sky-900'
								onClick={() => handleUpload()}
							>
								{imageLoading ? (
									<>
										<FaSpinner className='animate-spin h-5 w-5 mr-3' />
										Uploading
									</>
								) : (
									'Upload'
								)}
							</button>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default UploadFileModal;
