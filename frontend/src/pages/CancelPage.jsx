import { Link } from "react-router-dom";

export default function CancelPage() {
  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>❌ Payment Canceled</h1>
      <p>Your payment was not completed.</p>

      <Link to="/">
        <button style={styles.btn}>Try Again</button>
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
