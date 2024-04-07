import moment from "moment";

import { Text, VStack, Container, HStack, Box } from "@chakra-ui/react";

function ShowFormDetails({ formData }: any) {
  function formatDate(dateString: string) {
    return moment(dateString).format("DD/MM/YYYY");
  }
  return (
    <Container
      maxW="xl"
      mx="auto"
      mt={8}
      p={6}
      pb={16}
      borderWidth="1px"
      borderRadius="lg"
    >
      <VStack align="start" spacing={4}>
        <HStack>
          <Text fontWeight="bold">First Name:</Text>
          <Text>{formData.firstName}</Text>
        </HStack>
        <HStack>
          <Text fontWeight="bold">Last Name:</Text>
          <Text>{formData.lastName}</Text>
        </HStack>
        <HStack>
          <Text fontWeight="bold">Email Address:</Text>
          <Text>{formData.email}</Text>
        </HStack>
        <HStack>
          <Text fontWeight="bold">Phone Number:</Text>
          <Text>+91{formData.phone}</Text>
        </HStack>
        <HStack>
          <Text fontWeight="bold">Gender:</Text>
          <Text>{formData.gender.value}</Text>
        </HStack>
        <HStack>
          <Text fontWeight="bold">Date of Birth:</Text>
          <Text>{formatDate(formData.dob)}</Text>
        </HStack>
        <HStack>
          <Text fontWeight="bold">Tech Stack:</Text>
          <Box>
            <Text>
              {formData.techStack.map((item: any) => item.tech).join(", ")}
            </Text>
          </Box>
        </HStack>
      </VStack>
    </Container>
  );
}

export default ShowFormDetails;
