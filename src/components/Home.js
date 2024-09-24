// new
import React, { useContext } from 'react'; // Import useContext
import { Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/ct'; // Correct the context import

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // Access user from context

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        textAlign="center"
      >
        {/* Welcome Heading */}
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to My Calendar App
        </Typography>

        {/* Description */}
        <Typography variant="h6" component="p" gutterBottom>
          Stay organized and manage your time effectively. {user ? "Access your calendar below." : "Sign in to access your personalized calendar!"}
        </Typography>

        {/* Buttons */}
        <Box mt={4}>
          {user ? (
            // Show Go to Calendar button if the user is logged in
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              onClick={() => navigate('/dashboard')}
            >
              Go to Calendar
            </Button>
          ) : (
            // Show Get Started button if the user is not logged in
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/login')}
              sx={{ marginRight: 2 }}
            >
              Get Started
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Home;






// old
// import React from 'react';
// import { Button, Container, Typography, Box } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const Home = () => {
//   const navigate = useNavigate();

//   return (
//     <Container maxWidth="md">
//       <Box
//         display="flex"
//         flexDirection="column"
//         justifyContent="center"
//         alignItems="center"
//         minHeight="100vh"
//         textAlign="center"
//       >
//         {/* Welcome Heading */}
//         <Typography variant="h2" component="h1" gutterBottom>
//           Welcome to My Calendar App
//         </Typography>

//         {/* Description */}
//         <Typography variant="h6" component="p" gutterBottom>
//         Stay organized and manage your time effectively. Sign in to access your personalized calendar!
//         </Typography>

//         {/* Buttons */}
//         <Box mt={4}>
//           <Button
//             variant="contained"
//             color="primary"
//             size="large"
//             onClick={() => navigate('/login')}
//             sx={{ marginRight: 2 }}
//           >
//             Get Started
//           </Button>
//           <Button
//             variant="outlined"
//             color="secondary"
//             size="large"
//             onClick={() => navigate('/dashboard')}
//           >
//             Go to Calendar
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default Home;
