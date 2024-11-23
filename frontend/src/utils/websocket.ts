export const createWebSocket = (url: string) => {
    const socket = new WebSocket(url);
  
    socket.onopen = () => {
      console.log("WebSocket connected");
    };
  
    socket.onmessage = (event) => {
      console.log("Message received:", event.data);
    };
  
    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  
    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };
  
    return socket;
};
