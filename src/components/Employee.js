import React from "react";
import firebase from "../firebase";
import Date from "./Date";
import {Drawer,List,ListItem,ListItemText,Dialog,DialogContent,DialogTitle, Button} from "@material-ui/core";
import {  withRouter} from "react-router";
class Employee extends React.Component{
    constructor(props){
        super(props);
        this.state={dashOpen:true,date:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]}
    }
    handleCloser = () => {
        this.setState({dashOpen:false});
      };
      openDash=()=>
      {
          this.setState({dashOpen:true})
      }
      componentDidMount()
      {
          console.log(this.props.location.state)
      }
render()
{
    
    return(
        <div>
            <Drawer anchor="left" variant="permanent">
            <List>
                <ListItem onClick={this.openDash}>
                    <span>Dashboard</span>
                </ListItem>
            </List>
            </Drawer>
            <Dialog onClose={this.handleclose} open={this.state.dashOpen}>
                <DialogTitle>Calendar</DialogTitle>
                <div >
                {this.state.date.map(i=>
                <div><Date i={i} /><br/></div>
                )}
                </div>
              
                <Button onClick={this.handleCloser}>close</Button>
               </Dialog>
        </div>
    )
}
}
export default withRouter(Employee);