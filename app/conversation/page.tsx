"use client";

import z from "zod";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Heading } from "@/components/heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/empty";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Loader } from "@/components/loader";
import { BotAvatar } from "@/components/bot-avatar";

import { formSchema } from "./constants";
import { dataResponse } from "@/lib/useDataResponse";

const ConversationPage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<any>("");
  const [dataPriceDay, setDataPriceDay] = useState<any>(null);
  const [firstMessage, setFirstMessages] = useState(true);
  const [isWallet, setIsWallet] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSumbit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("wait");

      if (isWallet) {
        console.log("Wallet");

        const response = await axios.post("/api/wallet", {
          messages: values.prompt,
        });
        setMessages(response.data.result.text);
      } else {
        console.log("No wallet");

        if (firstMessage) {
          const dayPrice: any = await dataResponse(values.prompt).then(
            (res) => {
              return res;
            }
          );

          setDataPriceDay(dayPrice);

          const response = await axios.post("/api/orders", {
            messages: `${
              values.prompt
            } here's the data to analyze ${JSON.stringify(dayPrice)}`,
          });
          setMessages(response.data.result.text);

          console.log(response);

          setFirstMessages(false);
        } else {
          console.log("else");

          const response = await axios.post("/api/orders", {
            messages: `${
              values.prompt
            } based on these data here's the data to analyze ${JSON.stringify(
              dataPriceDay
            )}`,
          });

          setMessages(response.data.result.text);
        }
      }

      form.reset();
    } catch (error) {
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="mt-5">
      <Heading
        title="Convesation"
        description="Our most advance conversation model"
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />

      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSumbit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Ask me something about finances."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>

          <div className="flex w-full justify-end">
            <Button className="mt-5 flex" disabled={isLoading}>
              <input
                className="mr-5"
                type="checkbox"
                checked={isWallet}
                onChange={() => setIsWallet(!isWallet)}
              />
              Is wallet ?
            </Button>
          </div>
        </div>

        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}

          {messages.length === 0 && !isLoading && (
            <div>
              <Empty label="No conversation started" />
            </div>
          )}
          <div className="flex flex-col-reverse gap-y-4">
            <div
              className={
                "p-8 w-full flex items-start gap-x-8 rounded-lg bg-muted"
              }
            >
              <BotAvatar />
              <p className="text-sm">{messages}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
