import { createPost } from "@/lib/actions";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export const PostsCreateForm = () => {
  return (
    <form action={createPost} className="mt-8 p-4">
      <Label className="mb-2 text-sm font-medium text-gray-700">Image</Label>
      <Input type="file" name="image" />
      <Label className="mt-4 mb-2 text-sm font-medium text-gray-700">Caption</Label>
      <Textarea name="caption" placeholder="input caption"></Textarea>
      <Button className="mt-4" type="submit">Upload</Button>
    </form>
  );
}