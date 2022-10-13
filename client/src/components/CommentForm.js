import React from "react";

export default function CommentForm(props) {

    const initInputs = ""
    
    const [inputs, setInputs] = React.useState(initInputs)

    function handleChange(e) {
        const { value } = e.target
        setInputs(prevInputs => (value))
    }

    return (
        <form>
            <textarea onChange={handleChange}/>
            <br />
            <button>Submit</button>
        </form>
    )
}