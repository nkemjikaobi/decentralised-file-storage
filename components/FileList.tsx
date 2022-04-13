import Link from 'next/link';
import React from 'react';
import { FaShareAlt } from 'react-icons/fa';

const FileList = ({
	title,
	hasUpload,
	setUploadFileModal,
	setShareModal,
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
					{/* <table className='table-auto w-full border-separate my-table-spacing'> */}
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
							<tr className='border-b-2 h-16 hover:bg-gray-200 text-gray-600'>
								<td className=''>
									<Link href='#'>
										<a href='#' className='text-sky-500'>
											5.png
										</a>
									</Link>
								</td>
								<td>QmPiurKn34BiVT7xRsJqpCqhmybZ8pQXAsr4EZMghCdrgg</td>
								<td>4/13/2022</td>
								{hasUpload && (
									<td
										className='cursor-pointer'
										onClick={() => setShareModal(true)}
									>
										<FaShareAlt />
									</td>
								)}
							</tr>
							<tr className='border-b-2 h-16 hover:bg-gray-200 text-gray-600'>
								<td>
									<Link href='#'>
										<a href='#' className='text-sky-500'>
											5.png
										</a>
									</Link>
								</td>
								<td>QmPiurKn34BiVT7xRsJqpCqhmybZ8pQXAsr4EZMghCdrgg</td>
								<td>4/13/2022</td>
								{hasUpload && (
									<td
										className='cursor-pointer'
										onClick={() => setShareModal(true)}
									>
										<FaShareAlt />
									</td>
								)}
							</tr>
							<tr className='border-b-2 h-16 hover:bg-gray-200 text-gray-600'>
								<td>
									<Link href='#'>
										<a href='#' className='text-sky-500'>
											5.png
										</a>
									</Link>
								</td>
								<td>QmPiurKn34BiVT7xRsJqpCqhmybZ8pQXAsr4EZMghCdrgg</td>
								<td>4/13/2022</td>
								{hasUpload && (
									<td
										className='cursor-pointer'
										onClick={() => setShareModal(true)}
									>
										<FaShareAlt />
									</td>
								)}
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

FileList.defaultProps = {
	hasUpload: true,
};

export default FileList;
