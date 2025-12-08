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

const formSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string(),
  confirmNewPassword: z.string(),
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

    setShowPasswordChecklist(e.target.value.length > 0);

    // Validate password strength
    const passwordCheckResult = passwordChecker(e.target.value);

    setPasswordCheckerResult(passwordCheckResult);

    form.setValue("newPassword", e.target.value);
  };

  // Toggle show password
  const toggleShowPassword = (e: boolean) => {
    setShowPassword(!!e);
  };

  // On form submit
  const onSubmit = () => {};

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
