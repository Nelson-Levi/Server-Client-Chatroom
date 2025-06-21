import asyncio
import websockets  

connected_clients = {}

ADDRESS = "0.0.0.0"
PORT = 8765

async def client_connect(websocket):
    try:
        async for message in websocket:
            print(f"Received message {message}")
            request = message.split("|")

            # When we receive a USER request, we'll add that websocket and their username to the dictionary. Then we send out a message to everyone.
            if request[0] == "USER" and len(request) == 2:
                username = request[1]
                print(f"Websocket to Add to Dict: {websocket}")
                connected_clients[websocket] = username
                response = f"{username} joined the server."
                print(connected_clients)
                await broadcast(response)
            
            # When we recieve a MSG request, we simply broadcast it back with the username in front.
            elif request [0] == "MSG" and len(request) == 2:
                message_text = request[1]
                user = connected_clients[websocket]
                response = f"{user}: {message_text}"
                await broadcast(response)

            # When we receive an IMG, we want it to be recognizable to the client as an IMG when we send it back. That's because we're using base64 encoded strings, and we want the client to recognize it as such. So we're going to readd the "IMG|" preface so the client's JavaScript can recognize it.
            elif request[0] == "IMG" and len(request) == 2:
                user = connected_clients[websocket]
                response = request[0] + "|" + user + "|" + request[1]
                await broadcast(response)

            else:
                print(f"Unsupported message received: {message}")
                
    finally:
        disconnected_client = connected_clients.get(websocket)
        if disconnected_client:
            del connected_clients[websocket]
            response = f"{disconnected_client} left the chat."
            print(response)
            await broadcast(response)

async def broadcast(response):
    # This sends the message out to all the clients.
    for clients in connected_clients:
        await clients.send(f"{response}")

async def main():

    async with websockets.serve(client_connect, ADDRESS, PORT, max_size=None):
        print("Websocket server running.")
        await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main())

