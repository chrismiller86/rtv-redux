import React from "react";
import { IssueContext } from "../context/IssueProvider";
import CommentForm from "./CommentForm";
import CommentDisplay from "./CommentDisplay";
import { UserContext } from "../context/UserProvider";
import axios from "axios";

export default function Issue(props) {

    const { handleUpvote, handleDownvote, deleteIssue } = React.useContext(IssueContext)
    const { user } = React.useContext(UserContext)
    
    // Comment props and display handling
    const userAxios = axios.create()
    userAxios.interceptors.request.use(config => {
        const token = localStorage.getItem("token")
        config.headers.Authorization = `Bearer ${token}`
        return config
    })

    // in issueprovider
    // const [comments, setComments] = React.useState([])
    // in issueprovider
    // function getComments(id) {
    //   userAxios.get(`/api/issues/getcomments/${id}`)
    //       .then(res => setComments(res.data))
    //       .catch(err => console.log(err))
    // } 
  //   function postComment(id, commentObject) {
  //     userAxios.post(`/api/issues/addcomment/${id}`, commentObject)
  //         // .then(res => setComments(prevComments => [...prevComments, commentObject]))
  //         .then(res => setComments(prevComments => [...prevComments, commentObject]))
  //         .catch(err => console.log(err))
  // }




    const { issue, isProfilePage } = props
    const numberOfUpvotes = issue.likedBy.length
    const numberOfDownvotes = issue.dislikedBy.length

    return (
      <div className="issue issueGridContainer">
        <div className="issue--gridArea1">
          <div className="issue--content">
            <h2 className="issue--title">{issue.title}</h2>
            <h3>{issue.description}</h3>
          </div>
          <div className="issue--scoring">
            <span>Score: {numberOfUpvotes - numberOfDownvotes}</span>
            <span>Upvotes: {numberOfUpvotes}</span>
            <span>Downvotes: {numberOfDownvotes}</span>
            <br />
            {!isProfilePage && 
              <>
                <button className="issue--voteBtn" onClick={() => handleUpvote(issue._id)}>Upvote</button> 
                <button className="issue--voteBtn" onClick={()=> handleDownvote(issue._id)}>Downvote</button>
              </>
            }
          </div>
        </div>
        <div className="issue--gridArea2">
          
          <CommentDisplay 
            issueId={issue._id} 
            // getComments={getComments}
            // comments={comments}
            // setComments={setComments}
          />

        </div>
        <div className="issue--gridArea3">
          {isProfilePage && <button className="issue--deleteBtn" onClick={()=> deleteIssue(issue._id, user._id)}>Delete Post</button>}
          {!isProfilePage && 
          <>
            <h2>Submit a Comment</h2>
            <CommentForm 
              issue={issue} 
              // postComment={postComment} 
              user={user} 
            />
          </>
          }
        </div>


    </div>
    )
}