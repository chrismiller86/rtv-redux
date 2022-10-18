import React from "react";

export default function CommentForm(props) {
    const { postComment, issue, user } = props

    const initInputs = {commentText: "", user: user._id, issue: issue._id}
    
    const [inputs, setInputs] = React.useState(initInputs)

    function handleChange(e) {
        const { value, name } = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }
    function capitalizeName(string) {
        return string[0].toUpperCase() + string.substring(1)
    }

    function handleCommentSubmission(e) {
        e.preventDefault()
        const inputsWithUsername = {...inputs, commentText: inputs.commentText + ` - ${capitalizeName(user.username)}`}
        postComment(issue._id, inputsWithUsername)
        setInputs(prevInputs => ({...prevInputs, commentText: ""}))
    }

    return (
        <form className="commentForm" onSubmit={handleCommentSubmission}>
            <textarea name="commentText" value={inputs.commentText} onChange={handleChange}/>
            <br />
            <button>Submit</button>
        </form>
    )
}