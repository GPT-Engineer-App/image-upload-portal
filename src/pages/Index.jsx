import React, { useState, useRef } from "react";
import { Icon, Box, Button, Container, Input, Stack, Image, Text, VStack, Heading, useToast } from "@chakra-ui/react";
import { FaUpload, FaPaperclip } from "react-icons/fa";

const Index = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [inputText, setInputText] = useState("");
  const toast = useToast();

  const handleFileChange = (event) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files).map((file) => URL.createObjectURL(file));
      setSelectedFiles((prevImages) => prevImages.concat(filesArray));
      Array.from(event.target.files).map((file) => URL.revokeObjectURL(file));
    }
  };

  const fileInputRef = useRef(null);

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleUpload = () => {
    // Since we don't have a backend, show a toast notification instead
    toast({
      title: "Success!",
      description: "Images have been 'uploaded'.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleRemoveImage = (index) => {
    setSelectedFiles((currentFiles) => currentFiles.filter((_, i) => i !== index));
  };

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={8}>
        <Heading>Image Upload</Heading>
        <Box position="relative" size="lg" height="100px" width="300px" padding="8px" border="1px solid" borderColor="gray.200" _placeholder={{ color: "gray.500" }}>
          <Box as="label" position="absolute" top="-10px" left="-15px" p="24px" cursor="pointer">
            <input type="file" accept="image/*" multiple onChange={handleFileChange} ref={fileInputRef} hidden />
            <FaPaperclip color="gray.300" />
          </Box>
          <Input value={inputText} onChange={(e) => setInputText(e.target.value)} variant="unstyled" placeholder="" />
          <Box>
            {selectedFiles.map((file, index) => (
              <Box position="relative" key={index}>
                <Image src={file} alt={`preview ${index}`} boxSize="80px" objectFit="cover" />
                <Button position="absolute" right="2" top="2" size="xs" borderRadius="full" bg="black" _hover={{ bg: "blackAlpha.800" }} onClick={() => handleRemoveImage(index)} zIndex="10">
                  <Icon viewBox="0 0 24 24" color="white">
                    <path d="M18 6L6 18" fill="white" />
                    <path d="M6 6L18 18" fill="white" />
                  </Icon>
                </Button>
              </Box>
            ))}
            <Text>{inputText}</Text>
          </Box>
        </Box>
        {/* The InputGroup containing the file input and paperclip icon has been removed */}
        <Button leftIcon={<FaUpload />} onClick={handleUpload}>
          Upload Images
        </Button>
        {/* The preview and images stack has been removed as the images will now appear directly in the editable box above. */}
      </VStack>
    </Container>
  );
};

export default Index;
