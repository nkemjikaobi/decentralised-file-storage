/* eslint-disable react-hooks/exhaustive-deps */
import Link from 'next/link';
import React, { useEffect, useState, useContext } from 'react';
import { FaShareAlt, FaSpinner } from 'react-icons/fa';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import toast, { Toaster } from 'react-hot-toast';
import WalletContext from 'context/wallet/WalletContext';

interface IFileList {
	title: string;
	hasUpload?: boolean;
	setUploadFileModal: Function;
	setShareModal: Function;
	data: any;
	isAllFiles: boolean;
	setActiveId?: any;
}
const FileList = ({
	title,
	hasUpload,
	setUploadFileModal,
	setShareModal,
	data,
	isAllFiles,
	setActiveId,
}: IFileList) => {
	const [value, setValue] = useState<string>('');
	const [copied, setCopied] = useState<boolean>(false);
	const [loading, setLoading] = useState(false);
	const [active, setActive] = useState();
	const [uploadedByMe, setUploadedByMe] = useState<boolean>(false);
	const [filtered, setFiltered] = useState<any>([]);

	const walletContext = useContext(WalletContext);

	const { address, privatizeFiles, publicizeFiles, contract, searchedFiles } =
		walletContext;

	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
	}, []);

	const handleClick = async (type: any, id: any) => {
		setActive(id);
		if (type === true) {
			try {
				setLoading(true);
				await publicizeFiles(contract, address, id);
				setLoading(false);
			} catch (error) {
				toast.error((error as Error).message);
				setLoading(false);
			}
		} else {
			try {
				setLoading(true);
				await privatizeFiles(contract, address, id);
				setLoading(false);
			} catch (error) {
				toast.error((error as Error).message);
				setLoading(false);
			}
		}
	};

	//Filter uploaded by me
	useEffect(() => {
		let mounted = true;
		// if (
		// 	mounted &&
		// 	data.length > 0 &&
		// 	searchedFiles.length > 0
		// ) {
		// 	setFiltered(searchedFiles);
		if (mounted && uploadedByMe && data.length > 0) {
			const filteredFiles =
				data && data.filter((file: any) => file.uploadedBy === address);
			setFiltered(filteredFiles);
		} else {
			setFiltered(data);
		}
		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	});

	return (
		mounted && (
			<div className='my-8'>
				<Toaster position='top-right' />

				<div className='flex justify-between items-baseline'>
					<h4 className='text-xl'>{title}</h4>
					{isAllFiles && (
						<div>
							<label className='mr-4'>Uploaded by me</label>
							<input
								type='checkbox'
								onChange={e => setUploadedByMe(e.target.checked)}
							/>
						</div>
					)}

					{hasUpload && (
						<button
							className='flex justify-center items-center mt-10 bg-sky-500 w-48 px-5 py-3 text-base rounded-lg hover:bg-sky-900'
							onClick={() => setUploadFileModal(true)}
						>
							Upload
						</button>
					)}
				</div>

				<div className='bg-white text-black rounded-lg'>
					<div className='mt-12 p-5'>
						<table className='table-auto w-full'>
							<thead>
								<tr className='border-b-2 text-left'>
									<th>Name</th>
									<th>CID</th>
									<th>{hasUpload ? 'Upload Date' : 'Date received'}</th>
									{hasUpload && !isAllFiles && <th>Share</th>}
								</tr>
							</thead>
							<tbody>
								{filtered.length > 0 ? (
									filtered.map((file: any, index: number) => (
										<tr
											className='border-b-2 h-16 hover:bg-gray-200 text-gray-600'
											key={index}
										>
											<td className=''>
												<Link
													href={`${process.env.NEXT_PUBLIC_IPFS_BASE_URL}/${file.CID}`}
												>
													<a
														href={`${process.env.NEXT_PUBLIC_IPFS_BASE_URL}/${file.CID}`}
														className='text-sky-500'
														target={'_blank'}
														rel={'noreferrer'}
													>
														{file.fileName}
													</a>
												</Link>
											</td>
											<CopyToClipboard
												onCopy={() => {
													setCopied(true);
													toast.success('CID Copied');
												}}
												text={file.CID}
											>
												<td className='cursor-pointer'>{file.CID}</td>
											</CopyToClipboard>

											<td>{file.uploadDate}</td>
											{hasUpload && !isAllFiles && (
												<td
													className='cursor-pointer'
													onClick={() => {
														setShareModal(true);
														setActiveId(file.id);
													}}
												>
													<FaShareAlt />
												</td>
											)}
											{file.uploadedBy === address && (
												<td>
													<button
														className='flex justify-center text-white mb-4 items-center mt-10 bg-sky-500 w-32 py-2 text-base rounded-lg hover:bg-sky-900'
														onClick={() => handleClick(file.isPrivate, file.id)}
													>
														{loading && file.id === active ? (
															<>
																<FaSpinner className='animate-spin h-5 w-5 mr-3' />
																Converting...
															</>
														) : file.isPrivate ? (
															'Make Public'
														) : (
															'Make Private'
														)}
													</button>
												</td>
											)}
										</tr>
									))
								) : (
									<tr>
										<td>
											{hasUpload
												? 'No files uploaded yet'
												: 'No files shared with you yet'}
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		)
	);
};

FileList.defaultProps = {
	hasUpload: true,
	data: null,
};

export default FileList;
