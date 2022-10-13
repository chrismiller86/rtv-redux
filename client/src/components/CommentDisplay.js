import React from "react";
import axios from "axios";
import { IssueContext } from "../context/IssueProvider";

export default function CommentDisplay(props) {
    
    const userAxios = axios.create()

    const { issueId } = props
    const [comments, setComments] = React.useState([])

    userAxios.interceptors.request.use(config => {
        const token = localStorage.getItem("token")
        config.headers.Authorization = `Bearer ${token}`
        return config
    })
    function getComments(id) {
        userAxios.get(`/api/issues/getcomments/${id}`)
            .then(res => setComments(res.data))
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
        <div>
            {commentDisplay}
        </div>
    )
}