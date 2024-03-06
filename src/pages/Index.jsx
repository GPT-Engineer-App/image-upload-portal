import React, { useState, useRef } from "react";
import { Box, Button, Container, Input, Stack, Image, Text, VStack, Heading, useToast, InputGroup, InputLeftElement } from "@chakra-ui/react";
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

  const imagesPreview = selectedFiles.map((file, index) => `<img src="${file}" alt="preview ${index}" style="max-height: 200px; width: auto;" />`).join("");

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
          <Box height="100px" width="300px" overflow="hidden" display="flex" flexWrap="wrap">
            {selectedFiles.map((file, index) => (
              <Image key={index} src={file} alt={`preview ${index}`} boxSize="65px" objectFit="cover" />
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
