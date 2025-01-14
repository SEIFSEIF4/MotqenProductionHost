"use client";

import * as z from "zod";
import { toast } from "sonner";
import { Turnstile } from "@marsidev/react-turnstile";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
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
import validator from "validator";
import { useRouter } from "next/navigation";

export default function ContactForm() {
  const locale = useLocale();
  const t = useTranslations("contactUsPage.contactUsForm");
  const router = useRouter();
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const contactFormSchema = z.object({
    name: z
      .string({ required_error: t("name.errorRequired") })
      .min(10, { message: t("name.errorMin") })
      .max(50, { message: t("name.errorMax") }),
    about: z
      .string({ required_error: t("about.errorRequired") })
      .min(4, { message: t("about.errorMin") })
      .max(50, { message: t("about.errorMax") }),
    email: z
      .string({ required_error: t("email.errorRequired") })
      .refine(validator.isEmail, { message: t("email.errorInvalid") }),
    phone: z
      .string({ required_error: t("phone.errorRequired") })
      .refine(validator.isMobilePhone, { message: t("phone.errorInvalid") }),
    message: z
      .string({ required_error: t("message.errorRequired") })
      .min(5, { message: t("message.errorMin") })
      .max(TEXTAREA_MAX_CHARACTER, {
        message: t("message.errorMax", {
          maxCharacter: TEXTAREA_MAX_CHARACTER,
        }),
      }),
  });

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      about: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const maxCharacter = TEXTAREA_MAX_CHARACTER;
  const [characterCount, setCharacterCount] = useState<number>(0);

  // Watch the 'message' field using useWatch
  const watchedMessage = useWatch({
    control: form.control,
    name: "message",
  });

  // Update character count whenever 'message' changes
  useEffect(() => {
    setCharacterCount(watchedMessage?.length || 0);
  }, [watchedMessage]);

  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
    if (!turnstileToken) {
      toast.error("Please complete the captcha.");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, turnstileToken }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(t("toastSuccess"));
        router.push("/");
      } else {
        throw new Error(data.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error(t("toastError"));
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full max-w-3xl flex-1 grid-cols-1 space-y-6 p-10"
      >
        <h2 className="text-2xl font-bold">{t("formTitle")}</h2>
        <div className="flex w-full flex-col gap-6 md:flex-row">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2">
                <FormLabel>{t("name.label")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("name.placeholder")} {...field} />
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
                <FormLabel>{t("about.label")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("about.placeholder")} {...field} />
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
                <FormLabel>{t("email.label")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("email.placeholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2">
                <FormLabel>{t("phone.label")}</FormLabel>
                <FormControl>
                  <PhoneInput
                    placeholder={t("phone.placeholder")}
                    defaultCountry="SA"
                    {...field}
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
              <FormLabel>{t("message.label")}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Textarea
                    placeholder={t("message.placeholder")}
                    className="h-20 resize-none"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setCharacterCount(e.target.value.length);
                    }}
                  />
                  <div className="absolute mx-1 mt-1 text-right text-sm text-gray-500">
                    <span
                      className={
                        characterCount > maxCharacter
                          ? "px-1 text-red-500"
                          : "px-1"
                      }
                    >
                      {characterCount}
                    </span>{" "}
                    / {maxCharacter}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
          onSuccess={(token) => setTurnstileToken(token)}
          onError={() => toast.error("Captcha failed. Please try again.")}
        />
        <Button type="submit" className="w-fit">
          {t("submitButton")}
        </Button>
      </form>
    </Form>
  );
}
