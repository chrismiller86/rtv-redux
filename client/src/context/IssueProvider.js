import React from "react";
import axios from 'axios'

export const IssueContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function IssueProvider(props){

    // let arrayOfObjects = [
    //     {id: "id1", b: "text", commentArray: []},
    //     {id: "id2", b: "text1", commentArray: []},
    //     {id: "id3", b: "text2", commentArray: []}
    //   ]
      
    //   let comments = [
    //     {aofId: "id1", text: "text1"},
    //     {aofId: "id1", text: "text2"},
    //     {aofId: "id2", text: "text3"},
    //     {aofId: "id2", text: "text4"},
    //     {aofId: "id3", text: "text5"},
    //   ]
      
    //   let aofWithComments = arrayOfObjects.map(obj => {
    //     let returnObj = obj
    //     returnObj.commentArray = comments.filter(comment => comment.aofId === obj.id)
    //     return returnObj
    //   }) 

    const user = JSON.parse(localStorage.getItem("user"))


    const [tempIssues, setTempIssues] = React.useState([])
    const [issues, setIssues] = React.useState([])
    const [comments, setComments] = React.useState([])

    function getIssues() {
        userAxios.get('/api/issues')
            .then(res => {
                setTempIssues(res.data)
            })
            .catch(err => console.log(err))
    }    

    function getComments() {
        userAxios.get(`/api/issues/getcomments`)
            .then(res => setComments(res.data))
            .catch(err => console.log(err))
    } 


    React.useEffect(()=> {
        getIssues()
    }, [])
    React.useEffect(()=> {
        getComments()
    }, [])

    React.useEffect(()=> {
        console.log(comments)
        setIssues(tempIssues.map(issue => {
            // console.log('hi')
            // console.log(comments)
            let returnIssue = issue
            returnIssue.commentArray = comments.filter(comment => comment.issue === issue._id)
            return returnIssue
        }))
    }, [comments])
    

    

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

    // new posts steal comments
    function postIssue(issueObject) {
        userAxios.post('/api/issues', issueObject)
            .then(res => {
                setIssues(prevIssues => ([...prevIssues, res.data]))
            })
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
                postIssue,
                userIssues,
                comments
            }}
        >
            {props.children}
        </IssueContext.Provider>
    )
}