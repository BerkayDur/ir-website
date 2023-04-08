import DocumentCard from "../documentcard/DocumentCard";
import "./documentcontainer.css";


function DocumentContainer(props){
    
    let rend = ""
    if (props.loading === false && props.documents !== false ){
        rend = []
        for (let i=1; i<=10; i++){
            let document = props.documents[i]
            rend[i-1] = (<DocumentCard key={document["doc_id"]} title={document["header"]} id={document["doc_id"]} 
                        changeFeedback={props.changeFeedback} feedback={props.feedback} score={document["score"]} 
                        rank={document["rank"]} url={document["url"]}>
                                {document["text"]}
                        </DocumentCard>);
        }
    }
    return <div className="documentcontainer">{rend}</div>
}

export default DocumentContainer;