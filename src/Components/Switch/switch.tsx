import {
  FormControlLabel,
  Switch as MuiSwitch,
  Typography,
} from "@mui/material";
import React, { FunctionComponent } from "react";

export const Switch: FunctionComponent<{
  isChecked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void ;
  label?: string;
}> = ({ onChange, isChecked, label, disabled }) => (
  <FormControlLabel
    control={<MuiSwitch checked={isChecked} onChange={(_, v) => onChange(v)} />}
    label={
      <Typography variant="body1" style={{ fontSize: "14px" }}>
        {label}
      </Typography>
    }
    disabled={disabled}
  />
);
