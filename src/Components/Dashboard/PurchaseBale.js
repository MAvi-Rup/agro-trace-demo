import React, { useState, useRef } from 'react';
import { Button, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useReactToPrint } from 'react-to-print';
import './PurchaseBale.css'

const TOBACCO_DATA = [
    {
        type: 'Virginia Flue-Cured',
        grades: [
            { externalGrade: 'Lemon', internalGrade: 'S', unitPrice: 100 },
            { externalGrade: 'Lemon', internalGrade: 'F', unitPrice: 95 },
            { externalGrade: 'Lemon', internalGrade: 'L', unitPrice: 90 },
            { externalGrade: 'Orange', internalGrade: 'S', unitPrice: 85 },
            { externalGrade: 'Orange', internalGrade: 'F', unitPrice: 80 },
            { externalGrade: 'Orange', internalGrade: 'L', unitPrice: 75 },
        ],
    },
    {
        type: 'Burley',
        grades: [
            { externalGrade: 'Light', internalGrade: 'F', unitPrice: 80 },
            { externalGrade: 'Light', internalGrade: 'L', unitPrice: 75 },
            { externalGrade: 'Heavy', internalGrade: 'F', unitPrice: 70 },
            { externalGrade: 'Heavy', internalGrade: 'L', unitPrice: 65 },
        ],
    },
];

const PurchaseBale = () => {
    const [tobaccoType, setTobaccoType] = useState(null);
    const [externalGrade, setExternalGrade] = useState(null);
    const [internalGrade, setInternalGrade] = useState(null);
    const [unitPrice, setUnitPrice] = useState(null);
    const [tareQuantity, setTareQuantity] = useState(0);
    const [baleQuantity, setBaleQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const printRef = useRef();

    const handleTobaccoTypeChange = (event, value) => {
        setTobaccoType(value);
        setExternalGrade(null);
        setInternalGrade(null);
        setUnitPrice(null);
    };

    const handleExternalGradeChange = (event, value) => {
        setExternalGrade(value);
        setInternalGrade(null);
        setUnitPrice(
            TOBACCO_DATA.find((t) => t.type === tobaccoType).grades.find((g) => g.externalGrade === value).unitPrice
        );
    };

    const handleInternalGradeChange = (event, value) => {
        setInternalGrade(value);
        setUnitPrice(
            TOBACCO_DATA
                .find((t) => t.type === tobaccoType)
                .grades.find((g) => g.externalGrade === externalGrade && g.internalGrade === value).unitPrice
        );
    };

    const handleTareQuantityChange = (event) => {
        setTareQuantity(Number(event.target.value));
    };
    const handleBaleQuantityChange = (event) => {
        setBaleQuantity(Number(event.target.value));
    };

    const handleReset = () => {
        setTobaccoType(null);
        setExternalGrade(null);
        setInternalGrade(null);
        setUnitPrice(null);
        setTareQuantity(0);
        setBaleQuantity(0);
        setTotalPrice(0);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const totalBaleWeight = baleQuantity - tareQuantity;
        const totalPrice = totalBaleWeight * unitPrice;
        setTotalPrice(totalPrice);
      };
      

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
    });

    return (
        <>
            <div ref={printRef} className="mx-auto" style={{ width: '50%',margin:'auto' }}>
                <h1>Purchase Bale</h1>
                <form onSubmit={handleSubmit} className="purchase-form">
                    <Autocomplete
                        id="tobacco-type"
                        options={TOBACCO_DATA.map((t) => t.type)}
                        value={tobaccoType}
                        onChange={handleTobaccoTypeChange}
                        renderInput={(params) => <TextField {...params} label="Tobacco Type" />}
                    />
                    <Autocomplete
                        id="external-grade"
                        options={tobaccoType ? TOBACCO_DATA.find((t) => t.type === tobaccoType).grades.map((g) => g.externalGrade) : []}
                        value={externalGrade}
                        onChange={handleExternalGradeChange}
                        renderInput={(params) => <TextField {...params} label="External Grade" />}
                    />

                    <Autocomplete
                        id="internal-grade"
                        options={
                            tobaccoType && externalGrade
                                ? TOBACCO_DATA
                                    .find((t) => t.type === tobaccoType)
                                    .grades.filter((g) => g.externalGrade === externalGrade)
                                    .map((g) => g.internalGrade)
                                : []
                        }
                        value={internalGrade}
                        onChange={handleInternalGradeChange}
                        renderInput={(params) => <TextField {...params} label="Internal Grade" />}
                    />

                    <TextField
                        type="number"
                        label="Tare Quantity (Kg)"
                        value={tareQuantity}
                        onChange={handleTareQuantityChange}
                    />
                    <TextField
                        type="number"
                        label="Bale Quantity (Kg)"
                        value={baleQuantity}
                        onChange={handleBaleQuantityChange}
                    />

                    <TextField label="Unit Price" value={unitPrice ? `$${unitPrice}/Kg` : ''} disabled />

                    <TextField label="Total Price" value={totalPrice ? `$${totalPrice.toFixed(2)}` : ''} disabled />

                    <div style={{ marginTop: '1rem' }}>
                        <Button variant="contained" color="primary" type="submit" disabled={!unitPrice}>
                            Calculate
                        </Button>
                        <Button variant="contained" style={{ marginLeft: '1rem' }} onClick={handleReset}>
                            Reset
                        </Button>
                        <Button
                            variant="contained"
                            style={{ marginLeft: '1rem' }}
                            onClick={handlePrint}
                            disabled={!totalPrice}
                        >
                            Print Point of Sale Memo
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default PurchaseBale;
