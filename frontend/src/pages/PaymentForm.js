import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import "./PaymentForm.css"; // Importing CSS

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  // Form Fields
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("Male"); 
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [doctor, setDoctor] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");

  // Auto-generate current date
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; 
    setDate(today);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (paymentMethod === "card") {
      const { data } = await axios.post("http://localhost:5000/api/payment/pay", {
        patientName: name,
        age,
        sex,
        phone,
        email,
        address,
        doctor,
        amount,
        date,
      });

      const { clientSecret } = data;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { name, email, phone },
        },
      });

      if (result.paymentIntent) {
        setMessage("✅ Payment Successful!");
      } else {
        setMessage("❌ Payment Failed! Try Again.");
      }
    } else if (paymentMethod === "qr") {
      const qrPaymentUrl = `https://your-payment-gateway.com/pay?amount=${amount}&name=${encodeURIComponent(name)}&date=${date}`;
      setQrCodeUrl(qrPaymentUrl);
      setMessage("Scan the QR Code to complete payment.");
    }
  };

  return (
    <div className="payment-container">
      <h2>🏥 Hospital Payment Portal</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input type="text" placeholder="Patient Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
        </div>

        <div className="input-group">
          <select value={sex} onChange={(e) => setSex(e.target.value)} required>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>

        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" placeholder="Home Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
        <input type="text" placeholder="Doctor's Name" value={doctor} onChange={(e) => setDoctor(e.target.value)} required />
        <input type="date" value={date} disabled />
        <input type="number" placeholder="Amount (₹)" value={amount} onChange={(e) => setAmount(e.target.value)} required />

        <div className="payment-method">
          <label>
            <input type="radio" name="paymentMethod" value="card" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} />
            💳 Pay with Card
          </label>
          <label>
            <input type="radio" name="paymentMethod" value="qr" checked={paymentMethod === "qr"} onChange={() => setPaymentMethod("qr")} />
            📷 Pay with QR Code
          </label>
        </div>

        {paymentMethod === "card" && <CardElement className="card-input" />}
        {paymentMethod === "qr" && qrCodeUrl && <QRCodeCanvas value={qrCodeUrl} size={200} />}

        <button type="submit" disabled={!stripe && paymentMethod === "card"}>💰 Pay Now</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default PaymentForm;
