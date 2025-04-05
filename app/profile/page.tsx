import { fetchMe } from "@/lib/apis"

import { ProfileEditForm } from "@/components/profile/profile-edit-form";

export default async function ProfilePage() {
  const user = await fetchMe();

  return (
    <div className="mx-auto max-w-5xl mt-8 p-4 bg-gray-50">
      <header>
        <h2 className="text-lg font-medium text-gray-900">Account info</h2>
        <p className="mt-1 text-sm text-gray-600">account info and update mail address</p>
      </header>

      <ProfileEditForm user={user} />
    </div>
  );
}
