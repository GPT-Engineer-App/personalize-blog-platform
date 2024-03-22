import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Select, Stack, Text, Textarea, Image, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { FaPlus, FaMoon, FaSun } from "react-icons/fa";

const themes = {
  light: {
    bg: "gray.100",
    color: "gray.800",
  },
  dark: {
    bg: "gray.800",
    color: "white",
  },
};

const layouts = ["Single Column", "Two Columns", "Grid"];

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [selectedLayout, setSelectedLayout] = useState("Single Column");
  const { toggleColorMode } = useColorMode();
  const bg = useColorModeValue("white", "gray.700");

  const addPost = () => {
    if (title && content) {
      const newPost = {
        id: posts.length + 1,
        title,
        content,
      };
      setPosts([...posts, newPost]);
      setTitle("");
      setContent("");
    }
  };

  const renderLayout = () => {
    switch (selectedLayout) {
      case "Two Columns":
        return (
          <Stack direction={["column", "row"]} spacing={8}>
            {posts.map((post) => (
              <Box key={post.id} width={["100%", "50%"]} p={4} bg={bg} borderRadius="md" boxShadow="md">
                <Heading as="h2" size="lg" mb={2}>
                  {post.title}
                </Heading>
                <Text>{post.content}</Text>
              </Box>
            ))}
          </Stack>
        );
      case "Grid":
        return (
          <Stack direction={["column", "row"]} spacing={8} flexWrap="wrap">
            {posts.map((post) => (
              <Box key={post.id} width={["100%", "33.33%"]} p={4} bg={bg} borderRadius="md" boxShadow="md">
                <Heading as="h2" size="lg" mb={2}>
                  {post.title}
                </Heading>
                <Text>{post.content}</Text>
              </Box>
            ))}
          </Stack>
        );
      default:
        return posts.map((post) => (
          <Box key={post.id} p={4} bg={bg} borderRadius="md" boxShadow="md" mb={4}>
            <Heading as="h2" size="lg" mb={2}>
              {post.title}
            </Heading>
            <Text>{post.content}</Text>
          </Box>
        ));
    }
  };

  return (
    <Container maxW="container.lg" py={8}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={8}>
        <Heading as="h1" size="2xl">
          My Blog
        </Heading>
        <Button onClick={toggleColorMode}>{selectedTheme === "light" ? <FaMoon /> : <FaSun />}</Button>
      </Stack>

      <Stack direction={["column", "row"]} spacing={8} mb={8}>
        <Box width={["100%", "50%"]}>
          <Image src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxibG9nJTIwd3JpdGluZ3xlbnwwfHx8fDE3MTExMDkyNTN8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="Blog" borderRadius="md" />
        </Box>
        <Box width={["100%", "50%"]}>
          <FormControl id="theme" mb={4}>
            <FormLabel>Select Theme</FormLabel>
            <Select value={selectedTheme} onChange={(e) => setSelectedTheme(e.target.value)}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </Select>
          </FormControl>
          <FormControl id="layout" mb={4}>
            <FormLabel>Select Layout</FormLabel>
            <Select value={selectedLayout} onChange={(e) => setSelectedLayout(e.target.value)}>
              {layouts.map((layout) => (
                <option key={layout} value={layout}>
                  {layout}
                </option>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Stack>

      <Box mb={8}>
        <Heading as="h2" size="xl" mb={4}>
          Add New Post
        </Heading>
        <Stack spacing={4}>
          <FormControl id="title">
            <FormLabel>Title</FormLabel>
            <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </FormControl>
          <FormControl id="content">
            <FormLabel>Content</FormLabel>
            <Textarea value={content} onChange={(e) => setContent(e.target.value)} />
          </FormControl>
          <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={addPost}>
            Add Post
          </Button>
        </Stack>
      </Box>

      <Box bg={themes[selectedTheme].bg} color={themes[selectedTheme].color} p={8} borderRadius="md">
        {renderLayout()}
      </Box>
    </Container>
  );
};

export default Index;
