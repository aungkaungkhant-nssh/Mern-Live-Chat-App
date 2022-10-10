exports.getSender = (loginUser,chatList)=>{
    return loginUser._id === chatList.users[0]._id ? chatList.users[1] : chatList.users[0]
}