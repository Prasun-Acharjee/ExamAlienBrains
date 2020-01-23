import React from "react";
import { Card ,CardContent, IconButton, Icon} from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import DoneIcon from '@material-ui/icons/Done';
import firebase from "../firebase";
class Request extends React.Component{
    componentDidMount()
    {
        console.log(this.props.request.data().name);
    }
    accept=()=>
    {
        const db=firebase.firestore();
        db.collection('requests').doc(`${this.props.request.id}`).set({accept:true,pending:false},{merge:true});
    }
    reject=()=>
    {
        const db=firebase.firestore();
        db.collection('requests').doc(`${this.props.request.id}`).set({accept:false,pending:false},{merge:true});
    }
    render()
    {
        return(
            <div>
                <Card>
                    <CardContent>
                        <span>{this.props.request.data().name}</span>
                        <br/>
                        <p>{this.props.request.data().description}</p>
                        <IconButton onClick={this.accept}><DoneIcon/></IconButton>
                        <IconButton onClick={this.reject}><CancelIcon/></IconButton>
                    </CardContent>
                </Card>
            </div>
        )
    }
}
export default Request;