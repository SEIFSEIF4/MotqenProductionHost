"use client";

import * as z from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { TEXTAREA_MAX_CHARACTER } from "@/constant/common";

const contactFormSchema = z.object({
  about: z.string().min(4).max(50),
  name: z.string().min(10).max(50),
  email: z.string(),
  phone: z.string(),
  message: z.string().min(5).max(TEXTAREA_MAX_CHARACTER),
});

export default function ContactForm() {
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
  });

  const maxCharacter = TEXTAREA_MAX_CHARACTER; //Fixed number
  const [characterCount, setCharacterCount] = useState<number>(0);

  // Update character count when the field value changes
  useEffect(() => {
    const currentValue = form.getValues("message") || "";
    setCharacterCount(currentValue.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("message")]);

  function onSubmit(values: z.infer<typeof contactFormSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>,
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid max-w-3xl flex-1 grid-cols-1 space-y-6 p-10 pl-0"
      >
        <h2 className="text-2xl font-bold">نموذج التواصل</h2>
        <div className="flex w-full flex-col gap-6 md:flex-row">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2">
                <FormLabel>الاسم الرباعي</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ادخل الاسم الرباعي"
                    type="text"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2">
                <FormLabel>العنوان</FormLabel>
                <FormControl>
                  <Input placeholder="اكتب موضوعك" type="text" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex w-full flex-col gap-6 md:flex-row">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2">
                <FormLabel>البريد الالكتروني</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ادخل البريد الالكتروني"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-full text-start md:w-1/2">
                <FormLabel isRequired className="pt-1">
                  رقم الجوال
                </FormLabel>
                <FormControl className="w-full">
                  <PhoneInput
                    placeholder="00 000 0000"
                    {...field}
                    defaultCountry="SA"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>نص الرسالة</FormLabel>
              <FormControl>
                <div>
                  <Textarea
                    placeholder="اكتب الرسالة"
                    className="h-20 resize-none"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setCharacterCount(e.target.value.length);
                    }}
                  />
                  <div className="mx-1 mt-1 text-right text-sm text-gray-500">
                    <span
                      className={
                        characterCount > maxCharacter
                          ? "px-1 text-red-500"
                          : "px-1"
                      }
                    >
                      {characterCount}
                    </span>
                    / {maxCharacter}
                  </div>
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-fit">
          إرسال
        </Button>
      </form>
    </Form>
  );
}
