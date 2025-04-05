import { updateMe } from "@/lib/actions";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export const ProfileEditForm = ({
  user
}: {
  user: {
    name: string;
    email: string;
    image: string | null;
    description: string | null;
  },
}) => {
  return (
    <form className="mt-6 space-y-6" action={updateMe}>
      <div>
        <Label className="text-sm font-medium text-gray-700" htmlFor="name">Name</Label>
        <Input className="mt-1" type="text" defaultValue={user.name} name="name" required  id="name"/>
      </div>
      {user.description && (
        <div>
          <Label className="text-sm font-medium text-gray-700">Description</Label>
          <Input className="mt-1" type="text" defaultValue={user.description} name="description" />
        </div>
      )}
      <div>
        <Button type='submit'>Send</Button>
      </div>
    </form>
  );
}