import React from "react";

const initInputs = {
    title: "",
    description: ""
}

export default function PostIssueForm(props) {

    const [inputs, setInputs] = React.useState(initInputs)
    const { postIssue } = props

    function handleChange(e) {
        const { name, value } = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        postIssue(inputs)
        setInputs(initInputs)
    }


    return(
        <form onSubmit={handleSubmit}>
            <input
                name="title"
                value={inputs.title} 
                onChange={handleChange}
                />
            <textarea
                name="description"
                value={inputs.description}
                onChange={handleChange}
                />
            <button>Submit</button>
        </form>
    )
}