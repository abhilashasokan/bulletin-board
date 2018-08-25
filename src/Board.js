import React, { Component } from 'react'
import Note from './Note'
import { FaPlus } from 'react-icons/fa';

class Board extends Component {
    constructor(props) {
        super(props)
        this.state = {
            notes: []
        }
        this.buldNotes = this.buldNotes.bind(this)
        this.update = this.update.bind(this)
        this.remove = this.remove.bind(this)
        this.add = this.add.bind(this)
        this.nextId = this.nextId.bind(this)
    }
    buldNotes(note, i) {
        return (
            <Note key={note.id} index={note.id} onChange={this.update} onRemove={this.remove}>
                {note.note}
            </Note>
        )
    }
    componentWillMount() {
        var self =this
        if(this.props.count) {
            fetch('https://baconipsum.com/api/?type=all-meat$sentance={this.props.count}')
            .then(response => response.json())
            .then(json => json[0]
                .split('. ')
                .forEach(sentance => self.add(sentance.substring(0, 30))))
        }
    }
    nextId() {
        this.uniqueId = this.uniqueId || 0
        return this.uniqueId++
    }
    update(newText, i) {
        this.setState(prevState => ({
            notes: prevState.notes.map(
                note => (note.id !== i) ? note : {...note, note: newText}
            )
        }))
    }
    add(text) {
        this.setState(prevState => ({
            notes: [
                ...prevState.notes,
                {
                    id: this.nextId(),
                    note:text.trim()
                }
            ]
        }))
    }
    remove(id) {
        this.setState(prevState => ({
            notes: prevState.notes.filter(note => note.id !== id)
        }))
    }
    render() {
        return (
            <div className="board">
                {this.state.notes.map(this.buldNotes)}
                <button onClick={this.add.bind(null, "New Text")}
                id="add">
                <FaPlus />
                </button>
            </div>
        )
    }
}

export default Board