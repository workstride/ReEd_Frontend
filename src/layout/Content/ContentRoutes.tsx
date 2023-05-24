import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import RequireAuth from '../../components/RequireAuth';
import contents from '../../routes/contentRoutes';
import Login from '../../pages/presentation/auth/Login';

const PAGE_404 = lazy(() => import('../../pages/presentation/auth/Page404'));
const ContentRoutes = () => {
	
	return (
		<Routes>
			<Route key='/login' path='/login' element={<Login />}/>
			<Route key='/signup' path='/signup' element={<Login isSignUp/>}/>
			
			<Route element={<RequireAuth allowedRoles={['ADMIN', 'MANAGER', 'HEAD_TEACHER', 'TEACHER']} />}>
				{contents.map((page) => (
					// eslint-disable-next-line react/jsx-props-no-spreading
					<Route key={page.path} {...page} />
				))}
			</Route>
			<Route path='*' element={<PAGE_404 />} />
		</Routes>
	);
};

export default ContentRoutes;
