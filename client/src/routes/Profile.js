import React from "react";
import { UserContext } from "../context/UserProvider";
import Issue from "../components/Issue";
import axios from "axios";

export default function Profile() {

  const userAxios = axios.create()

  const [userIssues, setUserIssues] = React.useState([])

  userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
  })

  const { user } = React.useContext(UserContext)
  // console.log(user)

  function getUserIssues(userId) {
    userAxios.get(`/api/issues/${user._id}`)
      .then(res => setUserIssues(res.data))
      .catch(err => console.log(err))
  }

  React.useEffect(()=> {
    getUserIssues(user._id)
  }, [user])

  const issueDisplay = userIssues.map((issue, index) => {
    return (
      <Issue issue={issue} key={index}/>
    )
  })

    return (

      
      <main style={{ padding: "1rem 0" }}>
        {/* <button onClick={()=> console.log(user)}>userstate</button> */}
        <h2>Welcome {user.username}</h2>
        {issueDisplay}
      </main>
    );
  }