import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Switch } from "@/components/ui/Switch";
import { ButtonPrimary, ButtonSecondary } from "@/components/ui/Button";

export const metadata = { title: "Settings — MigraHub" };

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  const [firstName = "", lastName = ""] = (session?.user?.name ?? "").split(" ");

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <PageHeader title="Settings" />

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <form className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" name="firstName" defaultValue={firstName} />
            <Input label="Last Name" name="lastName" defaultValue={lastName} />
          </div>
          <Input label="Email" type="email" name="email" defaultValue={session?.user?.email ?? ""} />
          <div>
            <ButtonPrimary type="submit">Save Changes</ButtonPrimary>
          </div>
        </form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <div className="divide-y divide-border">
          <Switch label="Email" defaultChecked />
          <Switch label="SMS" />
          <Switch label="Push" defaultChecked />
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
        </CardHeader>
        <div className="flex gap-2">
          <ButtonSecondary size="sm">Light</ButtonSecondary>
          <ButtonSecondary size="sm">Dark</ButtonSecondary>
          <ButtonSecondary size="sm">System</ButtonSecondary>
        </div>
      </Card>
    </div>
  );
}
