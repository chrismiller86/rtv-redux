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
        <div className="issue--postForm">
            <h2>Submit an Issue to be Voted On</h2>
            <form  onSubmit={handleSubmit}>
                <label>Issue Title</label>
                <br />
                <input
                    name="title"
                    value={inputs.title} 
                    onChange={handleChange}
                    />
                <br />
                <label>Issue Description</label>
                <br />
                <textarea
                    name="description"
                    value={inputs.description}
                    onChange={handleChange}
                />
                <br />
                <button className="issue--submitBtn">Submit</button>
            </form>
        </div>
    )
}