import { useContext } from 'react'
import context from '../Contexts/context'

const YourBalance = () => {
  const context_4 = useContext(context);
  const {balance} = context_4;

  return (
    <div className='header_component'>
      <p className='balance_header'>YOUR BALANCE</p>
      <p className="balance">{`$${balance}.00`}</p>
    </div>
  )
}

export default YourBalance
