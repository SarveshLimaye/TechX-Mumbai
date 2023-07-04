import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const SuccessPage = () => {
  const { user } = useAuth0();
  const [dbUser, setDbUser] = useState();
  const navigate = useNavigate();

  const params = useParams();
  const eventId = params.id;
  console.log(eventId);
  const upodateTicket = async () => {
    const response = await fetch(
      `http://localhost:5000/api/users/${user.email}`
    );
    const data = await response.json();
    console.log(data);
    setDbUser(data);

    const res1 = await fetch(
      `http://localhost:5000/api/users/update/${data._id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          attendedEvents: eventId,
        }),
      }
    );
    console.log(dbUser._id);
    const res2 = await fetch(
      `http://localhost:5000/api/events/attendees/${eventId}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          attendees: dbUser._id,
        }),
      }
    );
    console.log(res1);
    console.log(res2);
    navigate("/");
  };

  return (
    <div>
      {user && (
        <div>
          <Box textAlign="center" py={10} px={6}>
            <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
            <Heading as="h2" size="xl" mt={6} mb={2}>
              You are registered successfully for the event! Thank you!
            </Heading>
            <Text color={"gray.500"}>
              <button onClick={upodateTicket}>Back to Home Page</button>
            </Text>
          </Box>
        </div>
      )}
    </div>
  );
};

export default SuccessPage;
