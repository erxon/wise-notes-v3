"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconCheck } from "@tabler/icons-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import passwordChecker, { PasswordCheck } from "@/lib/utils/password-checker";
import PasswordStrengthChecklist from "@/components/utils/password-strength-checklist";

// Server actions: update password
import { updatePassword } from "@/app/server-actions/auth";
import { toast } from "sonner";

const formSchema = z
  .object({
    currentPassword: z.string().min(1, "Type your current password"),
    newPassword: z
      .string()
      .min(1, "Type your new password")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Please set a stronger password"
      ),
    confirmNewPassword: z.string().min(1, "Retype your password"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export default function ChangePasswordForm() {
  // Password toggle
  const [showPassword, setShowPassword] = useState(false);
  const [passwordCheckerResult, setPasswordCheckerResult] =
    useState<PasswordCheck>({
      hasCapitalLetter: false,
      hasNumber: false,
      hasSpecialCharacter: false,
      length: false,
    });
  const [showPasswordChecklist, setShowPasswordChecklist] = useState(false);

  // New password
  const [newPassword, setNewPassword] = useState("");

  // Form default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  // Handle new password change
  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Set new password
    setNewPassword(e.target.value);

    // Check password strength
    setShowPasswordChecklist(e.target.value.length > 0);
    const passwordCheckResult = passwordChecker(e.target.value);
    setPasswordCheckerResult(passwordCheckResult);

    form.setValue("newPassword", e.target.value);
  };

  // Toggle show password
  const toggleShowPassword = (e: boolean) => {
    setShowPassword(!!e);
  };

  // On form submit
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await updatePassword(data.newPassword, data.currentPassword);

      toast.success("Success", {
        description: "Password updated successfully",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";

      toast.error("Error", {
        description: errorMessage,
      });
    }

    // Reset form
    form.reset();
    setNewPassword("");
    setShowPasswordChecklist(false);
    setPasswordCheckerResult({
      hasCapitalLetter: false,
      hasNumber: false,
      hasSpecialCharacter: false,
      length: false,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>Update your password on this account.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              {/* Current password field */}
              <FormField
                name="currentPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* New password field */}
              <div>
                <FormField
                  name="newPassword"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={handleNewPasswordChange}
                          type={showPassword ? "text" : "password"}
                          value={newPassword}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password strength check list */}
                {showPasswordChecklist && (
                  <PasswordStrengthChecklist
                    passwordCheckerResult={passwordCheckerResult}
                  />
                )}
              </div>
              {/* Confirm new password field */}
              <FormField
                name="confirmNewPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Show password toggle */}
            <div className="flex items-center gap-2 mt-4">
              <Checkbox
                id="show-password-toggle"
                onCheckedChange={toggleShowPassword}
              />
              <FormLabel htmlFor="show-password-toggle">
                Show password
              </FormLabel>
            </div>
            {/* Save changes */}
            <Button type="submit" className="mt-8">
              <IconCheck />
              Save Changes
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
