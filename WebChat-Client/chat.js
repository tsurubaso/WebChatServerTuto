const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7108/chatHub")
    .configureLogging(signalR.LogLevel.Information)
    .build();
//1:12:25

const start = async () => {
    try {
        await connection.start();
        console.log("Connected");

    } catch (error) {
        console.log(error);
    }
}

const joinUser = async () => {
    const name = window.prompt("Enter username");
    if (name) {
        sessionStorage.setItem("user", name);
        await joinChat(name);
    }
    console.log(getUser());

};


const joinChat = async (user) => {

    if(!user) return;
    try {
       const message = `${user} joined the chat`;
        await connection.invoke("JoinChat", user, message);
        alert(message);
    } catch (error) {
        console.log(error);
    }
}


const getUser = () => {
    return sessionStorage.getItem("user");
};

const receiveMessage = async () => {
try {
    await connection.on("ReceiveMessage", (user, message) => {
    
    console.log(message);
    
    });
    
} catch (error) {
    console.log(error); 
}


};
const startApp = async () => {
    await start();
    await joinUser();
    await receiveMessage();
}

startApp();