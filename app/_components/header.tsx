import {
  OrganizationSwitcher,
  SignInButton,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import { Button } from "~/components/ui/button";

export function Header() {
  return (
    <div className='border-b bg-gray-50 py-4'>
      <div className='container mx-auto flex items-center justify-between'>
        <div>FileDrive</div>
        <div className='flex'>
          <OrganizationSwitcher />
          <UserButton />
          <SignedOut>
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}
