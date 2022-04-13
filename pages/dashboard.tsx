import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import FileList from '../components/FileList';
import UploadFileModal from '../components/modals/UploadFileModal';

const Dashboard: NextPage = () => {
	const [uploadFileModal, setUploadFileModal] = useState<boolean>(false);

	return (
		<div>
			<Head>
				<title>Dashboard</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className='container mt-4 '>
				<div className={`${uploadFileModal && 'blur-lg'}`}>
					<nav className='flex justify-between items-center'>
						<h2 className='text-4xl font-bold text-center'>Dinata</h2>
						<button className='flex justify-center items-center mt-10 bg-sky-500 w-48 px-5 py-3 text-base rounded-lg hover:bg-sky-900'>
							Logout
						</button>
					</nav>
					<section className='mt-8'>
						<h4 className='text-base mb-4'>
							Welcome user,{' '}
							<span className='text-2xl text-purple-600'>
								0x9a6Cc7a9AC458e9D9E8c6E5950e2FDeBc609f354
							</span>
						</h4>
						<hr />
						<FileList
							title='My files'
							setUploadFileModal={setUploadFileModal}
						/>
						<FileList title='Shared with me' hasUpload={false} />
					</section>
				</div>
				{uploadFileModal && (
					<div className='absolute top-1/4 left-1/4 ml-64'>
						<UploadFileModal setUploadFileModal={setUploadFileModal} />
					</div>
				)}
			</main>
		</div>
	);
};

export default Dashboard;