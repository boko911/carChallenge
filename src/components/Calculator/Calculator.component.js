import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Calculator/Calculator.css'


class Calculator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: '',
            disabled: false,
            num1: -1,
            num2: -1,
            result_arab: '',
            operation: '',
        }
    }

    handleChangeInput = (e) => {
        this.setState({
            inputValue: e.target.value
        })
    }

    handleClickButtonOpe = (e) => {
        if(this.state.inputValue.length !== 0)
            this.setState({
                inputValue: this.state.inputValue + e.target.value,
                disabled: true
            })
    }

    handleClickButtonNumber = (e) => {
        this.setState({
            inputValue: this.state.inputValue + e.target.value,
        })
    }

    handleClickButtonRemove = (e) => {
        if(this.state.inputValue.length === 0)
            this.setState({
                disabled: true
            })    
        this.setState({
                inputValue: this.state.inputValue.slice(0,-1),
                disabled: false
            })
    }

    


    getCharValue = (char) => {
        if (char === 'I') 
            return 1; 
        if (char === 'V') 
            return 5; 
        if (char === 'X') 
            return 10; 
        if (char === 'L') 
            return 50; 
        if (char === 'C') 
            return 100; 
        if (char === 'D') 
            return 500; 
        if (char === 'M') 
            return 1000;
        
        return -1; 
    }


// function that transform Roman Number to Arab Number
    fromRomtoNum = (str) => {
        let res = 0;
        for(let i = 0; i < str.length; i++)
        {   
            let s1 = this.getCharValue(str[i]);
            if (i + 1 < str.length)
            {
                let s2 = this.getCharValue(str[i+1]);
                if(s1 >= s2)
                    res = res + s1;
                else {   
                    res = res + s2 - s1;
                    i++;
                }
            }
            else{
                res = res + s1;
                i++;
            }
        }
        return res
        
    }


// function that return index of where operation signe is
    getIndex = (str) => {
        for(let i = 0; i < str.length; i++){
            if (str[i] === '+' || str[i] === '-' || str[i] === '*')
                return i;
        }
        return -1;
    }

// function that return operation signe
    findTypeOpe = (copy_state) => {
        if(copy_state.inputValue.includes('+'))
            return '+'
        if(copy_state.inputValue.includes('-'))
            return '-';
        if(copy_state.inputValue.includes('*'))
            return '*';
    }


    
// function that get :
//  -   Operation signe
//  -   Num1
//  -   Num2

    getNums = (copy_state) => {
        let index_ope = this.getIndex(copy_state.inputValue)

        copy_state.operation = this.findTypeOpe(copy_state);
        copy_state.num1 = this.fromRomtoNum(copy_state.inputValue.slice(0,index_ope));
        copy_state.num2 = this.fromRomtoNum(copy_state.inputValue.slice(index_ope + 1,copy_state.inputValue.length));
        if (copy_state.operation === "+"){
            copy_state.result_arab = copy_state.num1 + copy_state.num2;
            if(copy_state.result_arab <= 0)
                return -1
            return 1;
        }
        if (copy_state.operation === "-"){
            copy_state.result_arab = copy_state.num1 - copy_state.num2;
            if(copy_state.result_arab <= 0)
                return -1
            return 1;
        }
        if (copy_state.operation === "*"){
            copy_state.result_arab = copy_state.num1 * copy_state.num2;
            if(copy_state.result_arab <= 0)
                return -1
            return 1;
        }
        return -1
    }
    // Function that convert arab number into a roman number 
    fromArabToRoman = (copy_state) => {
        const mm = ["", "_M", "_M_M", "_M_M_M", "_M_M_M_M", "__V", "__V__I", "__V__I__I", "__V__I__I__I", "__I__X"];
        const mc = ["", "_C", "_C_C", "_C_C_C", "_C_D", "_D", "_D_C", "_D_C_C", "_D_C_C_C", "_C_M"];
        const mx = ["" ,"_X", "_X_X", "_X_X_X", "_X_L", "_L", "_L_X", "_L_X_X", "_L_X_X_X", "_X_C"];
        const m = ["", "M", "MM", "MMM", "MMMM", "_V", "_V_I", "_V_I_I", "_V_I_I_I", "_I_X"];
        const c = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"]; 
        const x = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"]; 
        const i = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
    
        var num = copy_state.result_arab
        var million = mm[Math.floor((num = num % 10000000)/1000000)]
        var thousandsss = mc[Math.floor((num = num % 1000000)/100000)]; 
        var thousandss = mx[Math.floor((num = num % 100000)/10000)];
        var thousands = m[Math.floor((num = num % 10000)/1000)];
        var hundereds = c[Math.floor((num = num % 1000)/100)]; 
        var tens =  x[Math.floor((num = num % 100)/10)]; 
        var ones = i[Math.floor(num = num % 10)];
        var ans = million + thousandsss + thousandss + thousands + hundereds + tens + ones; 
        this.setState({
            inputValue: ans
        }
        )
    }

    // function that check if the numbers entered are valid
    checkNums = (copy) => {
        var index = this.getIndex(copy.inputValue)
        var part1 = copy.inputValue.slice(0,index);
        var part2 = copy.inputValue.slice(index + 1, copy.inputValue.length)
        var regex = ("^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$")
        var testPart1 = part1.match(regex);
        var testPart2 = part2.match(regex);
        if( testPart1 != null && testPart2 != null) 
            return 1
        else
            return -1
    }
    // function that check if we have 2 terms and 1 operation signe
    checkNbTerms = (copy) => {
        var index = this.getIndex(copy.inputValue)
        if (index !== -1)
        {   
            if( 0 < index < copy.inputValue.length-1)
                return 1;
            else
                return -1;
        }
        else
            return -1;
    }


    startParser = () => {
        const copy = {...this.state}
        this.setState({
            inputValue: '',
            disabled: false
        })
        
        var is_numValid = this.checkNums(copy)
        var is_equationValid = this.checkNbTerms(copy)
        var is_underscore = copy.inputValue.includes("_")
        var is_numArab = this.getNums(copy)
        if(is_numValid === 1 && is_equationValid === 1 && is_underscore === false && is_numArab === 1){
            this.fromArabToRoman(copy)
            this.props.show_error1('none');
            this.props.show_error2('none');
        }
        else {
            if(is_equationValid !== 1)
            {
                this.setState({
                    inputValue: copy.inputValue
                }) 
                this.props.show_error1('inline-block');
            }
            if (is_numValid !== 1)
            {
                this.setState({
                    inputValue: copy.inputValue
                })
                this.props.show_error2('inline-block');
            }
            if (is_underscore !== false)
            {
                this.setState({
                    inputValue: "LIMIT REACHED"
                })
                this.props.show_error1('none');
                this.props.show_error2('none');
            }
            if (is_numArab !== 1)
            {   
                if(is_equationValid !== 1)
                {
                    this.setState({
                        inputValue: copy.inputValue
                }) 
                    this.props.show_error1('inline-block');
                }
                else {
                    this.setState({
                        inputValue: "Neg/Null not Supported"
                    })
                    this.props.show_error1('none');
                    this.props.show_error2('none');
                }
            }
                
        }    
    }

    clearEntry = () => {
        this.setState({
            inputValue: '',
            disabled: false,
            num1: -1,
            num2: -1,
            result_arab: -1,
            operation: '',
        })
        this.props.show_error1('none');
        this.props.show_error2('none');
    }
         
    
    render() {
        return(
            <div className="container-cal col-content align-self-center">
                <div className="row row-cal"> 
                    <div className="col-lg-3 col-md-3 col-sm-3 offset-sm-2">
                        <input className="input-cal" type="text" value={this.state.inputValue} onChange={this.handleChangeInput} readOnly></input>
                    </div>
                    <div className="col-lg-1 offset-lg-6 col-md-3 offset-md-3 col-sm-3 offset-sm-3"><button className="btn-cal" onClick={this.handleClickButtonRemove} value="Remove">Delete</button></div>
                </div>
                <div className="row row-cal">
                    <div className="col-lg-1 offset-lg-2 col-sm-1 offset-sm-2"><button className="btn-cal" onClick={this.handleClickButtonNumber} value="I">I</button></div>
                    <div className="col-lg-1 offset-lg-2 col-sm-1 offset-sm-2"><button className="btn-cal" onClick={this.handleClickButtonNumber} value="V">V</button></div>
                    <div className="col-lg-1 offset-lg-2 col-sm-1 offset-sm-2"><button className="btn-cal" onClick={this.handleClickButtonNumber} value="X">X</button></div>
                    <div className="col-lg-1 offset-lg-2 col-sm-1 offset-sm-2"><button className="btn-cal" onClick={this.handleClickButtonOpe} value="+" disabled={this.state.disabled}>+</button></div>
                    
                </div>
                <div className="row row-cal">
                    <div className="col-lg-1 offset-lg-2 col-sm-1 offset-sm-2"><button className="btn-cal" onClick={this.handleClickButtonNumber} value="L">L</button></div>
                    <div className="col-lg-1 offset-lg-2 col-sm-1 offset-sm-2"><button className="btn-cal" onClick={this.handleClickButtonNumber} value="C">C</button></div>
                    <div className="col-lg-1 offset-lg-2 col-sm-1 offset-sm-2"><button className="btn-cal" onClick={this.handleClickButtonNumber} value="D">D</button></div>
                    <div className="col-lg-1 offset-lg-2 col-sm-1 offset-sm-2"><button className="btn-cal" onClick={this.handleClickButtonOpe} value="-" disabled={this.state.disabled}>-</button></div>
                </div>
                <div className="row row-cal">
                    <div className="col-lg-1 offset-lg-5 col-sm-2 offset-sm-4"><button className="btn-cal" onClick={this.handleClickButtonNumber} value="M">M</button></div>
                    <div className="col-lg-1 offset-lg-5 col-sm-2 offset-sm-2"><button className="btn-cal" onClick={this.handleClickButtonOpe} value="*" disabled={this.state.disabled}>*</button></div>
                </div>
                <div className="row row-cal">
                    <div className="col-lg-1 offset-lg-2 col-sm-2 offset-sm-4"><button className="btn-cal" onClick={this.clearEntry}>CE</button></div>
                    <div className="col-lg-1 offset-lg-8 col-sm-2 offset-sm-2"><button className="btn-cal" onClick={this.startParser}>=</button></div>
                </div>
            </div>
        )
    }
}

export default Calculator;
