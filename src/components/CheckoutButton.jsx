import Button from "./Button";
import useCheckout from "../hooks/useCheckout";
function CheckoutButton({ bookingId }) {
  const { checkOut, isCheckingOut } = useCheckout(bookingId);
  return (
    <Button variant="primary" size="small" onClick={() => checkOut(bookingId)} disabled={isCheckingOut}>
      Check out
    </Button>
  );
}

export default CheckoutButton;
