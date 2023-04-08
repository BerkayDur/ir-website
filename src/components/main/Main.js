import "./main.css"
import SearchBar from "../searchbar/SearchBar";
import { useState, useEffect } from "react";
import feedbackModeContext from "../../contexts/feedbackModeContext";
import DocumentContainer from "../documentcontainer/DocumentContainer";
import FeedbackButton from "../feedbackbutton/FeedbackButton";
import { nanoid } from "nanoid";

const session_id = nanoid(5);

async function getDocumentsFromQuery(query,model, setLoading, setDocuments){
    // GET documents from DB.
    setLoading(true);
    let URL = "https://gigglesearch.ngrok.app/search?query=" + query + "&algorithm=" + model.toUpperCase();
    // if (query != ""){
    //     window.location.pathname += "search"
    //     window.location.search = ("query=" + query + "&algorithm=" + model.toUpperCase());
    // }
    console.log("fetching");
    let res = await fetch(URL)
    let data = await res.json();
    let parsed = await JSON.parse(data)
    if (Object.keys(parsed).length === 0 && parsed.constructor === Object){
        setDocuments("")
    }
    else{
        setDocuments(parsed)
    }
    setLoading(false);
}

function Main(){
    const [query, setQuery] = useState("");
    const [model, setModel] = useState("");
    const [feedbackMode, setFeedbackMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [documents, setDocuments] = useState(false);
    const [feedback, setFeedback] = useState(false);

    function changeFeedback(doc_id,userScore, rank, score){
        const new_ = {...feedback};

        //done: doc_id, userScore, query, algorithm, rank, score, session_id
        new_[rank] = {doc_id,userScore,query, "algorithm":model.toUpperCase(), rank, score, session_id};
        setFeedback(new_);
    }



    useEffect(()=>{
        const nextURL = "http://localhost:3000/search?query=" + query + "&model=" + model;
        const nextTitle = "Title";
        const nextState = {};
        window.history.pushState(nextState, nextTitle, nextURL);

    },[query, model])

    useEffect(()=>{
        if (query==="" || model===""){
            setLoading(false)
            setDocuments(false)
        }
        else {
            getDocumentsFromQuery(query, model, setLoading,setDocuments);
        }    
    }, [query, model])


    return (<main className="main">
        <feedbackModeContext.Provider value={feedbackMode}>
            <FeedbackButton query={query} model={model}>{feedback}</FeedbackButton>
            <SearchBar query={query} setquery={setQuery} model={model} setModel={setModel} setFeedbackMode={setFeedbackMode}/>
            <DocumentContainer loading={loading} documents={documents} changeFeedback={changeFeedback} feedback={feedback}/>
        </feedbackModeContext.Provider>
        </main>)
}

export default Main;