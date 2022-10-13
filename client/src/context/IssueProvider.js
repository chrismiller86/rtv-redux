import React, { useState } from "react";
import axios from 'axios'
import { UserContext } from "./UserProvider";

export const IssueContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function IssueProvider(props){

    const user = JSON.parse(localStorage.getItem("user"))

    const [issues, setIssues] = React.useState([])

    function getIssues() {
        userAxios.get('/api/issues')
            .then(res => {
                setIssues(res.data)
            })
            .catch(err => console.log(err))
    }    



    // does this need a dependency to fix auth to issue problem?    
    React.useEffect(()=> {
        getIssues()
    }, [])

    function handleUpvote(id){
        userAxios.put(`/api/issues/upvote/${id}`)
            .then(res => getIssues())
            .catch(err => console.log(err))
    }
    
    function handleDownvote(id){
        userAxios.put(`/api/issues/downvote/${id}`)
            .then(res => getIssues())
            .catch(err => console.log(err))
    }

    function postComment(id, commentText) {
        userAxios.post(`/api/issues/addcomment/${id}`, commentText)
            .then(res => console.log(`hi`))
            .catch(err => console.log(err))
    }

    // no
    function getComments(id) {
        userAxios.get(`/api/issues/getcomments/${id}`)
            .then(res => console.log('hi'))
            .catch(err => console.log(err))
    }

    // Could change behavior to appear at the top until refresh or next getIssues
    function postIssue(issueObject) {
        userAxios.post('/api/issues', issueObject)
            .then(res => getIssues())
            .catch(err => console.log(err))
    }

    const [userIssues, setUserIssues] = React.useState([])

    function getUserIssues(userId) {
        userAxios.get(`/api/issues/${user._id}`)
        .then(res => setUserIssues(res.data))
        .catch(err => console.log(err))
    }
    function deleteIssue(id, userId) {
        userAxios.delete(`/api/issues/${id}`)
            .then(res => getUserIssues(userId))
            .catch(err => console.log(err))
    }

    
    return (
        <IssueContext.Provider
            value={{
                issues,
                handleUpvote,
                handleDownvote,
                getComments,
                deleteIssue,
                getUserIssues,
                deleteIssue,
                postIssue,
                userIssues
            }}
        >
            {props.children}
        </IssueContext.Provider>
    )
}