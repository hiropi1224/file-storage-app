import { FileBrowser } from "~/app/dashboard/_components/file-browser";

export default function FilesPage() {
  return (
    <div>
      <h1 className='pb-4 text-4xl font-bold'></h1>
      <FileBrowser title='Your Files' />
    </div>
  );
}
