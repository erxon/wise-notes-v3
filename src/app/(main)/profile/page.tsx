import ChangePasswordForm from "@/components/forms/profile-settings/change-password";
import PersonalDetailsForm from "@/components/forms/profile-settings/personal-details";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Profile() {
  return (
    <>
      <Tabs defaultValue="account" className="max-w-[450px] mx-auto">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="pt-4">
          <PersonalDetailsForm />
        </TabsContent>
        <TabsContent value="password" className="pt-4">
          <ChangePasswordForm />
        </TabsContent>
      </Tabs>
    </>
  );
}
