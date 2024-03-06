import React, { useState } from "react";
import { Box, Button, Container, Input, Stack, Image, Text, VStack, Heading, useToast } from "@chakra-ui/react";
import { FaUpload } from "react-icons/fa";

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
        <Box value={inputText} onChange={(e) => setInputText(e.target.value)} size="lg" height="100px" width="300px" padding="8px" border="1px solid" borderColor="gray.200" contentEditable _placeholder={{ color: "gray.500" }} dangerouslySetInnerHTML={{ __html: imagesPreview + inputText }} />
        <Input type="file" accept="image/*" multiple onChange={handleFileChange} size="lg" height="100px" width="300px" />
        <Button leftIcon={<FaUpload />} onClick={handleUpload}>
          Upload Images
        </Button>
        {/* The preview and images stack has been removed as the images will now appear directly in the editable box above. */}
      </VStack>
    </Container>
  );
};

export default Index;
