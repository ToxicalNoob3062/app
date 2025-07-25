import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TextField, TextFieldRoot } from "@/components/ui/textfield";
import { For } from "solid-js";
import { Badge } from "./ui/badge";

import { addCategoryHandler } from "@/handlers/addCategory";
import { getCategoriesHandler } from "@/handlers/getCategories";
import { createAsync, query, revalidate } from "@solidjs/router";
import { removeCategoryHandler } from "@/handlers/removeCategory";

export const getCategoriesData = query(async (): Promise<string[]> => {
  const categories = await getCategoriesHandler();
  return categories;
}, "categoriesData");

export default function CategoryForm() {
  const categories = createAsync(() => getCategoriesData());

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        await addCategoryHandler(data.name as string);
        form.reset();
        revalidate("categoriesData");
      }}
    >
      <CardHeader>
        <CardTitle>Category Form</CardTitle>
        <CardDescription>Manage your categories</CardDescription>
      </CardHeader>
      <CardContent class="flex gap-4 items-center">
        <TextFieldRoot>
          <TextField
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "Spacebar") {
                e.preventDefault();
              }
            }}
            onInput={(e) => {
              const value = e.currentTarget.value
                .replace(/\s/g, "")
                .toLowerCase();
              return value;
            }}
            placeholder="Category Name"
            name="name"
          />
        </TextFieldRoot>
        <Button type="submit">Create Category</Button>
      </CardContent>
      <CardFooter class="flex flex-wrap gap-2">
        <For each={categories()}>
          {(category) => (
            <Badge
              variant="outline"
              class="bg-gray-100 hover:bg-gray-200 relative px-6 py-2"
            >
              {category}
              <span
                onClick={async () => {
                  const success = await removeCategoryHandler(category);
                  if (success) {
                    revalidate("categoriesData");
                  }
                }}
                class="absolute top-0 right-1 cursor-pointer text-xs"
              >
                x
              </span>
            </Badge>
          )}
        </For>
      </CardFooter>
    </form>
  );
}
