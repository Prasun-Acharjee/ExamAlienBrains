import React from "react";
import {withRouter} from "react-router";
import firebase from "../firebase";
import {Drawer, Button,ListItem,ListItemText,Dialog,DialogContent,DialogTitle,Badge} from "@material-ui/core";
class Date extends React.Component{
    constructor(props){
        super(props);
        this.state={bo:false,popup:false,subject:"",des:"",data:[],dates:[],colorAccept:false,colorReject:false}
    }
    handleChange=(event)=>
      {
        this.setState({ [event.target.name]:event.target.value})
          console.log(event.target.name);
      }
    sendData=()=>
    {
        console.log(this.props.location.state)
        const db = firebase.firestore();
        db.collection("employee").doc(`${this.props.location.state}`).onSnapshot((res)=>{
            console.log(res.data().name)
            db.collection("requests").add({
                name:res.data().name,
                docid:this.props.location.state,
                date:this.props.i,
                pending:true,
                accept:null,
                subject:this.state.subject,
                description:this.state.des
            })
            this.setState({popup:false,subject:"",des:""})
        })
        
    }
    sendRequest=()=>
    {
        this.setState({popup:true});
    }
    sup=()=>
    {
        if((this.props.i)%6==0)
        {
            this.setState({bo:true})
        }
        else
            this.setState({bo:false})
    }
    checkColor=()=>
    {
        for(var i=0;i<this.state.dates.length;i++)
        {
            if(this.state.dates[i].date==this.props.i && this.state.dates[i].accept)
                this.setState({colorAccept:true})
            else if(this.state.dates[i].date==this.props.i && !this.state.dates[i].accept)
                this.setState({colorReject:true})
        }
    }
    componentDidMount()
    {
        //this.sup();
        const db=firebase.firestore();
        db.collection('requests').where('docid','==',`${this.props.location.state}`).get().then((query)=>{
            query.forEach((doc)=>{
                this.setState({dates:this.state.dates.concat(doc.data())})
            })
            console.log(this.state.dates);
            this.checkColor();
            if(this.state.colorAccept)
            {
                this.setState({colors:"primary"})
            }
            else if(this.state.colorReject)
            {
                this.setState({colors:"secondary"})
            }   
            else
                this.setState({colors:""})
        })
        
    }
    render()
    {
        return(
            <div>
                {this.state.bo&&<br/>}
                
                <Badge badgeContent="" color={this.state.colors}><Button onClick={this.sendRequest} variant="contained">{this.props.i}</Button></Badge>
                
                <Dialog open={this.state.popup}>
                <DialogTitle>Apply for leave</DialogTitle>
                    <input placeholder="subject" type="text" value={this.state.subject} name="subject" onChange={this.handleChange}/>
                    <br/>
                    <span>description</span>
                    <textarea type="text" value={this.state.des} name="des" onChange={this.handleChange} style={{width:300,height:100}}/>
                    <Button onClick={this.sendData}>Request</Button>
                </Dialog>
            </div>
            
        )
    }
}
export default withRouter(Date);