import "./feedbackbutton.css";
import { useContext, useState, useEffect } from "react";
import feedbackModeContext from "../../contexts/feedbackModeContext";

function formChecker(feedback){
    if (! (feedback instanceof Object) || Object.keys(feedback).length !== 10){
        return false;
    }
    for (let val of Object.values(feedback)){
        if (!(val["userScore"] in [0, 1, 2])){
            return false;
        }
    }
    return true;
}

function FeedbackButton(props){
    const feedbackMode = useContext(feedbackModeContext);
    const [mode, setMode] = useState("idle");
    const [loading, setLoading] = useState(false);
    const [serverCode, setServerCode] = useState(0);



    async function handleClick(e){
        e.preventDefault();
        // console.log(props.children);
        if (formChecker(props.children)){
            //  Post to here
            setMode("post");
            setServerCode(undefined);
            setLoading(true);
            let res = await fetch("https://gigglesearch.ngrok.app/feedback", 
                        {method:"POST", mode:"cors", 
                        headers:{"Content-Type":"application/json"},
                        body: JSON.stringify(props.children)})
            let data = await res.json();
            // let parsed = await JSON.parse(data)
            setServerCode(data === "Feedback received");
            setLoading(false);
            
        }
        else {
            setMode("error");
        }
    }


    useEffect(()=>{
        if (mode === "error"){
            alert("Please ensure you have given the relevency for each document in the correct format.");
        }
        else if (mode === "post"){
            alert("Sending feedback to server!\n\nThank you!!");
        }

        if (serverCode === true){
            alert("Feedback received by server!");
        }
        else if (serverCode === false){
            alert("Feedback not received by server. Contact Iqbal!");
        }
    },[serverCode, mode])



    return feedbackMode === false ? false : (
    <div className="feedbackbutton-container" onClick={handleClick}>Send feedback</div>);
}

export default FeedbackButton;