import * as z from "zod";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { TEXTAREA_MAX_CHARACTER } from "@/constant/common";
import validator from "validator";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactFormSchema = z.object({
  name: z.string().min(10).max(50),
  about: z.string().min(4).max(50),
  email: z.string().email().refine(validator.isEmail),
  phone: z.string().refine(validator.isMobilePhone),
  message: z.string().min(5).max(TEXTAREA_MAX_CHARACTER),
  turnstileToken: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = contactFormSchema.parse(body);

    // Verify the Turnstile token (Temporarily disabled)
    /* const verifyResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: validatedData.turnstileToken,
        }),
      },
    );

    const verifyResult = await verifyResponse.json();

    if (!verifyResult.success) {
      return NextResponse.json(
        { success: false, error: "Captcha verification failed" },
        { status: 400 },
      );
    } */

    // Create HTML version
    const htmlContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${validatedData.name}</p>
      <p><strong>About:</strong> ${validatedData.about}</p>
      <p><strong>Email:</strong> ${validatedData.email}</p>
      <p><strong>Phone:</strong> ${validatedData.phone}</p>
      <p><strong>Message:</strong></p>
      <p>${validatedData.message}</p>
    `;

    // Create plain text version
    const textContent = `
    New Contact Form Submission
    Name: ${validatedData.name}
    About: ${validatedData.about}
    Email: ${validatedData.email}
    Phone: ${validatedData.phone}
      
    Message:
    ${validatedData.message}
    `.trim();

    const emailResponse = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL as string, // Using subdomain
      to: process.env.CONTACT_EMAIL as string,
      replyTo: validatedData.email,
      subject: `New Contact Form Message from ${validatedData.name} - ${validatedData.about}`,
      html: htmlContent,
      text: textContent,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Email sent successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 },
    );
  }
}
