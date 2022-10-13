import React from "react";

export default function PostIssueForm(props) {

    const initInputs = {
        title: "",
        description: ""
    }

    const [inputs, setInputs] = React.useState(initInputs)

    function handleChange(e) {
        const { name, value } = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    return(
        <form>
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