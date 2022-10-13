import React from "react";
import { IssueContext } from "../context/IssueProvider";
import CommentForm from "./CommentForm";
import CommentDisplay from "./CommentDisplay";

export default function Issue(props) {

    const { handleUpvote, handleDownvote } = React.useContext(IssueContext)

    const [ commentToggle, setCommentToggle] = React.useState(false)

    const { issue } = props
    const numberOfUpvotes = issue.likedBy.length
    const numberOfDownvotes = issue.dislikedBy.length

    return (
        <div>
        <h2>{issue.title}</h2>
        <h3>{issue.description}</h3>
        <p>Score: {numberOfUpvotes - numberOfDownvotes}</p>
        <p>Upvotes: {numberOfUpvotes}</p>
        <p>Downvotes: {numberOfDownvotes}</p>
        <button onClick={() => handleUpvote(issue._id)}>Upvote</button> <button onClick={()=> handleDownvote(issue._id)}>Downvote</button>
        <br/>
        <CommentDisplay issueId={issue._id} />
        <button onClick={()=> setCommentToggle(prev => !prev)}>{commentToggle ? "Cancel Comment": "Leave a Comment"}</button>
        {commentToggle && <CommentForm />}

      </div>
    )
}