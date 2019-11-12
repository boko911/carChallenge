import React, {Component} from 'react';
import '../Content-Container/ContentContainer.css';
import Askcesar from '../../assets/img/ask-cesar.png'
import Calculator from '../Calculator/Calculator.component'
import error1 from '../../assets/img/error1.gif'
import error2 from '../../assets/img/error2.jpg'


class ContentContainer extends Component {
    constructor(props){
        super(props)

        this.trigDisplayError1 = this.trigDisplayError1.bind(this);
        this.trigDisplayError2 = this.trigDisplayError2.bind(this);

        this.state = {
            initialMarginLeft : 50,
            displayError: 'none',
            displayError1: 'none',
            displayError2: 'none',
            displayCal:    'none',
        }        
    }
    
    trigDisplayError1 = (value) => {
        this.setState(
        {
            displayError1: value
        })
    }

    trigDisplayError2 = (value) => {
        this.setState(
        {
            displayError2: value
        })
    }

    moveCesar = () => {
        this.setState({
            initialMarginLeft : 0,
            displayError: 'block',
            displayCal: 'inline-flex',
        })
    }
    
    render(){
        return (
            <div className="row container-content">
                <div className="col-lg-auto  col-md-auto col-sm-auto" >
                    <div className="col-lg-3 col-md-3 col-sm-3 col-img-cesar justify-content-center" style={{marginLeft: this.state.initialMarginLeft+"%"}}>
                        <p className="content-text">NEED TO CALCULATE SOMETHING ?</p>
                        <button onClick={this.moveCesar} className="btn-image">
                            <img src={Askcesar}  className="img-cesar2" alt='Click to display Calculator'/>
                        </button>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-error" style={{display: this.state.displayError}}>
                        
                            <div className="col-lg-auto " style={{display: this.state.displayError1}}>
                                <img className="img-error" src={error1} alt="Error Equation"/>
                                <p>Need Action : + - or *</p>
                            </div>
                            <div className="col-lg-auto" style={{display:this.state.displayError2}}>
                                <img className="img-error" src={error2} alt="Error Numeral Format"/>
                                <p>Wrong Numeral Format</p>
                            </div>
                    </div> 
                    <div className="col-lg-6 col-md-6 col-sm-6 col-cal h-100 justify-content-center" style={{display: this.state.displayCal}}>
                        <Calculator show_error1={this.trigDisplayError1} show_error2={this.trigDisplayError2}></Calculator>
                    </div>
                </div>
            </div>
        )
    }
}

export default ContentContainer;