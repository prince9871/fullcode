// import React, { useState } from 'react';
// import './ProductCreationPopup.css'; // Import your CSS file

// const ProductCreationPopup = ({ isOpen, onClose, onSubmit }) => {
//   const [name, setName] = useState('');
//   const [code, setCode] = useState('');
//   const [quantity, setQuantity] = useState('');

//   const handleSubmit = () => {
//       // Validate input
//       alert('Data Entry Successfull')
//       if (name.trim() === '' || !/^[a-zA-Z0-9]*$/.test(code) || !/^\d+$/.test(quantity)) {
//           // Handle invalid input
//           return;
//         }
        
//         // Call API and store data in the database
//         onSubmit({ name, code, quantity });
//         onClose(); // Close the popup after submitting
//   };

//   return (
    
//     <div className={`popup ${isOpen ? 'open' : ''}`}>
//     <form>
//       <div className="popup-content">
//         <h2>Create Product</h2>
//         <input
//         required="true"
//           type="text"
//           placeholder="Product Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//                 required="true"

//           type="number"
//           placeholder="Product Code"
//           value={code}
//           onChange={(e) => setCode(e.target.value)}
//         />
//         <input
//                 required="true"

//           type="number"
//           placeholder="Product Quantity"
//           value={quantity}
//           onChange={(e) => setQuantity(e.target.value)}
//         />
//         <div className="popup-buttons">
//           <button onClick={onClose}>Cancel</button>
//           <button onClick={handleSubmit}>Submit</button>
//         </div>
//       </div>
//       </form>
//     </div>
//   );
// };

// export default ProductCreationPopup;
