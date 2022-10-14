import React from "react";

export default function CommentForm(props) {
    const { postComment, issue, user, setCommentToggle } = props

    const initInputs = {commentText: "", user: user._id, issue: issue._id}
    
    const [inputs, setInputs] = React.useState(initInputs)

    function handleChange(e) {
        const { value, name } = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleCommentSubmission(e) {
        e.preventDefault()
        const inputsWithUsername = {...inputs, commentText: inputs.commentText + ` - ${user.username}`}
        postComment(issue._id, inputsWithUsername)
        setInputs(initInputs)
        setCommentToggle(false)
    }

    return (
        <form onSubmit={handleCommentSubmission}>
            <textarea name="commentText" onChange={handleChange}/>
            <br />
            <button>Submit</button>
        </form>
    )
}