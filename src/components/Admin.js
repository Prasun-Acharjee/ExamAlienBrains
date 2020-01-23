import React from 'react';
import firebase from "../firebase";
import Request from "./Request";
import {Drawer,List,ListItem,ListItemText,Dialog,DialogContent,DialogTitle, Button} from "@material-ui/core";
class Admin extends React.Component{
    constructor(props){
        super(props);
        this.state={requestOpen:true,createOpen:false,request:[],name:"",pass:"",admin:false,dataArrived:false}
    }
    handleCloser = () => {
        this.setState({requestOpen:false});
      };
      handleClosec = () => {
        const db = firebase.firestore();
       db.collection("employee").add({
           name:this.state.name,
           password:this.state.pass,
           Admin:false
       }).then((doc)=>this.setState({createOpen:false}))
      };
      handleChange=(event)=>
      {
        this.setState({ [event.target.name]:event.target.value})
          console.log(event.target.name);
      }
    listClick=(event)=>
    {
            console.log(event.target.id)
            if(event.target.id==='Requests')
                this.setState({requestOpen:true});
            else if(event.target.id==='create')
                this.setState({createOpen:true});
    }
    componentDidMount()
    {
        const db=firebase.firestore();
        db.collection('requests').get().then((query)=>{
            query.forEach((doc)=>{
                this.setState({request:this.state.request.concat(doc)})
                console.log(doc.data())
            })
            this.setState({dataArrived:true})
            console.log(this.state.request)
            
        })
    }
    render()
    {
        return(
            <div>
               <Drawer anchor="left" variant="permanent">
               <List>
          
            <ListItem button id="Requests" onClick={this.listClick}>
             <span>Requests</span>
            </ListItem>
            <ListItem button id="create" onClick={this.listClick}>
             <span>create</span>
            </ListItem>
        </List>
               </Drawer>
               <Dialog  open={this.state.requestOpen}>
                <DialogTitle>Requests</DialogTitle>
                {console.log(this.state.dataArrived)}
                {this.state.dataArrived && this.state.request.map(i=><Request request={i}/>)}
                <Button onClick={this.handleCloser}>close</Button>
               </Dialog>
               <Dialog open={this.state.createOpen}>
                <DialogTitle>Create Employee</DialogTitle>
                <input placeholder="name" type="text" value={this.state.name} name="name" onChange={this.handleChange}/>
                <input placeholder="password" type="password" value={this.state.pass} name="pass" onChange={this.handleChange}/>
                <Button onClick={this.handleClosec}>Create</Button>
               </Dialog>
            </div>
        )
    }
}
export default Admin;