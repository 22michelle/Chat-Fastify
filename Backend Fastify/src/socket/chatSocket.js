let messages = [{ message: "Hola, Cómo le ha ido?", hour: 1676133498585 }];

export const socket = (fastify) => {
  fastify.io.on("connection", (socket) => {
    console.log("Usuario Connectado", socket.id);

    const sendMessages = () => {
      fastify.io.emit("server:getMessages", messages);
    };

    sendMessages();

    socket.on("client:addMessage", (message) => {
      messages.push(message);
      sendMessages();
    });

    socket.on("disconnect", () => {
      console.log("Usuario desconectado", socket.id);
    });
  });
};
