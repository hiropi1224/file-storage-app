import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

export function Header() {
  return (
    <div className='border-b bg-gray-50 py-4'>
      <div className='container mx-auto flex items-center justify-between'>
        <div>FileDrive</div>
        <div className='flex'>
          <OrganizationSwitcher />
          <UserButton />
        </div>
      </div>
    </div>
  );
}
