"use client";
import { authClient } from "@/app/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { env } from "@/env";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["CUSTOMER", "SELLER"]),
});
export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
  const handleLoginWithGoogle = () => {
    const data = authClient.signIn.social({
      provider: "google",
      callbackURL: process.env.FRONTEND_URL,
    });
    console.log(data);
  };
  const form = useForm({
    defaultValues: {
      role: "",
      name: "",
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating your account...");
      try {
        const { data, error } = await authClient.signUp.email(value);
        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }
        toast.success("Account created! Please check your email to verify.", {
          id: toastId,
        });
        form.reset();
      } catch (error) {
        toast.error("Failed to create account", { id: toastId });
      }
    },
  });
  return (
    <Card {...props}>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-2xl">
            💊
          </div>
        </div>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Join MediStore today</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="register-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="role"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <Label className="block mb-3">I want to register as</Label>
                    <RadioGroup
                      value={field.state.value}
                      onValueChange={(val) =>
                        field.handleChange(val as "customer" | "seller")
                      }
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value="CUSTOMER" id="customer" />
                        <Label
                          htmlFor="customer"
                          className="font-normal cursor-pointer"
                        >
                          Customer
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 mb-5">
                        <RadioGroupItem value="SELLER" id="seller" />
                        <Label
                          htmlFor="seller"
                          className="font-normal cursor-pointer"
                        >
                          Seller
                        </Label>
                      </div>
                    </RadioGroup>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      type="text"
                      name={field.name}
                      id={field.name}
                      placeholder="Enter your name"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
          <FieldGroup>
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      type="text"
                      name={field.name}
                      id={field.name}
                      placeholder="Enter your email"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
          <FieldGroup>
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      type="password"
                      name={field.name}
                      id={field.name}
                      placeholder="Enter your password"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="w-full flex flex-col gap-3">
        <Button form="register-form" type="submit" className="w-full">
          Register
        </Button>
        <Button
          className="w-full"
          onClick={() => handleLoginWithGoogle()}
          variant="outline"
          type="button"
        >
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  );
}
