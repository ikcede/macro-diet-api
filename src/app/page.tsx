'use client';

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CodeIcon from '@mui/icons-material/Code';

export default function Component() {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <AppBar position="static">
        <Toolbar>
          <CodeIcon sx={{ mr: 1, color: '#b7a1ff' }} />
          <Typography
            component="div"
            sx={{ flexGrow: 1, fontSize: '20px', color: '#b7a1ff' }}
          >
            API Docs
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ mt: 4, mb: 2, flex: '1 0 auto' }}>
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          id="introduction"
        >
          Introduction
        </Typography>
        <Typography paragraph>
          Welcome to our API documentation. This guide will help you
          understand how to interact with our API endpoints, authenticate
          your requests, and make the most of our services.
        </Typography>
        <Typography variant="h3" gutterBottom id="authentication">
          Authentication
        </Typography>
        <Typography paragraph>
          To use our API, you'll need to authenticate your requests. We use
          OAuth 2.0 for authentication. Here's how to get started:
        </Typography>
        <ol>
          <li>Register your application to get a client ID and secret.</li>
          <li>Implement the OAuth 2.0 flow in your application.</li>
          <li>
            Include the access token in the Authorization header of your
            API requests.
          </li>
        </ol>
        <Typography variant="h3" gutterBottom id="endpoints">
          Endpoints
        </Typography>
        <Typography paragraph>
          Our API provides the following main endpoints:
        </Typography>
        <ul>
          <li>
            <Typography component="span" fontWeight="bold">
              /users
            </Typography>{' '}
            - Manage user accounts
          </li>
          <li>
            <Typography component="span" fontWeight="bold">
              /posts
            </Typography>{' '}
            - Create, read, update, and delete posts
          </li>
          <li>
            <Typography component="span" fontWeight="bold">
              /comments
            </Typography>{' '}
            - Interact with comments on posts
          </li>
        </ul>
        <Typography paragraph>
          For detailed information on each endpoint, including
          request/response formats and examples, please refer to the
          sections below.
        </Typography>
        <Typography variant="h3" gutterBottom id="users">
          Users
        </Typography>
        <Typography paragraph>
          The Users endpoint allows you to manage user accounts. You can
          create new users, retrieve user information, update user details,
          and delete user accounts.
        </Typography>
        <Typography variant="h4" gutterBottom>
          GET /users
        </Typography>
        <Typography paragraph>
          Retrieve a list of all users or a specific user by ID.
        </Typography>
        <Typography variant="h4" gutterBottom>
          POST /users
        </Typography>
        <Typography paragraph>Create a new user account.</Typography>
        <Typography variant="h3" gutterBottom id="posts">
          Posts
        </Typography>
        <Typography paragraph>
          The Posts endpoint allows you to manage blog posts. You can
          create new posts, retrieve post information, update post content,
          and delete posts.
        </Typography>
        <Typography variant="h4" gutterBottom>
          GET /posts
        </Typography>
        <Typography paragraph>
          Retrieve a list of all posts or a specific post by ID.
        </Typography>
        <Typography variant="h4" gutterBottom>
          POST /posts
        </Typography>
        <Typography paragraph>Create a new blog post.</Typography>
        <Typography variant="h3" gutterBottom id="comments">
          Comments
        </Typography>
        <Typography paragraph>
          The Comments endpoint allows you to manage comments on blog
          posts. You can create new comments, retrieve comment information,
          update comment content, and delete comments.
        </Typography>
        <Typography variant="h4" gutterBottom>
          GET /comments
        </Typography>
        <Typography paragraph>
          Retrieve a list of all comments or comments for a specific post.
        </Typography>
        <Typography variant="h4" gutterBottom>
          POST /comments
        </Typography>
        <Typography paragraph>
          Create a new comment on a blog post.
        </Typography>
      </Container>
    </Box>
  );
}
