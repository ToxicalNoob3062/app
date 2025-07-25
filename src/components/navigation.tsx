import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Setter, Show } from "solid-js";
import FormDialog from "./f-dialog";
import CategoryForm from "./c-form";
import Auth from "./auth";

export enum Route {
  transactions,
  students,
}

export default function NavBar(props: {
  route: Route;
  setRoute: Setter<Route>;
}) {
  return (
    <div class="flex items-center justify-between px-6">
      <Show
        when={props.route === Route.transactions}
        fallback={<div class="w-32"></div>}
      >
        <FormDialog
          triggerText="Categories"
          className="border p-3 w-32 bg-yellow-100 hover:bg-yellow-200"
        >
          <CategoryForm />
        </FormDialog>
      </Show>
      <div class="w-56 shadow-lg rounded-lg bg-background">
        <NavigationMenu class="w-full flex justify-between p-3">
          <NavigationMenuItem>
            <NavigationMenuLink
              class={`cursor-pointer ${props.route === Route.transactions ? "font-semibold" : ""}`}
              onClick={() => props.setRoute(Route.transactions)}
            >
              Transactions
            </NavigationMenuLink>
          </NavigationMenuItem>
          <div class="border border-black h-6"></div>
          <NavigationMenuItem>
            <NavigationMenuLink
              class={`cursor-pointer ${props.route === Route.students ? "font-semibold" : ""}`}
              onClick={() => props.setRoute(Route.students)}
            >
              Students
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenu>
      </div>
      <Auth />
    </div>
  );
}
