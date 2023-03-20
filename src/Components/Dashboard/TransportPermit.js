import React, { useRef, useState } from 'react';
import QRCode from 'qrcode.react';
import './TransportPermit.css';
import { useReactToPrint } from 'react-to-print';
import useFarmers from '../../Hooks/useFarmers';
import axios from 'axios';

const TransportPermit = () => {
  const [baleQuantity, setBaleQuantity] = useState(0);
  const [buyingDate, setBuyingDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [qrValue, setQrValue] = useState('');
  const [farmerPhone, setFarmerPhone] = useState('');
  //const [farmerName, setFarmerName] = useState('');
  const qrCodeRef = useRef(null);
  const formRef = useRef(null);
  const [farmers, setFarmers] = useFarmers()

  const handleIssuePermitClick = async () => {
    console.log(farmers)

    // calculate expiry date (3 days after buying date)
    const expiryDate = new Date(buyingDate);
    expiryDate.setDate(expiryDate.getDate() + 3);
    setExpiryDate(expiryDate.toISOString().slice(0, 10));

    farmers.map(async (farmer) => {
      if (farmer.phone === farmerPhone) {
        //setFarmerName(farmer.farmersName)
        console.log(farmer.farmersName)
        const { farmersName, area, nid } = farmer
        // generate QR code value
        const newQrValue = `Farmer Name: ${farmersName}\nFarmer Phone: ${farmerPhone}\nBale Quantity: ${baleQuantity}\nBuying Date: ${buyingDate}\nExpiry Date: ${expiryDate}`;
        setQrValue(newQrValue);
        try {
          const response = await axios.post('http://localhost:5001/tp-permits', {
            farmersName,
            area,
            nid,
            farmerPhone,
            baleQuantity,
            buyingDate,
            expiryDate,
            newQrValue
          });
          console.log('Permit data saved successfully', response.data);
        } catch (error) {
          console.error('Error saving permit data', error);
        }
      }
    });




    // send POST request to backend API


    formRef.current.reset();
  };


  const handlePrintPermitClick = useReactToPrint({
    content: () => qrCodeRef.current,
  });

  return (
    <div className="form-container">
      <h1>Issue Transport Permit</h1>
      <form ref={formRef} style={{ margin: '25px' }}>
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
              <div ref={qrCodeRef} style={{ padding: '30px' }}>
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
