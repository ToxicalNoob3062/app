import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { Setter } from "solid-js";

export enum Route {
    transactions,
    students
}

export default function NavBar(props:{route: Route, setRoute: Setter<Route>}) {
    return (
        <div class="w-56 mx-auto shadow-lg rounded-lg bg-background">
            <NavigationMenu class="w-full flex justify-between p-3">
                <NavigationMenuItem>
                    <NavigationMenuLink class={`cursor-pointer ${props.route === Route.transactions ? "font-semibold" : ""}`} onClick={() => props.setRoute(Route.transactions)}>Transactions</NavigationMenuLink>
                </NavigationMenuItem>
                <div class="border border-black h-6"></div>
                <NavigationMenuItem>
                    <NavigationMenuLink class={`cursor-pointer ${props.route === Route.students ? "font-semibold" : ""}`} onClick={() => props.setRoute(Route.students)}>Students</NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenu>
        </div>
    );
}