"use client";

import { Form, FormLabel } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconPhotoMinus, IconCheck } from "@tabler/icons-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createProfile } from "@/app/server-actions/profile";
import { toast } from "sonner";
import { useProfileStore } from "@/store/profileStore";

/*
TODO: Process avatar upload
TODO: Fill the first name and last name fields with the user's profile data
TODO: Change create profile into update profile
 */

const formSchema = z.object({
  avatar: z.optional(
    z
      .file()
      .min(1)
      .max(1024 * 1024)
      .mime("image/png")
  ),
  firstName: z.string(),
  lastName: z.string(),
});

export default function PersonalDetailsForm() {
  const isMobile = useIsMobile();
  const profile = useProfileStore((state) => state.profile);

  console.log(profile);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatar: undefined,
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await createProfile({
        firstName: data.firstName,
        lastName: data.lastName,
      });

      toast.success("Success", {
        description: "Profile updated successfully",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";

      toast.error("Error", {
        description: errorMessage,
      });
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Personal Details</CardTitle>
          <CardDescription>
            Update your personal details on this account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col items-center lg:flex-row gap-4 mb-8">
                {/* Display avatar */}
                <div className="rounded-lg w-20 h-20 bg-muted-foreground"></div>
                {/* Upload avatar */}
                <div className="flex flex-row md:flex-col gap-2 lg:items-start w-full lg:w-auto">
                  <FormField
                    name="avatar"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input {...field} type="file" value={undefined} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    variant="outline"
                    size={isMobile ? "icon" : "default"}
                  >
                    <IconPhotoMinus />
                    {isMobile ? "" : "Remove"}
                  </Button>
                </div>
              </div>
              <div className="flex flex-col md:items-start gap-6 w-full">
                <FormField
                  name="firstName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="lastName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit">
                  <IconCheck />
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
