import React from "react";
import axios from "axios";
import { IssueContext } from "../context/IssueProvider";

export default function CommentDisplay(props) {

    const { issueId, getComments, comments } = props

    React.useEffect(()=> {
        getComments(issueId)
    }, [])



    const commentDisplay = comments.map((comment, index) => (
        <div key={index}>
            <p>
                {comment.commentText}
            </p>
        </div>
    ))




    return (
        <div>
            {commentDisplay}
        </div>
    )
}