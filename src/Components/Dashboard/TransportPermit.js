import React, { useRef, useState } from 'react';
import QRCode from 'qrcode.react';
import './TransportPermit.css';
import { useReactToPrint } from 'react-to-print';

const TransportPermit = () => {
  const [baleQuantity, setBaleQuantity] = useState(0);
  const [buyingDate, setBuyingDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [qrValue, setQrValue] = useState('');
  const [farmerPhone, setFarmerPhone] = useState('');
  const qrCodeRef = useRef(null);
  const formRef = useRef(null);

  const handleIssuePermitClick = () => {
    // calculate expiry date (3 days after buying date)
    const expiryDate = new Date(buyingDate);
    expiryDate.setDate(expiryDate.getDate() + 3);
    setExpiryDate(expiryDate.toISOString().slice(0, 10));

    // generate QR code value
    const newQrValue = `Farmer Phone: ${farmerPhone}\nBale Quantity: ${baleQuantity}\nBuying Date: ${buyingDate}\nExpiry Date: ${expiryDate}`;
    setQrValue(newQrValue);
    formRef.current.reset();
  };

  const handlePrintPermitClick = useReactToPrint({
    content: () => qrCodeRef.current,
  });

  return (
    <div className="form-container">
      <h1>Issue Transport Permit</h1>
      <form ref={formRef} style={{margin:'25px'}}>
        <label>
          Farmer Phone:
          <input type="text" onChange={(e) => setFarmerPhone(e.target.value)} />
        </label>
        <br />
        <label>
          Bale Quantity:
          <input
            type="number"
            onChange={(e) => setBaleQuantity(e.target.value)}
          />
        </label>
        <br />
        <label>
          Buying Date:
          <input type="date" onChange={(e) => setBuyingDate(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleIssuePermitClick}>
          Issue Permit
        </button>
        {qrValue && (
          <>
            <button type="button" onClick={handlePrintPermitClick}>
              Print Permit
            </button>
            <div id="permit-details">
              <div ref={qrCodeRef} style={{padding:'30px'}}>
                <h2>Tobacco Transport Permit</h2>
                <h2>Farmers Phone: {farmerPhone}</h2>
                <p>Bale Quantity: {baleQuantity}</p>
                <p>Expiry Date: {expiryDate}</p>
                <QRCode value={qrValue} size={120} />
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default TransportPermit;
