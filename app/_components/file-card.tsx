import { useMutation } from "convex/react";
import {
  FileTextIcon,
  GanttChartIcon,
  ImageIcon,
  MoreVertical,
  TrashIcon,
} from "lucide-react";
import Image from "next/image";
import { ReactNode, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/convex/_generated/api";
import { Doc, Id } from "~/convex/_generated/dataModel";

type Props = {
  file: Doc<"files">;
};

function getFileUrl(fileId: Id<"_storage">) {
  return `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${fileId}`;
}

export function FileCard({ file }: Props) {
  const typeIcons = {
    image: <ImageIcon />,
    pdf: <FileTextIcon />,
    csv: <GanttChartIcon />,
  } as Record<Doc<"files">["type"], ReactNode>;

  return (
    <Card>
      <CardHeader className='relative'>
        <CardTitle className='flex gap-2'>
          <div>{typeIcons[file.type]}</div>
          {file.name}
          <div className='absolute right-2 top-4'>
            <FileCardAction file={file} />
          </div>
        </CardTitle>
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent className='flex h-[200px] items-center justify-center'>
        {file.type === "image" && (
          <Image
            alt={file.name}
            width={200}
            height={200}
            src={getFileUrl(file.fileId)}
          />
        )}
        {file.type === "csv" && typeIcons["csv"]}
        {file.type === "pdf" && typeIcons["pdf"]}
      </CardContent>
      <CardFooter className='flex justify-center'>
        <Button>Download</Button>
      </CardFooter>
    </Card>
  );
}

function FileCardAction({ file }: Props) {
  const { toast } = useToast();

  const deleteFile = useMutation(api.files.deleteFile);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  return (
    <>
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                // TODO: actually delete the file
                await deleteFile({ fileId: file._id });
                toast({
                  variant: "default",
                  title: "File delete",
                  description: "Your file is now gone from the system",
                });
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel
            className='flex cursor-pointer items-center gap-1 text-red-600'
            onClick={() => setIsConfirmOpen(true)}
          >
            <TrashIcon className='size-4' />
            Delete
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
