## Overview

**Project Title**:
Server-Client Online Chatroom

**Project Description**:
This project creates a webserver with Python, utilizing the websocket library. This server is locally hosted and can accept multiple clients. Clients can connect to the server and visit an online chatroom, where they can share messages and images. Messages are broadcasted to all connected clients. 

**Project Goals**:
1. Demonstrate understanding of client-server connections.
2. Allow for the reception and broadcast of multiple kinds of client requests, including text and images.
3. Create a web service through the use of a locally hosted server.

## Instructions for Build and Use

Steps to build and/or run the software:

1. Ensure that both scripts/chatroom.js and scripts/index.js files are listening on the correct address. By default, they are set to localhost, port 8765. You may also choose to edit the ADDRESS and PORT constant variables in websocket_server.py.
2. In a terminal, start the websocket server with the following command: py websocket_server.py.
3. In a terminal, start the web server with the following command: python -m http.server 8000.

Instructions for using the software:

1. Once the web server and websocket server are running, visit the web server in a web browser such as Google Chrome. By default, it can be accessed at http://localhost:8000.
2. Enter a username.
3. Collaborate with other online users.

## Development Environment 

To recreate the development environment, you need the following software and/or libraries with the specified versions:

* Visual Studio Code 1.99.3
* Python Version 3.13.4
* Websockets Library, version 15.0.1

## Useful Websites to Learn More

I found these websites useful in developing this software:

* [Websockets Official Documentation](https://pypi.org/project/websockets/)
* [W3Schools](https://www.w3schools.com/)
* [Geeks for Geeks - Socket Programming in Python](https://www.geeksforgeeks.org/python/socket-programming-python/)
* Several Stack Overflow threads
* [Networking Workshop (Python)](https://video.byui.edu/media/t/1_4o1tpofn)

## Future Work

The following items I plan to fix, improve, and/or add to this project in the future:

* [ ] Host the service on a public domain.
* [ ] Display a list of online users.
* [ ] Create separate chatrooms.
