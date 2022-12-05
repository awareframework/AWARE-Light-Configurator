import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { dialogState } from "../../functions/atom";

export const useOpenDialog = () => {
  const setDialog = useSetRecoilState(dialogState);
  return (title, content) => setDialog({ isOpen: true, title, content });
};

export const useCloseDialog = () => {
  const setDialog = useSetRecoilState(dialogState);
  return () => setDialog({ isOpen: false, title: "", content: "" });
};

export default function CustomizedDialog() {
  const dialog = useRecoilValue(dialogState);
  const closeDialog = useCloseDialog();
  return (
    <Dialog
      open={dialog.isOpen}
      onClose={closeDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{dialog.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {dialog.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
