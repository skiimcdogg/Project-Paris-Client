import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true, // Cookie is sent to client when using this service. (used for session)
});

function errorHandler(error) {
  if (error.response.data) {
    console.log(error.response && error.response.data);
    throw error;
  }
  throw error;
}

const apiHandler = {
  service,

  signup(userInfo) {
    return service
      .post("/api/auth/signup", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signin(userInfo) {
    return service
      .post("/api/auth/signin", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  isLoggedIn() {
    return service
      .get("/api/auth/isLoggedIn")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  logout() {
    return service
      .get("/api/auth/logout")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getMonumentsList() {
    return service
      .get("/api/places/monuments")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getUsersList() {
    return service
      .get("/api/user")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  deleteUser(id) {
    return service
      .delete(`/api/user/delete/${id}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  

  getMuseumsList() {
    return service
      .get("/api/places/museums")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getMonument(id) {
    return service
      .get(`/api/places/monument/${id}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getMuseum(id) {
    return service
      .get(`/api/places/museum/${id}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getComments() {
    return service
      .get(`/api/comments`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  addCommentMonument(id,newComment){
    return  service
    .post(`/api/comments/new/monument/${id}`,newComment)
    .then((res) => res.data)
    .catch(errorHandler);
  },

  addCommentMuseum(id,newComment){
    return  service
    .post(`/api/comments/new/museum/${id}`,newComment)
    .then((res) => res.data)
    .catch(errorHandler);
  },

  deleteComment(id){
    console.log("working");
    return  service
    .delete(`/api/comments/delete/${id}`)
    .then((res) => res.data )
    .catch(errorHandler);
  },

  editComment(id,updComment){
    console.log("working");
    return  service
    .patch(`/api/comments/edit/${id}`,updComment)
    .then((res) => res.data )
    .catch(errorHandler);
  },
  
  getFavorites() {
    return service
      .get(`/api/favorites`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  addFavorites(id) {
    return service
    .post(`/api/favorites/add/${id}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  deleteFavorites(id) {
    return service
    .delete(`/api/favorites/delete/${id}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },
};

export default apiHandler;
