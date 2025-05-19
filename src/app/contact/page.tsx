"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const MAX_NAME_LENGTH = 50;
const MAX_SUBJECT_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 500;

const formSchema = z.object({
  name: z.string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(MAX_NAME_LENGTH, { message: `Name can be maximum ${MAX_NAME_LENGTH} characters.` })
    .nonempty({ message: "Name field is required." }),
  email: z.string()
    .email({ message: "Please enter a valid email address." })
    .nonempty({ message: "Email field is required." }),
  subject: z.string()
    .min(5, { message: "Subject must be at least 5 characters." })
    .max(MAX_SUBJECT_LENGTH, { message: `Subject can be maximum ${MAX_SUBJECT_LENGTH} characters.` })
    .nonempty({ message: "Subject field is required." }),
  message: z.string()
    .min(10, { message: "Message must be at least 10 characters." })
    .max(MAX_MESSAGE_LENGTH, { message: `Message can be maximum ${MAX_MESSAGE_LENGTH} characters.` })
    .nonempty({ message: "Message field is required." }),
});

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitStatus("idle");
    
    try {
      // Add user agent information to the form data
      const formData = {
        ...values,
        userAgent: window.navigator.userAgent,
        platform: window.navigator.platform,
        vendor: window.navigator.vendor,
        language: window.navigator.language
      };
      
      const response = await fetch('/api/send-telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "An error occurred while sending the message.");
      }
      
      setSubmitStatus("success");
      form.reset();

      // Reset button state after 3 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 3000);
    } catch (error) {
      setSubmitStatus("error");
      setSubmitError(error instanceof Error ? error.message : "An error occurred while sending the message.");
      
      // Reset button state after 3 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
        setSubmitError(null);
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[650px] w-full px-4">
        <h1 className="text-3xl font-caudex mb-4 mt-8">Contact</h1>
        
        <p className="text-sm leading-relaxed text-muted-foreground mb-8">
          Let&apos;s talk about your project, collaboration opportunities, or just exchange ideas.
          Fill out the form below and I&apos;ll get back to you as soon as possible.
        </p>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel className="flex items-center">
                        Name <span className="text-red-500 ml-1">*</span>
                      </FormLabel>
                      <FormDescription className="text-xs mt-0">
                        {field.value?.length || 0}/{MAX_NAME_LENGTH}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Input 
                        placeholder="Your name" 
                        {...field} 
                        maxLength={MAX_NAME_LENGTH}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      Email <span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="example@email.com" 
                        {...field} 
                        required
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel className="flex items-center">
                      Subject <span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <FormDescription className="text-xs mt-0">
                      {field.value?.length || 0}/{MAX_SUBJECT_LENGTH}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Input 
                      placeholder="What about?" 
                      {...field} 
                      maxLength={MAX_SUBJECT_LENGTH}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel className="flex items-center">
                      Message <span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <FormDescription className="text-xs mt-0">
                      {field.value?.length || 0}/{MAX_MESSAGE_LENGTH}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder="Your message..."
                      className="min-h-[150px]"
                      {...field}
                      maxLength={MAX_MESSAGE_LENGTH}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-2">
              <Button 
                type="submit" 
                disabled={isSubmitting || submitStatus === "success"}
                className={`w-full sm:w-auto transition-all ${
                  submitStatus === "success" ? "bg-emerald-500 hover:bg-emerald-600 border-emerald-600" : 
                  submitStatus === "error" ? "bg-rose-500 hover:bg-rose-600 border-rose-600" : 
                  "bg-primary hover:bg-primary/90"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="animate-pulse">Sending...</span>
                  </span>
                ) : submitStatus === "success" ? (
                  <span className="flex items-center justify-center">
                    <svg className="-ml-1 mr-2 h-5 w-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="animate-pulse">Message Sent!</span>
                  </span>
                ) : submitStatus === "error" ? (
                  <span className="flex items-center justify-center">
                    <svg className="-ml-1 mr-2 h-5 w-5 animate-[spin_0.5s_ease-in-out]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    <span className="animate-pulse">Failed to Send</span>
                  </span>
                ) : (
                  "Send Message"
                )}
              </Button>
              
              {submitError && (
                <p className="text-sm text-rose-500 font-medium">{submitError}</p>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
} 