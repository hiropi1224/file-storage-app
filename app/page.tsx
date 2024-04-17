"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { FileCard } from "~/app/_components/file-card";
import { SearchBar } from "~/app/_components/search-bar";
import { UploadButton } from "~/app/_components/upload-button";
import { api } from "~/convex/_generated/api";

export default function Home() {
  const organization = useOrganization();
  const user = useUser();
  const [query, setQuery] = useState("");

  let orgId: string | undefined = undefined;

  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const files = useQuery(api.files.getFiles, orgId ? { orgId, query } : "skip");
  const isLoading = files === undefined;

  return (
    <main className='container mx-auto pt-12'>
      {isLoading && (
        <div className='flex w-full flex-col items-center gap-8'>
          <Loader2 className='size-32 animate-spin text-gray-500' />
          <div className='text-2xl'>Loading your images...</div>
        </div>
      )}

      {!isLoading && (
        <>
          <div className='flex items-center justify-between'>
            <h1 className='pb-4 text-4xl font-bold'>Your Files</h1>
            <SearchBar query={query} setQuery={setQuery} />
            <UploadButton />
          </div>

          {files.length === 0 && <Placeholder />}

          <div className='grid grid-cols-3 gap-4'>
            {files?.map((file) => <FileCard key={file._id} file={file} />)}
          </div>
        </>
      )}
    </main>
  );
}

function Placeholder() {
  return (
    <div className='flex w-full flex-col items-center gap-8'>
      <Image
        src='/empty.svg'
        width={300}
        height={300}
        alt='an image of a picture and directory icon'
      />
      <div className='text-2xl'>You have no files, upload one now</div>

      <UploadButton />
    </div>
  );
}
