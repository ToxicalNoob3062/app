import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import {
	TextField,
	TextFieldLabel,
	TextFieldRoot,
} from "@/components/ui/textfield";


const SignIn = () => {
	return (
		<Card class="w-[380px]">
			<CardHeader>
				<CardTitle class="text-2xl">SignIn Form</CardTitle>
				<CardDescription>Please enter your credentials to sign in.</CardDescription>
			</CardHeader>
			<CardContent class="grid gap-4">
				<TextFieldRoot>
					<TextFieldLabel>Username</TextFieldLabel>
					<TextField type="text" placeholder="Username" />
				</TextFieldRoot>
				<TextFieldRoot>
					<TextFieldLabel>Password</TextFieldLabel>
					<TextField type="password" placeholder="Password" />
				</TextFieldRoot>
			</CardContent>
			<CardFooter>
				<Button class="w-full">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="mr-2 h-4 w-4"
						viewBox="0 0 24 24"
					>
						<path
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="m5 12l5 5L20 7"
						/>
					</svg>
					SignIn
				</Button>
			</CardFooter>
		</Card>
	);
};

export default SignIn;
