import React from "react";

interface propsTypes {
	onToggle: () => void;
}

const LoginForm: React.FC<propsTypes> = ({ onToggle }) => {
	return (
		<section>
			<form>
				<div className='flex flex-col'>
					<label htmlFor='email'>Email Address</label>
					<input
						type='email'
						name='email'
						id='email'
						required
						autoComplete='off'
					/>
				</div>
				<div className='flex flex-col'>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						name='password'
						id='password'
						required
						autoComplete='off'
						min={6}
					/>
				</div>

				<button>LOGIN</button>
			</form>

			<h1>OR</h1>
			<div>
				<p>Need an account?</p>
				<button onClick={onToggle}>SIGN UP</button>
			</div>
		</section>
	);
};

export default LoginForm;
