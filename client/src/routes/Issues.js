import React from "react";
import { IssueContext } from "../context/IssueProvider";
import Issue from "../components/Issue";
import PostIssueForm from "../components/PostIssueForm";

export default function Issues() {
    
  const { issues, postIssue, comments } = React.useContext(IssueContext)
  
  const sortedIssues = issues.sort((b, a) => (a.likedBy.length - a.dislikedBy.length) - (b.likedBy.length - b.dislikedBy.length))




  const issueDisplay = sortedIssues.map((issue, index) => {
    // const numberOfUpvotes = issue.likedBy.length
    // const numberOfDownvotes = issue.dislikedBy.length
    return (
      <Issue issue={issue} key={index}/>
    )
  })
  
  return (
      <main style={{ padding: "1rem 0" }}>
        <div className="issues--header">
          <h2>Issues</h2>
          <button onClick={() => console.log(issues)}>issues</button>
          <button onClick={() => console.log(comments)}>comments</button>
        </div>
        <PostIssueForm postIssue={postIssue} />
        {issueDisplay}
      </main>
    );
  }