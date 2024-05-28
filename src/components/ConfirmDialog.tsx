import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Dropzone from "@/components/Dropezone";
import DownshiftInput from "./DownshiftInput";
import { useState } from "react";
import { v4 as uuid4 } from "uuid";

function ConfirmDialog() {
  const [categories, setCategories] = useState<string[]>([]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Done</Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-3xl lg:max-w-5xl">
        <DialogHeader>
          <DialogTitle>Complete Blog</DialogTitle>
          <DialogDescription>
            add hero cover to your blog and you're blog category
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col justify-start md:flex-row md:space-x-4 md:space-y-0 space-y-6 ">
          <div className="flex-1">
            <Dropzone />
          </div>
          <div className="flex-1 ">
            <div className="flex flex-col gap-5">
              <DownshiftInput setCategories={setCategories} />
              <div className="flex gap-2 flex-wrap overflow-hidden">
                {categories.map((category) => (
                  <Badge key={uuid4()} className="text-sm">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" className="w-full">
              Done
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmDialog;
