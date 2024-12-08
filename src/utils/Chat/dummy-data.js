export const users = [
   {
     id: 1,
     name: "Jane Cooper",
     avatar: "/avatars/jane-cooper.jpg",
     status: "Active Now",
     isOnline: true
   },
   {
     id: 2,
     name: "Jenny Wilson",
     avatar: "/avatars/jenny-wilson.jpg",
     lastSeen: "2d ago",
     isOnline: true
   },
   {
     id: 3,
     name: "Marvin McKinney",
     avatar: "/avatars/marvin-mckinney.jpg",
     lastSeen: "1m ago",
     isOnline: true
   },
   {
     id: 4,
     name: "Eleanor Pena",
     avatar: "/avatars/eleanor-pena.jpg",
     lastSeen: "1m ago",
     isOnline: false
   },
   {
     id: 5,
     name: "Ronald Richards",
     avatar: "/avatars/ronald-richards.jpg",
     lastSeen: "2m ago",
     isOnline: true
   }
 ]
 
 export const messages = [
   {
     id: 1,
     userId: 1,
     text: "Hello and thanks for signing up to the course. If you have any questions about the course or Adobe XD, feel free to get in touch and I'll be happy to help 😊",
     timestamp: "Today"
   },
   {
     id: 2,
     userId: 2,
     text: "Hello, Good Evening!",
     timestamp: "2 min ago"
   },
   {
     id: 3,
     userId: 1,
     text: "I'm Zafor",
     timestamp: "1 min ago"
   },
   {
     id: 4,
     userId: 2,
     text: "I only have a small doubt about your lecture, can you give me some time for this?",
     timestamp: "Just now"
   },
   {
     id: 5,
     userId: 1,
     text: "Yeah sure, tell me zafor",
     timestamp: "Just now"
   }
 ]
 
 export const conversations = users.map(user => ({
   id: user.id,
   user,
   lastMessage: messages[Math.floor(Math.random() * messages.length)]
 }))
 
 