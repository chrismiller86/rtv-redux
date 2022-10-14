import React from "react";
import { IssueContext } from "../context/IssueProvider";
import CommentForm from "./CommentForm";
import CommentDisplay from "./CommentDisplay";
import { UserContext } from "../context/UserProvider";
import axios from "axios";

export default function Issue(props) {

    const { handleUpvote, handleDownvote, deleteIssue } = React.useContext(IssueContext)
    const { user } = React.useContext(UserContext)

    const [ commentToggle, setCommentToggle] = React.useState(false)
    
    // Comment props and display handling
    const userAxios = axios.create()
    userAxios.interceptors.request.use(config => {
        const token = localStorage.getItem("token")
        config.headers.Authorization = `Bearer ${token}`
        return config
    })

    const [comments, setComments] = React.useState([])
    function getComments(id) {
      userAxios.get(`/api/issues/getcomments/${id}`)
          .then(res => setComments(res.data))
          .catch(err => console.log(err))
    } 
    function postComment(id, commentObject) {
      userAxios.post(`/api/issues/addcomment/${id}`, commentObject)
          .then(res => setComments(prevComments => [...prevComments, commentObject]))
          .catch(err => console.log(err))
  }




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
        <CommentDisplay 
          issueId={issue._id} 
          getComments={getComments}
          comments={comments}
          setComments={setComments}
        />
        {!isProfilePage && 
          <button onClick={()=> setCommentToggle(prev => !prev)}>{commentToggle ? "Cancel Comment": "Leave a Comment"}</button>
        }
        {commentToggle && <CommentForm 
          issue={issue} 
          postComment={postComment} 
          user={user} 
          setCommentToggle={setCommentToggle} />
        }
        {isProfilePage && <button onClick={()=> deleteIssue(issue._id, user._id)}>Delete Issue</button>}

      </div>
    )
}