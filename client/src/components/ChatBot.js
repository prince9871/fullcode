import React, { useEffect, useState, useRef } from 'react'
import './ChatBot.css'
import ProductCreationPopup from './ProductCreationPopup'
const Chatbot = () => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [inputError, setInputError] = useState(false)
  const messagesEndRef = useRef(null)

  // const handleOpenPopup = () => {
  //   setIsPopupOpen(true);
  // };

  // const handleClosePopup = () => {
  //   setIsPopupOpen(false);
  // };

  const [apiResponse, setApiResponse] = useState(null)
  useEffect(() => {
    // Get the current time
    const currentTime = new Date()
    const hours = currentTime.getHours()

    // Determine the greeting based on the current time
    let greeting = ''
    if (hours >= 3 && hours < 12) {
      greeting = 'Good morning'
    } else if (hours >= 12 && hours < 17) {
      greeting = 'Good afternoon'
    } else {
      greeting = 'Good evening'
    }

    // Set the welcome message with the appropriate greeting
    setMessages([
      {
        text: `${greeting}! Welcome to Chatbot System!  Type "hi" to start.`,
        bot: true
      }
    ])
  }, [])

  useEffect(() => {
    // Scroll to the bottom when new messages are added
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  const handleInputChange = e => {
    setInput(e.target.value)
    // Reset input error when user starts typing
    setInputError(false)
  }

  function capitalizeFirstLetter (text) {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  function capitalizeFirstLetter (text) {
    const words = text.toLowerCase().split(' ')
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1)
    }
    return words.join(' ')
  }

  //for creation part

  const [productName, setProductName] = useState('')
  const [productCode, setProductCode] = useState('')
  const [productQuantity, setProductQuantity] = useState('')
  const [step, setStep] = useState(0) // Step 1: Product Name, Step 2: Product Code, Step 3: Product Quantity

  const sendMessage2 = () => {
    // Validate input
    if (input.trim() === '') {
      setInputError(true)
      return
    }

    // Show loading animation
    setLoading(true)

    // Process user input
    let botMessage = ''
    if (input.toLowerCase() === 'create') {
      botMessage = 'Please enter the product name.'
      setStep(1) // Set step to 1 for product name input
    } else if (step === 1) {
      if (/^[a-zA-Z0-9]*$/.test(input)) {
        setProductName(input)
        botMessage = 'Please enter the product code (numeric only).'
        setStep(2) // Set step to 2 for product code input
      } else {
        botMessage =
          'Product name must be alphanumeric. Please enter a valid name '
      }
    } else if (step === 2) {
      if (/^\d+$/.test(input)) {
        setProductCode(input)
        botMessage = 'Please enter the product quantity (numeric only).'
        setStep(3) // Set step to 3 for product quantity input
      } else {
        botMessage = 'Product code must be numeric. Please enter a valid code.'
      }
    } else if (step === 3) {
      if (/^\d+$/.test(input)) {
        setProductQuantity(input)
        botMessage = 'Product created successfully!'
        // Reset step to 0 after completing the product creation process
      } else {
        botMessage =
          'Product quantity must be numeric. Please enter a valid quantity.'
      }
      // Send data to the backend and create the product in the database
      fetch('http://192.168.1.14:3001/dataCreate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: productName,
          code: productCode,
          quantity: productQuantity
        })
      })
        .then(response => response.json())
        .then(data => {
          setMessages([
            ...messages,
            { text: input, user: true },
            { text: capitalizeFirstLetter(data.message), bot: true }
          ])
          setLoading(false) // Hide loading animation after receiving the response
          setInput('')
          setStep(1) // Reset step to 1 after completing the process
        })
        .catch(error => {
          console.error('Error:', error)
          setLoading(false) // Hide loading animation in case of an error
          setInput('')
          setStep(1) // Reset step to 1 in case of an error
        })
      return
    }

    // Display bot's response and update step
    setTimeout(() => {
      setMessages([
        ...messages,
        { text: input, user: true },
        { text: botMessage, bot: true }
      ])
      setLoading(false) // Hide loading animation after setting the suggestions
      setInput('')
    }, 1000) // Delay the bot's response by 1 second
  }

//   const sendMessage = () => {
//     // Validate input
//     if (input.trim() === '') {
//       setInputError(true)
//       return
//     }

//     // Show loading animation
//     setLoading(true)

//     // Process user input and provide appropriate suggestions
//     let botMessage = ''
//     if (input.toLowerCase() === 'hi') {
//       botMessage = capitalizeFirstLetter(
//         `To get product details, simply enter a product name like 'a', 'b', 'test', or 'test1'. for creation use type create and tap callingcreate button `
//       )
//       setMessages([
//         ...messages,
//         { text: input, user: true },
//         { text: botMessage, bot: true }
//       ])
//       setInput('')
//       setLoading(false) // Hide loading animation after setting the suggestions
//       return
//     }

//     if (input.toLowerCase() === "create") {

//       setStep(0);

//       if (input.trim() === '') {
//         setInputError(true);
//         return;
//       }
//       setLoading(true);
//       let botMessage = '';
//       let exitKeyword = "exit";
    
//       if (step === 0) {
//         botMessage = 'Please enter the product name.';
//         setStep(1); // Set step to 1 for product name input
//       } else if (step === 1) {
//         if (/^[a-zA-Z0-9]*$/.test(input)) {
//           setProductName(input);
//           botMessage = 'Please enter the product code (numeric only) or type "exit" to cancel.';
//           setStep(2); // Set step to 2 for product code input
//         } else {
//           botMessage = 'Product name must be alphanumeric. Please enter a valid name.';
//         }
//       } else if (step === 2) {
//         if (/^\d+$/.test(input)) {
//           setProductCode(input);
//           botMessage = 'Please enter the product quantity (numeric only) or type "exit" to cancel.';
//           setStep(3); // Set step to 3 for product quantity input
//         } else if (input.toLowerCase() === exitKeyword) {
//           botMessage = 'Product creation process canceled.';
//           setStep(0); // Reset step to 0 if user exits the process
//         } else {
//           botMessage = 'Product code must be numeric. Please enter a valid code.';
//         }
//       } else if (step === 3) {
//         if (/^\d+$/.test(input)) {
//           setProductQuantity(input);
//           // Send data to the backend and create the product in the database
//           fetch('http://192.168.1.14:3001/dataCreate', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//               name: productName,
//               code: productCode,
//               quantity: input // Assuming input is the product quantity in this step
//             })
//           })
//             .then(response => response.json())
//             .then(data => {
//               setMessages([
//                 ...messages,
//                 { text: input, user: true },
//                 { text: capitalizeFirstLetter(data.message), bot: true }
//               ]);
//               setLoading(false); // Hide loading animation after receiving the response
//               setInput('');
//               setStep(0); // Reset step to 0 after completing the process
//             })
//             .catch(error => {
//               console.error('Error:', error);
//               setLoading(false); // Hide loading animation in case of an error
//               setInput('');
//               setStep(0); // Reset step to 0 in case of an error
//             });
//           return;
//         } else if (input.toLowerCase() === exitKeyword) {
//           botMessage = 'Product creation process canceled.';
//           setStep(0); // Reset step to 0 if user exits the process
//         } else {
//           botMessage = 'Product quantity must be numeric. Please enter a valid quantity.';
//         }
//       }
    
//       console.log(`before setTimeout`);
//       setTimeout(() => {
//         setMessages([
//           ...messages,
//           { text: input, user: true },
//           { text: botMessage, bot: true }
//         ]);
//         setLoading(false); // Hide loading animation after setting the suggestions
//         setInput('');
//         console.log(`reach to end function`);
//       }, 1000);
//     } else {
    
//     // For other inputs, make a request to the database and display the bot's response after 1 second
//     fetch('http://192.168.1.14:3001/api/messages', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ message: input })
//     })
//       .then(response => response.json())
//       .then(data => {
//         setTimeout(() => {
//           setMessages([
//             ...messages,
//             { text: input, user: true },
//             // { text: data.message, bot: true },
//             { text: capitalizeFirstLetter(data.message), bot: true }
//           ])
//           setLoading(false) // Hide loading animation after receiving the response
//           setInput('')
//         }, 1000) // Delay the bot's response by 1 second
//       })
//       .catch(error => {
//         console.error('Error:', error)
//         setLoading(false) // Hide loading animation in case of an error
//         setInput('')
//       })
//   }
// }






  //popup like system

  const [isPopupOpen, setIsPopupOpen] = useState(false)

 
  
  

  const handlePopupSubmit = data => {
    fetch('http://192.168.1.14:3001/dataCreate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        code: data.code,
        quantity: data.quantity
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Data stored successfully:', data)

        // Handle API response here if needed

        setIsPopupOpen(false) // Close the popup after successful submission
      })
      .catch(error => {
        console.error('Error:', error)

        // Handle API error here if needed
      })
  }

  return (
    <div className='chat-container'>
      <div className='messages'>
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.user
                ? 'message right-message'
                : message.bot
                ? 'message left-message'
                : ''
            }
          >
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      {loading && <div className='loading'>Loading...</div>}
      {inputError && (
        <div className='error-message'>Please type a message.</div>
      )}
      <div className='input-container'>
        <input
          type='text'
          value={input}
          onChange={handleInputChange}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              sendMessage()
            }
          }}
          placeholder='Type your message...'
          className={inputError ? 'input-error' : ''}
        />
        <button onClick={sendMessage}>Send</button>
        <button onClick={sendMessage2}>Create Product</button>
        {/* Your existing UI */}
        {/* Your other UI components */}
        {/* <button onClick={handleOpenPopup}>Create Product</button>
        <ProductCreationPopup
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          onSubmit={handlePopupSubmit}
        /> */}
        {/* Render API response if needed */}
        {/* {apiResponse && (
          <div className='api-response'>
            <h3>API Response:</h3>
            <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
          </div>
        )} */}
      </div>
    </div>
  )
}

export default Chatbot
