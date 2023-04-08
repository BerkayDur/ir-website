import "./documentcard.css";
import { useState, useEffect, useContext } from "react";
import feedbackModeContext from "../../contexts/feedbackModeContext";

function DocumentCard(props){
    const feedbackMode = useContext(feedbackModeContext);

    function handleInput(e){
        e.preventDefault();
        props.changeFeedback(props.id,e.target.value, props.rank, props.score, props.session_id);
    }


    return (<div className="documentcard">
                <h3 className="title">{props.title}</h3>
                <p className="score"><span className="score_title">Score:</span> {props.score}</p>
                <p className="content">{props.children.slice(props.title.length)}</p>
                <a href={props.url}>Read Full Article!</a>
                <div className="feedbackcontainer">
                    {
                        feedbackMode === false?false: (
                        <fieldset>
                            <legend>Feedback:</legend>
                            <label>How relevant is this document to the query? (0 is bad, 2 is good)</label>
                            <select value={props.feedback["doc_id"]} onInput={handleInput}>
                                <option value=""/>
                                <option value={0}>0</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                            </select>
                        </fieldset>
                        )
                    }
                </div>
            </div>);
}

export default DocumentCard;