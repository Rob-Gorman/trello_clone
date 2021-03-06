import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { createCard } from '../../features/cards/cards';


const AddCardForm = ({listId, activeListId, setActiveListId}) => {
  const [newCardTitle, setNewCardTitle ] = useState("")
  const dispatch = useDispatch()
  const cards = useSelector(state => state.cards)
                  .filter(card => card.listId === listId)

  const evalPosition = () => {
    const len = cards.length
    if (!len) return 65535
    const currentMax = cards[len-1].position
    return currentMax + 65536
  }

  const handleClose = (e) => {
    e.stopPropagation()
    closeAddCard()
  }

  const closeAddCard = () => {
    setActiveListId('')
    setNewCardTitle("")
  }

  const handleAddCard = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newCardPayload = {
      listId,
      card: {
        title: newCardTitle,
        position: evalPosition(),
      }
    }
    dispatch(createCard({newCardPayload, callback: closeAddCard}))
  }

  const cardDropdownClass = activeListId === listId ? "add-dropdown add-bottom active-card" : "add-dropdown add-bottom"

  return (
    <div className={cardDropdownClass}>
      <div className="card">
        <div className="card-info"></div>
        <textarea name="add-card" value={newCardTitle} onChange={ e => setNewCardTitle(e.target.value) }></textarea>
        <div className="members"></div>
      </div>
      <a className="button" onClick={ handleAddCard }>Add</a>
      <i className="x-icon icon" onClick={ handleClose }></i>
      <div className="add-options">
        <span>...</span>
      </div>
    </div>
  )
}

export default AddCardForm;