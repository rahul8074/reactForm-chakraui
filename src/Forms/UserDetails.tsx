import { useImperativeHandle, forwardRef,useState } from "react";
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  Controller,
} from "react-hook-form";
import { Select, chakraComponents } from "chakra-react-select";
import { FaCheck, FaPlus } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Flex,
  Heading,
  Icon,
  VStack,
  InputGroup,
  InputLeftAddon,
  Container,
  Spinner
} from "@chakra-ui/react";

type FormData = {
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  email: string;
  phone: string;
  techStack: { tech: string }[];
};

type Option = {
  label: string;
  value: string;
  icon: any;
};

function UserDetails({onFormSubmit}:any, ref:any) {
  useImperativeHandle(ref, () => ({
    getFormData: () => getValues(),
  }));


  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>({
    defaultValues: {
      techStack: [{ tech: "" }],
    },
  });

  const [loading, setLoading] = useState(false);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "techStack",
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setLoading(true);
    setTimeout(() => {
      onFormSubmit()
      setLoading(false);
    },3000)
  
    console.log("form submit data::", data);
  };

  const handleAddTech = () => {
    append({ tech: "" });
  };

  const handleRemoveTech = (index: number) => {
    remove(index);
  };

  const groupedOptions: Option[] = [
    { label: "Male", value: "Male", icon: <Icon as={FaCheck} color="green" /> },
    {
      label: "Female",
      value: "Female",
      icon: <Icon as={FaCheck} color="green" />,
    },
    {
      label: "Others",
      value: "Others",
      icon: <Icon as={FaCheck} color="green" />,
    },
  ];

  const customComponents: any = {
    Option: ({ children, isSelected, ...props }: any) => (
      <chakraComponents.Option {...props}>
        {children}
        {isSelected && (
         <Box as="div"  w="full" display="flex" justifyContent="flex-end">
         <Icon as={FaCheck} color="green" />
       </Box>
        )}
      </chakraComponents.Option>
    ),
  };

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
      <Box>
        <Heading as="h1" size="md" mb={4}>
          Basic Details
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Basic Details */}
          <Flex justify="space-between" mb={4}>
            <FormControl isInvalid={!!errors.firstName} flex="1" mr={2}>
              <FormLabel htmlFor="firstName">First Name</FormLabel>
              <Input
                id="firstName"
                placeholder="Enter First Name"
                {...register("firstName", {
                  required: "First name is required.",
                  pattern: {
                    value: /^[a-zA-Z\s]*$/,
                    message: "First name is incorrect",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.firstName && errors.firstName.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.lastName} flex="1" ml={2}>
              <FormLabel htmlFor="lastName">Last Name</FormLabel>
              <Input
                id="lastName"
                placeholder="Enter Last Name"
                {...register("lastName", {
                  required: "Last name is required",
                  pattern: {
                    value: /^[a-zA-Z\s]*$/,
                    message: "Last name is incorrect.",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.lastName && errors.lastName.message}
              </FormErrorMessage>
            </FormControl>
          </Flex>

          {/* Email and Phone */}
          <Flex justify="space-between" mb={4}>
            <FormControl isInvalid={!!errors.email} flex="1" mr={2}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                placeholder="Enter Email Address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/,
                    message: "Email format is incorrect",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.phone} flex="1" ml={2}>
              <FormLabel htmlFor="phone">Mobile Number</FormLabel>
              <Flex align="center">
                <InputGroup>
                  <InputLeftAddon children="+91" />
                  <Input
                    id="phone"
                    placeholder="Mobile Number"
                    type="tel"
                    maxLength={10}
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      if (target.value.length >= 10) {
                        e.preventDefault();
                        e.stopPropagation();
                      }
                    }}
                    {...register("phone", {
                      required: "Mobile number is required.",
                      pattern: {
                        value: /^[6-9]\d{9}$/,
                        message: "Please enter a valid 10-digit mobile number.",
                      },
                    })}
                  />
                </InputGroup>
              </Flex>
              <FormErrorMessage>
                {errors.phone && errors.phone.message}
              </FormErrorMessage>
            </FormControl>
          </Flex>

          {/* Other Information */}
          <Flex justify="space-between" mb={4}>
            <FormControl isInvalid={!!errors.gender} flex="1" mr={2}>
              <FormLabel htmlFor="gender">Gender</FormLabel>
              <Controller
                name="gender"
                control={control}
                defaultValue=""
                rules={{ required: "Please select your gender" }}
                render={({ field }) => (
                  <Select
                    isMulti={false}
                    options={groupedOptions}
                    placeholder="Select Gender"
                    closeMenuOnSelect={true}
                    selectedOptionColor="purple"
                    components={customComponents}
                    {...field}
                  />
                )}
              />
              <FormErrorMessage>
                {errors.gender && errors.gender.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.dob} flex="1" ml={2}>
              <FormLabel htmlFor="dob">Date of Birth</FormLabel>
              <Input
                type="date"
                id="dob"
                {...register("dob", { required: "Date of Birth is required" })}
              />
              <FormErrorMessage>
                {errors.dob && "Please select your date of birth"}
              </FormErrorMessage>
            </FormControl>
          </Flex>

          {/* Tech Stack */}
          <Box as="div" w="50%">
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
              <Heading as="h1" size="md">
                Tech Stack
              </Heading>
              <Icon
                as={FaPlus}
                mr={2}
                size="lg"
                onClick={handleAddTech}
                color="black"
              />
            </Flex>
            <VStack spacing={4}>
              {fields.map((field, index) => (
                <Flex key={field.id}>
                  <FormControl isInvalid={!!errors.techStack?.[index]?.tech} flex="1">
                    <Input
                      defaultValue={field.tech}
                      {...register(`techStack.${index}.tech`, {
                        required: `Tech ${index+1} is required`,
                      })}
                      placeholder={`Tech ${index + 1}`}
                    />
                    <FormErrorMessage>
                    {errors.techStack?.[index]?.tech && errors.techStack[index].tech.message}
                    </FormErrorMessage>
                  </FormControl>
                  {index !== 0 && (
                    <Icon
                      cursor="pointer"
                      as={ImCross}
                      ml={-6}
                      zIndex={2}
                      mt={2.5}
                      size="xs"
                      onClick={() => handleRemoveTech(index)}
                    />
                  )}
                </Flex>
              ))}
            </VStack>
          </Box>

          <Button
            float="right"
            backgroundColor={"blue.400"}
            colorScheme="teal"
            type="submit"
            size="lg"
            minWidth="120px" 
          >
            {loading ? <Spinner size="sm" color="" /> : "Submit"}
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default forwardRef(UserDetails);
