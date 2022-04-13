import Link from 'next/link';
import React, { useState } from 'react';
import { FaShareAlt } from 'react-icons/fa';

const FileList = ({ title, hasUpload }: any) => {
    const [addModal, setAddModal] = useState<boolean>(false);
	return (
		<div className='my-8'>
			<div className='flex justify-between items-baseline'>
				<h4 className='text-xl'>{title}</h4>
				{hasUpload && (
					<label className='h-full cursor-pointer bg-sky-500 flex text-white justify-center items-center  w-48   px-5 py-3 text-base rounded-lg hover:bg-sky-900'>
						<input
							className='bg-gray-200 hidden p-5 border border-gray-300 rounded-md w-2/3 focus:border-black focus:outline-black'
							type='file'
							//onChange={e => handleImage(e)}
						/>
						Upload
					</label>
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
								<th>Upload Date</th>
								<th>Share</th>
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
								<td className='cursor-pointer'>
									<FaShareAlt />
								</td>
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
								<td className='cursor-pointer'>
									<FaShareAlt />
								</td>
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
								<td className='cursor-pointer'>
									<FaShareAlt />
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			{addModal && (
				<div className='absolute top-1/4 left-1/4 ml-64'>
					<AddAdminModal setAddModal={setAddModal} />
				</div>
			)}
		</div>
	);
};

FileList.defaultProps = {
	hasUpload: true,
};

export default FileList;
