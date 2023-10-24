// import React, { useState } from "react";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";

// function Login() {
//   const [user, setUser] = useState({
//     username: "",
//     password: "",
//     password_confirmation: "",
//   });

//   const [errors, setErrors] = useState([]);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setUser({
//       ...user,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // You can perform validation and registration logic here
//     // Example: Send a POST request to your backend with the user data
//   };

//   return (
//     <Container>
//       <div>
//         <h1>Login</h1>
//         {errors.length > 0 && (
//           <div>
//             <ul>
//               {errors.map((message, index) => (
//                 <li key={index}>{message}</li>
//               ))}
//             </ul>
//           </div>
//         )}
//         <Form onSubmit={handleSubmit}>
//           <Form.Group>
//             <Form.Label>Username</Form.Label>
//             <Form.Control
//               type="text"
//               name="name"
//               value={user.username}
//               onChange={handleInputChange}
//             />
//           </Form.Group>

//           <Form.Group>
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               type="password"
//               name="password"
//               value={user.password}
//               onChange={handleInputChange}
//             />
//           </Form.Group>

//           <Button variant="primary" type="submit">
//             Submit
//           </Button>
//         </Form>
//       </div>
//     </Container>
//   );
// }

// export default Login;
