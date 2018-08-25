import React, {Component} from 'react'
import { FaTrash } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { FaSave } from 'react-icons/fa';
import { FaWindowClose } from 'react-icons/fa';


class Note extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editing: false
        }
        this.edit = this.edit.bind(this)
        this.remove = this.remove.bind(this)
        this.save = this.save.bind(this)
        this.renderForm = this.renderForm.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
        this.randomBetween =this.randomBetween.bind(this)
        this.cancel = this.cancel.bind(this)
    }
    componentWillMount() {
        this.style = {
            right: this.randomBetween(0, window.innerWidth - 150, 'px'),
            top: this.randomBetween(0, window.innerHeight - 150, 'px'),
            transform: `rotate(${this.randomBetween(-25, 25, 'deg')})`
        }
    }
    edit() {
        this.setState({
            editing: true
        })
    }
    randomBetween(x, y, s) {
        return x + Math.ceil(Math.random() * (y-x)) + s
    }
    renderForm() {
        return (
            <div className="note" style={this.style}>
                <form>
                    <textarea className="editArea" 
                    placeholder="Remember, be nice!" 
                    ref={input => this._newText = input}
                    defaultValue={this.props.children}></textarea>
                    <button id="save" onClick={this.save}><FaSave/></button>
                    <button id="cancel" onClick={this.cancel}><FaWindowClose /></button>
                </form>
            </div>
        )
    }
    remove(e) {
        e.preventDefault()
        this.props.onRemove(this.props.index)
    }
    save(e) {
        e.preventDefault()
        this.props.onChange(this._newText.value, this.props.index)
        this.setState({
            editing: false
        })
    }
    cancel(e) {
        e.preventDefault()
        this.setState({
            editing: false
        })
    }
    renderDisplay() {
        return (
            <div className="note" style={this.style}>
                <p>{this.props.children}</p>
                <span>
                    <button id="edit" onClick={this.edit}><FaEdit/></button>
                    <button id="remove" onClick={this.remove}><FaTrash/></button>
                </span>
            </div>
        )
    }
    render() {
        if(this.state.editing) {
            return this.renderForm()
        }
        else {
            return this.renderDisplay()
        }
    }
}

export default Note