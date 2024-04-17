import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, SearchIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

type Props = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
};

const formSchema = z.object({
  query: z.string().min(0).max(200),
});

export function SearchBar({ query, setQuery }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setQuery(values.query);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex items-center gap-4 '
      >
        <FormField
          control={form.control}
          name='query'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='your file names' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          size='sm'
          type='submit'
          disabled={form.formState.isSubmitting}
          className='flex gap-1'
        >
          {form.formState.isSubmitting && (
            <Loader2 className='size-4 animate-spin' />
          )}
          <SearchIcon /> Search
        </Button>
      </form>
    </Form>
  );
}
