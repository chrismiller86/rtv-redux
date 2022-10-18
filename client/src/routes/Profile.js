import React from "react";
import { UserContext } from "../context/UserProvider";
import Issue from "../components/Issue";
import axios from "axios";
import { IssueContext } from "../context/IssueProvider";

export default function Profile() {

  const { user } = React.useContext(UserContext)
  const { getUserIssues, userIssues} = React.useContext(IssueContext)

  React.useEffect(()=> {
    getUserIssues(user._id)
  }, [user])
  function capitalizeName(string) {
    return string[0].toUpperCase() + string.substring(1)
  }

  const issueDisplay = userIssues.map((issue, index) => {
    return (
      <Issue issue={issue} key={index} isProfilePage={true}/>
    )
  })

    return (

      
      <main style={{ padding: "1rem 0" }}>
        <div className="profile--welcome">
          <h2>Welcome {capitalizeName(user.username)}</h2>
        </div>
        {issueDisplay}
      </main>
    );
  }