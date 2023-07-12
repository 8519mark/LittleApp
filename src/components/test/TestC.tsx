import React, {Component} from "react";
import { NavigationSection } from "../NavigationSection";

type state_Test = {
    message : string,
    count : number,
    incCount : number,
    status : boolean
}

type props_Test = {
    text : string
}


class TestC extends Component<props_Test, state_Test> {
    constructor(props : props_Test) {
        super(props);
        this.state  = {
            message : 'Check Start',
            count : 0,
            incCount : 0,
            status : true
        }

        // correct way of binding event --> do it ONCE in the constructor
        //    if we dont bind, the 'this' will be treated as 'undefined' --> JS problem
        this.click = this.click.bind(this);
    }

    changeMessage() : void {
        this.setState({
            message : 'Check Continue'
        })
    }

    addCount() : void {
        // this.setState({
        //     count : this.state.count + 1
        // })
        this.setState({
            count : this.state.count + 1
        }, ()=> {console.log('async call', this.state.count);}) // callback

        console.log('sync call', this.state.count);
            // console value will be 1 less than render value
            // --> ASYC
            // Solution, callback
    }

    // proper way of multiple call - using previous state
    increment() : void {
        // ()=>{} VS ()=>()
        // ()=>{} : need explicitly return value
        //          ex : (rt)=>{ return rt;}
        // ()=>() : implicitly return what is inside the function body
        //          ex : (rt)=>(rt)
        this.setState((prev) => {
            return {incCount : prev.incCount + 1};
        })
    }

    click() : void {
        this.setState((prev) => {
            return {status : !prev.status};
        })
    }

    render() {
        return (
            <div className="App">
                <div className = "top-content">
                    <NavigationSection />
                </div>
                <div className = "mid-content">
                    <div style={{ height: '100vh', width: '100%' }}>
                        <h1>{this.state.message}</h1>
                        <button onClick={() => this.changeMessage()}>Continue</button>
                        <h1>Count : {this.state.count}</h1>
                        <button onClick={() => this.addCount()}>Add</button>
                        <h1>Increment1 : {this.state.incCount}</h1>
                        <button onClick={() => this.increment()}>Inc1</button>
                        <h1>Increment2 : {this.state.incCount}</h1>
                        <button onClick={() => this.increment()}>Inc2</button>

                        <h1>Properly Handle Click : {this.state.status? "True" : "False"}</h1>
                        <button onClick={this.click}>click</button>
                    </div>
                </div>
            </div>
            )
    }
}

export default TestC;