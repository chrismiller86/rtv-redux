import React from "react";
import { IssueContext } from "../context/IssueProvider";
import Issue from "../components/Issue";

export default function Issues() {
    
  const { issues, handleUpvote, handleDownvote } = React.useContext(IssueContext)
  




  const issueDisplay = issues.map((issue, index) => {
    const numberOfUpvotes = issue.likedBy.length
    const numberOfDownvotes = issue.dislikedBy.length

    return (
      <Issue issue={issue} key={index}/>
    )
  })
  
  return (
      <main style={{ padding: "1rem 0" }}>
        <h2>Issues</h2>
        {issueDisplay}
      </main>
    );
  }