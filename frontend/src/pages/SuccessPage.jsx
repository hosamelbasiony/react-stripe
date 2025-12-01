import { Link } from "react-router-dom";

export default function SuccessPage() {
  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>🎉 Payment Successful!</h1>
      <p>Thank you for your purchase.</p>

      <Link to="/">
        <button style={styles.btn}>Back to Checkout</button>
      </Link>
    </div>
  );
}

const styles = {
  btn: {
    padding: "12px 20px",
    fontSize: "16px",
    marginTop: "20px"
  },
};
