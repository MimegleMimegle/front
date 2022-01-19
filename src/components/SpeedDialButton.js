import React from 'react'
import '../styles/css/SpeedDialButton.css'
import { history } from '../redux/ConfigureStore'
import { ReactComponent as DictPageAddButton } from '../styles/icons/추가_18dp.svg'

const SpeedDialButton = (props) => {
  return (
    <>
      <div
        className="DictPageAddButton"
        onClick={() => {
          history.push('/dict/write')
        }}
      >
        {/* <DictPageAddButton width="30px" height="30px" fill="#FFFFFF" /> */}
        <svg width="27.5" height="29" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M20.2283 0.78262C19.9939 0.5482 19.6759 0.416504 19.3444 0.416504C19.0129 0.416504 18.695 0.5482 18.4605 0.78262L3.13988 16.1033C2.98284 16.2603 2.87047 16.4564 2.81434 16.6712L1.14768 23.052C1.03553 23.4813 1.15942 23.938 1.47322 24.2517C1.78701 24.5655 2.24364 24.6894 2.673 24.5773L9.05372 22.9106C9.2686 22.8545 9.46465 22.7421 9.62169 22.5851L24.9423 7.26443C25.4305 6.77628 25.4305 5.98482 24.9423 5.49667L20.2283 0.78262ZM5.14747 17.6312L19.3444 3.43427L22.2907 6.38055L8.09375 20.5775L4.10581 21.6192L5.14747 17.6312Z"
            fill="white"
          />
          <path
            d="M1.66675 27.0832C0.976392 27.0832 0.416748 27.6428 0.416748 28.3332C0.416748 29.0235 0.976392 29.5832 1.66675 29.5832H26.6668C27.3571 29.5832 27.9168 29.0235 27.9168 28.3332C27.9168 27.6428 27.3571 27.0832 26.6668 27.0832H1.66675Z"
            fill="white"
          />
        </svg>
      </div>
    </>
  )
}

export default SpeedDialButton
