import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React, { FunctionComponent } from "react";

export const ChatDialogClose: FunctionComponent<{
  isOpen: boolean;
  onCancel: () => void;
  onDeleteClick: () => void;
  title: string;
}> = ({ isOpen, onCancel, onDeleteClick, title}) => (

  <Dialog
    open={isOpen}
    onClose={onCancel}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      {title}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Are you sure you want to Close this.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel} autoFocus>
        Cancel
      </Button>
      <Button onClick={onDeleteClick} autoFocus>
        Ok
      </Button>
    </DialogActions>
  </Dialog>
);
