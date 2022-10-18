import React from "react";
import axios from "axios";
import { IssueContext } from "../context/IssueProvider";

export default function CommentDisplay(props) {

    const { issueId} = props
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
        <div className="commentDisplay">
            <button onClick={()=> console.log(comments)}>comments</button>
            <h2>Comments</h2>
            {commentDisplay}
        </div>
    )
}