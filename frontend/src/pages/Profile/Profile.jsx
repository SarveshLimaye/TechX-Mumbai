import { Heading, Text, Grid, GridItem, Center, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Home from "../Home/Home";
import AttendedEventCard from "../../components/AttendedEventCard/AttendedEventCard";

export const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [attendedEvents, setAttendedEvents] = useState([]);
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(
        `http://localhost:5000/api/users/${user.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setName(data.name);
      setEmail(data.email);
      setImage(data.image);
      setAttendedEvents(data.attendedEvents);
    };
    if (isAuthenticated) {
      getUser();
    }
  }, [user.email, isAuthenticated]);

  return (
    <div>
      <Grid templateColumns="repeat(5, 1fr)" gap={4} m={12}>
        <GridItem colSpan={1} m={5}>
          <Center>
            <Image src={image} width={150} height={150} ml={7} />
          </Center>
        </GridItem>
        <GridItem colStart={3} colEnd={6} mt={5}>
          <Heading size="lg" ml={10}>
            Welcome back {name}
          </Heading>
          <Text fontSize="xl" ml={12} mt={4}>
            Email: {email}
          </Text>
        </GridItem>
      </Grid>
      <Center>
        <Heading size="lg" mt={10} mb={3}>
          Registered Events
        </Heading>
      </Center>
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={6}
        ml="20px"
        alignItems="right"
      >
        {attendedEvents.map((event) => (
          <div key={event._id}>
            <AttendedEventCard event={event} />
          </div>
        ))}
      </Grid>
    </div>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <Home />,
});
