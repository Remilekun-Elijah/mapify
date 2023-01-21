import React from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import Alert from "../utils/alert";
import BACKEND from "../utils/backend";
import Storage from "../utils/storage";
import Footer from "../components/Footer";

const backend = new BACKEND();

const Login = () => {
	const navigate = useNavigate();
	const [isSubmitting, setSubmitting] = React.useState(false)

	async function handleSubmit(e) {
		try{
		e.preventDefault();
		setSubmitting(true)
		const payload = {
			email: e.target.email.value,
			password: e.target.password.value,
		}
		const res = await backend.send({
			type: "post",
			to: "/auth/login",
			payload
		});
		
		if(res?.success){
			Storage.set("authToken", res.authToken)
		navigate("/dashboard");
		Alert({ type: "success", message: res.message });
		}else{
			setSubmitting(false)
		}
	}catch(err){
		setSubmitting(false)
		console.error(err);
	}
	}

	return (
		<div className="h-screen overflow-hidden">
			<Header />
			<div className="flex justify-center items-center h-full">
				<form
					onSubmit={handleSubmit}
					className="border w-[300px] p-5 md:mt-[-10%]">
					<h1 className="text-lg mb-5">Login to your account</h1>
					<div className="mb-3">
						<input
							type="email"
							name="email"
							placeholder="Email"
							className="border px-2 w-full"
						/>
					</div>
					<div className="mb-3">
						<input
							name="password"
							type="password"
							placeholder="Password"
							className="border px-2 w-full"
						/>
					</div>
					<button
						type="submit"
						className="mt-5 w-full bg-slate-700 text-white  py-1">
						{isSubmitting ? "Logging in..." : "Login"}
					</button>
				</form>
			</div>
			<Footer />
		</div>
	);
};

export default Login;
