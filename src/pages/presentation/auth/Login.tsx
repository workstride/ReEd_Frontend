import React, { FC, useCallback, useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Logo from '../../../components/Logo';
import useDarkMode from '../../../hooks/useDarkMode';
import { useFormik } from 'formik';
import AuthContext from '../../../contexts/authContext';
import axios from '../../../api/axios';
// import USERS, { getUserDataWithUsername } from '../../../common/data/userDummyData';
import Spinner from '../../../components/bootstrap/Spinner';
import Alert from '../../../components/bootstrap/Alert';
import { use } from 'i18next';
import { auto } from '@popperjs/core';



interface ILoginHeaderProps {
	isNewUser?: boolean;
}
const LoginHeader: FC<ILoginHeaderProps> = ({ isNewUser }) => {
	if (isNewUser) {
		return (
			<>
				<div className='text-center h1 fw-bold mt-5'>계정 생성</div>
				<div className='text-center h4 text-muted mb-5'>우리와 함께 여정을 떠나볼까요?</div>
			</>
		);
	}
	return (
		<>
			<div className='text-center h1 fw-bold mt-5'>환영합니다!</div>
			<div className='text-center h4 text-muted mb-5'>로그인을 해주세요</div>
		</>
	);
};

interface ILoginProps {
	isSignUp?: boolean;
}
const Login: FC<ILoginProps> = ({ isSignUp }) => {

	const LOGIN_URL = '/api/v1/auth/authenticate';
	const { setUser, setAuth } = useContext(AuthContext);

	const { darkModeStatus } = useDarkMode();

	const [signInPassword, setSignInPassword] = useState<boolean>(false);
	const [singUpStatus, setSingUpStatus] = useState<boolean>(!!isSignUp);
	
	const navigate = useNavigate();
	const location = useLocation();
	const handleOnClick = ()=>{}; // navigate('/'), [navigate]
	const from = location.state?.from?.pathname || "/";

	// const usernameCheck = (username: string) => {
	// 	return !!getUserDataWithUsername(username);
	// };

	// const passwordCheck = (username: string, password: string) => {
	// 	return getUserDataWithUsername(username).password === password;
	// };

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			loginUsername: "",
			loginPassword: "",
		},
		validate: (values) => {
			const errors: { loginUsername?: string; loginPassword?: string } = {};

			if (!values.loginUsername) {
				errors.loginUsername = '필수 입력 사항입니다.';
			}

			if (!values.loginPassword) {
				errors.loginPassword = '필수 입력 사항입니다.';
			}

			return errors;
		},
		validateOnChange: false,
		onSubmit: async (values) => {
			try{
				setIsLoading(true);
				await axios.post(LOGIN_URL, JSON.stringify({
						'memberId' : values.loginUsername,
						'memberPassword' : values.loginPassword
					}), {
						headers: {'Content-Type':'application/json'},
						withCredentials : true
					}
				).then((response) => {
					console.log(response.data);
					setIsLoading(false);
					const accessToken = response.data.accessToken;
					const roles = response.data.role;
					const user = values.loginUsername;
					if(setUser){
						setUser(user);
					}
					if(setAuth){
						console.log(accessToken);
						setAuth({id:user, roles:roles, accessToken:accessToken});
						navigate(from, {replace:true});
						// handleOnClick();
					}
				}).catch((err) => {
					console.log(err.response);
					if(!err?.response){

					}else if(err.response?.status == 400){

					}else if(err.response?.status == 401){
						
					}else{

					}
					setIsLoading(false);
					formik.setFieldError('loginPassword', 'Username and password do not match.');
				});
			}catch(err){
				
			}

			// if (usernameCheck(values.loginUsername)) {
			// 	if (passwordCheck(values.loginUsername, values.loginPassword)) {
					// if (setUser) {
					// 	setUser(values.loginUsername);
					// }

			// 		
			// 	} else {
			// 		formik.setFieldError('loginPassword', 'Username and password do not match.');
			// 	}
			// }
		},
	});

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const handleContinue = () => {
		setIsLoading(true);
		setTimeout(() => {
			// if (
			// 	!Object.keys(USERS).find(
			// 		(f) => USERS[f].username.toString() === formik.values.loginUsername,
			// 	)
			// ) {
			// 	formik.setFieldError('loginUsername', 'No such user found in the system.');
			// } else {
			// 	setSignInPassword(true);
			// }
			setIsLoading(false);
		}, 1000);
	};

	return (
		<PageWrapper
			isProtected={false}
			title={singUpStatus ? '로그인' : 'Login'}
			className={classNames({ 'bg-dark': !singUpStatus, 'bg-light': singUpStatus })}>
			<Page className='p-0'>
				<div className='row h-100 align-items-center justify-content-center'>
					<div className='col-xl-4 col-lg-6 col-md-8 shadow-3d-container'>
						<Card className='shadow-3d-dark' data-tour='login-page'>
							<CardBody>
								<div className='text-center my-5'>
									<Link
										to='/'
										className={classNames(
											'text-decoration-none  fw-bold display-2',
											{
												'text-dark': !darkModeStatus,
												'text-light': darkModeStatus,
											},
										)}>
										<Logo width={200} />
									</Link>
								</div>
								<div
									className={classNames('rounded-3', {
										'bg-l10-dark': !darkModeStatus,
										'bg-dark': darkModeStatus,
									})}>
									<div className='row row-cols-2 g-3 pb-3 px-3 mt-0'>
										<div className='col'>
											<Button
												color={darkModeStatus ? 'light' : 'dark'}
												isLight={singUpStatus}
												className='rounded-1 w-100'
												size='lg'
												onClick={() => {
													setSignInPassword(false);
													setSingUpStatus(!singUpStatus);
												}}>
												로그인
											</Button>
										</div>
										<div className='col'>
											<Button
												color={darkModeStatus ? 'light' : 'dark'}
												isLight={!singUpStatus}
												className='rounded-1 w-100'
												size='lg'
												onClick={() => {
													setSignInPassword(false);
													setSingUpStatus(!singUpStatus);
												}}>
												회원가입
											</Button>
										</div>
									</div>
								</div>

								<LoginHeader isNewUser={singUpStatus} />

								{/* <Alert isLight icon='Lock' isDismissible>
									<div className='row'>
										<div className='col-12'>
											<strong>Username:</strong> {USERS.JOHN.username}
										</div>
										<div className='col-12'>
											<strong>Password:</strong> {USERS.JOHN.password}
										</div>
									</div>
								</Alert> */}
								<form className='row g-4'>
									{singUpStatus ? (
										<>
											<div className='col-12'>
												<FormGroup
													id='signup-id'
													isFloating
													label='아이디'>
													<Input type='text' autoComplete='off' />
												</FormGroup>
											</div>
											<div className='col-12'>
												<FormGroup
													id='signup-email'
													isFloating
													label='이메일'>
													<Input type='email' autoComplete='email' />
												</FormGroup>
											</div>
											<div className='col-12'>
												<FormGroup
													id='signup-name'
													isFloating
													label='이름'>
													<Input autoComplete='given-name' />
												</FormGroup>
											</div>
											<div className='col-12'>
												<FormGroup
													id='signup-tel'
													isFloating
													label='전화번호'>
													<Input autoComplete='tel' />
												</FormGroup>
											</div>
											<div className='col-12'>
												<FormGroup
													id='signup-password'
													isFloating
													label='비밀번호'>
													<Input
														type='password'
														autoComplete='password'
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
												<Button
													color='info'
													className='w-100 py-3'
													onClick={handleOnClick}>
													회원가입
												</Button>
											</div>
										</>
									) : (
										<>
											<div className='col-12'>
												<FormGroup
													id='loginUsername'
													isFloating
													label='아이디 또는 이메일'
													className={classNames({
														'd-none': signInPassword,
													})}>
													<Input
														autoComplete='username'
														value={formik.values.loginUsername}
														isTouched={formik.touched.loginUsername}
														invalidFeedback={
															formik.errors.loginUsername
														}
														isValid={formik.isValid}
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
														onFocus={() => {
															formik.setErrors({});
														}}
													/>
												</FormGroup>
												{/* {signInPassword && (
													<div className='text-center h4 mb-3 fw-bold'>
														Hi, {formik.values.loginUsername}.
													</div>
												)} */}
											</div>
											<div className='col-12'>
												<FormGroup
													id='loginPassword'
													isFloating
													label='비밀번호'
													className={classNames({
														'd-none': signInPassword,
													})}>
													<Input
														type='password'
														autoComplete='current-password'
														value={formik.values.loginPassword}
														isTouched={formik.touched.loginPassword}
														invalidFeedback={
															formik.errors.loginPassword
														}
														validFeedback='Looks good!'
														isValid={formik.isValid}
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
													/>
												</FormGroup>
											</div>
											<div className='col-12'>

													<Button
														color='warning'
														className='w-100 py-3'
														onClick={formik.handleSubmit}>
														{isLoading && (
															<Spinner isSmall inButton isGrow />
														)}
														로그인
													</Button>

												{/* {!signInPassword ? (
													<Button
														color='warning'
														className='w-100 py-3'
														isDisable={!formik.values.loginUsername}
														onClick={handleContinue}>
														{isLoading && (
															<Spinner isSmall inButton isGrow />
														)}
														Continue
													</Button>
												) : (
													<Button
														color='warning'
														className='w-100 py-3'
														onClick={formik.handleSubmit}>
														Login
													</Button>
												)} */}
											</div>
										</>
									)}

									
								</form>
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};
Login.propTypes = {
	isSignUp: PropTypes.bool,
};
Login.defaultProps = {
	isSignUp: false,
};

export default Login;
