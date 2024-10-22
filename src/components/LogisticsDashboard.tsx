import React, { useState } from 'react';
import '../App.css';
import WarehouseInventory from './WarehouseInventory';
import DeliveryStatus from './DeliveryStatus';

const LogisticsDashboard: React.FC = () => {
  const [warehouseItems, setWarehouseItems] = useState<number>(100); // Start with 100 items
  const [isTruckLeft, setIsTruckLeft] = useState<boolean>(false);
  const [dispatchCount, setDispatchCount] = useState<number>(0); // Count of dispatched trucks
  const [inputCount, setInputCount] = useState<number>(5); // Input for items (default to 5)

  const handleTruckDeparture = () => {
    // Check if there are enough items and input is valid
    if (warehouseItems >= inputCount && inputCount > 0) {
      const newCount = warehouseItems - inputCount;
      if (newCount < 20) {
        alert("Cannot dispatch. Minimum warehouse items must be 20."); // Alert for minimum items
      } else {
        setWarehouseItems(newCount); // Decrease item count by user input
        setDispatchCount((prevCount) => prevCount + 1); // Increment dispatch count
        setIsTruckLeft(true); // Update truck status
      }
    } else {
      alert("Not enough items in warehouse or invalid input."); // Alert for insufficient items
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    // Check if the value is within the valid range
    if (value < 5 || value > 20) {
      alert("Please enter a number between 5 and 20."); // Alert if outside range
    } else {
      setInputCount(value); // Update the input count
    }
  };

  return (
    <div className="dashboard">
      <h1>Logistics Dashboard</h1>
      <input
        type="number"
        value={inputCount}
        onChange={handleInputChange}
        min="5"
        max="20"
        placeholder="Set dispatch count (5-20)"
      />
      <div className="dashboard-content">
        <WarehouseInventory itemCount={warehouseItems} />
        <DeliveryStatus isTruckLeft={isTruckLeft} onTruckDeparture={handleTruckDeparture} />
        <h3>Trucks Dispatched: {dispatchCount}</h3> {/* Display count of dispatched trucks */}
      </div>
    </div>
  );
};

export default LogisticsDashboard;
