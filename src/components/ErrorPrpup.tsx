import { Dialog, DialogContent } from "./ui/dialog";

const ErrorPopup = ({
  open,
  error,
  setOpen,
  setSelectedRange,
  selectedRange,
}: {
  open: boolean;
  error: string;
  selectedRange: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedRange: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleClose = () => {
    setOpen(false);
    if (selectedRange === "max") {
      setSelectedRange("1w");
    }
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[380px] md:max-w-[480px] flex flex-col gap-8 xl:max-w-1/2 min-h-[50vh]">
        <p className="text-xl mt-4 underline text-blue-600 text-center">
          Request Failed
        </p>
        <p>{error}</p>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorPopup;
