import React, { useState } from "react";
import { Box, Button, Container, Input, Stack, Image, Text, VStack, Heading, useToast } from "@chakra-ui/react";
import { FaUpload } from "react-icons/fa";

const Index = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
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

  const imagesPreview = selectedFiles.map((file, index) => (
    <Box key={index} boxShadow="sm" borderRadius="md" overflow="hidden">
      <Image src={file} alt={`preview ${index}`} maxH="200px" w="auto" />
    </Box>
  ));

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={8}>
        <Heading>Image Upload</Heading>
        <Input type="file" accept="image/*" multiple onChange={handleFileChange} size="lg" height="100px" width="300px" />
        <Button leftIcon={<FaUpload />} onClick={handleUpload}>
          Upload Images
        </Button>
        {selectedFiles.length > 0 && (
          <Text fontSize="lg" my={4}>
            Preview:
          </Text>
        )}
        <Stack direction={{ base: "column", md: "row" }} spacing={4}>
          {imagesPreview}
        </Stack>
      </VStack>
    </Container>
  );
};

export default Index;
