import Link from 'next/link';
import React from 'react';
import { FaShareAlt } from 'react-icons/fa';

const FileList = ({
	title,
	hasUpload,
	setUploadFileModal,
	setShareModal,
	data,
}: any) => {
	return (
		<div className='my-8'>
			<div className='flex justify-between items-baseline'>
				<h4 className='text-xl'>{title}</h4>
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
								{hasUpload && <th>Share</th>}
							</tr>
						</thead>
						<tbody>
							{data.length > 0 ? (
								data.map((file: any, index: number) => (
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
										<td>{file.CID}</td>
										<td>{file.uploadDate}</td>
										{hasUpload && (
											<td
												className='cursor-pointer'
												onClick={() => setShareModal(true)}
											>
												<FaShareAlt />
											</td>
										)}
									</tr>
								))
							) : (
								<p>No files uploaded yet</p>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

FileList.defaultProps = {
	hasUpload: true,
	data: null,
};

export default FileList;
