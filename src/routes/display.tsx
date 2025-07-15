import NavBar from "@/components/navigation";
import { createSignal } from "solid-js";
import Students from "./students";
import Transactions from "./transactions";
import { Switch , Match} from "solid-js";
import { Route } from "@/components/navigation";

export default function Display() {
    // create a signal for routes we may want to display after sign-in
    const [route, setRoute] = createSignal<Route>(Route.transactions);
    return (
        <div class="font-sans text-foreground p-6 min-h-screen bg-[url('/leaves.webp')]">
            <NavBar route={route()} setRoute={setRoute} />
            <Switch>
                <Match when={route() === Route.transactions}>
                    <Transactions />
                </Match>
                <Match when={route() === Route.students}>
                    <Students />
                </Match>
            </Switch>
        </div>
    );
}