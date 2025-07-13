import "./App.css"

import SingInForm from "@/components/signIn";

function App() {
	console.log(window.innerWidth + " " + window.innerHeight);
	return (
		<div class="font-sans text-foreground flex items-center justify-center min-h-screen bg-[url('/leaves.webp')]">
			<SingInForm />
		</div>
	);
}



export default App;
