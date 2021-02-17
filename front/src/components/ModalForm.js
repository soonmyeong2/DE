import { Backdrop, Fade, Modal } from "@material-ui/core";
import { useEffect, useState } from "react";
function ModalForm({ openProp, children, onOpenProp }) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open !== openProp) {
      setOpen(openProp);
    }
  }, [openProp]);
  useEffect(() => {
    if (open !== openProp) {
      onOpenProp(open);
    }
  }, [open]);
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="modal"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>{children}</Fade>
      </Modal>
    </>
  );
}

export default ModalForm;
