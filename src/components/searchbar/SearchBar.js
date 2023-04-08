import "./searchbar.css"
import feedbackModeContext from "../../contexts/feedbackModeContext";

import { useState, useContext } from "react"

function SearchBar(props){
    const [loc, setLoc] = useState(props.query);
    const [meth, setMeth] = useState(props.model);
    const feedbackMode = useContext(feedbackModeContext);

    function handleChange(e){
        e.preventDefault();
        setLoc(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        props.setquery(loc);
        props.setModel(meth);
    }

    function handleRadio(e){
        setMeth(e.target.value);
    }

    function handleFeedback(e){
        props.setFeedbackMode(e.target.checked);
        return;
    }



    return <div className="searchbar">
                <form action="" method="get" className="search-form" onSubmit={handleSubmit}>
                    <div>
                        <input type="text" name="text" id="text" value={loc} onChange={handleChange} placeholder="Enter Query"/>
                        <button>Search</button>
                    </div>
                    <div>
                        <input type="radio" name="model" id="bm25" value="bm25" onChange={handleRadio}/>
                        <label htmlFor="bm25">BM25</label>
                        <input type="radio" name="model" id="desm" value="desm" onChange={handleRadio}/>
                        <label htmlFor="desm">DESM</label>
                    </div>
                    <div>
                        <input type="checkbox" name="feedback" id="feedback" value={feedbackMode} onChange={handleFeedback}/>
                        <label htmlFor="feedback">feedback mode</label>
                    </div>
                </form>
            </div>
}

export default SearchBar