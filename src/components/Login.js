import React from 'react';
import firebase from "../firebase";
import { Button } from '@material-ui/core';
import {withRouter} from "react-router";
class Login extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={name:"",pass:"",admin:false,datacorrect:false,docid:""}
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]:event.target.value})
        console.log(event.target.name);
      };
      checkAdmin=()=>
      {
          const db=firebase.firestore();
          db.collection("employee").get().then((query)=>{
          query.forEach((doc)=>{
                if(doc.data().name===this.state.name)
                    if(doc.data().password==this.state.pass)
                        if(doc.data().Admin)
                            this.setState({admin:true});
                        else
                        {
                            this.setState({datacorrect:true,docid:doc.id});

                    }
                            

          })
          if(this.state.admin)
            this.props.history.push("/dashboard",this.state.docid);
        else if(!this.state.admin && this.state.datacorrect)
            this.props.history.push("/employee",this.state.docid);
        else 
          alert("wrong data");
        this.setState({name:"",pass:""})
        })

      }

    render()
    {
        return(
            <div>
                <p>Login</p>
                <input placeholder="Enter name" type="text" name="name" onChange={this.handleChange} value={this.state.name}/>
                <br/><br/>
                <input placeholder="Enter password" type="password" name="pass" onChange={this.handleChange} value={this.state.pass}/>
                <br/><br/>
                <Button variant="outlined" onClick={this.checkAdmin}>Submit</Button>
            </div>
        )
    }
}
export default withRouter(Login) ;