import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

const emptyForm = { artistId: "", designId: "", bookingDate: "", time: "", address: "", numberOfPeople: 1, occasion: "normal" };

function BookingPage() {
  const { artistId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [artists, setArtists] = useState([]);
  const [designs, setDesigns] = useState([]);
  const [formData, setFormData] = useState(() => {
    try { return { ...emptyForm, ...JSON.parse(sessionStorage.getItem("glowhenna-booking") || "{}") }; } catch { return emptyForm; }
  });
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [createdBooking, setCreatedBooking] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [artistResponse, designResponse] = await Promise.all([api.get("/api/artists?limit=100"), api.get("/api/designs")]);
        const artistList = artistResponse.data.data || [];
        const designList = designResponse.data.data || [];
        setArtists(artistList);
        setDesigns(designList);
        const activeArtist = artistList.find((item) => item._id === artistId) || null;
        const designId = searchParams.get("design") || formData.designId;
        const activeDesign = designList.find((item) => item._id === designId) || null;
        if (activeArtist) { setSelectedArtist(activeArtist); setFormData((current) => ({ ...current, artistId: activeArtist._id })); }
        if (activeDesign) { setSelectedDesign(activeDesign); setFormData((current) => ({ ...current, designId: activeDesign._id })); }
      } catch { setError("We could not load the booking choices. Please try again."); } finally { setLoading(false); }
    };
    load();
  }, [artistId, searchParams, formData.designId]);

  const update = (event) => setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  const chooseArtist = (event) => { const artist = artists.find((item) => item._id === event.target.value); setSelectedArtist(artist || null); setFormData((current) => ({ ...current, artistId: event.target.value })); };
  const chooseDesign = (event) => { const design = designs.find((item) => item._id === event.target.value); setSelectedDesign(design || null); setFormData((current) => ({ ...current, designId: event.target.value })); };

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    if (!formData.artistId || !formData.designId || !formData.bookingDate || !formData.time || !formData.address) { setError("Please complete the artist, design, date, time, and address fields."); return; }
    if (!user) { sessionStorage.setItem("glowhenna-booking", JSON.stringify(formData)); navigate("/login", { state: { from: { pathname: `/booking/${formData.artistId}` } } }); return; }
    setSubmitting(true);
    try { const response = await api.post("/api/bookings", formData); sessionStorage.removeItem("glowhenna-booking"); setCreatedBooking(response.data.data); } catch (requestError) { setError(requestError.response?.data?.message || "We could not create that booking. Please try again."); } finally { setSubmitting(false); }
  };

  if (loading) return <div className="loading-state page-loading"><span />Preparing your booking...</div>;
  if (createdBooking) return <main className="page-surface transaction-page"><section className="success-card"><span className="success-mark">✓</span><span className="eyebrow">You&apos;re all set</span><h1>Booking request sent.</h1><p>Your artist details are in. Review the summary below, then complete payment when you&apos;re ready.</p><div className="booking-summary"><div><span>Artist</span><b>{createdBooking.artistId?.name || selectedArtist?.name}</b></div><div><span>Design</span><b>{createdBooking.designId?.designName || selectedDesign?.designName}</b></div><div><span>Date & time</span><b>{new Date(createdBooking.bookingDate).toLocaleDateString("en-IN")} · {createdBooking.time}</b></div><div><span>Total</span><b>₹{createdBooking.totalPrice}</b></div></div><div className="transaction-actions"><button className="primary-button" onClick={() => navigate("/payment", { state: { booking: createdBooking } })}>Proceed to payment <span>→</span></button><button className="quiet-button" onClick={() => navigate("/artists")}>Browse more artists</button></div></section></main>;

  return <main className="page-surface transaction-page"><section className="page-intro transaction-intro"><span className="eyebrow">One calm step at a time</span><h1>Make the booking feel easy.</h1><p>Choose an artist, save a design, and tell us where and when. You&apos;ll review everything before payment.</p></section><form className="booking-layout" onSubmit={submit}><div className="surface-card booking-form"><div className="card-kicker">01 · Choose your match</div><label className="styled-field"><span>Artist</span><select value={formData.artistId} onChange={chooseArtist} required><option value="">Select an available artist</option>{artists.filter((artist) => artist.availability).map((artist) => <option key={artist._id} value={artist._id}>{artist.name} · {artist.location}</option>)}</select></label><label className="styled-field"><span>Design</span><select value={formData.designId} onChange={chooseDesign} required><option value="">Select a design</option>{designs.filter((design) => !selectedArtist || selectedArtist.designTypes?.includes(design.category)).map((design) => <option key={design._id} value={design._id}>{design.designName} · ₹{design.basePrice}</option>)}</select></label>{(selectedArtist || selectedDesign) && <div className="booking-picks">{selectedArtist && <span>Artist: <b>{selectedArtist.name}</b></span>}{selectedDesign && <span>Design: <b>{selectedDesign.designName}</b></span>}</div>}<div className="card-kicker booking-step">02 · Your details</div><div className="booking-two-col"><label className="styled-field"><span>Date</span><input type="date" name="bookingDate" value={formData.bookingDate} onChange={update} min={new Date().toISOString().split("T")[0]} required /></label><label className="styled-field"><span>Preferred time</span><input type="time" name="time" value={formData.time} onChange={update} required /></label></div><div className="booking-two-col"><label className="styled-field"><span>People / hands</span><input type="number" name="numberOfPeople" min="1" max="50" value={formData.numberOfPeople} onChange={update} required /></label><label className="styled-field"><span>Occasion</span><select name="occasion" value={formData.occasion} onChange={update}><option value="normal">Everyday</option><option value="wedding">Wedding</option></select></label></div><label className="styled-field"><span>Address</span><textarea name="address" value={formData.address} onChange={update} placeholder="Where should your artist meet you?" rows="3" required /></label>{error && <div className="auth-alert" role="alert">{error}</div>}<button className="primary-button booking-submit" type="submit" disabled={submitting}>{submitting ? "Sending request..." : user ? "Review booking" : "Continue to sign in"}<span>→</span></button></div><aside className="booking-aside"><div className="card-kicker">Your booking at a glance</div><h2>Good details make a good appointment.</h2><div className="aside-list"><div><span>01</span><p>Choose an artist whose style feels right.</p></div><div><span>02</span><p>Bring one design reference to your appointment.</p></div><div><span>03</span><p>Pay only after reviewing your booking summary.</p></div></div></aside></form></main>;
}

export default BookingPage;