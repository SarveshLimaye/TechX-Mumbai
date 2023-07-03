import { useState, useEffect } from "react";
import {
  chakra,
  Stack,
  Flex,
  Button,
  SimpleGrid,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export default function CFPDetails() {
  const dataColor = useColorModeValue("white", "gray.800");
  const bg = useColorModeValue("white", "gray.800");
  const bg2 = useColorModeValue("gray.100", "gray.700");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cfp, setCfp] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    const getCFP = async () => {
      const response = await fetch(
        `http://localhost:5000/api/cfps/event/${id}`
      );
      const data = await response.json();
      console.log(data);
      setCfp(data);
    };

    getCFP();
  }, []);

  const approveCFP = async (id) => {
    const response = await fetch(
      `http://localhost:5000/api/cfps/approval/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    <Flex
      w="full"
      bg="#edf3f8"
      _dark={{
        bg: "gray.800",
      }}
      p={50}
      alignItems="center"
      justifyContent="center"
    >
      <Stack
        direction={{
          base: "column",
        }}
        w="full"
        bg={{
          md: bg,
        }}
        shadow="lg"
      >
        {cfp.map((proposal, pid) => {
          return (
            <Flex
              direction={{
                base: "column",
                md: "column",
              }}
              bg={dataColor}
              key={pid}
            >
              <SimpleGrid
                spacingY={3}
                columns={{
                  base: 1,
                  md: 3,
                }}
                w={{
                  base: 120,
                  md: "full",
                }}
                textTransform="uppercase"
                bg={bg2}
                color={"gray.500"}
                py={{
                  base: 1,
                  md: 4,
                }}
                px={{
                  base: 2,
                  md: 10,
                }}
                fontSize="md"
                fontWeight="hairline"
              >
                <span>Name</span>
                <span>Email</span>
                <chakra.span
                  textAlign={{
                    md: "right",
                  }}
                >
                  Actions
                </chakra.span>
              </SimpleGrid>
              <SimpleGrid
                spacingY={3}
                columns={{
                  base: 1,
                  md: 3,
                }}
                w="full"
                py={2}
                px={10}
                fontWeight="hairline"
              >
                <span>{proposal.userId.name}</span>
                <span>{proposal.userId.email}</span>
                <Flex
                  justify={{
                    md: "end",
                  }}
                >
                  <>
                    <Button
                      variant="solid"
                      colorScheme="green"
                      size="sm"
                      mr={5}
                      onClick={onOpen}
                    >
                      View Proposal
                    </Button>
                    <Modal
                      isCentered
                      onClose={onClose}
                      isOpen={isOpen}
                      motionPreset="slideInBottom"
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>{proposal.title}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>{proposal.description}</ModalBody>
                        <ModalFooter>
                          <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() => approveCFP(proposal._id)}
                          >
                            Approve
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </>
                  <Button
                    variant="solid"
                    colorScheme={proposal.isApproved ? "green" : "red"}
                    size="sm"
                  >
                    {proposal.isApproved ? "Approved" : "Not Approved"}
                  </Button>
                </Flex>
              </SimpleGrid>
            </Flex>
          );
        })}
      </Stack>
    </Flex>
  );
}
