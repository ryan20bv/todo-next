import React from "react";
interface propsTypes {
	onToggle: () => void;
}

const SignUpForm: React.FC<propsTypes> = ({ onToggle }) => {
	return (
		<section>
			<form>
				<div className='flex flex-col'>
					<label htmlFor='fName'>First Name</label>
					<input
						type='text'
						name='fName'
						id='fName'
						required
						autoComplete='off'
					/>
				</div>
				<div className='flex flex-col'>
					<label htmlFor='lName'>Last Name</label>
					<input
						type='text'
						name='lName'
						id='lName'
						required
						autoComplete='off'
					/>
				</div>
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
				<button>SIGN UP</button>
			</form>
			<div>
				<p>Already a user?</p>
				<button onClick={onToggle}>LOGIN</button>
			</div>
		</section>
	);
};

export default SignUpForm;
