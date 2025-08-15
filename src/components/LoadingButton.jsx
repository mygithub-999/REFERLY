import { Button, Fade, CircularProgress } from "@mui/material";

export default function LoadingButton({ loading, children, ...props }) {
  return (
    <Button {...props} disabled={loading}>
      {loading ? (
        <Fade in={loading}>
          <CircularProgress size={20} />
        </Fade>
      ) : (
        children
      )}
    </Button>
  );
}
