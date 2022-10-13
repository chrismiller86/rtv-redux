import React from "react";
import { IssueContext } from "../context/IssueProvider";
import CommentForm from "./CommentForm";
import CommentDisplay from "./CommentDisplay";
import { UserContext } from "../context/UserProvider";

export default function Issue(props) {

    const { handleUpvote, handleDownvote, deleteIssue } = React.useContext(IssueContext)
    const { user } = React.useContext(UserContext)

    const [ commentToggle, setCommentToggle] = React.useState(false)

    const { issue, isProfilePage } = props
    const numberOfUpvotes = issue.likedBy.length
    const numberOfDownvotes = issue.dislikedBy.length

    return (
        <div>
        <h2>{issue.title}</h2>
        <h3>{issue.description}</h3>
        <p>Score: {numberOfUpvotes - numberOfDownvotes}</p>
        <p>Upvotes: {numberOfUpvotes}</p>
        <p>Downvotes: {numberOfDownvotes}</p>
        {!isProfilePage && 
          <>
            <button onClick={() => handleUpvote(issue._id)}>Upvote</button> 
            <button onClick={()=> handleDownvote(issue._id)}>Downvote</button>
          </>
        }
        <br/>
        <CommentDisplay issueId={issue._id} />
        {!isProfilePage && 
          <button onClick={()=> setCommentToggle(prev => !prev)}>{commentToggle ? "Cancel Comment": "Leave a Comment"}</button>
        }
        {commentToggle && <CommentForm />}
        {isProfilePage && <button onClick={()=> deleteIssue(issue._id, user._id)}>Delete Issue</button>}

      </div>
    )
}