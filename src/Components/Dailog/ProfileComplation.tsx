import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React, { FunctionComponent } from "react";

export const ProfileDialog: FunctionComponent<{
  isOpen: boolean;
  onCancel: () => void;
  onOkClick: () => void;
  title: string;
}> = ({ isOpen, onCancel, onOkClick, title}) => (

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
      To access the chat feature, please complete your profile by filling in all required fields. Thank you!
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel} autoFocus>
        Cancel
      </Button>
      <Button onClick={onOkClick} autoFocus>
       Ok
      </Button>
    </DialogActions>
  </Dialog>
);
