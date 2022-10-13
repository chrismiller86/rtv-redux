import React, { useState } from "react";
import axios from 'axios'

export const IssueContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function IssueProvider(props){

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

    function postIssue(issueObject) {
        userAxios
    }

    
    return (
        <IssueContext.Provider
            value={{
                issues,
                handleUpvote,
                handleDownvote,
                getComments
            }}
        >
            {props.children}
        </IssueContext.Provider>
    )
}