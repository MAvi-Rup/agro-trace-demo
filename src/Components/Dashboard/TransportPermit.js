import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const TransportPermit = () => {
  const [farmerName, setFarmerName] = useState('');
  const [baleQuantity, setBaleQuantity] = useState(0);
  const [permitNumber, setPermitNumber] = useState('');
  const [buyingDate, setBuyingDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const handleIssuePermitClick = () => {
    // calculate expiry date (3 days after buying date)
    const expiryDate = new Date(buyingDate);
    expiryDate.setDate(expiryDate.getDate() + 3);
    setExpiryDate(expiryDate.toISOString().slice(0, 10));

    // generate permit number (random number between 10000 and 99999)
    const newPermitNumber = Math.floor(Math.random() * 90000) + 10000;
    setPermitNumber(newPermitNumber.toString());
  };

  const handlePrintPermitClick = () => {
    const printContents = document.getElementById('permit-details').innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  return (
    <div>
      <h1>Issue Transport Permit</h1>
      <form>
        <label>
          Farmer Name:
          <input type="text" value={farmerName} onChange={(e) => setFarmerName(e.target.value)} />
        </label>
        <br />
        <label>
          Bale Quantity:
          <input
            type="number"
            value={baleQuantity}
            onChange={(e) => setBaleQuantity(e.target.value)}
          />
        </label>
        <br />
        <label>
          Buying Date:
          <input
            type="date"
            value={buyingDate}
            onChange={(e) => setBuyingDate(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleIssuePermitClick}>
          Issue Permit
        </button>
        {permitNumber && (
          <button type="button" onClick={handlePrintPermitClick}>
            Print QR Code
          </button>
        )}
      </form>
      {permitNumber && (
        <div id="permit-details">
          <h2>Tobacco Transport Permit</h2>
          <p>Permit Number: {permitNumber}</p>
          <p>Farmer Name: {farmerName}</p>
          <p>Bale Quantity: {baleQuantity}</p>
          <p>Buying Date: {buyingDate}</p>
          <p>Expiry Date: {expiryDate}</p>
          <QRCode value={`Permit Number: ${permitNumber}\nFarmer Name: ${farmerName}\nBale Quantity: ${baleQuantity}\nBuying Date: ${buyingDate}\nExpiry Date: ${expiryDate}`} size={256} />
        </div>
      )}
    </div>
  );
};

export default TransportPermit;
