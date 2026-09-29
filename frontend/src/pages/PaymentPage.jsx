import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

function PaymentPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const booking = state?.booking;
  const [processing, setProcessing] = useState(false);
  const [payment, setPayment] = useState(null);
  const [error, setError] = useState("");

  if (!booking) return <main className="page-surface page-loading"><div className="empty-state"><span>⌁</span><h2>Your payment session has expired.</h2><p>Open your booking again to continue.</p><button className="primary-button" onClick={() => navigate("/booking")}>Return to booking <span>→</span></button></div></main>;

  const pay = async () => {
    setProcessing(true);
    setError("");
    try { const response = await api.post("/api/payment", { bookingId: booking._id }); setPayment(response.data.data); } catch (requestError) { setError(requestError.response?.data?.message || "Payment could not be completed. Please try again."); } finally { setProcessing(false); }
  };

  if (payment) return <main className="page-surface transaction-page"><section className="success-card"><span className="success-mark">✓</span><span className="eyebrow">Payment complete</span><h1>Your booking is confirmed.</h1><p>The artist has your appointment details. Keep this confirmation for your records.</p><div className="booking-summary"><div><span>Transaction</span><b className="mono-value">{payment.transactionId}</b></div><div><span>Paid on</span><b>{new Date(payment.paymentDate).toLocaleString("en-IN")}</b></div><div><span>Status</span><b className="status-text">{payment.paymentStatus}</b></div><div><span>Amount</span><b>₹{payment.amount}</b></div></div><div className="transaction-actions"><button className="primary-button" onClick={() => navigate("/")}>Back to home <span>→</span></button><button className="quiet-button" onClick={() => window.print()}>Print receipt</button></div></section></main>;

  return <main className="page-surface transaction-page"><section className="page-intro transaction-intro"><span className="eyebrow">Final review</span><h1>Everything look right?</h1><p>This demo payment records your booking. In production, this step connects to a secure payment gateway.</p></section><section className="payment-layout"><div className="surface-card payment-review"><div className="card-kicker">Appointment summary</div><div className="booking-summary"><div><span>Artist</span><b>{booking.artistId?.name}</b></div><div><span>Design</span><b>{booking.designId?.designName}</b></div><div><span>Date & time</span><b>{new Date(booking.bookingDate).toLocaleDateString("en-IN")} · {booking.time}</b></div><div><span>Address</span><b>{booking.address}</b></div><div><span>People</span><b>{booking.numberOfPeople}</b></div></div>{error && <div className="auth-alert" role="alert">{error}</div>}<button className="primary-button payment-submit" onClick={pay} disabled={processing}>{processing ? "Processing payment..." : `Pay ₹${booking.totalPrice}`}<span>→</span></button><button className="quiet-button payment-back" onClick={() => navigate(-1)}>Back to booking</button></div><aside className="payment-aside"><span className="payment-lock">⌁</span><h2>A small, secure finish.</h2><p>Your booking details are sent securely to the GlowHenna service. This demo does not collect card information.</p><div className="status-text">● Payment gateway ready</div></aside></section></main>;
}

export default PaymentPage;